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
      update((categoria) => {
				const index = categoria.findIndex((a) => a.id === id);
				if (index === -1) {
					return categoria;
				}
				return [...categoria.slice(0, index), ...categoria.slice(index + 1)];
			});
    }
  }
}

export const storecategorias = createCategorias()
