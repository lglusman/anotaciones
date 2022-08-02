<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { user } from '../stores/users';
	import { storecategorias } from '../stores/categorias';
	import { storeanotaciones } from '../stores/anotaciones';
	import { Categoria } from '../entities/Categoria';
	import { Anotacion } from '../entities/Anotacion';
	import { logout } from '../firebase';
	import icon from '../assets/favicon.png';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let selectedcat: string = '';

	$: filtros = storeanotaciones.listafiltros;
	$: listafiltros = $filtros;

	const paginanoincluyeanotaciones = () => {
		return !$page.url.pathname.toString().includes('anotaciones');
	};

	let mostrariracategoria = false;
	beforeUpdate(() => {
		cats = [...$storecategorias.sort((a, b) => a.categoria.localeCompare(b.categoria))];
		let newc = new Categoria({ id: '', categoria: 'Seleccione Categoria' })
		newc.id = '' 
		catsir = [newc, ...cats];
		if (paginanoincluyeanotaciones()) {
			mostrariracategoria = true;
			selectedcat = '';
		} else {
			mostrariracategoria = false;
			selectedcat = $page.params.categoria;
		}
	});

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
	let cats: Categoria[] = [];
	let catsir: Categoria[] = [];
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
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasNavbar"
			aria-controls="offcanvasNavbar"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div
			class="offcanvas offcanvas-start bgcanvas"
			tabindex="-1"
			id="offcanvasNavbar"
			aria-labelledby="offcanvasNavbarLabel"
		>
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
			</div>
			<div class="offcanvas-body">
				<ul class="navbar-nav">
					{#if $user}
						<li>
							<a class="nav-link" href="/nuevacategoria"> <i class="bi bi-tag" /> Categorias</a>
						</li>
					{:else}
						<li>
							<a class="nav-link" href="/login"><i class="bi bi-person-fill" /> Login</a>
						</li>
					{/if}

					{#if $user}
						<li>
							<a class="nav-link" href="/" on:click={() => logout()}
								><i class="bi bi-door-closed-fill" /> Logout</a
							>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</nav>
<div class="container-fluid cont">
	{#if $storecategorias && $user && !mostrariracategoria}
		Categoria:
		<select class="bgselect" bind:value={selectedcat}>
			{#each cats as categoria}
				<option value={categoria.id}>{categoria.categoria}</option>
			{/each}
		</select>
	{/if}
	{#if mostrariracategoria && $user }
		Categoria:
		<select class="bgselect" bind:value={selectedcat}>
			{#each catsir as categoria}
				<option value={categoria.id}>{categoria.categoria}</option>
				
			{/each}
			</select>
	{/if}
	<slot />
</div>

<style>
	.cont {
		margin-top: 70px;
	}
	.bgmenu {
		background-color: #cfecff;
		border-bottom: #c0e4fc solid 2px;
	}

	.bgcanvas {
		background-color: #f6fce8;
	}
	.bgselect {
		background-color: #e8f5fc;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		color: #495057;
		font-size: 1rem;
		height: calc(2rem + 2px);
		line-height: 1.5;
		padding-left: 0.5rem;
	}
</style>
