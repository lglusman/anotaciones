<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../stores/users';
	import { goto } from '$app/navigation';
	import { storeanotaciones } from '../../stores/anotaciones';
	import { page } from '$app/stores';
	import CompAnotacion from '../../components/CompAnotacion.svelte';

	onMount(() => {
		if (!$user) {
			goto('/', { replaceState: true });
		}
	});

	$: idanotacion = $page.params.id;

	$: anotacion = $storeanotaciones && $storeanotaciones.find((x) => x.id === idanotacion);
</script>

<h5 class="mt-2">
	<button
		class="btn btn-outline-primary btn-sm"
		on:click={() => goto(`/anotaciones/${anotacion?.categoria}`, { replaceState: true })}
		><i class="bi bi-arrow-return-left" /> Volver</button
	>
</h5>
<CompAnotacion {anotacion} />
