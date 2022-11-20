import "./Header.scss";
import gistyLogo from "../assets/Gisty.png";
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { Fade as Hamburger} from "hamburger-react";
import { CSSTransition } from "react-transition-group";
import { signOut } from "firebase/auth";
import { auth } from "..";
import AddModal from "./popups/AddModal";
import LoginModal from "./popups/LoginModal";
import RegisterModal from "./popups/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../slices/slice";
import { modalSelector } from "../selectors/sectionSelector";

const Header = ({authed}) => {

	const [isOpen, setOpen] = useState(false);

	const modal = useSelector(modalSelector);

	const dispatch = useDispatch()

	const handleClick = () => setOpen(prev => !prev);

	const checkKeypress = useCallback(event => {
		if (event.key === "Escape") {
			setOpen(false)
		}	
	}, [])

	useEffect(() => {
		document.addEventListener("keyup", checkKeypress)

		console.log(auth.currentUser)

		return () => {
			document.removeEventListener("keypress", checkKeypress)
		}
	})
	

	return (
		<>
			<LoginModal visible={modal === "login" ? true : false}/>
			<AddModal visible={modal === "add" ? true : false}/>
			<RegisterModal visible={modal === "register" ? true : false}/>

			<header>

				<div className="header-wrapper">
					<div className="logo-and-nav">
						<NavLink to="/books" end><img src={gistyLogo} alt="company logo"/></NavLink>

						

						<NavLink 
							to="/books" 
							style={({ isActive }) => (
								{color: isActive ? "#8950FC" : "#464E5F"}
							)}
							className="nav-item first-button">
								My books
						</NavLink>
						<NavLink 
							to="/quotes" 
							style={({ isActive }) => ({
								color: isActive ? "#8950FC" : "#464E5F"
							})}
							className="nav-item second-button">
								My quotes
						</NavLink>

					</div>
					<div className="button-group">
						<button className={`button add-button${authed ? "" : " hidden"}`} onClick={() => dispatch(setModal("add"))}>Add a book</button>
						{authed ? <button className="button login-button" onClick={() => {signOut(auth); localStorage.setItem("auth", true)}}>Log out</button> : <button className="button login-button" onClick={() => dispatch(setModal("login"))}>Log in</button>}
						{authed ? <p className="greeting-header">{auth.currentUser ? <div><span className="hello">Hello, </span><span className="name">{auth.currentUser.displayName}</span></div> : null}</p> : <button className="button register-button" onClick={() => dispatch(setModal("register"))}>Register</button>}
					</div>
					
					<div className="hamburger">
						<Hamburger size={27} distance="lg" toggled={isOpen} toggle={handleClick} color="#3F4254" />
					</div>

					<div 
						className="menu" 
						style={{display: isOpen ? "block" : "none"}} 
						onClick={() => {
							setOpen(false)
						}}>
						<CSSTransition
							in={isOpen} 
							timeout={400} 
							classNames="slide">
								<div className="menu-main"
									style={{transform: "translateX(0)"}}
									onClick={(e) => {
										e.stopPropagation()
										setOpen(true)
									}}>

										<p className="menu-item margin" onClick={() => dispatch(setModal("add"))}>Add a book</p>

										<NavLink 
											onClick={(e) => {
												e.stopPropagation()
												setOpen(false)
											}}
											to="/" end 
											className="menu-item"
											id="books">
											My books
										</NavLink>

										<NavLink 
											to="quotes" end 
											id="quotes"
											onClick={(e) => {
												e.stopPropagation()
												setOpen(false)
											}}>
											My quotes
										</NavLink>

										<NavLink 
											onClick={(e) => {
												e.stopPropagation()
												setOpen(false)
											}}
											to="stats" end
											id="stats-menu">
											My stats
										</NavLink>
										{authed ? <p className="greeting">Logged in as <span className="name">{auth.currentUser.displayName}</span></p> : <p className="menu-item" onClick={() => dispatch(setModal("login"))}>Log in</p>}
										{authed ? null: <p className="menu-item" onClick={() => dispatch(setModal("register"))}>Register</p>}
								</div>
						</CSSTransition>
					</div>

					{/* <div className="popups">
						{renderPopup("register")}
					</div> */}
					
				</div>
				

			</header>

		</>
	)
}

export default Header;