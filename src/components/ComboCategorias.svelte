<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Categoria } from '../entities/Categoria';
	import { storecategorias } from '../stores/categorias';
	export let idcateg: string = '';
	export let disabled: boolean = false;

	$: cat = Categoria.GetByid(idcateg || '')

	const dispatch = createEventDispatcher();

	function handlechange() {
		dispatch('change', null);
	}

</script>

{#if !disabled}
	<select class="form-select" bind:value={idcateg} on:change={handlechange}>
		{#each $storecategorias as categoria}
			<option value={categoria.id} selected>{categoria.categoria}</option>
		{/each}
	</select>
{:else}
	{#await cat then cate}
		{cate?.categoria }
	{/await}
{/if}
