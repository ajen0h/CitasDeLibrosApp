import { Libro } from "@/types";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface CardSideProps {
    Icon: LucideIcon;
    libro: Libro
}

export function CardLibros({ Icon, libro }: CardSideProps) {
    const location = useLocation()
    const maniPath = location.pathname.split("/")[1]
    const idPath = location.pathname.split("/")[2]
    const newPath=`/${maniPath}/${idPath}`

    return (
        <Link to={`/libros/${libro.id}/${libro.titulo}`}>
            <section className={`${newPath === `/libros/${libro.id}` ? 'text-black bg-white' : ''}  rounded-md p-2 hover:bg-white hover:text-black cursor-pointer transition-all`}>
                <div className="flex flex-row text-sm font-bold gap-2 items-center">
                    <Icon className="size-5" />
                    <p className="truncate w-full">{libro.titulo}</p>
                </div>
            </section>
        </Link>
    );
}
