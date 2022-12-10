import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { auth } from '../../main';
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { update, ref } from "firebase/database";
import { db } from "../../main";
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setModal } from "../../slices/slice";
import styles from "./Form.module.scss";
import classNames from 'classnames';
import { RegisterPostData } from '../../types';

const format = (str: string) => {
	let arr: Array<string> = [];

	str.split(" ").forEach((publication) => {
		arr.push(publication[0].toUpperCase() + publication.substring(1))
	})

	return arr.join(" ")
}

interface Props {
	visible: boolean
}

interface Values {
	email: string,
	password: string,
	name: string,
	lastName: string
}

const RegisterModal = ({visible}: Props) => {
	const dispatch = useTypedDispatch();

	return (
		<Modal visible={visible}>
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
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					const { email, password, name, lastName } = values;
					try {
						const response = await createUserWithEmailAndPassword(auth, email, password);
						const userId = auth?.currentUser?.uid;
						
						const fullName = name.trim() + " " + lastName.trim();

						try {
							await updateProfile(response.user, { displayName: format(fullName)})

							const postData: RegisterPostData = {
								fullName
							};

							console.log(postData, userId)
		
							const updates: {
								[key: string]: RegisterPostData
							} = {};
							updates['data/users/' + userId] = postData;
							
							update(ref(db), updates);
							dispatch(setModal("none"))		
						} catch (e) {
							alert("Sorry, something came up, try again or later.")
						}
					} catch (e) {
						alert("Sorry, something came up, try again or later.")
					}
					
					setSubmitting(false);
					resetForm()
				}}
				validateOnChange
				validateOnBlur>
				{({isSubmitting}) => 
					<Form className={classNames(styles.form, styles.registerForm)}>
				
						<h1>Registration Form</h1>
						<div className={styles.group}>
							<label htmlFor="email">Email Address</label>
							<Field name="email" type="text" className={styles.input}/>
							<ErrorMessage name="email">
								{msg => <div className={styles.errorMessage}>{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className={styles.group}>
							<label htmlFor="name">Name</label>
							<Field name="name" type="text" className={styles.input}/>
							<ErrorMessage name="name">
								{msg => <div className={styles.errorMessage}>{msg}</div>}	
							</ErrorMessage>
						</div>

						<div className={styles.group}>
							<label htmlFor="lastName">Lastname</label>
							<Field name="lastName" type="text" className={styles.input}/>
							<ErrorMessage name="lastName">
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
						<button disabled={isSubmitting} type="submit" onClick={(e) => e.stopPropagation()}>Register!</button>
						
					</Form>
			}	
			
			</Formik>
		</Modal>
	)
}

export default RegisterModal;