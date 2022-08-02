<script lang="ts">
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import { Categoria } from '../entities/Categoria';
	import { storecategorias } from '../stores/categorias';

	export let idcateg: string = '';
	export let mostrariracategoria: boolean = false;

	$: cat = Categoria.GetByid(idcateg || '');

	const dispatch = createEventDispatcher();

	let cats: Categoria[] = [];
	let catsandselect: Categoria[] = [];

	beforeUpdate(() => {
		cats = [...$storecategorias.sort((a, b) => a.categoria.localeCompare(b.categoria))];
		let todos = new Categoria({ id: 'ALL', categoria: 'Todas' });
		let newc = new Categoria({ id: '', categoria: 'Seleccione Categoria' });
		newc.id = '';
		catsandselect = [newc, todos, ...cats];
		cats = [todos, ...cats];
	});
</script>

{#if $storecategorias && !mostrariracategoria}
	Categoria:
	<select class="bgselect" bind:value={idcateg}>
		{#each cats as categoria}
			<option value={categoria.id}>{categoria.categoria}</option>
		{/each}
	</select>
{/if}
{#if $storecategorias && mostrariracategoria}
	Categoria:
	<select class="bgselect" bind:value={idcateg}>
		{#each catsandselect as categoria}
			<option value={categoria.id}>{categoria.categoria}</option>
		{/each}
	</select>
{/if}
