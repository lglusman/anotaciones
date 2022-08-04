<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { Categoria } from '../entities/Categoria';
	import { storecategorias } from '../stores/categorias';
	import { user } from '../stores/users';
	import { logout } from '../firebase';

	let dialog: HTMLDialogElement;

	export let show: boolean = true;

	let cats: Categoria[] = [];

	$: show ? dialog?.showModal() : dialog?.close();

	beforeUpdate(() => {
		cats = [...$storecategorias.sort((a, b) => a.categoria.localeCompare(b.categoria))];
		let todos = new Categoria({ id: 'ALL', categoria: 'Todas' });
		cats = [todos, ...cats];
	});
</script>

<dialog bind:this={dialog} class="shadow">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title my-3"> </h5>

				<div class="btn-close" on:click={() => (show = false)} />
			</div>
			<div class="modal-body">
				{#if $user}
					<div class="list-group">
						<a
							class="list-group-item list-group-item-action logout"
							href="/"
							on:click={() => logout()}><i class="bi bi-door-closed-fill"></i> Logout</a
						>
					</div>
          <hr>
					<div class="list-group">
						<a
							class="list-group-item list-group-item-action nuevacategoria"
							href="/nuevacategoria"
							on:click={() => (show = false)}>Nueva Categoria</a
						>
					</div>
          <hr>
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
							on:click={() => (show = false)}><i class="bi bi-door-open-fill"></i> Login</a
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
  .categorias{
    background-color: #f6fce8;
  }
</style>
