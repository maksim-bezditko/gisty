import styles from "./Header.module.scss";
import gistyLogo from "../../assets/Gisty.png";
import { NavLink } from 'react-router-dom';
import { useCallback, useContext, useEffect } from "react";
import { Fade as Hamburger} from "hamburger-react";
import { signOut } from "firebase/auth";
import { auth } from "../../main";
import AddModal from "../Popups/AddModal";
import LoginModal from "../Popups/LoginModal";
import RegisterModal from "../Popups/RegisterModal";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setModal } from "../../slices/slice";
import { modalSelector } from "../../selectors/selectors";
import { authContext } from "../App/App";
import Menu from "../Menu/Menu";
import { useWindowSize } from "../../hooks/useWindowSize";
import { setMenu } from "../../slices/slice";
import { menuSelector } from "../../selectors/selectors";
import AddQuoteModal from '../Popups/AddQuoteModal';
import DeleteQuoteModal from "../Popups/DeleteBookModal";
import classNames from "classnames";
import { User } from "firebase/auth";

const Header = () => {

	const modal = useSelector(modalSelector);

	const { width } = useWindowSize();

	const user = useContext(authContext)

	const dispatch = useTypedDispatch()

	const menu = useSelector(menuSelector);

	const checkKeypress = useCallback((event: KeyboardEvent) => {
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

	const ButtonGroup = useCallback(({user, width}: {user: User, width: number}) => {
		if (!user) {
			return (
				<>
					<button className={classNames(styles.button, styles.loginButton)}
					onClick={() => dispatch(setModal("login"))}>
               	Log in
              </button>
				  <button
                className={classNames(styles.button, styles.registerButton)}
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
						className={classNames(styles.button, styles.addButton, {[styles.hidden]: user ? false : true})}
						onClick={() => dispatch(setModal("add"))}>
						Add a book
					</button>	
					<button className={classNames(styles.button, styles.loginButton)} onClick={logout}>
						Log out
					</button>
				</>
			)
		} else {
			return null;
		}
	}, [dispatch])

	return (
    <>
      <LoginModal visible={modal === "login" ? true : false} />
      <RegisterModal visible={modal === "register" ? true : false} />
      {auth.currentUser && (
			<>
				<AddModal visible={modal === "add" ? true : false} />
				<AddQuoteModal visible={modal === "add-quote" ? true : false} />
				<DeleteQuoteModal visible={modal === "delete-book" ? true : false} />
			</>
		)}

      <header>
        <div className={styles.headerWrapper}>
          <div className={styles.logoAndNav}>
            <NavLink to={user ? "/books" : "about"} end>
              <img src={gistyLogo} alt="company logo" />
            </NavLink>

            <NavLink
              to="/books"
              style={({ isActive }) => ({
                color: isActive ? "#8950FC" : "#464E5F",
					 display: width < 676 && user ? "" : "none"
              })}
				  className={classNames(styles.navItem, styles.firstButton, {[styles.hidden]: user ? false : true})}
            >
              My books
            </NavLink>
            <NavLink
              to="/quotes"
              style={({ isActive }) => ({
                color: isActive ? "#8950FC" : "#464E5F",
					 display: width < 676 && user ? "" : "none"
              })}
				  className={classNames(styles.navItem, styles.secondButton, {[styles.hidden]: user ? false : true})}>
              My quotes
            </NavLink>
          </div>


          <div className={styles.buttonGroup}>
				  <ButtonGroup user={user} width={width}/>
			 </div>
			 <div style={{display: width < 676 && user ? "" : "none"}}>
				<Hamburger size={27} distance="md" toggled={menu} toggle={() => dispatch(setMenu(true))} color="#3F4254" />
			</div>
			<Menu/>

        </div>
      </header>
    </>
  );
}

export default Header;