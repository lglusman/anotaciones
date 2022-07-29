<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../stores/users';
	import { storecategorias } from '../stores/categorias';
	import { storeanotaciones } from '../stores/anotaciones';
	import { Categoria } from '../entities/Categoria';
	import { Anotacion } from '../entities/Anotacion';
	import { logout } from '../firebase';
	import icon from '../assets/favicon.png';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	onMount(async () => {
		storecategorias.setear(await Categoria.getAll());
		storeanotaciones.setear(await Anotacion.getAll());
	});

	let cats: Categoria[] = [];

	$: {
		cats = [...$storecategorias.sort((a, b) => a.categoria.localeCompare(b.categoria))];
		console.log($page.params.categoria);
		if (!$page.url.pathname.toString().includes('anotaciones')) {
			cats = [new Categoria('', 'Seleccione Categoria'), ...cats];
		}
		cats = cats;
	}
</script>

<nav class="navbar fixed-top bgmenu">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">
			<img src={icon} alt="logo" class="rounded-circle" width="32" height="32" />
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
	{#if $storecategorias && $user}
		Categoria:
		<select class="bgselect" on:change={() => storecategorias.setear}>
			{#each cats as categoria}
				<option
					value={categoria.id}
					selected={($page.params.categoria || '') == categoria.id}
					on:click|preventDefault={() =>
						goto(`/anotaciones/${categoria.id}`, { replaceState: true })}
					>{categoria.categoria}</option
				>
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
		background-color: #e9e8fc;
		border-bottom: #dad9f8 solid 1px;
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
