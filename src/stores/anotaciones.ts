import type { Anotacion } from '../entities/Anotacion';
import type { FiltroEstado, Orden } from '../entities/types';
import { derived, writable } from 'svelte/store';

const createAnotaciones = () => {
	// Cada anotacion es del tipo id = 'asdfasdadf', data:  { fecha: "2022-07-08", fechacreacion: 1658688245963, estado: "pendiente", categoria: "asdf", descripcion: "Prueba" }
	const storeanotaciones = writable<Anotacion[]>([]);

	const { subscribe } = storeanotaciones;

	const filtros = writable<{
		categoria: string;
		estado: typeof FiltroEstado[number];
		orden: Orden;
	}>({
		categoria: 'aaa',
		estado: 'pendientes',
		orden: 'desc'
	});

	

	const listafiltrada = derived([storeanotaciones, filtros], ($values, set) => {
		let lista = [...$values[0]];
		lista = lista.filter((a) => a.categoria === $values[1].categoria);
		if ($values[1].estado === 'proximos') {
			lista = lista.filter(
				(a) =>
					!a.fecharealizado &&
					a.fechaprevisto &&
					a.fechaprevisto.toString() > new Date().toISOString().slice(0, 10)
			);
		}
		if ($values[1].estado === 'vencidos') {
			lista = lista.filter(
				(a) =>
					!a.fecharealizado &&
					a.fechaprevisto &&
					a.fechaprevisto.toString() < new Date().toISOString().slice(0, 10)
			);
		}
		if ($values[1].estado === 'pendientes') {
			lista = lista.filter((a) => !a.fecharealizado);
		}
		if ($values[1].orden === 'desc') {
			lista.sort((a, b) => {
				return (a.fechaprevisto || 'zzz') < (b.fechaprevisto || 'zzz') ? 1 : -1;
			});
		} else {
			lista.sort((a, b) => {
				return (a.fechaprevisto || '') > (b.fechaprevisto || '') ? 1 : -1;
			});
		}

		set(lista);
	});

	const listaFiltros = derived([storeanotaciones, filtros], ($values) => {
		const storeaFiltros: { estado: typeof FiltroEstado[number]; cantidad: number }[] = [];
		let lista = [...$values[0]] 
		lista = lista.filter((a) => a.categoria === $values[1].categoria);
		storeaFiltros[0] = {
			estado: 'todos',
			cantidad: [...lista].length
		};
		storeaFiltros[1] = {
			estado: 'proximos',
			cantidad: [...lista].filter(
				(a) =>
					!a.fecharealizado &&
					a.fechaprevisto &&
					a.fechaprevisto.toString() > new Date().toISOString().slice(0, 10)
			).length
		};
		storeaFiltros[2] = {
			estado: 'vencidos',
			cantidad: [...lista].filter(
				(a) =>
					!a.fecharealizado &&
					a.fechaprevisto &&
					a.fechaprevisto.toString() < new Date().toISOString().slice(0, 10)
			).length
		};
		storeaFiltros[3] = {
			estado: 'pendientes',
			cantidad: [...lista].filter((a) => !a.fecharealizado).length
		};
		storeaFiltros[4] = {
			estado: 'realizados',
			cantidad: [...lista].filter((a) => a.fecharealizado).length
		}
		
		return storeaFiltros
	});

	return {
		subscribe,
		agregarAnotacion: (anotacion:Anotacion) => {
			storeanotaciones.update((anotaciones) => [...anotaciones, anotacion]);
		},
		modificaranotacion: (anotacion:Anotacion) => {
			storeanotaciones.update((anotaciones) => {
				const index = anotaciones.findIndex((a) => a.id === anotacion.id);
				if (index === -1) {
					return anotaciones;
				}
				return [...anotaciones.slice(0, index), anotacion, ...anotaciones.slice(index + 1)];
			});
		},
		setear: (anotaciones:Anotacion[]) => {
			storeanotaciones.set(anotaciones);
		},
		del: (id: string) => {
			storeanotaciones.update((anotaciones) => {
				const index = anotaciones.findIndex((a) => a.id === id);
				if (index === -1) {
					return anotaciones;
				}
				return [...anotaciones.slice(0, index), ...anotaciones.slice(index + 1)];
			});
			//  storeanotaciones.update((anotaciones) => anotaciones.filter((element) => element.id != id));
		},
		setFiltro: (filtro: typeof FiltroEstado[number]) => {
			filtros.update((filtros) => ({ ...filtros, estado: filtro })); // estado: filtro
		},
		setOrden: (orden: Orden) => {
			filtros.update((filtros) => ({ ...filtros, orden: orden }));
		},
		setcategoria: (categoria: string) => {
			filtros.update((filtros) => ({ ...filtros, categoria }));
		},
		lista: listafiltrada,
		listafiltros: listaFiltros
	};
};

export const storeanotaciones = createAnotaciones();
