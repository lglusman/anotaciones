<script lang="ts">
	let dialog: HTMLDialogElement;

	const mostrar = () => {
		dialog.showModal();
	};

  const ocultar = () => {
		dialog.close();
	};

	const logout = () => {
		alert('logout');
	};
</script>

<button on:click={() => mostrar()}> modal </button>
<dialog bind:this={dialog}>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" on:click={() => ocultar()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" on:click={() => ocultar()}>
          Close
        </button>
        <button type="button" class="btn btn-primary" on:click={() => logout()}>
          Save changes
        </button>
      </div>
    </div>
  </div>
</dialog>

<style>
	dialog {
		text-align: center;
	}
	/* Backdrop is only displayed when dialog is opened using showModal() method */
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
