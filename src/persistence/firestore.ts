import { db } from '../firebase';
import type { FireQuery, TypeData } from '../entities/types';
import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	doc,
	updateDoc,
	deleteDoc,
	getDoc
} from 'firebase/firestore';

async function Create(data: string, COLECTION: string): Promise<string> {
	let id = '';
	const datasave = JSON.parse(data);
	delete datasave.id;
	try {
		const docRef = await addDoc(collection(db, COLECTION || ''), { data : datasave });
		id = docRef.id || '';
	} catch (e) {
		console.error('Error adding document: ', e);
	}
	return id;
}

async function Update(data: string, id: string, COLECTION: string) {
	const datasave = JSON.parse(data);
	delete datasave.id;
	try {
		const docRef = doc(db, COLECTION || '', id || '');
		await updateDoc(docRef, { data: datasave });
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

// const q = query(collection(db, COLECTION), where('id', '==', id));

async function GetOne(id: string, COLECTION: string): Promise<TypeData> {
	let ret: TypeData = { id: '', data: {} };
	if (!id) return ret;
	try {
		const docRef = doc(db, COLECTION, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			ret = { id: docSnap.id.toString(), data: docSnap.data().data };
		}
	} catch (error) {
		console.error(error);
	}
	return ret;
}

async function GetMany(quer: FireQuery, COLECTION: string): Promise<TypeData[]> {
	const ret: TypeData[] = [];
	try {
		const q = query(collection(db, COLECTION), where(quer.field, quer.opStr, quer.value));
		const userQuery = await getDocs(q);
		userQuery.docs.forEach((x) => {
			ret.push({ id: x.id, data: x.data().data });
		});
	} catch (error) {
		console.error(error);
	}
	return ret;
}

async function GetAll(COLECTION: string): Promise<TypeData[]> {
	console.log('GetAll', COLECTION);
	if (COLECTION === undefined) return [];
	const ret: TypeData[] = [];
	try {
		const q = query(collection(db, COLECTION));
		const userQuery = await getDocs(q);
		userQuery.docs.forEach((x) => {
			ret.push({ id: x.id, data: x.data().data } as TypeData);
		});
	} catch (error) {
		console.error(error);
	}
	return ret;
}

async function Del<T>(id: string, COLECTION: string): Promise<T[]> {
	if (COLECTION === undefined) return [];
	const ret: T[] = [];
	try {
		await deleteDoc(doc(db, COLECTION, id));
	} catch (error) {
		console.error(error);
	}
	return ret;
}

export { Create, Update, GetOne, GetMany, GetAll, Del };
