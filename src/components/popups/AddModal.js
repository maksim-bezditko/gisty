import React from 'react'
import Modal from '../Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from '../..';
import { db } from '../..';
import { ref, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "./form.scss";
import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/slice';

function AddModal({visible}) {
	const dispatch = useDispatch();

  return (
	 <Modal visible={visible}>
		<Formik
				initialValues={{ bookUrl: '', title: '', status: 'read'}}
				validationSchema={Yup.object({
					bookUrl: Yup.string()
						.required('Required')
						.matches(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/, "Invalid URL"),
					title: Yup.string()
						.min(5, "Can't be less than five symbols")
						.required('Required')
				})}
				onSubmit={(values, { resetForm, setSubmitting }) => {
					const {bookUrl, title, status} = values;
					const newId = uuidv4()
					const uid = auth.currentUser.uid;
					const fullDate = new Date();
					const date = fullDate.getDate() + "-" + (fullDate.getMonth() + 1) + "-" + fullDate.getFullYear();
					try {
						const postData = {
							id: newId,
							title: title,
							url: bookUrl,
							date: date,
							status: status
						};

						const updates = {};
						updates[`/data/users/${uid}/books/` + newId] = postData;
						dispatch(setModal("none"))
						update(ref(db), updates);
					} catch (e) {
						alert(e)
					}

					resetForm()
					setSubmitting(false)
				}}
				validateOnChange
				validateOnBlur>
				{({isSubmitting, isValid}) => 
					<Form className="form">
						<h1>Wanna add a book?</h1>
						<div className="group">
							<label htmlFor="bookUrl">Book Cover (URL)</label>
							<Field name="bookUrl" type="text" className='bookUrl' />
							<ErrorMessage name="bookUrl">
								{msg => <div className="error-message">{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className="group">
							<label htmlFor="title">Title</label>
							<Field name="title" type="text" />
							<ErrorMessage name="title">
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

export default AddModal