import { IBook, IQuote } from "../types";

type Parameter = IBook | IQuote

export function sortListByDateDescending(a: Parameter, b: Parameter) {
	return +b.timestamp - +a.timestamp;
}
export function sortListByDateAscending(a: Parameter, b: Parameter) {
	return +a.timestamp - +b.timestamp;
}