<!-- componente de svelte que guarda categorias con lenguaje typescript -->
<script lang="ts">
	import { tick } from 'svelte';
	import { storecategorias } from '../stores/categorias';

	import { Categoria } from '../entities/Categoria';
	export let cat: Categoria = new Categoria({id:'', categoria: ''});

	let nuevacategoria = new Categoria({id: cat.id || '',categoria: cat.categoria});

	const del = async () => {
		if (confirm('¿Está seguro de eliminar esta categoría?')) {
			console.log($storecategorias);
			console.log(nuevacategoria);
			await Categoria.Delete(nuevacategoria.id || '');
			await tick();
			storecategorias.del(nuevacategoria.id || '');
			
		}
	};

	const save = async () => {
		try {
			await nuevacategoria.Save();
			if ($storecategorias.findIndex((c) => c.id == nuevacategoria.id) == -1) {
				storecategorias.agregarCategoria(nuevacategoria);
				await tick;
				nuevacategoria = new Categoria({id:'', categoria: ''});
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
		{#if nuevacategoria.id}
			<a href="/" class="btn bg-aceptar tbn" on:click|preventDefault={save}
				><i class="bi bi-check" /></a
			>
			<a href="/" class="btn bg-eliminar" on:click|preventDefault={del}><i class="bi bi-trash" /></a>
		{:else}
			<a href="/" class="btn bg-aceptar tbn" on:click|preventDefault={save}
				><i class="bi bi-plus" /></a
			>
		{/if}
	</div>
</div>

<style>
	.bgcategs {
		background-color: #cfecff;
	}
	.bg-aceptar {
		background-color: #cffff5;
	}
	.bg-eliminar {
		background-color: #ffcfcf;
	}
</style>
