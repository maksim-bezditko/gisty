import styles from "./Menu.module.scss";
import "./Menu.scss";
import { useContext } from "react";
import { authContext } from "../App/App";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import "./Menu.scss";
import { auth } from "../../main";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { menuSelector } from "../../selectors/selectors";
import { setModal } from "../../slices/slice";
import { setMenu } from "../../slices/slice";
import classNames from "classnames";

const Menu = () => {
  const user = useContext(authContext);
  const dispatch = useTypedDispatch();
  const menu = useSelector(menuSelector);

  return (
    <div
      className={styles.menu}
      style={{ display: menu ? "block" : "none" }}
      onClick={() => {
        dispatch(setMenu(false));
      }}
    >
      <CSSTransition in={menu} timeout={400} classNames="slide">
        <div
          className={styles.menuMain}
          style={{ transform: "translateX(0)" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p
            className={classNames(styles.menuItem, styles.margin)}
            onClick={() => dispatch(setModal("add"))}
          >
            Add a book
          </p>

          <NavLink
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setMenu(false));
            }}
            to="/"
            end
            className={styles.menuItem}
            id="books"
          >
            My books
          </NavLink>

          <NavLink
            to="quotes"
            end
            id="quotes"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setMenu(false));
            }}
          >
            My quotes
          </NavLink>

          <NavLink
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setMenu(false));
            }}
            to="stats"
            end
            id="statsMenu"
          >
            My stats
          </NavLink>
          {!user ? null : (
            <p
				  className={classNames(styles.menuItem, styles.logoutMenu)}
              onClick={() => {
                if (window.confirm("Are you sure that you want to log out?")) {
                  signOut(auth);
                  dispatch(setMenu(false));
                }
              }}
            >
              Log out
            </p>
          )}
          {auth.currentUser ? (
            <p
              className="greeting"
              onClick={() => {
                dispatch(setMenu(false));
              }}
            >
              Logged in as{" "}
              <span className={styles.name}>{auth.currentUser.displayName}</span>
            </p>
          ) : (
            <p
              className={styles.menuItem}
              onClick={() => dispatch(setModal("login"))}
            >
              Log in
            </p>
          )}
          {user ? null : (
            <p
				className={styles.menuItem}
              onClick={() => dispatch(setModal("register"))}
            >
              Register
            </p>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Menu;
