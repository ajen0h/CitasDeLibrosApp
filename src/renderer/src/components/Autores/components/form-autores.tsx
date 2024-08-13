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


export function FormAutores() {


    const setAutores = useAutoresStore((state) => state.setAutores)

    // 1. Define your form.
    const form = useForm<z.infer<typeof AutorSchema>>({
        resolver: zodResolver(AutorSchema),
        defaultValues: {
            name: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof AutorSchema>) {
        const autor = {
            id: crypto.randomUUID(),
            name: values.name
        }
        setAutores(autor)

        //recuperar el estado actualizado
        const autoresActualizados = useAutoresStore.getState().autores

        localStorage.setItem("autores", JSON.stringify(autoresActualizados))
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
                            <Button >Añadir Nota</Button>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                    </form>
                </Form>

            </AlertDialogContent>
        </AlertDialog>
    )
}
