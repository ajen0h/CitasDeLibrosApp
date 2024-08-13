import { Libro } from '@/types'
import { create } from 'zustand'

interface Store {
    libros: Libro[]
    setLibros: (values: Libro) => void
    initLibros: (values: Libro[]) => void
}

export const useLibrosStore = create<Store>((set, get) => ({
    libros: [],
    initLibros: (values: Libro[]) => set({ libros: values }),
    setLibros: (value: Libro) => set((state) => ({ libros: [...state.libros, value] }))

}))