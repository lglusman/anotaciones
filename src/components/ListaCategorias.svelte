<script lang="ts">
	import { storecategorias } from '../stores/categorias';
	import CompCategoria from './CompCategoria.svelte';
</script>

{#if $storecategorias}
	<div class="row">
		{#each $storecategorias as categoria, index}
			<div class="col-12">
				<CompCategoria cat={categoria} />
			</div>
		{/each}
	</div>
{/if}
