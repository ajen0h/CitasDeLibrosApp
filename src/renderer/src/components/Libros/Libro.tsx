import { useAutoresStore } from "@/store/autores"
import { useCitasStore } from "@/store/citas"
import { useLibrosStore } from "@/store/libros"
import { BookOpen, UserRoundPen } from "lucide-react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { AlertDelete } from "../alert-delete"

export default function Libro() {
    const params = useParams()

    const citas = useCitasStore((state) => state.citas)
    const libros = useLibrosStore((state) => state.libros)
    const autores = useAutoresStore((state) => state.autores)
    const initLibros = useLibrosStore((state) => state.initLibros)
    const initCitas = useCitasStore((state) => state.initCitas)


    const autoresMap = new Map(autores.map(autor => [autor.id, autor]));
    const librosMap = new Map(libros.map(libro => [libro.id, libro]));

    const allCitas = citas.filter(cita => cita.libroId === params.id)

    const handleDeleteLibro = () => {


        //Eliminar libro por autor
        const deleteLibro = libros.filter(libro => libro.id !== params.id)
        initLibros(deleteLibro)

        //Eliminar autor pasado
        const deleteLibroCita = citas.filter(cita => cita.libroId !== params.id)
        initCitas(deleteLibroCita)

        //Recoger el estado actual
        const citasActualizados = useCitasStore.getState().citas
        const librosActualizados = useLibrosStore.getState().libros

        //Guardar el estado
        localStorage.setItem("citas", JSON.stringify(citasActualizados))
        localStorage.setItem("libros", JSON.stringify(librosActualizados))

        toast.success("Libro borrada")

    }

    const handleDeleteCita = (id: string) => {



        //Eliminar autor pasado
        const deleteCita = citas.filter(cita => cita.id !== id)
        initCitas(deleteCita)

        //Recoger el estado actual
        const citasActualizados = useCitasStore.getState().citas

        //Guardar el estado
        localStorage.setItem("citas", JSON.stringify(citasActualizados))


        toast.success("Cita borrado")


    }



    return (
        <div>
            <p className="font-bold text-2xl">
                Citas del libro {params.titulo}
            </p>

            <AlertDelete name="Borrar Libro" title="¿Estas a punto de borrar este libro?" description="Al borrar el libro también se borrarán todas sus citas" handleDelete={handleDeleteLibro} />


            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

                {allCitas.length > 0 ? (<>
                    {allCitas.map(cita => {
                        const libro = librosMap.get(cita.libroId);
                        const autor = libro ? autoresMap.get(libro.autorId) : null;
                        return (
                            <>
                                <div key={cita.id} className="text-black rounded-xl shadow-xl p-4 flex flex-col justify-between gap-5 bg-slate-100">
                                    <p className="font-bold text-xl overflow-y-auto h-[135px] text-start">{cita.cita}</p>
                                    <div className=" flex justify-between items-center">
                                        <div>
                                            <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><BookOpen className="size-4" /> {libro ? libro.titulo : 'No disponible'}</p>
                                            <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><UserRoundPen className="size-4" /> {autor ? autor.name : 'No disponible'}</p>
                                        </div>
                                        <p className="italic opacity-85 text-sm">Página {cita ? cita.pagina : 'No disponible'}</p>
                                    </div>
                                    <AlertDelete title="¿Quieres borrar esta cita?" description="" name="Borrar cita" handleDelete={() => handleDeleteCita(cita.id)} />

                                </div>
                            </>
                        )
                    })}


                </>) : (<p>Este libro todavía no tiene ninguna cita!</p>)}

            </section>
        </div>


    )
}
