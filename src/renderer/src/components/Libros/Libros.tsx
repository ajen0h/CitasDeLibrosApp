import { useLibrosStore } from "@/store/libros";
import { FormLibros } from "./components/form-libros";
import { useAutoresStore } from "@/store/autores";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Libros() {

  const libros = useLibrosStore((state) => state.libros)
  const autores = useAutoresStore((state) => state.autores)

  // Crear un mapa para los autores por ID para acceso rápido
  const autoresMap = new Map(autores.map(autor => [autor.id, autor]));

  return (
    <div>Libros

      <FormLibros />
      {libros.reverse().map(libro => {
        const autor = autoresMap.get(libro.autorId);
        return autor ? (
          <Link key={libro.id} to={`/libros/${libro.id}/${libro.titulo}`}>
            <div className="mt-5 text-black rounded-lg shadow-xl p-4 flex flex-col justify-between gap-2 bg-slate-100">
              <p className="font-bold text-xl overflow-y-auto h-[125px] text-start">{libro.titulo}</p>
              <div className=" flex justify-between items-center">
                <div>
                  <p className="italic opacity-85 text-sm flex flex-row gap-2 items-center"><BookOpen className="size-4" /> {libro ? libro.titulo : 'No disponible'}</p>
                </div>
              </div>
            </div>
          </Link>
        ) : null;
      })}
    </div>
  )
}

