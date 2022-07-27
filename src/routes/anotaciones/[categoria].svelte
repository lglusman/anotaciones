<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../stores/users';
	import { goto } from '$app/navigation';
	import ListaAnotaciones from '../../components/ListaAnotaciones.svelte';
	import { storeanotaciones } from '../../stores/anotaciones';
	import { page } from '$app/stores';
	import ComboCategorias from '../../components/ComboCategorias.svelte';

	onMount(() => {
		if (!$user) {
			goto('/', { replaceState: true });
		}
	});

	$: categoria = $page.params.categoria;

	$: lista =
		$storeanotaciones &&
		$storeanotaciones.filter(
			(x) => x.categoria.trim().toUpperCase() === categoria.trim().toUpperCase()
		);
    
 </script>

<div class="my-3">
	<div class="col-12 d-flex gap-2 justify-content-center">
			<h2><ComboCategorias idcateg={categoria} disabled /></h2>
	</div>
</div>
<ListaAnotaciones anotaciones={lista} categoria={categoria} />

