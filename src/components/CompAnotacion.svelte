<script lang="ts">
	import { Anotacion } from '../entities/Anotacion';
	import { tick } from 'svelte';
	import { user } from '../stores/users';
	import { storeanotaciones } from '../stores/anotaciones';

	export let anotacion: Anotacion = new Anotacion(
		'',
		new Date(),
		'',
		'',
		$user?.uid || '',
		null,
		null
	);
	export let alta: boolean = false;

	const actualizarAnotacion = () => {
		if (!alta) {
			guardaranotacion();
		}
	};
	const guardaranotacion = async () => {
		try {
			let anot = new Anotacion(
				anotacion.id || '',
				anotacion.fechacreacion,
				anotacion.descripcion,
				anotacion.categoria,
				anotacion.userid,
				anotacion.fechaprevisto,
				anotacion.fecharealizado
			);
			await anot.doSave(Anotacion.collection);
			if (alta) {
				storeanotaciones.agregarAnotacion(anot);
			} else {
				storeanotaciones.modificaranotacion(anot);
			}
			await tick();
			if (alta) {
				anotacion.descripcion = '';
				anotacion.fechaprevisto = null;
				anotacion.fecharealizado = null;
				anotacion.categoria = '';
			}
		} catch (error) {
			console.error(error);
		}
	};


	const del = async () => {
		if (confirm('¿Está seguro de eliminar esta nota?')) {
			await Anotacion.delete(anotacion.id || ''); 
			storeanotaciones.del(anotacion.id || '');
			// await tick();
			// 
		}
	};

</script>

<form>
	<div class="row gx-2 align-items-end bg-anotacion py-1 rounded">
		<div class="col-12 col-md-6">
			<div class="form-floating">
				<input
				id="descripcion"
				bind:value={anotacion.descripcion}
				on:change={actualizarAnotacion}
				class="form-control"
				type="text"
				placeholder="Descripción"
				name="descripcion"
				required
				/>
				<label for="descripcion">Descripción</label>

			</div>
		</div>
		<div class="col-6 col-md-2">
			<div class="form-floating">
				<input
					on:change={actualizarAnotacion}
					bind:value={anotacion.fechaprevisto}
					class="form-control"
					type="date"
					placeholder="Fecha Previsto"
					name="fechaprevisto"
					id="fechaprevisto"
				/>
				<label for="fechaprevisto">Fecha Previsto</label>
			</div>
		</div>
		<div class="col-6 col-md-2">
			<div class="form-floating">
				<input
					on:change={actualizarAnotacion}
					bind:value={anotacion.fecharealizado}
					class="form-control"
					type="date"
					placeholder="Fecha Previsto"
					name="fecharealizado"
					id="fecharealizado"
				/>
				<label for="fecharealizado">Fecha Realizado</label>
			</div>
		</div>
		{#if anotacion.id === ''}
			<div class="col-6 col-md-1">
				<div class="control">
					<button on:click|preventDefault={guardaranotacion} class="btn btn-light" type="submit">Aceptar</button>
				</div>
			</div>
			{:else}
			<div class="col-6 col-md-1">
				<div class="control">
					<button on:click|preventDefault={del} class="btn btn-danger" type="submit"><i class="bi bi-trash"></i></button>
				</div>
			</div>
		{/if}
	</div>
</form>

<style>
	.bg-anotacion {
		background-color: #cfecff;
	}
</style>
