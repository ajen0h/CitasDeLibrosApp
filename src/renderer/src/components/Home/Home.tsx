import { FormCitas } from "@/components/form-citas";
import { useCitasStore } from "@/store/citas";
import { useLibrosStore } from "@/store/libros";
import { useAutoresStore } from "@/store/autores";
import { BookOpen, UserRoundPen } from "lucide-react";

export default function Home() {

    const citas = useCitasStore((state) => state.citas)
    const libros = useLibrosStore((state) => state.libros)
    const autores = useAutoresStore((state) => state.autores)

    const autoresMap = new Map(autores.map(autor => [autor.id, autor]));
    const librosMap = new Map(libros.map(libro => [libro.id, libro]));

    return (
        <div>
            <h1 className="text-4xl font-bold">Citas</h1>
            <FormCitas />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


                {citas.map(cita => {
                    // Obtener los datos del libro y del autor asociados a cada cita
                    const libro = librosMap.get(cita.libroId);
                    const autor = libro ? autoresMap.get(libro.autorId) : null;
                    return (
                        <div key={cita.id} className="shadow-xl p-4 flex flex-col justify-between gap-5 bg-slate-100">
                            <p className="font-bold text-xl">{cita.cita}</p>
                            <div className=" flex justify-between items-center">
                                <div>
                                    <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><BookOpen className="size-4" /> {libro ? libro.titulo : 'No disponible'}</p>
                                    <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><UserRoundPen className="size-4" /> {autor ? autor.name : 'No disponible'}</p>
                                </div>
                                <p className="italic opacity-85 text-sm">Página {cita ? cita.pagina : 'No disponible'}</p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    )
}
