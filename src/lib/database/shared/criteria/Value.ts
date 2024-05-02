export class Value extends String {
	private readonly _type: "string" | "number" | "boolean" | "date"
	constructor(value: string, type: "string" | "number" | "boolean" | "date" = "string") {
		super(value)
		this._type = type
	}
	type() {
		return this._type
	}
}