import withPopup from "../withPopup";
import "./form.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../index";
import { updateProfile } from "firebase/auth";

const format = (str) => {
	let arr = [];

	str.split(" ").forEach((publication, index) => {
		arr.push(publication[0].toUpperCase() + publication.substring(1))
	})

	return arr.join(" ")
}

const withRegisterPopup = (trigger) => () => {
	const PopupHOC = withPopup(trigger);

	return (
		<PopupHOC>
			<Formik
				initialValues={{ email: '', password: '', name: '', lastName: '' }}
				validationSchema={Yup.object({
					email: Yup.string()
						.min(5, "Can't be less than five symbols")
						.required('Email required')
						.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
					password: Yup.string()
						.min(5, "Can't be less than five symbols")
						.required('Password required'),
					name: Yup.string()
						.min(1, "One letter can't be a name")
						.required("Name required"),
					lastName: Yup.string()
						.min(1, "One letter can't be a name")
						.required("Lastname required")
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					const { email, password, name, lastName } = values;
					try {
						const response = await createUserWithEmailAndPassword(auth, email, password);

						const fullName = name.trim() + " " + lastName.trim();

						try {
							await updateProfile(response.user, { displayName: format(fullName)})
						} catch (e) {
							alert("Sorry, something came up, try agaain or later.")
						}
						
						console.log(response)
					} catch (e) {
						alert("Sorry, something came up, try agaain or later.")
					}
					setSubmitting(false);
					resetForm()
				}}
				validateOnChange
				validateOnBlur>
				{({isSubmitting, isValid}) => 
					<Form className="form register-form">
				
						<h1>Registration Form</h1>
						<div className="group">
							<label htmlFor="email">Email Address</label>
							<Field name="email" type="text" />
							<ErrorMessage name="email">
								{msg => <div className="error-message">{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className="group">
							<label htmlFor="name">Name</label>
							<Field name="name" type="text" />
							<ErrorMessage name="name">
								{msg => <div className="error-message">{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className="group">
							<label htmlFor="lastName">Lastname</label>
							<Field name="lastName" type="text" />
							<ErrorMessage name="lastName">
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
						<button disabled={isSubmitting} type="submit">Register!</button>
						
					</Form>
			}	
			
			</Formik>
		</PopupHOC>
	)
}

export default withRegisterPopup;



