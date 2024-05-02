export class Field<T = string> extends Array<T> {
	constructor(fields: T) {
		if (typeof fields === "string") {
		  super(...fields.split(".") as T[])
		} else {
		  super(fields)
		}
	}
}
