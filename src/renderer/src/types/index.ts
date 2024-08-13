export interface Autor {
    id: string
    name: string
}
export interface Libro {
    id: string
    titulo: string
    autorId: string
}
export interface Citas {
    id: string
    cita: string
    pagina: string
    libroId: string
    autorId: string
}