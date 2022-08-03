<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../stores/users';
	import { goto } from '$app/navigation';
	import { storeanotaciones } from '../../stores/anotaciones';
	import { page } from '$app/stores';
	import CompAnotacion from '../../components/CompAnotacion.svelte';
	import { Anotacion } from '../../entities/Anotacion';

	onMount(() => {
		if (!$user) {
			goto('/', { replaceState: true });
		}
	});

	$: idanotacion = $page.params.id;

	let anotacion: Anotacion;
	$: anotacion =
		($storeanotaciones && $storeanotaciones.find((x) => x.id === idanotacion)) ||
		new Anotacion({
			id: '',
			fechacreacion: new Date(),
			descripcion: '',
			categoria: '',
			userid: $user?.uid || '',
			fechaprevisto: null,
			fecharealizado: null
		});

		let categvolver = ''

		$: {
			if (anotacion.categoria) {
				categvolver = anotacion.categoria
			}
		}
		


	const volver = () => {
		// goto(`/anotaciones/${anotacion?.categoria}`, { replaceState: true });
		goto(`/anotaciones/${categvolver}`, { replaceState: true });
	};
</script>

<h5 class="mt-2">
	<button class="btn btnvolver btn-sm" on:click={volver}
		><i class="bi bi-arrow-return-left" /> Volver</button
	>
</h5>
<CompAnotacion on:savedordeleted={volver} {anotacion} />

<style>
	.btnvolver {
		background-color: #e5f1ff;
	}
</style>
