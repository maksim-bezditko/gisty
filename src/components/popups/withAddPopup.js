import withPopup from "../withPopup";
import "./form.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const withAddPopup = (trigger)=> () => {
	const PopupHOC = withPopup(trigger);

	return (
		<PopupHOC>
			<Formik
				initialValues={{ bookUrl: '', title: '', status: 'Not read yet', password: "" }}
				validationSchema={Yup.object({
					bookUrl: Yup.string()
						.required('Required')
						.matches(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/, "Invalid URL"),
					password: Yup.string()
						.min(5, "Can't be less than five symbols")
						.required('Required')
				})}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						setSubmitting(false);
						resetForm()
						alert(JSON.stringify(values, null, 2));
					}, 400);
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
							<label htmlFor="password">Password</label>
							<Field name="password" type="password" />
							<ErrorMessage name="password">
								{msg => <div className="error-message">{msg}</div>}	
							</ErrorMessage>
						</div>
						<button disabled={isSubmitting} type="submit">Log in!</button>
						
					</Form>
			}	
			
			</Formik>
		</PopupHOC>
	)
}

export default withAddPopup;