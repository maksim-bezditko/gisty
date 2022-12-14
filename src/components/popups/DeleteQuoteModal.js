import React, {useState, useMemo} from 'react'
import Modal from '../../HOCs/Modal/Modal';
import { auth } from '../..';
import { db } from '../..';
import { ref, update, remove } from "firebase/database";
import { useList } from 'react-firebase-hooks/database';
import "./form.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../slices/slice';
import { modalSelector, bookToDeleteSelector } from '../../selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { setDeleteId } from '../../slices/slice';

export const deleteBookById = (id) => {
	const userId = auth.currentUser.uid;
	const itemRef = ref(db, `data/users/${userId}/books/${id}`);

	return remove(itemRef)
}

function DeleteQuoteModal({visible}) {
	const uid = auth.currentUser.uid;
	const dispatch = useDispatch();
	const bookToDelete = useSelector(bookToDeleteSelector);
	const navigate = useNavigate()
	const [checked, setChecked] = useState(false)
	const modal = useSelector(modalSelector)
	const [quotesSnapshots] = useList(ref(db, `data/users/${uid}/quotes`));

	const quotesList = useMemo(() => {
		let arr = [];
		for (let i of quotesSnapshots) {
			arr.push(i.val())
		}
		return arr

	}, [quotesSnapshots]) 

  	return (
		<Modal visible={visible}>
			<div className='form confirm'>
				<h1 className='confirm-question transition-none'>Are you sure?</h1>
				
				<div className="keep-input transition-none">
					<input className='keep transition-none' id="keep" type="checkbox" name="keep" onClick={() => setChecked(!checked)} value={checked}/>
					<label className="keep-label transition-none" htmlFor="keep">Keep related quotes</label>
				</div>

				<div className='buttons'>
					<button 
						className={`button${modal === "delete-quote" ? " add-quote-button transition-none" : ""}`}
						onClick={async () => {
							dispatch(setModal(null))
							try {
								navigate("/")
								await deleteBookById(bookToDelete)
								if (!checked) {
									const postData = quotesList.filter(item => item.addedFrom !== bookToDelete)

									const updates = {};
									updates[`/data/users/${uid}/quotes/`] = postData;
									update(ref(db), updates);
								}
								dispatch(setDeleteId(null))
								// dispatch(setBooks(books.filter(item => item.id !== bookToDelete)))
								// dispatch(setBooks(books.filter(item => item.id !== bookToDelete)))
							} catch (e) {
								dispatch(setDeleteId(null))
								alert("Sorry, couldn't remove the book, try one more time.")
							}
						}}>
						Yes
					</button>
					<button className={`button${modal === "delete-quote" ? " add-quote-button delete-quote-button-1 transition-none" : ""}`}
						onClick={() => {
							dispatch(setModal(null))
							dispatch(setDeleteId(null))
						}}>
						No
					</button>
				</div>
				
			</div>
		</Modal>
  )
}

export default DeleteQuoteModal;