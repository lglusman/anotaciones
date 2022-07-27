import type { Anotacion } from 'src/entities/Anotacion'
import { writable } from 'svelte/store'

const createAnotaciones = () => {
  // Cada anotacion es del tipo id = 'asdfasdadf', data:  { fecha: "2022-07-08", fechacreacion: 1658688245963, estado: "pendiente", categoria: "asdf", descripcion: "Prueba" }
  const { subscribe, set, update } = writable<Anotacion[]>([]);

  return {
    subscribe,
    agregarAnotacion: (anotacion: Anotacion) => {
      update((anotaciones) => [...anotaciones, anotacion])
    },
    modificaranotacion: (anotacion: Anotacion) => {
      update((anotaciones) => {
        const index = anotaciones.findIndex((a) => a.id === anotacion.id);
        if (index === -1) {
          return anotaciones;
        }
        return [...anotaciones.slice(0, index), anotacion, ...anotaciones.slice(index + 1)];
      }
      )
      // update(anotaciones => anotaciones.map(element => element.id == anotacion.id ? anotacion : element))
      // update((anotaciones) => [...anotaciones])
    },
    setear: (anotaciones: Anotacion[]) => {
      set(anotaciones)
    },
    del: (id: string) => {
      update(anotaciones => anotaciones.filter(element => element.id != id))
    }
  }
}

export const storeanotaciones = createAnotaciones()
