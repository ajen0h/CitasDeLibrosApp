import { useCitasStore } from "@/store/citas"
import {  useParams } from "react-router-dom"

export default function Libro() {
    const params = useParams()
    console.log(params)

    const citas = useCitasStore((state) => state.citas)

    const allCitas = citas.filter(cita => cita.libroId === params.id)
    console.log(allCitas)
    return (
        <div>
            <p className="font-bold text-2xl">
                Citas del libro {params.titulo}
            </p>

            {allCitas.length > 0 ? (<>
                {allCitas.map(cita => (
                    <div key={cita.id}>
                        <p>{cita.cita}</p>
                    </div>
                ))}
            </>) : (<p>Este libro todavía no tiene ninguna cita!</p>)}

        </div>
    )
}
