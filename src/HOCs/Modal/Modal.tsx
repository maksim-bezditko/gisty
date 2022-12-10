import React from 'react';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setModal } from '../../slices/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { modalSelector } from '../../selectors/selectors';

import styles from "./Modal.module.scss";
import classNames from 'classnames';

interface Props {
	visible: boolean,
	children: React.ReactNode
}

function Modal({visible, children}: Props) {

	const modalStatus = useSelector(modalSelector);

	const dispatch = useTypedDispatch();

	useEffect((): any => {
		if (modalStatus !== "none") {
			document.body.style.overflow = 'hidden';
		}
		return () => document.body.style.overflow = 'unset';
	}, [modalStatus]);

  	return (
	 	<div
			className={classNames(styles.modalWrapper, {[styles.hidden]: visible ? false : true})}
			onClick={() => dispatch(setModal("none"))}>      

			<div
				className={classNames(styles.modalWindow, {[styles.hidden]: visible ? false : true})}
				onClick={(e) => {
				e.stopPropagation()
			}}>
				{children}
			</div>
	 	</div>
  )
}

export default Modal