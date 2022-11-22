import "./Header.scss";
import gistyLogo from "../assets/Gisty.png";
import { NavLink } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from "react";
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
import { authContext } from "./App";
import Menu from "./Menu";
import { useWindowSize } from "../hooks/useWindowSize";
import { setMenu } from "../slices/slice";
import { menuSelector } from "../selectors/sectionSelector";
import AddQuoteModal from './popups/AddQuoteModal';

const Header = () => {

	const modal = useSelector(modalSelector);

	const { width } = useWindowSize();

	const user = useContext(authContext)

	const dispatch = useDispatch()

	const menu = useSelector(menuSelector);

	const checkKeypress = useCallback(event => {
		if (event.key === "Escape") {
			setMenu(false)
		}	
	}, [])

	useEffect(() => {
		document.addEventListener("keyup", checkKeypress)
		console.log(auth.currentUser)

		return () => {
			document.removeEventListener("keypress", checkKeypress)
		}			
	})

	const logout = () => {
		signOut(auth)
	}

	const ButtonGroup = useCallback(({user, width}) => {
		if (!user) {
			return (
				<>
					<button className='button login-button'
					onClick={() => dispatch(setModal("login"))}>
               	Log in
              </button>
				  <button
                className="button register-button"
                onClick={() => dispatch(setModal("register"))}
              >
                Register
              </button>
				</>
			)

		} else if (user && width < 676) {
			return null
		} else if (user && width >= 676) {
			return (
				<>
					<button
						className={`button add-button${user ? "" : " hidden"}`}
						onClick={() => dispatch(setModal("add"))}
						>
						Add a book
					</button>	
					<button className='button login-button' onClick={logout}>
						Log out
					</button>
				</>
			)
		}
	}, [dispatch])

	return (
    <>
      <LoginModal visible={modal === "login" ? true : false} />
      <AddModal visible={modal === "add" ? true : false} />
      <RegisterModal visible={modal === "register" ? true : false} />
		<AddQuoteModal visible={modal === "add-quote" ? true : false} />

      <header>
        <div className="header-wrapper">
          <div className="logo-and-nav">
            <NavLink to={user ? "/books" : "about"} end>
              <img src={gistyLogo} alt="company logo" />
            </NavLink>

            <NavLink
              to="/books"
              style={({ isActive }) => ({
                color: isActive ? "#8950FC" : "#464E5F",
					 display: width < 676 && user ? "" : "none"
              })}
              className={`nav-item first-button${user ? "" : " hidden"}`}
            >
              My books
            </NavLink>
            <NavLink
              to="/quotes"
              style={({ isActive }) => ({
                color: isActive ? "#8950FC" : "#464E5F",
					 display: width < 676 && user ? "" : "none"
              })}
              className={`nav-item second-button${user ? "" : " hidden"}`}
            >
              My quotes
            </NavLink>
          </div>


          <div className="button-group">
				  <ButtonGroup user={user} width={width}/>
			 </div>
			 <div className="hamburger" style={{display: width < 676 && user ? "" : "none"}}>
				<Hamburger size={27} distance="lg" toggled={menu} toggle={() => dispatch(setMenu(true))} color="#3F4254" />
			</div>
			<Menu/>

        </div>
      </header>
    </>
  );
}

export default Header;