import { GetAll, Del, Create, Update, GetOne } from '../../persistence/firestore';
import type { Categoria } from '../Categoria';
import type { TypeData } from '../types';
export class DALCategoria {
	static collection = 'categorias_v2';

	static async GetAll(): Promise<Categoria[]> {
		const ret: Categoria[] = [];
		const data: TypeData[] = await GetAll(DALCategoria.collection);

		data.forEach((item: TypeData) => {
			ret.push(DALCategoria.FromTypeData(item));
		});
		return ret;
	}

	static async GetByid(id: string): Promise<Categoria> {
		const ret = await GetOne(id, DALCategoria.collection);
		const retu = DALCategoria.FromTypeData(ret);
		return retu;
	}

	static async Save(cat: Categoria) {
		if (cat.id) {
			await Update(JSON.stringify(cat), cat.id, DALCategoria.collection);
		} else {
			const id: string = await Create(JSON.stringify(cat), DALCategoria.collection);
			cat.id = id;
		}
	}
	static Del(id: string) {
		Del(id, DALCategoria.collection);
	}

	static FromTypeData(data: TypeData): Categoria {
		return { id: data.id, ...data.data } as Categoria;
		
	}
}
