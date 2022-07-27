<script>
  import { loginconpopup } from '../firebase'
  import { user } from '../stores/users'
  const procesarFormulario = async () => {
    await loginconpopup()
  }
</script>

<div class="container">
  <div class="d-flex justify-content-center mt-4">
    {#if !$user}
      <button
        type="submit"
        class="btn btn-primary"
        on:click={procesarFormulario}>Acceder con Google</button
      >
    {:else}
      <p>Bienvenido {$user.displayName}</p>
    {/if}
  </div>
</div>
