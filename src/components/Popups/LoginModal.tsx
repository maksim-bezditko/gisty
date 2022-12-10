import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { auth } from '../../main';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setModal } from '../../slices/slice';
import styles from "./Form.module.scss"

interface Props {
	visible: boolean
}

interface Values {
	email: string,
	password: string
}

function LoginModal({visible}: Props) {
	const dispatch = useTypedDispatch()

  return (
	 <Modal visible={visible}>
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
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				const { email, password } = values;

				try {
					await signInWithEmailAndPassword(auth, email, password);
					dispatch(setModal("none"))
				} catch (e) {
					alert("Sorry, something came up, try agaain or later.")
				}
				
				setSubmitting(false);
				resetForm();
			}}
			validateOnChange
			validateOnBlur>
			{({isSubmitting}) => 
				<Form className={styles.form}>
					<h1>Login Form</h1>
					<div className={styles.group}>
						<label htmlFor="email">Email Address</label>
						<Field name="email" type="text" className={styles.input}/>
						<ErrorMessage name="email">
							{msg => <div className={styles.errorMessage}>{msg}</div>}	
						</ErrorMessage>
					</div>

					<div className={styles.group}>
						<label htmlFor="password">Password</label>
						<Field name="password" type="password" className={styles.input}/>
						<ErrorMessage name="password">
							{msg => <div className={styles.errorMessage}>{msg}</div>}	
						</ErrorMessage>
					</div>
					<button disabled={isSubmitting} type="submit">Log in!</button>
					
				</Form>
			}	
			
			</Formik>
	 </Modal>
  )
}

export default LoginModal