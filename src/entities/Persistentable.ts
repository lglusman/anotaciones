/* eslint-disable @typescript-eslint/no-explicit-any */

import { save, getAll } from '../persistence/firestore';

export class Persistentable {

  id?: string;
  static collection?: string;

  constructor(id: string) {
    this.id = id;
  }

  async doSave(collection: string) {
    return await save(this, collection);
  }
  static async getAll(collection: string): Promise<Persistentable[]> {
    return await getAll(collection);
  }
  

  toJsonString(): string {
    // const keys = Object.keys(this);
    // const data: any = {};
    // keys.forEach(key => data[key] = this[key]); // eslint-disable-line

    // return JSON.stringify(data);
    // return JSON.stringify(this, null, 2);
    return JSON.stringify(this, (key, value) => {
      if (value !== undefined) return value
    });
}





  // static getAll(): Promise<Persistentable[]> {
  //   return new Promise((resolve, reject) => {
  //     db.all(`SELECT * FROM ${this.collection}`, (err, rows) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(rows);
  //       }
  //     });
  //   });
  // }

  // static getById(id: string): Promise<Persistentable> {
  //   return new Promise((resolve, reject) => {
  //     db.get(
  //       `SELECT * FROM ${this.collection} WHERE id = ?`,
  //       [id],
  //       (err, row) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(row);
  //         }
  //       }
  //     );
  //   });
  // }

  // static save (persistentable: Persistentable): Promise<Persistentable> {
  //   return new Promise((resolve, reject) => {
  //     db.run(
  //       `INSERT INTO ${this.collection} (id, collection) VALUES (?, ?)`,
  //       [persistentable.id, persistentable.collection],
  //       (err) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(persistentable);
  //         }
  //       }
  //     );
  //   });
  // }

}