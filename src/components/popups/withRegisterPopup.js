import withPopup from "../withPopup";
import "./form.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../../index";

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
				onSubmit={(values, { setSubmitting, resetForm }) => {
					createUser(values)
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



