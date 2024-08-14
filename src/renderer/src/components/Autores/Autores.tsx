
import { FormAutores } from "@/components/Autores/components/form-autores";

import { useAutoresStore } from "@/store/autores";
import { UserRoundPen } from "lucide-react";
import { Link } from "react-router-dom";


export default function Autores() {

    const autores = useAutoresStore((state) => state.autores)

    return (
        <main>
            <FormAutores />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {autores.map(autor => (
                    <Link to={`/autores/${autor.id}`}>
                        <div key={autor.id} className="shadow-xl p-4 flex flex-col justify-between gap-5 bg-slate-100 cursor-pointer hover:bg-slate-300 transition-all">
                            <p className=" text-xl flex flex-row gap-2 items-center"><UserRoundPen className="size-4" /> {autor ? autor.name : 'No disponible'}</p>
                            <div className=" flex justify-between items-center">
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    )
}
