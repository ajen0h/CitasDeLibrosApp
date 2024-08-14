import { useAutoresStore } from "@/store/autores"
import { useCitasStore } from "@/store/citas"
import { useLibrosStore } from "@/store/libros"
import { BookOpen, UserRoundPen } from "lucide-react"
import { useParams } from "react-router-dom"

export default function Libro() {
    const params = useParams()
    console.log(params)

    const citas = useCitasStore((state) => state.citas)
    const libros = useLibrosStore((state) => state.libros)
    const autores = useAutoresStore((state) => state.autores)

    const autoresMap = new Map(autores.map(autor => [autor.id, autor]));
    const librosMap = new Map(libros.map(libro => [libro.id, libro]));

    const allCitas = citas.filter(cita => cita.libroId === params.id)
    console.log(allCitas)
    return (
        <div>
            <p className="font-bold text-2xl">
                Citas del libro {params.titulo}
            </p>

            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

                {allCitas.length > 0 ? (<>
                    {allCitas.map(cita => {
                        const libro = librosMap.get(cita.libroId);
                        const autor = libro ? autoresMap.get(libro.autorId) : null;
                        return (
                            <div key={cita.id} className=" text-black rounded-xl shadow-xl p-4 flex flex-col justify-between gap-5 bg-slate-100">
                                <p className="font-bold text-xl overflow-y-auto h-[135px] text-start">{cita.cita}</p>
                                <div className=" flex justify-between items-center">
                                    <div>
                                        <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><BookOpen className="size-4" /> {libro ? libro.titulo : 'No disponible'}</p>
                                        <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><UserRoundPen className="size-4" /> {autor ? autor.name : 'No disponible'}</p>
                                    </div>
                                    <p className="italic opacity-85 text-sm">Página {cita ? cita.pagina : 'No disponible'}</p>
                                </div>
                            </div>
                        )
                    })}
                </>) : (<p>Este libro todavía no tiene ninguna cita!</p>)}

            </section>
        </div>


    )
}
/* <div key={cita.id} className="shadow-xl p-4 flex flex-col justify-between gap-5 bg-slate-100">
                            <p className="font-bold text-xl">{cita.cita}</p>
                            <div className=" flex justify-between items-center">
                                <div>
                                    <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><BookOpen className="size-4" /> {libro ? libro.titulo : 'No disponible'}</p>
                                    <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><UserRoundPen className="size-4" /> {autor ? autor.name : 'No disponible'}</p>
                                </div>
                                <p className="italic opacity-85 text-sm">Página {cita ? cita.pagina : 'No disponible'}</p>
                            </div>
                        </div> */