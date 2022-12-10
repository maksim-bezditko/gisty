import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from '../../main';
import { db } from '../../main';
import { ref, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setModal } from '../../slices/slice';
import useBookList from '../../hooks/useBookList';

import styles from "./Form.module.scss";
import { IQuote } from '../../types';

interface Props {
	visible: boolean
}

function AddQuoteModal({visible}: Props) {
	const dispatch = useTypedDispatch();
	
	const {books} = useBookList();

  	return (
	 <Modal visible={visible}>
		<Formik
				initialValues={{ quote: '', book: ""}}
				validationSchema={Yup.object({
					quote: Yup.string()
						.required('Required'),
					book: Yup.string()
						.required('Required')
				})}
				onSubmit={(values, { resetForm, setSubmitting }) => {
					const {quote, book} = values;
					const [bookTitle, bookId] = book.split("%")
					const newId = uuidv4()
					const uid = auth?.currentUser?.uid;
					const timestamp = +new Date();
					
					try {
						const postData = {
							book: bookTitle,
							addedFrom: bookId,
							quote,
							id: newId,
							timestamp
						};

						const updates: {
							[key: string]: IQuote
						} = {};

						updates[`/data/users/${uid}/books/${bookId}/quotes/${newId}`] = postData;
						updates[`/data/users/${uid}/quotes/${newId}`] = postData;

						update(ref(db), updates);

						dispatch(setModal("none"))

					} catch (e) {
						alert(e)
					}
					resetForm()
					setSubmitting(false)
				}}
				validateOnChange
				validateOnBlur>
				{({isSubmitting}) => 
					<Form className={styles.form}>
						<h1>Wanna add a quote?</h1>

						<div className={styles.group}>
							<label htmlFor="quote">Quote</label>
							<Field name="quote" type="text" className={styles.input}/>
							<ErrorMessage name="quote">
								{msg => <div className={styles.errorMessage}>{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className={styles.group}>
							<label htmlFor="book">From</label>
							<Field name="book" type="text" as="select" className={styles.bookSelect}>
								<option style={{display: "none"}} value="">Select a book</option>
								{books.map(item => {
									return <option key={item.id} value={item.title + "%" + item.id}>{item.title}</option>
								})}
							</Field>
							<ErrorMessage name="book">
								{msg => <div className={styles.errorMessage}>{msg}</div>}	
							</ErrorMessage>
						</div>

						<button disabled={isSubmitting} type="submit">Add one!</button>
					</Form>
			}	
			</Formik>
	 </Modal>
  )
}

export default AddQuoteModal;