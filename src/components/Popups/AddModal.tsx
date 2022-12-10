import Modal from "../../HOCs/Modal/Modal";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { auth } from "../../main";
import { db } from "../../main";
import { ref, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setModal } from "../../slices/slice";
import classNames from "classnames";
import { IStatuses, BookPostData } from "../../types";
import styles from "./Form.module.scss";

interface Props {
  visible: boolean
}

export const statuses: IStatuses = {
  Read: "✔️",
  Reading: "🟢",
  Planning: "📚",
  Abandoned: "🟡",
};

export interface Values {
  bookUrl: string,
  title: string,
  status: BookPostData["status"]
}

function AddModal({ visible }: Props) {
  const dispatch = useTypedDispatch();

  return (
    <Modal visible={visible}>
      <Formik
        initialValues={{ bookUrl: "", title: "", status: "" }}
        validationSchema={Yup.object({
          bookUrl: Yup.string()
            .required("Required")
            .matches(/([a-z\-_0-9/:.]*\.(jpg|jpeg|png|gif))/i, "Invalid URL"),
          title: Yup.string()
            .min(5, "Can't be less than five symbols")
            .required("Required"),
          status: Yup.string()
            .required()  
        })}
        onSubmit={(values: Values, { resetForm, setSubmitting }: FormikHelpers<Values>) => {
          const { bookUrl, title, status } = values;
          const newId = uuidv4();
          const uid = auth?.currentUser?.uid;
          const id =
            title.split(" ").join("-").toLowerCase() + "-" + newId.slice(0, 3);
          const timestamp = +new Date();
          try {
            const postData: BookPostData = {
              id,
              title,
              url: bookUrl,
              timestamp,
              status
            };

            const updates: {
              [key: string]: BookPostData
            } = {};
            updates[`/data/users/${uid}/books/` + id] = postData;
            dispatch(setModal("none"));
            update(ref(db), updates);
          } catch (e) {
            alert(e);
          }

          resetForm();
          setSubmitting(false);
        }}
        validateOnChange
        validateOnBlur
      >
        {({ isSubmitting }) => (
          <Form className={styles.form} onClick={(e) => e.stopPropagation()}>
            <h1>Wanna add a book?</h1>
            <div className={styles.group}>
              <label htmlFor="bookUrl">Book Cover (URL)</label>
              <Field
                name="bookUrl"
                type="text"
                className={classNames(styles.bookUrl, styles.input)}
              />
              <ErrorMessage name="bookUrl">
                {(msg) => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div className={styles.group}>
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" className={styles.input} />
              <ErrorMessage name="title">
                {(msg) => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div className={styles.group}>
              <label htmlFor="status">From</label>
              <Field
                name="status"
                type="text"
                as="select"
                className={styles.bookSelect}
              >
                <option style={{ display: "none" }} value="">
                  Select a stage
                </option>
                {Object.keys(statuses).map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage name="status">
                {(msg) => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <button disabled={isSubmitting} type="submit">
              Add one!
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddModal;
