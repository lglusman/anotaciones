import { getAll, del } from '../persistence/firestore';
import { Persistentable } from './Persistentable';
// typescript class whit id: string and categoria: string
// Language: typescript
export class Categoria extends Persistentable {
	categoria: string;

  static collection = 'categorias';

	constructor(id: string, categoria: string) {
		super(id);
		this.categoria = categoria;
	}

	private static list: Categoria[] | null = null;

	static async getByid(id: string): Promise<Categoria | undefined> {
		if (!Categoria.list) await Categoria.getAll();
		const ret = Categoria.list?.find((x) => x.id === id);
		return ret;
	}

	static async getAll(): Promise<Categoria[]> {
		const ret: Categoria[] = await getAll(Categoria.collection || '');
		Categoria.list = ret;
		return ret
	}

	static async delete(id: string): Promise<void> {
		await del(Categoria.collection, id);
	}
}
