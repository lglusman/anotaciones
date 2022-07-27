import type { FieldPath, WhereFilterOp } from "firebase/firestore";

export type FireQuery = {
  field: string | FieldPath
  opStr: WhereFilterOp
  value: unknown
};
