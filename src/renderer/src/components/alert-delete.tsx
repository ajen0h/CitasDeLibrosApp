import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface AlertDeleteProps {
    name: string
    title: string
    description?: string
    handleDelete: (id?: string) => void
}

export function AlertDelete({ name, title, description, handleDelete }: AlertDeleteProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>

                <Button variant={"default"} className=" bg-white text-black hover:bg-orange-400 hover:text-white transition-all">
                    <div className="flex flex-row items-center gap-2" >
                        <Trash className="size-4"/>
                        {name}
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <p className="text-center font-bold text-xl">{title}</p>
                    <p className="text-center">
                        {description}
                    </p>
                </AlertDialogHeader>
                <div className="grid grid-cols-2 gap-3">
                    <AlertDialogAction onClick={() => handleDelete()} className="bg-red-500 hover:bg-red-700">Borar</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
