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

	let anotacion: Anotacion | undefined;
	$: anotacion = $storeanotaciones && $storeanotaciones.find((x) => x.id === idanotacion);
	let anotacioncomp: Anotacion  = new Anotacion(
		'',
		new Date(),
		'',
		'',
		$user?.uid || '',
		null,
		null
	);
	$: {
		if (anotacion) {
			anotacioncomp =  { ...anotacion } as Anotacion;
		}
	}
	const volver = () => {
		goto(`/anotaciones/${anotacioncomp?.categoria}`, { replaceState: true });
	};
</script>

<h5 class="mt-2">
	<button
		class="btn btn-outline-primary btn-sm"
		on:click={volver}
		><i class="bi bi-arrow-return-left" /> Volver</button
	>
</h5>
<CompAnotacion on:savedordeleted={volver} anotacion={anotacioncomp} />
