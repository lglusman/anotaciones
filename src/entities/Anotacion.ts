import { getMany, getAll, del } from '../persistence/firestore';
import { Persistentable } from './Persistentable';
import type { FireQuery } from './types';

export class Anotacion extends Persistentable {
  static collection = 'anotaciones';

	fechacreacion: Date;
	descripcion: string;
	categoria: string;
	fechaprevisto: Date | null = null;
	fecharealizado: Date | null = null; 
	userid: string;
	constructor(
		id: string,
		fechacreacion: Date,
		descripcion: string,
		categoria: string,
		userid: string,
		fechaprevisto: Date | null,
		fecharealizado: Date | null,
	) {
		super(id);
		this.fechacreacion = fechacreacion;
		this.descripcion = descripcion;
		this.categoria = categoria;
		this.fechaprevisto = fechaprevisto ? fechaprevisto : null;
		this.fecharealizado = fecharealizado ? fecharealizado : null;
		this.userid = userid;
	}

	static async getAllByCategory(category: string): Promise<Anotacion[]> {
		const q : FireQuery = {
			field: "categoria",
			opStr: "==",
			value: category
		}
		return await getMany<Anotacion>(Anotacion.collection || '', q);
	}

	static async getAll(): Promise<Anotacion[]> {
		return await getAll(Anotacion.collection || '');
	}

	
	static async delete(id: string): Promise<void> {
		await del(Anotacion.collection, id);
	}

}


// class DALAnotacion {
//   // static getAll(): Promise<Anotacion[]> {
//   //   return new Promise((resolve, reject) => {
//   //     db.all("SELECT * FROM anotacion", (err, rows) => {
//   //       if (err) {
//   //         reject(err);
//   //       } else {
//   //         resolve(rows);
//   //       }
//   //     });
//   //   });
//   // }

//   // static getById(id: number): Promise<Anotacion> {
//   //   return new Promise((resolve, reject) => {
//   //     db.get(
//   //       "SELECT * FROM anotacion WHERE id = ?",
//   //       [id],
//   //       (err, row) => {
//   //         if (err) {
//   //           reject(err);
//   //         } else {
//   //           resolve(row);
//   //         }
//   //       }
//   //     );
//   //   });
//   // }

//   // static getByUserId(userid: string): Promise<Anotacion[]> {
//   //   return new Promise((resolve, reject) => {
//   //     db.all(
//   //       "SELECT * FROM anotacion WHERE userid = ?",
//   //       [userid],
//   //       (err, rows) => {
//   //         if (err) {
//   //           reject(err);
//   //         } else {
//   //           resolve(rows);
//   //         }
//   //       }
//   //     );
//   //   });
//   // }

//   // static getByCategoria(categoria: string): Promise<Anotacion[]> {
//   //   return new Promise((resolve, reject) => {
//   //     db.all(
//   //       "SELECT * FROM anotacion WHERE categoria = ?",
//   //       [categoria],
//   //       (err, rows) => {
//   //         if (err) {
//   //           reject(err);
//   //         } else {
//   //           resolve(rows);
//   //         } else {  reject(err); }  

// }