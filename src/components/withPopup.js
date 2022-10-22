import Popup from "reactjs-popup";
import "./withPopup.scss"

export const withPopup = (trigger) => ({children}) => {
	return (
		<Popup
				className="modal-back"
				trigger={trigger}
				modal
				lockScroll
				closeOnDocumentClick
				closeOnEscape
				nested
				overlayStyle={{
					backgroundColor: "#282c3486",
					width: "100vw",
					height: "100vh"
				}}>
					{children}
		</Popup>
	)
}

export default withPopup;

