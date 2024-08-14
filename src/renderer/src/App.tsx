import { Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./components/Home/Home"
import Autores from "./components/Autores/Autores"
import { useEffect } from "react"
import { useAutoresStore } from "./store/autores"
import Libros from "./components/Libros/Libros"
import { useLibrosStore } from "./store/libros"
import { useCitasStore } from "./store/citas"
import Autor from "./components/Autores/Autor"
import Libro from "./components/Libros/Libro"
import { CardAutores } from "./components/Autores/components/cart-autores"
import { BookMarked, CircleUserRound, SquareLibrary } from "lucide-react"
import { FormCitas } from "./components/form-citas"
import { FormAutores } from "./components/Autores/components/form-autores"
import { FormLibros } from "./components/Libros/components/form-libros"
import { Toaster } from "react-hot-toast"
import { CardLibros } from "./components/Libros/components/cart-libros"
import { Separator } from "./components/ui/separator"

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

  const location = useLocation()

  return (
    <>
      <div className="h-screen grid grid-cols-[248px_1fr]">
        <div style={{ backgroundColor: "rgba(32, 32, 32)" }} className="overflow-y-auto p-2 border-r border-white/10 ">
          <nav className="flex flex-col gap-1 text-white ">
            <FormCitas />
            <FormAutores />
            <FormLibros />
            <Separator />
            <Link to={`/`}>
              <section className={`${location.pathname === "/" ? 'text-black bg-white' : ''}  rounded-md p-2 hover:bg-white hover:text-black cursor-pointer transition-all`}>
                <div className="flex flex-row text-sm font-bold gap-2 items-center">
                  <SquareLibrary className="size-5" />
                  <p className="truncate w-full">Todas las citas</p>
                </div>
              </section>
            </Link>

            <p className="text-sm text-white/70 p-2">Autores</p>
            {autores.length > 0 ? (<>
              {autores.map(autor => (
                <CardAutores key={autor.id} autor={autor} Icon={CircleUserRound} />
              ))}
            </>) : (<>
              <p className="text-[0.7rem] text-white/70 px-2">Todavía no hay autores</p>
            </>)}


            <p className="text-sm text-white/70 p-2">Libros</p>
            {libros.length > 0 ? (<>
              {libros.map(libro => (
                <CardLibros key={libro.id} libro={libro} Icon={BookMarked} />
              ))}
            </>) : (<>
              <p className="text-[0.7rem] text-white/70 px-2">Todavía no hay libros</p>
            </>)}


          </nav>
        </div>
        <div className="p-16 bg-black/90 text-white overflow-y-auto" >

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
    </>
  )
}

export default App
