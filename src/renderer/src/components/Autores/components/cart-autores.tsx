import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CardSideProps {
    Icon: LucideIcon;
    name: string;
    href: string;
}

export function CardSide({ Icon, name, href }: CardSideProps) {
    return (
        <Link to={`${href}`}>
            <section className="text-white rounded-md p-2 hover:bg-slate-800 cursor-pointer transition-all">
                <div className="flex flex-row text-sm font-bold gap-2 items-center">
                    <Icon className="size-5" />
                    <p className="truncate w-full">{name}</p>
                </div>
            </section>
        </Link>
    );
}
