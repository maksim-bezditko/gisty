import withPopup from "../withPopup";
import "./form.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../..";
import { ref, set, push, update, child } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const withAddPopup = (trigger)=> () => {
	const PopupHOC = withPopup(trigger);
	return (
		<PopupHOC>
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
					const fullDate = new Date();
					const date = fullDate.getDate() + "-" + (fullDate.getMonth() + 1) + "-" + fullDate.getFullYear();
					try {
						// set(ref(db, 'data/books/' + newId), {
						// 	id: newId,
						// 	title: title,
						// 	url: bookUrl,
						// 	date: date
						// })
						const postData = {
							id: newId,
							title: title,
							url: bookUrl,
							date: date,
							status: status
						};
						//  const newPostKey = push(child(ref(db), 'data/books')).key;

						 const updates = {};
						 updates['/data/books/' + newId] = postData;
					  
						 return update(ref(db), updates);
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
		</PopupHOC>
	)
}

export default withAddPopup;