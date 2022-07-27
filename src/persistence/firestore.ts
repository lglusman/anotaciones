import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Persistentable } from 'src/entities/Persistentable';
import type { FireQuery } from '../entities/types';

async function save(data: Persistentable, COLECTION: string) {
	try {
		let docRef;
		const datasave = { ...data };
		delete datasave.id;
		console.log({data})
		if (!data.id) {
			docRef = await addDoc(collection(db, COLECTION || ''), datasave);
			data.id = docRef.id;
		} else {
			docRef = doc(db, COLECTION || '', data.id || '');

			await updateDoc(docRef, datasave);
		}
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

async function getOne<T>(id: string, COLECTION: string): Promise<T> {
	let ret: T = {} as T;
	try {
		const q = query(collection(db, COLECTION), where('id', '==', id));
		const userQuery = await getDocs(q);
		const retarr = userQuery.docs.map((x) => x.data() as T);
		ret = retarr[0];
	} catch (error) {
		console.error(error);
	}
	return ret;
}

async function getMany<T>(COLECTION: string, quer: FireQuery): Promise<T[]> {
	const ret: T[] = [];
	try {
		const q = query(collection(db, COLECTION), where(quer.field, quer.opStr, quer.value));
		const userQuery = await getDocs(q);
		//ret = userQuery.docs.map((x) => x.data() as new T(x.id));

		userQuery.docs.forEach((x) => {
			ret.push((x.id, x.data()) as T);
		})

	} catch (error) {
		console.error(error);
	}
	return ret;
}

async function getAll<T>(COLECTION: string): Promise<T[]> {
	if (COLECTION === undefined) return [];
	const ret: T[] = [];
	try {
		const q = query(collection(db, COLECTION));
		const userQuery = await getDocs(q);
		userQuery.docs.forEach((x) => {
			const data = x.data();
			data.id = x.id;
			ret.push(data as T);
		})
	} catch (error) {
		console.error(error);
	}
	return ret;
}

async function del<T>(COLECTION: string | undefined , id: string): Promise<T[]> {
	if (COLECTION === undefined) return [];
	const ret: T[] = [];
	try {
		await deleteDoc(doc(db, COLECTION, id));
	} catch (error) {
		console.error(error);
	}
	return ret;
}


export { save, getOne, getMany, getAll, del };
