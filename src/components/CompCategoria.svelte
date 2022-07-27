<!-- componente de svelte que guarda categorias con lenguaje typescript -->
<script lang="ts">
	import { tick } from 'svelte';
	import { storecategorias } from '../stores/categorias';

	import { Categoria } from '../entities/Categoria';
	export let cat: Categoria = new Categoria('', '');

	let nuevacategoria = new Categoria(cat.id || '', cat.categoria);

	const del = async () => {
		if (confirm('¿Está seguro de eliminar esta categoría?')) {
			await Categoria.delete(nuevacategoria.id || '');
			storecategorias.del(nuevacategoria.id || '');
			// await tick();
			//
		}
	};

	const save = async () => {
		try {
			await nuevacategoria.doSave(Categoria.collection);
			if ($storecategorias.findIndex((c) => c.id == nuevacategoria.id) == -1) {
				storecategorias.agregarCategoria(nuevacategoria);
				await tick;
				nuevacategoria = new Categoria('', '');
			} else {
				storecategorias.actualizarCategoria(nuevacategoria);
			}
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="row py-1 bgcategs">
	<div class="col-8">
		<input class="form-control" type="text" bind:value={nuevacategoria.categoria} />
	</div>
	<div class="col-4">
		{#if nuevacategoria.id !== ''}
			<a href="/" class="btn btn-primary tbn" on:click|preventDefault={save}
				><i class="bi bi-check" /></a
			>
			<a href="/" class="btn btn-danger" on:click|preventDefault={del}><i class="bi bi-trash" /></a>
		{:else}
			<a href="/" class="btn btn-success tbn" on:click|preventDefault={save}
				><i class="bi bi-plus" /></a
			>
		{/if}
	</div>
</div>

<style>
	.bgcategs {
		background-color: #cfecff;
	}
</style>
