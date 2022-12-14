import { DALAnotacion } from './DAL/DalAnotacion';
import { ValidationError } from './ValidationError';

export class Anotacion {
	id: string | undefined;
	fechacreacion: Date;
	descripcion: string;
	categoria: string;
	fechaprevisto: Date | null = null;
	fecharealizado: Date | null = null;
	userid: string;

	constructor(_anotacion: {
		id: string;
		fechacreacion: Date;
		descripcion: string;
		categoria: string;
		userid: string;
		fechaprevisto: Date | null;
		fecharealizado: Date | null;
	}) {
		this.id = _anotacion.id;
		this.fechacreacion = _anotacion.fechacreacion;
		this.descripcion = _anotacion.descripcion;
		this.categoria = _anotacion.categoria;
		this.fechaprevisto = _anotacion.fechaprevisto;
		this.fecharealizado = _anotacion.fecharealizado;
		this.userid = _anotacion.userid;
	}

	async Save(): Promise<void> {
		this.ValidateSave();
		await DALAnotacion.Save(this);
	}

	static async GetAllByCategory(category: string): Promise<Anotacion[]> {
		return await DALAnotacion.getAllByCategory(category);
	}


	static async GetAll(): Promise<Anotacion[]> {
		return await DALAnotacion.GetAll();
	}
	static async Delete(id: string): Promise<void> {
		await DALAnotacion.Delete(id);
	}

	private ValidateSave(): void  {
		let validError = '';
		if (!this.descripcion) {
			validError += '* La descripcion es requerida';
		}
		if (!this.categoria) {
			validError += '* La categoria es requerida';
		}
		if (!this.fechacreacion) {
			validError += '* la fechacreacion es requerida';
		}
		if (!this.userid) {
			validError += '* Userid es requerido';
		}
		if (validError) {
			throw new ValidationError(validError); // Custom error creado por mi
		}
	}
}

