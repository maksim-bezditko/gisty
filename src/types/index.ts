export type StatusEmojis = "✔️" | "🟢" | "📚" | "🟡";

export interface IStatuses {
  Read: StatusEmojis;
  Reading: StatusEmojis;
  Planning: StatusEmojis;
  Abandoned: StatusEmojis;
}

export interface IQuote {
	addedFrom: string,
	book: string,
	id: string,
	quote: string,
	timestamp: number
}

export interface IBook {
	id: string,
	quotes: IQuote[],
	status: keyof IStatuses,
	timestamp: number,
	url: string,
	title: string
}

export type BookPostData = Omit<IBook, "quotes" | "status"> & {status: keyof IStatuses | ""}
export type QuotePostData = Array<IQuote>
export type RegisterPostData = { fullName: string }
