import type { FieldPath, WhereFilterOp } from 'firebase/firestore';

export type FireQuery = {
	field: string | FieldPath;
	opStr: WhereFilterOp;
	value: unknown;
};

export const FiltroEstado = ['todos', 'pendientes', 'proximos', 'vencidos', 'realizados' ] as const;

export type Orden = 'asc' | 'desc';
