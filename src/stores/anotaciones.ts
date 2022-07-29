import type { Anotacion } from '../entities/Anotacion';
import type { FiltroEstado } from '../entities/types';
import { derived, writable } from 'svelte/store';

const createAnotaciones = () => {
	// Cada anotacion es del tipo id = 'asdfasdadf', data:  { fecha: "2022-07-08", fechacreacion: 1658688245963, estado: "pendiente", categoria: "asdf", descripcion: "Prueba" }
	const storeanotaciones = writable<Anotacion[]>([]);
	const { subscribe } = storeanotaciones;

	const filtros = writable<{ categoria: string; estado: FiltroEstado }>({
		categoria: 'aaa',
		estado: 'pendientes'
	});

	const listafiltrada = derived([storeanotaciones, filtros], ($values, set) => {
		let lista = [...$values[0]];
		lista = lista.filter((a) => a.categoria === $values[1].categoria);
		if ($values[1].estado === 'proximos') {
			lista = lista.filter(
				(a) => !a.fecharealizado && a.fechaprevisto && a.fechaprevisto.toString() > new Date().toISOString().slice(0, 10)
			);
		}
		if ($values[1].estado === 'vencidos') {
			lista = lista.filter(
				(a) => !a.fecharealizado && a.fechaprevisto && a.fechaprevisto.toString() < new Date().toISOString().slice(0, 10)
			);
		}
		if ($values[1].estado === 'pendientes') {
			lista = lista.filter((a) => !a.fecharealizado);
		}
		set(lista);
	});

	return {
		subscribe,
		agregarAnotacion: (anotacion: Anotacion) => {
			storeanotaciones.update((anotaciones) => [...anotaciones, anotacion]);
		},
		modificaranotacion: (anotacion: Anotacion) => {
			storeanotaciones.update((anotaciones) => {
				const index = anotaciones.findIndex((a) => a.id === anotacion.id);
				if (index === -1) {
					return anotaciones;
				}
				return [...anotaciones.slice(0, index), anotacion, ...anotaciones.slice(index + 1)];
			});
		},
		setear: (anotaciones: Anotacion[]) => {
			storeanotaciones.set(anotaciones);
		},
		del: (id: string) => {
			storeanotaciones.update((anotaciones) => anotaciones.filter((element) => element.id != id));
		},
		setFiltro: (filtro:FiltroEstado) => {
			filtros.update((filtros) => ({ ...filtros, estado: filtro })); // toggle pendientes
		},
		setcategoria: (categoria: string) => {
			filtros.update((filtros) => ({ ...filtros, categoria }));
		},
		lista: listafiltrada
	};
};

export const storeanotaciones = createAnotaciones();
