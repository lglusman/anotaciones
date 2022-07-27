<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { user } from '../stores/users';
	import { storecategorias } from '../stores/categorias';
	import { storeanotaciones } from '../stores/anotaciones';
	import { Categoria } from '../entities/Categoria';
	import { Anotacion } from '../entities/Anotacion';
	import { logout } from '../firebase';
	import icon from '../assets/favicon.png';

	onMount(async () => {
		storecategorias.setear(await Categoria.getAll());
		storeanotaciones.setear(await Anotacion.getAll());
	});
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
							<a class="nav-link" href="/nuevacategoria">
								<i class="bi bi-tag" /> Categorias</a
							>
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
		<div class="row tabcategs">
			<ul class="nav nav-tabs">
				{#each $storecategorias as categoria}
					<li class="nav-item">
						<a
							class="nav-link link-info"
							class:active={$page.params.categoria === categoria.id}
							aria-current="page"
							href="/anotaciones/{categoria.id}">{categoria.categoria}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<slot />
</div>

<style>
	.cont {
		margin-top: 60px;
	}
	.bgmenu {
		background-color: #f6fce8;
	}
	.tabcategs {
		background-color: #cffffd;
	}
	.bgcanvas {
		background-color: #f6fce8;
	}
	
</style>
