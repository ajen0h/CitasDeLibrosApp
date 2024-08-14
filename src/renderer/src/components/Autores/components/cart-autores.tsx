import { Autor } from "@/types";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface CardSideProps {
    Icon: LucideIcon;
    autor: Autor
}

export function CardAutores({ Icon, autor }: CardSideProps) {
    const location = useLocation()

    return (

        <Link to={`/autores/${autor.id}`}>
            <section className={`${location.pathname===`/autores/${autor.id}` ? 'text-black bg-white': ''}  rounded-md p-2 hover:bg-white hover:text-black cursor-pointer transition-all`}>
                <div className="flex flex-row text-sm font-bold gap-2 items-center">
                    <Icon className="size-5" />
                    <p className="truncate w-full">{autor.name}</p>
                </div>
            </section>
        </Link>
    );
}
