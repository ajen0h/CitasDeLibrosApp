import { useLibrosStore } from "@/store/libros"
import { Link, useParams } from "react-router-dom"

export default function Autor() {
    const { id } = useParams()
    const libros = useLibrosStore((state) => state.libros)

    const allLibros = libros.filter(libro => libro.autorId === id)

    return (
        <div>Autor
            {allLibros.length > 0 ? (<>
                {allLibros.map(libro => (
                    <Link key={libro.id} to={`/libros/${libro.id}/${libro.titulo}`}>
                    <article >
                        <h1>{libro.titulo}</h1>
                    </article>
                    </Link>
                ))}
            </>) : (<p>Todavía no hay libros</p>)}

        </div>
    )
}
