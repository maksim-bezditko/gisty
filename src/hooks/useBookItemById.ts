import { useList } from "react-firebase-hooks/database";
import { db } from "../main";
import { ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { IBook } from "../types";
import { auth } from "../main";

const useBookItemById = (id: string) => {
	const uid = auth?.currentUser?.uid;
	const [snapshots, loading, error] = useList(ref(db, `data/users/${uid}/books`));
	const navigate = useNavigate()

	const book = useMemo(() => {
		if (snapshots) {
			let arr: Array<IBook> = [];
			for (let i of snapshots) {
				arr.push(i.val())
			}
			let item = arr.find(item => item.id === id);
			if (item) return item;
			navigate("/books")
		}

	}, [snapshots, id, navigate]) 

	return {
		bookItem: book,
		bookItemLoading: loading,
		bookItemError: error
	};
}

export default useBookItemById;