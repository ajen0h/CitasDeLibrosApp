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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { citasForm } from "@/schema"
import { useLibrosStore } from "@/store/libros"
import { useAutoresStore } from "@/store/autores"
import { useState } from "react"
import { useCitasStore } from "@/store/citas"
import { PenLine } from "lucide-react"
import toast from "react-hot-toast"


export function FormCitas() {

  const libros = useLibrosStore((state) => state.libros)
  const autores = useAutoresStore((state) => state.autores)

  const setCitas = useCitasStore((state) => state.setCitas)


  const [autorId, setAutorId] = useState("")

  // 1. Define your form.
  const form = useForm<z.infer<typeof citasForm>>({
    resolver: zodResolver(citasForm),
    defaultValues: {
      cita: "",
      pagina: "",
      libroId: "",
      autorId: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof citasForm>) {

    const cita = {
      id: crypto.randomUUID(),
      cita: values.cita,
      pagina: values.pagina,
      libroId: values.libroId,
      autorId
    }
    setCitas(cita)

    //recuperar el estado actualizado
    const citasActualizados = useCitasStore.getState().citas

    localStorage.setItem("citas", JSON.stringify(citasActualizados))

    toast.success("La cita ha sido creada ")

    form.setValue("cita", "")
    form.setValue("pagina", "")

  }
  const handleSelectChange = (field: any) => {
    setAutorId(field)

  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="">
        <Button variant="ghost" className="items-start justify-start p-2">
          <div className="flex flex-row gap-2 items-center font-bold">
            <PenLine className="size-4" />Añade una cita
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='overflow-y-auto h-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
            <div>
              <FormField
                control={form.control}
                name="cita"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea className='h-[190px] resize-none' placeholder="Añade una cita" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className=' grid grid-cols-[100px_1fr_1fr] gap-3'>

              <FormField
                control={form.control}
                name="pagina"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder='Nº página' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autorId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={handleSelectChange} defaultValue={field.value} >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona Un Autor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {autores.length > 0 ? (<>
                          {autores.map(autor => (
                            <SelectItem key={autor.id} value={autor.id}>{autor.name}</SelectItem>
                          ))}
                        </>) : (<>
                          <p className="text-center text-sm p-2">No hay autores todavía</p>
                        </>)}

                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="libroId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona Un Libro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        {libros.length > 0 ? (<>
                          {libros.map(libro => (
                            <>
                              {libro.autorId === autorId ? (<SelectItem key={libro.id} value={libro.id}>{libro.titulo}</SelectItem>
                              ) : null}
                            </>
                          ))}
                        </>) : (<>
                          {autorId !== "" ? (<>
                            <p className="text-center text-sm p-2">Este autor no tiene libros</p>
                          </>) : (<>
                            <p className="text-center text-sm p-2">Seleccione un autor</p>
                          </>)}

                        </>)}


                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
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
