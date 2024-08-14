import { useLibrosStore } from "@/store/libros"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAutoresStore } from "@/store/autores"
import { useCitasStore } from "@/store/citas"
import toast from "react-hot-toast"
import { AlertDelete } from "../alert-delete"
import { BookText, CircleUserRound } from "lucide-react"

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
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 ">
                <div className="grid grid-cols-[60px_1fr] items-center">
                    <CircleUserRound className=" size-10 p-2 rounded-full text-black bg-white" />
                    <h1 className="text-3xl font-bold">Libros de {autor?.name}</h1>
                </div>
                <AlertDelete title="¿Quieres borrar este Autor?" description="Al borrar un autor también borraras todos sus libros y citas" name="Borrar autor" handleDelete={handleDelete} />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

            {allLibros.length > 0 ? (<>
                {allLibros.reverse().map(libro => (
                    <Link key={libro.id} to={`/libros/${libro.id}/${libro.titulo}`} >
                        <div className="font-bold mt-5 text-black rounded-lg shadow-xl p-4 grid grid-cols-[50px_1fr] items-center bg-slate-100">
                            <BookText className="size-8" />
                            <p className="text-xl font-bold">{libro.titulo}</p>
                        </div>
                    </Link>
                ))}
            </>) : (<p className="mt-5">El autor no tiene ninguna libro todavía 📚</p>)}
                </div>

        </div>
    )
}
