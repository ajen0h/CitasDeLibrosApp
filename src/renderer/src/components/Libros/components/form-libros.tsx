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
import { libroSchema } from "@/schema"
import { useAutoresStore } from "@/store/autores"
import { useLibrosStore } from "@/store/libros"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function FormLibros() {


    const setLibros = useLibrosStore((state) => state.setLibros)
    const autores = useAutoresStore((state) => state.autores)

    // 1. Define your form.
    const form = useForm<z.infer<typeof libroSchema>>({
        resolver: zodResolver(libroSchema),
        defaultValues: {
            titulo: "",
            autorId: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof libroSchema>) {
        const libro = {
            id: crypto.randomUUID(),
            titulo: values.titulo,
            autorId: values.autorId
        }
        setLibros(libro)

        //recuperar el estado actualizado
        const librosActualizados = useLibrosStore.getState().libros

        localStorage.setItem("libros", JSON.stringify(librosActualizados))
        form.reset()

    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
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
                            name="titulo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder='Nombre del autor' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="autorId"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona Un Autor" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {autores.map(autor => (
                                                <SelectItem key={autor.id} value={autor.id}>{autor.name}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-2'>
                            <Button >Añadir Libro</Button>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                    </form>
                </Form>

            </AlertDialogContent>
        </AlertDialog>
    )
}
