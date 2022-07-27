import type { Categoria } from 'src/entities/Categoria'
import { writable } from 'svelte/store'

const createCategorias = () => {
  // Cada categoria es del tipo id = 'asdfasdadf', data:  { fecha: "2022-07-08", fechacreacion: 1658688245963, estado: "pendiente", categoria: "asdf", descripcion: "Prueba" }
  const { subscribe, set, update } = writable<Categoria[]>([]);

  return {
    subscribe,
    agregarCategoria: (categoria: Categoria) => {
      update((categorias) => [...categorias, categoria])
    },
    actualizarCategoria: (categoria: Categoria) => {
      update(categorias => categorias.map(element => element.id == categoria.id ? categoria : element))
    },
    setear: (categorias: Categoria[]) => {
      set(categorias)
    },
    del: (id: string) => {
      update(categorias => categorias.filter(element => element.id != id))
    }
  }
}

export const storecategorias = createCategorias()
