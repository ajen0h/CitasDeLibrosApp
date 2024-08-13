import { useLibrosStore } from "@/store/libros";
import { FormLibros } from "./components/form-libros";
import { useAutoresStore } from "@/store/autores";
import { Link } from "react-router-dom";

export default function Libros() {

  const libros = useLibrosStore((state) => state.libros)
  const autores = useAutoresStore((state) => state.autores)

  // Crear un mapa para los autores por ID para acceso rápido
  const autoresMap = new Map(autores.map(autor => [autor.id, autor]));

  return (
    <div>Libros
      <FormLibros />
      {libros.map(libro => {
        const autor = autoresMap.get(libro.autorId);
        return autor ? (
          <Link key={libro.id} to={`/libros/${libro.id}/${libro.titulo}`}>
            <div >
              <h1>{libro.titulo}</h1>
              <p>Autor: {autor.name}</p>
            </div>
          </Link>
        ) : null;
      })}
    </div>
  )
}

