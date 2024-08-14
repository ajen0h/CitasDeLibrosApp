import { useLibrosStore } from "@/store/libros"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAutoresStore } from "@/store/autores"
import { useCitasStore } from "@/store/citas"
import toast from "react-hot-toast"
import { AlertDelete } from "../alert-delete"
import { CircleUserRound } from "lucide-react"

export default function Autor() {
    const { id } = useParams()
    const libros = useLibrosStore((state) => state.libros)
    const initLibros = useLibrosStore((state) => state.initLibros)
    const autores = useAutoresStore((state) => state.autores)
    const initAutores = useAutoresStore((state) => state.initAutores)
    const citas = useCitasStore((state) => state.citas)
    const initCitas = useCitasStore((state) => state.initCitas)

    const allLibros = libros.filter(libro => libro.autorId === id)
    const autor = autores.find(autor => autor.id === id)

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
        <div>
            <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between gap-5 ">
                <div className="flex flex-row items-center gap-5"> 
                    <CircleUserRound className="size-10 p-2 rounded-full text-black bg-white" />
                    <h1 className="text-3xl lg:text-4xl font-bold">Libros de {autor?.name}</h1>
                </div>
                <AlertDelete title="¿Quieres borrar este Autor?" description="Al borrar un autor también borraras todos sus libros y citas" name="Borrar autor" handleDelete={handleDelete} />
            </div>
            {allLibros.length > 0 ? (<>
                {allLibros.reverse().map(libro => (
                    <Link key={libro.id} to={`/libros/${libro.id}/${libro.titulo}`} >
                        <article className="mt-5" >
                            <h1>{libro.titulo}</h1>
                        </article>
                    </Link>
                ))}
            </>) : (<p className="mt-5">El autor no tiene ninguna libro todavía 📚</p>)}

        </div>
    )
}
