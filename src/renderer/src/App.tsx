import { Routes, Route, Link } from "react-router-dom"
import Home from "./components/Home/Home"
import Autores from "./components/Autores/Autores"
import { useEffect } from "react"
import { useAutoresStore } from "./store/autores"
import Libros from "./components/Libros/Libros"
import { useLibrosStore } from "./store/libros"
import { useCitasStore } from "./store/citas"
import Autor from "./components/Autores/Autor"
import Libro from "./components/Libros/Libro"

function App() {
  const initAutores = useAutoresStore((state) => state.initAutores)
  const initLibros = useLibrosStore((state) => state.initLibros)
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
    <div className="p-8">
      <nav>
        <Link to="/">Citas</Link>
        <Link to="/autores">Autores</Link>
        <Link to="/libros">Libros</Link>
      </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/autores/:id" element={<Autor />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/libros/:id/:titulo" element={<Libro />} />
        </Routes>
    </div>
  )
}

export default App
