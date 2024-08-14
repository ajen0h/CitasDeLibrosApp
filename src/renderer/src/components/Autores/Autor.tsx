import { useLibrosStore } from "@/store/libros"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAutoresStore } from "@/store/autores"
import { useCitasStore } from "@/store/citas"
import toast from "react-hot-toast"
import { AlertDelete } from "../alert-delete"

export default function Autor() {
    const { id } = useParams()
    const libros = useLibrosStore((state) => state.libros)
    const initLibros = useLibrosStore((state) => state.initLibros)
    const autores = useAutoresStore((state) => state.autores)
    const initAutores = useAutoresStore((state) => state.initAutores)
    const citas = useCitasStore((state) => state.citas)
    const initCitas = useCitasStore((state) => state.initCitas)

    const allLibros = libros.filter(libro => libro.autorId === id)

    const navigate = useNavigate()

    const handleDelete = () => {

        //Eliminar autor pasado
        const deleteAutor = autores.filter(autor => autor.id !== id)
        initAutores(deleteAutor)

        //Eliminar libro por autor
        const librosWithoutAutor = libros.filter(libro => libro.autorId !== id)
        initLibros(librosWithoutAutor)

        //Eliminar autor pasado
        const deleteAutorCita = citas.filter(cita => cita.autorId !== id)
        initCitas(deleteAutorCita)

        //Recoger el estado actual
        const citasActualizados = useCitasStore.getState().citas
        const autoresActualizados = useAutoresStore.getState().autores
        const librosActualizados = useLibrosStore.getState().libros

        //Guardar el estado
        localStorage.setItem("citas", JSON.stringify(citasActualizados))
        localStorage.setItem("autores", JSON.stringify(autoresActualizados))
        localStorage.setItem("libros", JSON.stringify(librosActualizados))


        toast.success("Autor borrado")

        navigate("/")

    }

    return (
        <div>Autor
            <AlertDelete title="¿Quieres borrar este Autor?" description="Al borrar un autor también borraras todos sus libros y citas" name="Borrar autor" handleDelete={handleDelete}/>
                {allLibros.length > 0 ? (<>
                    {allLibros.reverse().map(libro => (
                        <Link key={libro.id} to={`/libros/${libro.id}/${libro.titulo}`}>
                            <article >
                                <h1>{libro.titulo}</h1>
                            </article>
                        </Link>
                    ))}
                </>) : (<p>Todavía no hay libros</p>)}

        </div>
    )
}
