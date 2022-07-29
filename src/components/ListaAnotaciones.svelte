<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Anotacion } from '../entities/Anotacion';
	import CompAnotacion from './CompAnotacion.svelte';
	import { user } from '../stores/users';
	import { goto } from '$app/navigation';
	
	export let anotaciones: Anotacion[] = [];
	
	const dispatch = createEventDispatcher();
	
	function handlesaved() {
		dispatch('saved', null);
	}

	export let agregar = false;
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
{#if agregar}
	 <CompAnotacion on:saved={handlesaved} alta={true} anotacion={newAnotacion} />
{/if}
{#if anotaciones}
	{#each anotaciones as anotacion, index}
		<div class="row" >
			<div class="col-12 gy-2">
				<div class="card {index % 2 === 0 ? 'card1' : 'card2'} border-0 shadow">
					<div class="card-body">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<h5 class="card-title">{anotacion.descripcion} <a href="#" class="btn btn-sm btn-link link-dark" on:click={() => handleclickanotacion(anotacion.id || '')}><i class="bi bi-pencil"></i></a></h5>
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
