<script lang="ts">
	import { onMount } from 'svelte';
	import { Anotacion } from '../entities/Anotacion';
	import CompAnotacion from './CompAnotacion.svelte';
	import { user } from '../stores/users';
	import { goto } from '$app/navigation';
	export let anotaciones: Anotacion[] = [];
	// export let showcategorias = true;
	export let categoria: string = '';
	let newAnotacion: Anotacion = new Anotacion(
		'',
		new Date(),
		'',
		categoria,
		$user?.uid || '',
		null,
		null
	);

	$: newAnotacion.categoria = categoria;

	const handleclickanotacion = (id: string) => {
		goto(`/anotacion/${id}`, { replaceState: true });
	};
</script>

<CompAnotacion alta={true} anotacion={newAnotacion} />
{#if anotaciones}
	{#each anotaciones as anotacion, index}
		<div class="row" on:click={() => handleclickanotacion(anotacion.id || '')}>
			<div class="col-12 gy-2">
				<div class="card {index % 2 === 0 ? 'card1' : 'card2'} border-0 shadow">
					<div class="card-body">
						<h5 class="card-title">{anotacion.descripcion}</h5>
						<hr />
						<div class="row">
							<div class="col-6 card-text fw-light">
								<i class="bi bi-calendar3" />
								{anotacion.fechaprevisto ? anotacion.fechaprevisto : ''}
							</div>
							<div class="col-6 card-text text-end fw-light">
								<i class="bi bi-calendar-check" />
								{anotacion.fecharealizado ? anotacion.fecharealizado : 'Pendiente'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
{/if}

<style>
	.card1 {
		background-color: #ffebe5;
	}
	.card2 {
		background-color: #fdf1db;
	}
</style>
