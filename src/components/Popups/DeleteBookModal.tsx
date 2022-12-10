import {useState} from 'react'
import Modal from '../../HOCs/Modal/Modal';
import { auth } from '../../main';
import { db } from '../../main';
import { ref, update, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setModal } from '../../slices/slice';
import { modalSelector, bookToDeleteSelector } from '../../selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { setDeleteId } from '../../slices/slice';

import styles from "./Form.module.scss";
import classNames from 'classnames';
import { IBook, QuotePostData } from '../../types';
import useQuoteList from '../../hooks/useQuoteList';

export const deleteBookById = (id: IBook["id"]) => {
	const userId = auth?.currentUser?.uid;
	const itemRef = ref(db, `data/users/${userId}/books/${id}`);

	return remove(itemRef)
}

interface Props {
	visible: boolean
}

function DeleteQuoteModal({visible}: Props) {
	const uid = auth?.currentUser?.uid;
	const dispatch = useTypedDispatch();
	const bookToDelete = useSelector(bookToDeleteSelector);
	const navigate = useNavigate()
	const [checked, setChecked] = useState<boolean>(false)
	const modal = useSelector(modalSelector)
	const { quotes } = useQuoteList()

  	return (
		<Modal visible={visible}>
			<div className={classNames(styles.form, styles.confirm)}>
				<h1 className={classNames(styles.confirmQuestion, styles.transitionNone)}>Are you sure?</h1>
				
				<div className={classNames(styles.keepInput, styles.transitionNone)}>
					<input className={classNames(styles.keep, styles.transitionNone)} id="keep" type="checkbox" value="keep" name="keep" onChange={() => setChecked(!checked)} checked={checked}/>
					<label className={classNames(styles.keepLabel, styles.transitionNone)} htmlFor="keep">Keep related quotes</label>
				</div>

				<div className={styles.buttons}>
					<button 
						className={classNames(styles.button, {[styles.addQuoteButton]: modal === "delete-book" ? true : false})}
						onClick={async () => {
							dispatch(setModal("none"))
							try {
								navigate("/")
								await deleteBookById(bookToDelete)
								if (!checked) {
									const postData: QuotePostData = quotes.filter(item => item.addedFrom !== bookToDelete)

									const updates: {
										[key: string]: QuotePostData
									} = {};
									updates[`/data/users/${uid}/quotes/`] = postData;
									update(ref(db), updates);
								}
								dispatch(setDeleteId(""))
							} catch (e) {
								dispatch(setDeleteId(""))
								alert("Sorry, couldn't remove the book, try one more time.")
							}
						}}>
						Yes
					</button>
					<button
						className={classNames(styles.button, {[styles.addQuoteButton]: modal === "delete-book" ? true : false}, {[styles.deleteQuoteButton1]: modal === "delete-book" ? true : false})}
						onClick={() => {
							dispatch(setModal("none"))
							dispatch(setDeleteId(""))
						}}>
						No
					</button>
				</div>
				
			</div>
		</Modal>
  )
}

export default DeleteQuoteModal;