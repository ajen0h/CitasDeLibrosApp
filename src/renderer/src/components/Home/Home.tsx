import { useCitasStore } from "@/store/citas";
import { useLibrosStore } from "@/store/libros";
import { useAutoresStore } from "@/store/autores";
import { BookOpen, SquareLibrary, UserRoundPen } from "lucide-react";
import toast from "react-hot-toast";
import { AlertDelete } from "../alert-delete";
import { Separator } from "../ui/separator";

export default function Home() {

    const citas = useCitasStore((state) => state.citas)
    const initCitas = useCitasStore((state) => state.initCitas)
    const libros = useLibrosStore((state) => state.libros)
    const autores = useAutoresStore((state) => state.autores)

    const autoresMap = new Map(autores.map(autor => [autor.id, autor]));
    const librosMap = new Map(libros.map(libro => [libro.id, libro]));

    const handleDeleteCita = (id: string) => {
        //Eliminar autor pasado
        const deleteCita = citas.filter(cita => cita.id !== id)
        initCitas(deleteCita)
        //Recoger el estado actual
        const citasActualizados = useCitasStore.getState().citas
        //Guardar el estado
        localStorage.setItem("citas", JSON.stringify(citasActualizados))
        toast.success("Cita borrada")
    }

    return (
        <div>
            <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between gap-5 ">
                <div className="flex flex-row items-center gap-5">
                    <SquareLibrary className="size-10 p-2 rounded-full text-black bg-white" />
                    <h1 className="text-3xl lg:text-4xl font-bold">Todas las citas</h1>
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">

                {citas.length > 0 ? (<>
                    {citas.reverse().map(cita => {
                        // Obtener los datos del libro y del autor asociados a cada cita
                        const libro = librosMap.get(cita.libroId);
                        const autor = libro ? autoresMap.get(libro.autorId) : null;
                        return (
                            <div key={cita.id} className="mt-5 text-black rounded-lg shadow-xl p-4 flex flex-col justify-between gap-2 bg-slate-100">
                                <p className="font-bold text-xl overflow-y-auto h-[125px] text-start">{cita.cita}</p>
                                <div className=" flex justify-between items-center">
                                    <div>
                                        <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><BookOpen className="size-4" /> {libro ? libro.titulo : 'No disponible'}</p>
                                        <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><UserRoundPen className="size-4" /> {autor ? autor.name : 'No disponible'}</p>
                                    </div>
                                    <p className="italic opacity-85 text-sm">Página {cita ? cita.pagina : 'No disponible'}</p>
                                </div>



                                <AlertDelete title="¿Quieres borrar esta cita?" description="" name="Borrar cita" handleDelete={() => handleDeleteCita(cita.id)} />

                            </div>
                        );
                    })}
                </>) : (<><p className="mt-5">No hay citas ninguna todavía 😢</p></>)}


            </section>
        </div>
    )
}
