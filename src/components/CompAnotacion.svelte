<script lang="ts">
	import { Anotacion } from '../entities/Anotacion';
	import { createEventDispatcher, tick } from 'svelte';
	import { user } from '../stores/users';
	import { storeanotaciones } from '../stores/anotaciones';
	import { ValidationError } from '../entities/ValidationError';

	const dispatch = createEventDispatcher();

	export let anotacion: Anotacion;

	export let alta: boolean = false;

	const handleguardar = () => {
		guardaranotacion();
		dispatch('savedordeleted', null);
	};

	const guardaranotacion = async () => {
		try {
			let anot = new Anotacion({
				id: anotacion.id || '',
				fechacreacion: anotacion.fechacreacion,
				descripcion: anotacion.descripcion,
				categoria: anotacion.categoria,
				userid: anotacion.userid,
				fechaprevisto: anotacion.fechaprevisto,
				fecharealizado: anotacion.fecharealizado
			});
			await anot.Save();
			dispatch('saved', null);
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
			if (error instanceof ValidationError) {
				alert(error.message);
			} else {
				console.error(error);
			}
		}
	};

	const del = async () => {
		if (confirm('¿Está seguro de eliminar esta nota?')) {
			storeanotaciones.del(anotacion.id || '');
			await Anotacion.Delete(anotacion.id || '');
			await tick();
			dispatch('savedordeleted', null);
			anotacion = new Anotacion({
				id: '',
				fechacreacion: new Date(),
				descripcion: '',
				categoria: '',
				userid: $user?.uid || '',
				fechaprevisto: null,
				fecharealizado: null
			});
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
		<div class="col-6 col-md-2">
			<button on:click|preventDefault={handleguardar} class="btn bg-aceptar" type="submit"
				><i class="bi bi-check2" /></button
			>
			{#if anotacion.id !== ''}
				<button on:click|preventDefault={del} class="btn bg-eliminar" type="submit"
					><i class="bi bi-trash" /></button
				>
			{/if}
		</div>
	</div>
</form>

<style>
	.bg-anotacion {
		background-color: #cfedff;
	}
	.bg-aceptar {
		background-color: #cffff5;
	}
	.bg-eliminar {
		background-color: #ffcfcf;
	}
</style>
