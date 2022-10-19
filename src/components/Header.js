import "./Header.scss";
import gistyLogo from "../assets/Gisty.png";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from 'react-router-dom';
import { useState, useCallback } from "react";
// style={{color: currentSection === "books" ? "#8950FC" : "#464E5F"}}

const activeStyle = {
	backgroundColor: "red"
}

const Header = () => {

	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => setIsOpen(prev => !prev);

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
						{/* <button className="nav-item second-button" style={{color: currentSection === "quotes" ? "#8950FC" : "#464E5F"}}>Quotes</button> */}

					</div>

					<div className="button-group">
						<button className="button add-button">Add a book</button>
						<button className="button login-button">Log in</button>
						<button className="button register-button">Register</button>
					</div>

					<Menu isOpen={isOpen} onOpen={handleClick} onClose={handleClick} right>
						{/* <a id="log in" href="#">Log in</a>
						<a id="register" href="#">Register</a> */}
						<br/>
						
						<NavLink 
							to="/" end 

							className="menu-item"

							style={({ isActive }) =>
              				isActive ? activeStyle : undefined
            			}
							id="books"
							onClick={handleClick}>
							My books
						</NavLink>
						
						<NavLink 
							to="quotes" end 
							className={({ isActive }) =>
              				isActive ? activeStyle : undefined
            			}
							id="quotes"
							onClick={handleClick}>
							My quotes
						</NavLink>

						<NavLink 
							onClick={handleClick}
							to="stats" end 
							className={({ isActive }) =>
              				isActive ? activeStyle : undefined
            			}
							id="stats">
							My stats
						</NavLink>

						{/* <a id="stats" href="/">My stats</a> */}
						
						
						<br/>
						{/* <a id="addBook" href="#">Add a book</a>
						<br/>
						<a id="settings" href="#">Settings</a>
						<a id="report" href="#">Report a bug</a> */}
					</Menu>
					
				</div>
				

			</header>
	)
}

export default Header;

