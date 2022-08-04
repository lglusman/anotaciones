<script lang="ts">
	import { storecategorias } from '../stores/categorias';
	import CompCategoria from './CompCategoria.svelte';

	$: categorias = $storecategorias
</script>

{#if categorias}
	<div class="row">
		{#each categorias as categoria (categoria.id)}
			<div class="col-12">
				<CompCategoria cat={categoria} />
			</div>
		{/each}
	</div>
{/if}
