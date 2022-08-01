import { GetAll, Del, Create, Update, GetMany } from '../../persistence/firestore';
import type { Anotacion } from '../Anotacion';
import type { TypeData } from '../types';
import type { FireQuery } from '../types';
export class DALAnotacion {
	static collection = 'anotaciones_v2';
	static async GetAll(): Promise<Anotacion[]> {
		const ret: Anotacion[] = [];
		const data: TypeData[] = await GetAll(DALAnotacion.collection);
		data.forEach((item: TypeData) => {
			ret.push(DALAnotacion.FromTypeData(item));
		});
		return ret;
	}
	static async Save(cat: Anotacion) {
		if (cat.id) {
			Update(JSON.stringify(cat), cat.id, DALAnotacion.collection);
		} else {
			const id: string = await Create(JSON.stringify(cat), DALAnotacion.collection);
			cat.id = id;
		}
	}

	static async getAllByCategory(category: string): Promise<Anotacion[]> {
		const ret: Anotacion[] = [];
		const q: FireQuery = {
			field: 'Anotacion',
			opStr: '==',
			value: category
		};
		const data: TypeData[] = await GetMany(q, DALAnotacion.collection);
		data.forEach((item: TypeData) => {
			ret.push(DALAnotacion.FromTypeData(item));
		});
		return ret;
	}

	static async Delete(id: string): Promise<void> {
		Del(id, DALAnotacion.collection);
	}

	static FromTypeData(data: TypeData): Anotacion {
		return  { id: data.id, ...data.data } as Anotacion;
	}
}