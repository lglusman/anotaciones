<script lang="ts">
	import { Anotacion } from '../entities/Anotacion';
	import { createEventDispatcher, tick } from 'svelte';
	import { user } from '../stores/users';
	import { storeanotaciones } from '../stores/anotaciones';
	import { ValidationError } from '../entities/ValidationError';
import { alerta } from '../alert/alerta';

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
				alerta({message: error.message});
			} else {
				console.error(error);
			}
		}
	};
	const onFocus = (e: { target: { type: string } }) => (e.target.type = 'date');
	const onBlur = (e: { target: { type: string } }) => (e.target.type = 'text');

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
		<div class="col-12 col-md-12">
			<input
				id="descripcion"
				bind:value={anotacion.descripcion}
				class="fc-anotacion"
				type="text"
				placeholder="Descripción"
				name="descripcion"
				required
			/>
		</div>
		<div class="col-6 col-md-6">
			<p class="fw-light m-0">fecha previsto</p>
			<input
				bind:value={anotacion.fechaprevisto}
				class="fc-anotacion"
				type="date"
				placeholder="Fecha Previsto"
				name="fechaprevisto"
				id="fechaprevisto"
			/>
		</div>
		<div class="col-6 col-md-6">
			<p class="fw-light m-0">fecha realizado</p>
			<input
				bind:value={anotacion.fecharealizado}
				class="fc-anotacion"
				type="date"
				placeholder="Fecha Previsto"
				name="fecharealizado"
				id="fecharealizado"
			/>
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
	.fc-anotacion {
		background-color: transparent;
		border: 1px solid #fbffff;
		border-radius: 5px;
		width: 100%;
		margin: 2px 0;
		padding: 0.5em;
	}

	.fc-anotacion:focus {
		border: 1px solid #a5a0a0;
		outline: none;
	}

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
