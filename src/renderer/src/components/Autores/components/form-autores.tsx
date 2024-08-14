import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AutorSchema } from "@/schema"
import { useAutoresStore } from "@/store/autores"
import toast from "react-hot-toast"
import { UserRoundPen } from "lucide-react"


export function FormAutores() {


    const setAutores = useAutoresStore((state) => state.setAutores)
    const autores = useAutoresStore((state) => state.autores)

    // 1. Define your form.
    const form = useForm<z.infer<typeof AutorSchema>>({
        resolver: zodResolver(AutorSchema),
        defaultValues: {
            name: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof AutorSchema>) {

        const autorExists = autores.find(autor => autor.name === values.name)

        if (autorExists) {
            form.setError("name", {
                message: "Este autor ya existe!"
            })
            return
        }


        const autor = {
            id: crypto.randomUUID(),
            name: values.name
        }
        setAutores(autor)

        //recuperar el estado actualizado
        const autoresActualizados = useAutoresStore.getState().autores

        localStorage.setItem("autores", JSON.stringify(autoresActualizados))

        toast.success('El autor ha sido creado')
        form.setValue("name", "")
    }


    return (
        <AlertDialog >
            <AlertDialogTrigger asChild className="w-full">
                <Button variant="ghost" className="items-start justify-start p-2">
                    <div className="flex flex-row gap-2 items-center font-bold">
                        <UserRoundPen className="size-4" />
                        Añadir un autor
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='overflow-y-auto'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder='Nombre del autor' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-2'>
                            <Button >Añadir Autores</Button>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                    </form>
                </Form>

            </AlertDialogContent>
        </AlertDialog>
    )
}
