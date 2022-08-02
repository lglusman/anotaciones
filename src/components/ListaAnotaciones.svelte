<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Anotacion } from '../entities/Anotacion';
	import CompAnotacion from './CompAnotacion.svelte';
	import { user } from '../stores/users';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { storecategorias } from '../stores/categorias';

	export let anotaciones: Anotacion[] = [];

	$: nrocategorias = [...new Map(anotaciones.map((x) => [x.categoria, x])).values()].length;
	$: console.log(nrocategorias);

	const dispatch = createEventDispatcher();

	function handlesaved() {
		dispatch('saved', null);
	}
	export let categoria: string = '';
	export let agregar = false;

	let newAnotacion: Anotacion = new Anotacion({
		id: '',
		fechacreacion: new Date(),
		descripcion: '',
		categoria: categoria,
		userid: $user?.uid || '',
		fechaprevisto: null,
		fecharealizado: null
	});

	$: {
		agregar = agregar;
		newAnotacion = new Anotacion({
			id: '',
			fechacreacion: new Date(),
			descripcion: '',
			categoria: categoria,
			userid: $user?.uid || '',
			fechaprevisto: null,
			fecharealizado: null
		});
	}

	const toDDMMYYYY = (date: string) => {
		let d = date.split('-');
		let dd = d[2];
		let mm = d[1];
		let yyyy = d[0];
		if (dd.length < 2) dd = '0' + dd;
		if (mm.length < 2) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
		// return date;
	};

	$: newAnotacion.categoria = categoria;

	const handleclickanotacion = (anot: Anotacion) => {
		goto(`/anotacion/${anot.id}`, { replaceState: true });
	};

	const NombreCategoria = (categoria: string) => {
		let cat = $storecategorias.find((x) => x.id == categoria);
		return cat?.categoria || categoria;
	};
</script>

{#if agregar}
	<CompAnotacion on:saved={handlesaved} alta={true} anotacion={newAnotacion} />
{/if}
{#if anotaciones}
	{#each anotaciones as anotacion, index (anotacion.id)}
		<div class="row" transition:slide={{ duration: 300, easing: quintOut }}>
			<div class="col-12 gy-2">
				<div class="card {index % 2 === 0 ? 'card1' : 'card2'} border-0 shadow">
					<div class="card-body">
						{#if nrocategorias > 1}
						<div class="">{NombreCategoria(anotacion.categoria)}</div>
						{/if}
						<h5 class="card-title">
							{anotacion.descripcion}
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a
								href="#"
								class="btn btn-sm btn-link link-dark"
								on:click={() => handleclickanotacion(anotacion)}><i class="bi bi-pencil" /></a
							>
						</h5>
						<hr />
						<div class="row">
							<div class="col-6 card-text fw-light">
								<i class="bi bi-calendar3" />
								{anotacion.fechaprevisto
									? toDDMMYYYY(anotacion.fechaprevisto.toString())
									: 'Sin Programar'}
							</div>
							<div class="col-6 card-text text-end fw-light">
								<i class="bi bi-calendar-check" />
								{anotacion.fecharealizado
									? toDDMMYYYY(anotacion.fecharealizado.toString())
									: 'Pendiente'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
{/if}

<style>
	.card1 {
		background-color: #ffebe5;
	}
	.card2 {
		background-color: #fdf1db;
	}
</style>
