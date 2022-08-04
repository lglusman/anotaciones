<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { user } from '../stores/users';
	import { storecategorias } from '../stores/categorias';
	import { storeanotaciones } from '../stores/anotaciones';
	import { Categoria } from '../entities/Categoria';
	import { Anotacion } from '../entities/Anotacion';
	import icon from '../assets/favicon.png';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MyDialog from '../components/MyDialog.svelte';

	let selectedcat: string = '';
	let mostrarmenu: boolean = false;

	const paginanoincluyeanotaciones = () => {
		return !$page.url.pathname.toString().includes('anotaciones');
	};

	$: {
		if ($user) {
			Categoria.GetAll().then((categorias) => {
				storecategorias.setear(categorias);
			});
			Anotacion.GetAll().then((anotaciones) => {
				storeanotaciones.setear(anotaciones);
			});
		}
	}
	// $: selectedcat = $page.params.categoria || '';

	$: {
		if (selectedcat) {
			goto(`/anotaciones/${selectedcat}`, { replaceState: true });
		}
	}
</script>

<nav class="navbar fixed-top bgmenu">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">
			<img src={icon} alt="logo" class="rounded-circle" width="32" height="32" />
			Notas - Renatita
		</a>
		<button
			class="navbar-toggler"
			type="button"
			on:click={() => mostrarmenu = true}
		>
			<span class="navbar-toggler-icon" />
		</button>
	</div>
</nav>
<div class="container-fluid cont">
	<slot />
</div>
<MyDialog bind:show={mostrarmenu} />

<style>
	.cont {
		margin-top: 70px;
	}
	.bgmenu {
		background-color: #cfecff;
		border-bottom: #c0e4fc solid 2px;
	}

</style>
