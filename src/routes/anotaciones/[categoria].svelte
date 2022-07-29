<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../stores/users';
	import { goto } from '$app/navigation';
	import ListaAnotaciones from '../../components/ListaAnotaciones.svelte';
	import { storeanotaciones } from '../../stores/anotaciones';
	import { page } from '$app/stores';
	import ComboCategorias from '../../components/ComboCategorias.svelte';
	import type { Anotacion } from 'src/entities/Anotacion';
	import type { FiltroEstado } from 'src/entities/types';

	onMount(() => {
		if (!$user) {
			goto('/', { replaceState: true });
		}
	});

	$: storeanotaciones.setFiltro(filtro);
	$: categoria = $page.params.categoria;
	$: storeanotaciones.setcategoria(categoria);
	$: listastored = storeanotaciones.lista;
	$: lista = $listastored as Anotacion[];

	let agregar: boolean = false;
	let mostrarfiltros: boolean = false;
	let filtro: FiltroEstado = '';
	$: mostrarfiltros = !!filtro && !filtro ;
	
</script>

<div class="col-12 d-flex gap-2 justify-content-center mt-2">
	<h2><ComboCategorias idcateg={categoria} disabled /></h2>
</div>
<div class="row">
	<div class="col-6">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" class="btn bgadd" on:click={() => (agregar = !agregar)}>
			{#if !agregar}
				<i class="bi bi-plus-lg" />
			{:else}
				<i class="bi bi-dash-lg" />
			{/if}
		</a>
		<div class="mx-1 text-capitalize">{filtro}</div>
	</div>
	<div class="col-6 text-end">
		<button class="btn" on:click={() => (mostrarfiltros = !mostrarfiltros)}>
			<i class="bi bi-funnel" />
		</button>
		{#if mostrarfiltros}
			<select
				bind:value={filtro}
				class="form-select form-select-sm"
				aria-label=".form-select-sm example"
			>
				<option value="">todos</option>
				<option value="pendientes">pendientes</option>
				<option value="proximos">proximos</option>
				<option value="vencidos">vencidos</option>
			</select>
		{/if}
	</div>
</div>
<ListaAnotaciones {agregar} anotaciones={lista} {categoria} on:saved={() => (agregar = false)} />

<style>
	.bgadd {
		background-color: #b7f5ad;
		border: #abdda3 solid 1px;
	}
</style>
