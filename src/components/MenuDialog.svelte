<script lang="ts">
	import { beforeUpdate, onMount, onDestroy } from 'svelte';
	import { Categoria } from '../entities/Categoria';
	import { storecategorias } from '../stores/categorias';
	import { user } from '../stores/users';
	import { logout } from '../firebase';

	let dialog: HTMLDialogElement;

	export let show: boolean = true;

	let cats: Categoria[] = [];

	$: show ? dialog?.showModal() : dialog?.close();

	onMount(() => {
		dialog?.addEventListener('close', () => {
			show = false;
		});
	});

	onDestroy(() => {
		dialog?.removeEventListener('close', () => {
			console.log('destroy');

		});
	}),
		beforeUpdate(() => {
			cats = [...$storecategorias.sort((a, b) => a.categoria.localeCompare(b.categoria))];
			let todos = new Categoria({ id: 'ALL', categoria: 'Todas' });
			cats = [todos, ...cats];
		});
</script>

<dialog bind:this={dialog}>
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title my-3" />
				<div class="btn-close" on:click={() => (show = false)} />
			</div>
			<div class="modal-body">
				{#if $user}
					<div class="list-group">
						<a
							class="list-group-item list-group-item-action logout"
							href="/"
							on:click={() => logout()}><i class="bi bi-door-closed-fill" /> Logout</a
						>
					</div>
					<hr />
					<div class="list-group">
						<a
							class="list-group-item list-group-item-action nuevacategoria"
							href="/nuevacategoria"
							on:click={() => (show = false)}>Nueva Categoria</a
						>
					</div>
					<hr />
					<h5>Seleccione:</h5>
					<div class="list-group">
						{#each cats as categoria}
							<a
								class="list-group-item list-group-item-action categorias"
								href={`/anotaciones/${categoria.id}`}
								on:click={() => (show = false)}
							>
								{categoria.categoria}</a
							>
						{/each}
					</div>
				{:else}
					<div class="list-group">
						<a
							class="list-group-item list-group-item-action nuevacategoria"
							href="/login"
							on:click={() => (show = false)}><i class="bi bi-door-open-fill" /> Login</a
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 10px;
		border: none;
		text-align: center;
		background: #c8f4fa;
		animation: popup 0.4s;
	}
	@keyframes popup {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		50% {
			opacity: 0.95;
			transform: scale(1.04);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.2);
	}
	.btn-close {
		cursor: pointer;
	}

	.logout {
		background-color: #f8dada;
	}
	.nuevacategoria {
		background-color: #dbf8da;
	}
	.categorias {
		background-color: #f6fce8;
	}
</style>
