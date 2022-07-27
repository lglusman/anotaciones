<script>
  import { onMount } from 'svelte'
  import { user } from '../stores/users'
  import { goto } from '$app/navigation'
  import CompAnotacion from '../components/CompAnotacion.svelte'
  onMount(() => {
    if (!$user) {
      goto('/', { replaceState: true })
    }
  })
</script>

<h3>Cargar nueva anotación</h3>
<CompAnotacion alta={true} />
