import z from 'zod'

export const citasForm = z.object({
    cita: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    pagina: z.string().refine((val) => /^\d+$/.test(val), {
        message: "El campo solo puede contener números",
    }),
    libroId: z.string(),
    autorId: z.string()
})
export const libroSchema = z.object({
    titulo: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    autorId: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    })
})
export const AutorSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

})