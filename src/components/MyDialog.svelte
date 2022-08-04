<script lang="ts">
import { beforeUpdate } from "svelte";
import { Categoria } from '../entities/Categoria';
	import { storecategorias } from '../stores/categorias';

	let dialog: HTMLDialogElement;

	const mostrar = () => {
		dialog.showModal();
	};

  const ocultar = () => {
		dialog.close();
	};

  let cats: Categoria[] = [];


	beforeUpdate(() => {
		cats = [...$storecategorias.sort((a, b) => a.categoria.localeCompare(b.categoria))];
		let todos = new Categoria({ id: 'ALL', categoria: 'Todas' });
		cats = [todos, ...cats];
	});
</script>

<button on:click={() => mostrar()}> modal </button>
<dialog bind:this={dialog}>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Menu</h5>
        <button type="button" tabindex="-1" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => ocultar()}></button>
      </div>
      <div class="modal-body">
  <ul class="list-group">
    {#each cats as categoria}
    <li class="list-group-item">
      <a class="nav-link" href={`/anotaciones/${categoria.id}`} on:click={() => ocultar()}> {categoria.categoria}</a>
    </li>
		{/each}
  </ul>
      </div>
    </div>
  </div>
</dialog>

<style>
	dialog {
		text-align: center;
    border: solid gray 2px;
  border-radius: 10px;
    
	}
	/* Backdrop is only displayed when dialog is opened using showModal() method */
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
