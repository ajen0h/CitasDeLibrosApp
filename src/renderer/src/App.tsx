import { Routes, Route, Link, HashRouter as Router } from "react-router-dom"
import Home from "./components/Home/Home"
import Autores from "./components/Autores/Autores"
import { useEffect } from "react"
import { useAutoresStore } from "./store/autores"
import Libros from "./components/Libros/Libros"
import { useLibrosStore } from "./store/libros"
import { useCitasStore } from "./store/citas"
import Autor from "./components/Autores/Autor"
import Libro from "./components/Libros/Libro"
import { CardSide } from "./components/Autores/components/cart-autores"
import { BookMarked, CircleUserRound } from "lucide-react"
import { FormCitas } from "./components/form-citas"
import { FormAutores } from "./components/Autores/components/form-autores"
import { FormLibros } from "./components/Libros/components/form-libros"
import { Toaster } from "react-hot-toast"

function App() {
  const initAutores = useAutoresStore((state) => state.initAutores)
  const autores = useAutoresStore((state) => state.autores)

  const initLibros = useLibrosStore((state) => state.initLibros)
  const libros = useLibrosStore((state) => state.libros)

  const initCitas = useCitasStore((state) => state.initCitas)

  useEffect(() => {

    const autoresLS = localStorage.getItem("autores")
    const librosLS = localStorage.getItem("libros")
    const citasLS = localStorage.getItem("citas")


    if (autoresLS !== null) {
      const autoresJSON = JSON.parse(autoresLS)
      initAutores(autoresJSON)
    }
    if (librosLS !== null) {
      const librosJSON = JSON.parse(librosLS)
      initLibros(librosJSON)
    }
    if (citasLS !== null) {
      const citasJSON = JSON.parse(citasLS)
      initCitas(citasJSON)
    }

  }, [])



  return (
    <Router>
      <div className="h-screen grid grid-cols-[248px_1fr]">
        <div style={{ backgroundColor: "rgba(32, 32, 32)" }} className="overflow-y-auto p-2 border-r border-white/10 ">
          <nav className="flex flex-col gap-1 text-white ">
            <FormCitas />
            <FormAutores />
            <FormLibros />
            <p className="text-sm text-white/70 p-2">Autores</p>
            {autores.map(autor => (
              <CardSide key={autor.id} name={autor.name} href={`/autores/${autor.id}`} Icon={CircleUserRound} />
            ))}

            <p className="text-sm text-white/70 p-2">Libros</p>

            {libros.map(libro => (
              <CardSide key={libro.id} name={libro.titulo} href={`/libros/${libro.id}/${libro.titulo}`} Icon={BookMarked} />
            ))}

          </nav>
        </div>
        <div className="px-24 bg-black/90 text-white overflow-y-auto" >

          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/autores/:id" element={<Autor />} />
            <Route path="/libros" element={<Libros />} />
            <Route path="/libros/:id/:titulo" element={<Libro />} />
          </Routes>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Router>
  )
}

export default App
