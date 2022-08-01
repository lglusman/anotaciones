import { DALCategoria } from './DAL/DalCategoria';
import { ValidationError } from './ValidationError';
export class Categoria {
	id: string | undefined;
	categoria: string;

	constructor(_categoria: { id: string; categoria: string }) {
		_categoria.id ? (this.id = _categoria.id) : (this.id = undefined);
		this.categoria = _categoria.categoria;
	}

	// toDTO(): DTOCategoria {
	// 	return new DTOCategoria({ id: this.id || '', categoria: this.categoria });
	// }

	// static fromDTO(dto: DTOCategoria): Categoria {
	// 	return new Categoria(dto);
	// }

	async Save(): Promise<void> {
		this.ValidateSave();
		await DALCategoria.Save(this);
	}

	static async GetAll(): Promise<Categoria[]> {
		return await DALCategoria.GetAll();
	}

	static async Delete(id: string): Promise<void> {
		await DALCategoria.Del(id);
	}

	static async GetByid(id: string): Promise<Categoria> {
		return DALCategoria.GetByid(id);
	}

	private ValidateSave(): void {
		if (!this.categoria) {
			throw new ValidationError('Categoria is required');
		}
	}
}

// export class DTOCategoria {
// 	id: string;
// 	categoria: string;

// 	constructor(_categoria: { id: string; categoria: string }) {
// 		this.id = _categoria.id;
// 		this.categoria = _categoria.categoria;
// 	}
// }
