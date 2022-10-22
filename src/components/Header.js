import "./Header.scss";
import gistyLogo from "../assets/Gisty.png";
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { Fade as Hamburger} from "hamburger-react";
import { CSSTransition } from "react-transition-group";

// Higher-order components to create popups passing trigger argument

import withAddPopup from "./popups/withAddPopup";
import withRegisterPopup from "./popups/withRegisterPopup";
import withLoginPopup from './popups/withLoginPopup';

const activeStyle = {
	transform: "translateX(0)"
}

const Header = () => {
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => setOpen(prev => !prev);

	const checkKeypress = useCallback(event => {
		if (event.key === "Escape") {
			setOpen(false)
		}	
	}, [])

	useEffect(() => {
		document.addEventListener("keyup", checkKeypress)

		return () => {
			document.removeEventListener("keypress", checkKeypress)
		}
	})
	
	const AddPopup = withAddPopup(<button className="button add-button">Add a book</button>)
	const AddPopupMenu = withAddPopup(<p className="menu-item margin">Add a book</p>)

	const RegisterPopup = withRegisterPopup(<button className="button register-button">Register</button>)
	const RegisterPopupMenu = withRegisterPopup(<p className="menu-item">Register</p>)

	const LoginPopup = withLoginPopup(<button className="button login-button">Log in</button>)
	const LoginPopupMenu = withLoginPopup(<p className="menu-item">Log in</p>)
	

	return (
			<header>
				<div className="header-wrapper">
					<div className="logo-and-nav">
						<NavLink to="/" end><img src={gistyLogo} alt="company logo"/></NavLink>

						<NavLink 
							to="/" end 
							style={({ isActive }) => (
								{color: isActive ? "#8950FC" : "#464E5F"}
							)}
							className="nav-item first-button">
								My books
						</NavLink>
						<NavLink 
							to="/quotes" end 
							style={({ isActive }) => ({
								color: isActive ? "#8950FC" : "#464E5F"
							})}
							className="nav-item second-button">
								My quotes
						</NavLink>

					</div>
					<div className="button-group">
						<AddPopup/>
						<LoginPopup/>
						<RegisterPopup/>
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
							timeout={5000} 
							classNames="slide">
								<div className="menu-main"
									style={{transform: "translateX(0)"}}
									onClick={(e) => {
										e.stopPropagation()
										setOpen(true)
									}}>

										<AddPopupMenu/>

										<NavLink 
											onClick={(e) => {
												e.stopPropagation()
												setOpen(false)
											}}
											to="/" end 
											className="menu-item"
											style={({ isActive }) =>
												isActive ? activeStyle : undefined
											}
											id="books">
											My books
										</NavLink>

										<NavLink 
											to="quotes" end 
											className={({ isActive }) =>
												isActive ? activeStyle : undefined
											}
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
											className={({ isActive }) =>
												isActive ? activeStyle : undefined
											}
											id="stats-menu">
											My stats
										</NavLink>
										<LoginPopupMenu/>
										<RegisterPopupMenu/>
								</div>
						</CSSTransition>
					</div>

					{/* <div className="popups">
						{renderPopup("register")}
					</div> */}
					
				</div>
				

			</header>
	)
}

export default Header;

