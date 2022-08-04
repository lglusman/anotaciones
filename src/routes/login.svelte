<script>
	import { onMount } from 'svelte';

	import { loginconpopup } from '../firebase';
	import { user } from '../stores/users';

	onMount(async () => {
		await loginconpopup();
	});
</script>

<div class="container">
	<div class="d-flex justify-content-center mt-4">
		{#if $user}
			<p>Bienvenido {$user.displayName}</p>
		{/if}
	</div>
</div>
