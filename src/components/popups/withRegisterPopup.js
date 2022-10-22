import withPopup from "../withPopup";
import "./form.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const withRegisterPopup = (trigger) => () => {
	const PopupHOC = withPopup(trigger);

	return (
		<PopupHOC>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object({
					email: Yup.string()
						.min(5, "Can't be less than five symbols")
						.required('Required')
						.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
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
				
						<h1>Registration Form</h1>
						<div className="group">
							<label htmlFor="email">Email Address</label>
							<Field name="email" type="text" />
							<ErrorMessage name="email">
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



