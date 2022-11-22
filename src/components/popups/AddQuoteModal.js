import React from 'react'
import Modal from '../Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from '../..';
import { db } from '../..';
import { ref, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "./form.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../slices/slice';
import { booksSelector } from '../../selectors/sectionSelector';

function AddQuoteModal({visible}) {
	const dispatch = useDispatch();
	const books = useSelector(booksSelector)

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
					const newId = uuidv4()
					const uid = auth.currentUser.uid;
					const fullDate = new Date();
					const date = fullDate.getDate() + "-" + (fullDate.getMonth() + 1) + "-" + fullDate.getFullYear();
					try {
						const postData = {
							book,
							quote,
							id: newId,
							date
						};

						const updates = {};
						updates[`/data/users/${uid}/quotes/` + newId] = postData;
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
					<Form className="form">
						<h1>Wanna add a quote?</h1>

						<div className="group">
							<label htmlFor="quote">Quote</label>
							<Field name="quote" type="text" />
							<ErrorMessage name="quote">
								{msg => <div className="error-message">{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className="group">
							<label htmlFor="book">From</label>
							<Field name="book" type="text" as="select" className="book-select">
								<option style={{display: "none"}} value="">Select a book</option>
								{books.map(item => {
									return <option key={item.id} value={item.title}>{item.title}</option>
								})}
							</Field>
							<ErrorMessage name="book">
								{msg => <div className="error-message">{msg}</div>}	
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