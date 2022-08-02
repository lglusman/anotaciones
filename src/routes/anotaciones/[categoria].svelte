<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../stores/users';
	import { goto } from '$app/navigation';
	import ListaAnotaciones from '../../components/ListaAnotaciones.svelte';
	import { storeanotaciones } from '../../stores/anotaciones';
	import { page } from '$app/stores';
	import type { Anotacion } from '../../entities/Anotacion';
	import type { FiltroEstado, Orden } from '../../entities/types';

	onMount(() => {
		if (!$user) {
			goto('/', { replaceState: true });
		}
	});

	$: {
		categoria = $page.params.categoria;
		setfiltrodefault();
	}
	$: storeanotaciones.setFiltro(filtro);
	$: storeanotaciones.setOrden(orden);
	let categoria: string;

	$: storeanotaciones.setcategoria(categoria);
	$: listastored = storeanotaciones.lista;
	$: lista = $listastored as Anotacion[];

	$: filtros = storeanotaciones.listafiltros;
	$: listafiltros = $filtros;

	let orden: Orden = 'desc';
	let agregar: boolean = false;
	let filtro: typeof FiltroEstado[number] = 'todos';
	const setfiltrodefault = () => {
		filtro = 'todos';
	};
</script>

<div class="row">
	<div class="col-10">
		<i class="bi bi-funnel"></i>
		<select bind:value={filtro} class="bgselect" aria-label=".form-select-sm example">
			{#each listafiltros as filtro}
				<option value={filtro.estado}>{filtro.estado} ({filtro.cantidad})</option>
			{/each}
		</select>
		<button class="btn" on:click={() => (orden === 'asc' ? (orden = 'desc') : (orden = 'asc'))}>
			{#if orden === 'asc'}
				<i class="bi bi-arrow-up" />
			{:else}
				<i class="bi bi-arrow-down" />
			{/if}
		</button>
	</div>
	<div class="col-2 text-end">
		{#if categoria !== 'ALL'}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" class="btn bgadd" on:click={() => (agregar = !agregar)}>
				{#if !agregar}
					<i class="bi bi-plus-lg" />
				{:else}
					<i class="bi bi-dash-lg" />
				{/if}
			</a>
		{/if}
	</div>
</div>

Cant: {lista.length}
{#if filtro !== 'todos'}
	<span class="mx-1 text-capitalize text-primary">{filtro}</span>
	<button class="btn btn-sm link-primary" on:click={() => (filtro = 'todos')}>
		<i class="bi bi-x-lg" />
	</button>
{/if}

<ListaAnotaciones {agregar} anotaciones={lista} {categoria} on:saved={() => (agregar = false)} />

<style>
	.bgadd {
		background-color: #b7f5ad;
		border: #abdda3 solid 1px;
	}
</style>
