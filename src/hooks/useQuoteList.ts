import { auth, db } from "../main";
import { useList } from "react-firebase-hooks/database";
import { useMemo } from "react";
import { ref } from "firebase/database";
import { IQuote } from "../types";

const useQuoteList = () => {
	const uid = auth.currentUser?.uid;	
	const [snapshots, quotesLoading, quotesError] = useList(ref(db, `data/users/${uid}/quotes`));
	const quotes: Array<IQuote> = useMemo(() => {
		let arr = [];
		if (snapshots) {
			for (let i of snapshots) {
				arr.push(i.val())
			}
		}
		return arr

	}, [snapshots]) 

	return {
		quotes,
		quotesLoading,
		quotesError
	}
}

export default useQuoteList;