import Popup from "reactjs-popup";
import "./withPopup.scss";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

export const withPopup = (trigger) => ({children}) => {
	const [isOpen, setOpen] = useState(false)

	return (
		<Popup
				className="modal-back"
				trigger={trigger}
				modal
				closeOnDocumentClick
				closeOnEscape
				nested
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				overlayStyle={{
					backgroundColor: "#282c3486",
					width: "100vw",
					height: "100vh"
				}}>
				<CSSTransition
					in={isOpen}
					classNames='slide'
					timeout={500}>
					{children}
				</CSSTransition>
		</Popup>
	)
}

export default withPopup;

