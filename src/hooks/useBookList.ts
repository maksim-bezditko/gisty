import { auth, db } from "../main";
import { useList } from "react-firebase-hooks/database";
import { useMemo } from "react";
import { ref } from "firebase/database";
import { IBook } from "../types";

const useBookList = () => {
	const uid = auth.currentUser?.uid;	
	const [snapshots, bookLoading, bookError] = useList(ref(db, `data/users/${uid}/books`));
	const books: Array<IBook> = useMemo(() => {
		let arr = [];
		if (snapshots) {
			for (let i of snapshots) {
				arr.push(i.val())
			}
		}
		return arr

	}, [snapshots]) 

	return {
		books,
		bookLoading,
		bookError
	}
}

export default useBookList;