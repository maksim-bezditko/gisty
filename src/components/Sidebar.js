import "./Sidebar.scss"
import logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom"
import { setModal } from "../slices/slice";
import { useDispatch } from "react-redux";
import { auth } from "..";

const activeStyle = {
	backgroundColor: "#3f4254c0"
}

const Sidebar = () => {
	const dispatch = useDispatch();

	const loggedIn = localStorage.getItem("auth") === "true";

	return (
		<aside>
      	<NavLink to="/books">
				<img src={logo} className='logo' alt="logo"/>
			</NavLink> 

			
			<div className={`icon add${auth.currentUser ? "" : " hidden"}`} onClick={() => dispatch(setModal("add"))}> 
				<svg className="test" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20.1797 13.4375C20.6327 13.4375 21 13.0702 21 12.6172V3.92188C21 2.1126 19.528 0.64063 17.7188 0.64063H16.6523H16.2747C16.7278 0.64063 15.5 0.64063 16.2747 0.64063C15.8216 0.64063 16.4635 0.64063 15.832 0.64063H15.0117H11.2793C10.587 0.64063 10.912 0.64063 10.459 0.64063C10.0059 0.64063 10.2357 0.64063 9.63867 0.64063H5.94727L5.42969 0.640625C6.07422 0.64064 5.61319 0.640633 5.16014 0.640633C4.70708 0.640633 5.71959 0.640622 5 0.64063H4.30664H3.28125C1.47197 0.64063 0 2.1126 0 3.92188V16.7188C0 18.528 1.47197 20 3.28125 20H17.7188C19.528 20 21 18.528 21 16.7188C21 16.2657 20.6327 15.8984 20.1797 15.8984C19.7266 15.8984 19.3594 16.2657 19.3594 16.7188C19.3594 17.6234 18.6234 18.3594 17.7188 18.3594H3.28125C2.37661 18.3594 1.64062 17.6234 1.64062 16.7188V3.92188C1.64062 3.01724 2.37661 2.28126 3.28125 2.28126H4.30664H4.70107C5.5 2.28126 4.8547 2.28126 5.30775 2.28126C5.76081 2.28126 5.12695 2.28126 5.5747 2.28126H5.94727H9.63867H10C10.7671 2.28126 10.0059 2.28126 10.459 2.28126C10.912 2.28126 10.3805 2.28126 11.2793 2.28126H15.0117H15.832C16.5 2.28126 15.8216 2.28126 16.2747 2.28126C16.7278 2.28126 16 2.28126 16.5 2.28126H16.6523H17.7188C18.6234 2.28126 19.3594 3.01724 19.3594 3.92188V12.6172C19.3594 13.0702 19.7266 13.4375 20.1797 13.4375Z" fill="#EEE5FF"/>
					<path d="M10.459 15.0371C10.912 15.0371 11.2793 14.6699 11.2793 14.2168V11.9609H13.5352C13.9882 11.9609 14.3555 11.5937 14.3555 11.1406C14.3555 10.6876 13.9882 10.3203 13.5352 10.3203H11.2793V8.06445C11.2793 7.61139 10.912 7.24414 10.459 7.24414C10.0059 7.24414 9.63867 7.61139 9.63867 8.06445V10.3203H7.38281C6.92975 10.3203 6.5625 10.6876 6.5625 11.1406C6.5625 11.5937 6.92975 11.9609 7.38281 11.9609H9.63867V14.2168C9.63867 14.6699 10.0059 15.0371 10.459 15.0371Z" fill="#EEE5FF"/>
				</svg>
			</div>

			
			<NavLink 
				style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
				to="/books" 
				className="icon home">

				<svg width="21" height="21" viewBox="0 0 21 21" fill="black" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_3136_3465)">
					<path d="M10.6015 20.1404C10.6015 20.5926 10.2351 20.9591 9.78282 20.9591H5.36195C3.5563 20.9591 2.08726 19.4899 2.08726 17.6843V9.75595L1.43758 10.4043C1.27769 10.5639 1.06844 10.6435 0.859198 10.6435C0.649474 10.6435 0.439589 10.5634 0.279692 10.4032C-0.039621 10.0833 -0.0391403 9.56481 0.280814 9.24549L8.88897 0.654323C8.90002 0.643429 8.91124 0.632694 8.92294 0.62228C9.8578 -0.210049 11.2655 -0.207005 12.197 0.629169C12.2087 0.639904 12.2202 0.650799 12.2314 0.662174L18.3876 6.87444C18.7058 7.19567 18.7034 7.71398 18.3823 8.03217C18.0611 8.35036 17.5428 8.34812 17.2244 8.02688L11.0881 1.83448C10.7824 1.57301 10.3328 1.57221 10.0264 1.83256L3.7234 8.12301C3.72356 8.13086 3.72452 8.13871 3.72452 8.14656V17.6843C3.72452 18.5871 4.45912 19.3217 5.36195 19.3217H9.78282C10.2351 19.3217 10.6015 19.6883 10.6015 20.1404ZM20.9988 12.1172V15.335C20.9988 16.7198 20.4523 18.1335 19.4994 19.2139C18.4833 20.3657 17.1549 21 15.7592 21C14.3636 21 13.0354 20.3657 12.0193 19.2139C11.0663 18.1335 10.5197 16.7198 10.5197 15.335V12.1172C10.5197 11.8056 10.6967 11.5209 10.9763 11.383L15.3755 9.21345C15.4882 9.15786 15.612 9.12902 15.7376 9.12902H15.7809C15.9065 9.12902 16.0305 9.15786 16.1431 9.21345L20.5422 11.383C20.822 11.5209 20.9988 11.8056 20.9988 12.1172ZM19.3616 12.6264L15.7592 10.8499L12.1571 12.6264V15.3349C12.1571 17.4429 13.874 19.3626 15.7592 19.3626C17.6445 19.3626 19.3616 17.4429 19.3616 15.3349V12.6264Z" fill="white"/>
					</g>
					<defs>
					<clipPath id="clip0_3136_3465">
					<rect width="21" height="21" fill="white"/>
					</clipPath>
					</defs>
				</svg>
			</NavLink>

			<NavLink 
				style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } 
				to="quotes"
				className={`icon quotes${auth.currentUser ? "" : " hidden"}`}>

				<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.1984 2.12871H11.3373V1.28789C11.3373 0.824414 10.9641 0.451172 10.5006 0.451172C10.0371 0.451172 9.66387 0.824414 9.66387 1.28789V2.12871H3.80273C2.6502 2.12871 1.71094 3.06797 1.71094 4.22051V18.4529C1.71094 19.6055 2.6502 20.5447 3.80273 20.5447H17.2025C18.3551 20.5447 19.2943 19.6055 19.2943 18.4529V4.22051C19.2943 3.06797 18.3551 2.12871 17.1984 2.12871ZM14.4832 3.80215L13.6998 5.82422H7.30137L6.51797 3.80215H14.4832ZM17.6168 18.457C17.6168 18.6867 17.4281 18.8754 17.1984 18.8754H3.80273C3.57305 18.8754 3.38437 18.6867 3.38437 18.457V4.22461C3.38437 3.99492 3.57305 3.80625 3.80273 3.80625H4.72148L5.94375 6.96855C6.0668 7.29258 6.37852 7.50586 6.72305 7.50586H14.274C14.6186 7.50586 14.9303 7.29258 15.0533 6.96855L16.2756 3.80625H17.1943C17.424 3.80625 17.6127 3.99492 17.6127 4.22461V18.457H17.6168Z" fill="#EEE5FF"/>
					<path d="M14.4501 11.5992H6.78838C6.3249 11.5992 5.95166 11.226 5.95166 10.7625C5.95166 10.299 6.3249 9.92578 6.78838 9.92578H14.4501C14.9136 9.92578 15.2868 10.299 15.2868 10.7625C15.2868 11.226 14.9095 11.5992 14.4501 11.5992Z" fill="#EEE5FF"/>
					<path d="M14.4501 15.8812H6.78838C6.3249 15.8812 5.95166 15.508 5.95166 15.0445C5.95166 14.5811 6.3249 14.2078 6.78838 14.2078H14.4501C14.9136 14.2078 15.2868 14.5811 15.2868 15.0445C15.2868 15.508 14.9095 15.8812 14.4501 15.8812Z" fill="#EEE5FF"/>
				</svg>
			</NavLink>

			<NavLink 
				style={({ isActive }) =>
				isActive ? activeStyle : undefined
				} 
				to="stats"
				className={`icon quotes${auth.currentUser ? "" : " hidden"}`}>

					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect opacity="0.3" x="16.1606" y="4.91248" width="3.72942" height="19.6499" rx="1.86471" fill="white"/>
						<rect x="9.94531" y="11.0531" width="3.72942" height="13.5093" rx="1.86471" fill="white"/>
						<rect x="22.3765" y="13.5093" width="3.72942" height="11.0531" rx="1.86471" fill="white"/>
						<rect x="3.72949" y="15.9656" width="3.72942" height="8.59684" rx="1.86471" fill="white"/>
					</svg>
			</NavLink>

			<NavLink 
				style={({ isActive }) =>
				isActive ? {backgroundColor: "#2C9AFF"} : undefined
				} 
				to="settings"
				className={`icon stats${auth.currentUser ? "" : " hidden"}`}>
					<div className="icon settings">
						<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_3136_3442)">
							<path d="M17.7726 13.4674C17.8668 13.2477 18.0822 13.105 18.3179 13.1041H18.3968C19.8322 13.1041 21 11.9363 21 10.501C21 9.06562 19.8322 7.89783 18.3968 7.89783H18.2511C18.0488 7.89701 17.8635 7.7948 17.7542 7.63025C17.7421 7.57049 17.7236 7.51204 17.6989 7.45593C17.5998 7.23158 17.6459 6.97347 17.8162 6.79731L17.8627 6.7508C17.864 6.74957 17.8653 6.74829 17.8665 6.74702C18.3579 6.25508 18.6284 5.60122 18.6279 4.90588C18.6275 4.21174 18.3573 3.55923 17.8669 3.06811C17.8656 3.06679 17.8643 3.06552 17.8631 3.06421C17.3715 2.57313 16.7182 2.3028 16.0234 2.3028C16.0229 2.3028 16.0224 2.3028 16.0219 2.3028C15.3266 2.30317 14.673 2.57432 14.182 3.06593L14.1334 3.11458C13.9572 3.28483 13.6991 3.33093 13.4747 3.23192C13.472 3.23073 13.4692 3.2295 13.4664 3.22831C13.2467 3.13414 13.104 2.91877 13.1031 2.6831V2.6041C13.1031 1.16877 11.9353 0.000976562 10.4999 0.000976562C9.06456 0.000976562 7.89682 1.16877 7.89682 2.6041V2.74991C7.896 2.9522 7.79379 3.13746 7.62923 3.24673C7.56947 3.25883 7.51102 3.27737 7.45492 3.3021C7.2306 3.40115 6.97245 3.35505 6.79629 3.18475L6.74601 3.13443C6.25435 2.64335 5.60118 2.37302 4.90638 2.37302C4.90589 2.37302 4.90532 2.37302 4.90487 2.37302C4.20953 2.37339 3.55595 2.64454 3.06319 3.13787C2.57179 3.62977 2.30137 4.28364 2.30178 4.97897C2.30215 5.67431 2.57331 6.32785 3.06492 6.81888L3.11352 6.86749C3.28381 7.04365 3.32992 7.30171 3.23091 7.52611C3.22365 7.54248 3.217 7.55905 3.21081 7.57582C3.12615 7.80592 2.91447 7.95915 2.67006 7.96797H2.60308C1.16779 7.96797 0 9.13576 0 10.5711C0 12.0065 1.16779 13.1743 2.60321 13.1742H2.74897C2.98809 13.1752 3.20338 13.3177 3.29756 13.5374C3.29874 13.5403 3.29997 13.5431 3.30116 13.5458C3.40022 13.7702 3.35412 14.0283 3.18378 14.2045L3.13518 14.253C3.13407 14.2542 3.13296 14.2553 3.13181 14.2565C2.64147 14.7482 2.37167 15.4014 2.37204 16.0959C2.37241 16.7912 2.64356 17.4448 3.1355 17.9362C3.13669 17.9374 3.13792 17.9386 3.13915 17.9398C4.15486 18.9521 5.80458 18.9504 6.81791 17.9359L6.86655 17.8872C7.04267 17.717 7.30078 17.6708 7.52513 17.7699C7.54146 17.777 7.55803 17.7837 7.5748 17.7899C7.80494 17.8746 7.95813 18.0863 7.96699 18.3307V18.3976C7.96699 19.833 9.13478 21.0008 10.5701 21.0008C12.0055 21.0008 13.1733 19.833 13.1733 18.3977V18.252C13.1743 18.0129 13.3169 17.7976 13.5366 17.7034C13.5394 17.7022 13.5422 17.701 13.5449 17.6998C13.7693 17.6007 14.0274 17.6468 14.2036 17.8171L14.2539 17.8674C14.7455 18.3585 15.3987 18.6289 16.0935 18.6288C16.094 18.6288 16.0946 18.6288 16.0951 18.6288C16.7904 18.6284 17.444 18.3573 17.9367 17.864C18.9511 16.8485 18.9502 15.197 17.935 14.1829L17.8864 14.1343C17.7161 13.9581 17.67 13.7001 17.7691 13.4756C17.7703 13.4729 17.7715 13.4702 17.7726 13.4674ZM16.676 15.3233C16.6782 15.3256 16.6804 15.3278 16.6826 15.33L16.7355 15.3829C17.0891 15.7362 17.0895 16.3114 16.7349 16.6664C16.5637 16.8378 16.3361 16.9322 16.0939 16.9323C16.0937 16.9323 16.0936 16.9323 16.0934 16.9323C15.8514 16.9323 15.6239 16.8381 15.4517 16.6661L15.3991 16.6134C15.3968 16.6112 15.3946 16.609 15.3924 16.6068C14.7185 15.9477 13.7264 15.767 12.8637 16.1459C12.0246 16.5077 11.4803 17.3311 11.4766 18.2486V18.3977C11.4766 18.8976 11.0699 19.3043 10.57 19.3043C10.0702 19.3043 9.66351 18.8976 9.66351 18.3977V18.3188C9.66351 18.3122 9.66343 18.3056 9.66327 18.2989C9.64128 17.3591 9.06223 16.5409 8.18556 16.2071C7.32769 15.8401 6.34594 16.0231 5.67747 16.677C5.67526 16.6792 5.67304 16.6814 5.67083 16.6836L5.61784 16.7366C5.26461 17.0902 4.68945 17.0906 4.33578 16.7373C4.33475 16.7363 4.33369 16.7353 4.3327 16.7343C4.16245 16.5633 4.06869 16.3364 4.06852 16.0951C4.06836 15.8529 4.16257 15.6253 4.33369 15.4539C4.33467 15.453 4.33561 15.452 4.3366 15.451L4.38737 15.4002C4.38959 15.398 4.3918 15.3958 4.39398 15.3935C5.05305 14.7198 5.23373 13.7277 4.85495 12.865C4.49328 12.0257 3.66973 11.4814 2.75221 11.4777H2.60304C2.10319 11.4777 1.69652 11.071 1.69652 10.5712C1.69652 10.0713 2.10323 9.66465 2.60304 9.66461H2.68204C2.68864 9.66461 2.69529 9.66453 2.70189 9.66436C3.64176 9.64238 4.45993 9.06333 4.79371 8.18666C5.16072 7.32878 4.97771 6.34712 4.32384 5.67865C4.32167 5.67644 4.31945 5.67422 4.31724 5.67201L4.26429 5.61902C4.09297 5.44786 3.99855 5.22027 3.99843 4.97811C3.99826 4.736 4.09247 4.50828 4.26499 4.33556C4.43614 4.16424 4.66374 4.06983 4.90589 4.0697C4.9061 4.0697 4.90622 4.0697 4.90642 4.0697C5.14842 4.0697 5.37593 4.16387 5.54815 4.33593L5.60082 4.38856C5.60299 4.39077 5.60525 4.39299 5.60746 4.39516C6.23979 5.01367 7.15239 5.21087 7.97544 4.91971C8.05321 4.90974 8.12945 4.88903 8.20189 4.85798C9.04356 4.49725 9.58981 3.67247 9.59346 2.7534V2.60422C9.59346 2.10437 10.0001 1.6977 10.5 1.6977C10.9998 1.6977 11.4065 2.10441 11.4065 2.60426V2.68662C11.4102 3.60073 11.9545 4.42428 12.7937 4.786C13.6565 5.1649 14.6485 4.9841 15.3223 4.32502C15.3245 4.32285 15.3268 4.32063 15.329 4.31842L15.382 4.26547C15.5531 4.09415 15.7808 3.99973 16.0229 3.99961C16.0231 3.99961 16.0232 3.99961 16.0234 3.99961C16.2646 3.99961 16.4915 4.0932 16.6625 4.26325C16.6635 4.26424 16.6645 4.26518 16.6654 4.26617C16.8368 4.43732 16.9312 4.66492 16.9313 4.90707C16.9315 5.14857 16.8378 5.37563 16.6676 5.54679C16.6668 5.54761 16.6659 5.54843 16.6651 5.54929L16.6125 5.60196C16.6102 5.60413 16.6081 5.60634 16.6059 5.6086C15.9873 6.24093 15.7901 7.15357 16.0813 7.97658C16.0913 8.05439 16.112 8.13064 16.1431 8.20307C16.5038 9.04475 17.3286 9.59099 18.2477 9.59464H18.3968C18.8967 9.59464 19.3034 10.0013 19.3034 10.5012C19.3034 11.001 18.8967 11.4077 18.3968 11.4077H18.3145C17.4004 11.4113 16.5769 11.9557 16.2151 12.7949C15.8362 13.6574 16.017 14.6495 16.676 15.3233Z" fill="#EEE5FF"/>
							<path d="M10.4991 7.01947C8.57997 7.01947 7.01855 8.58084 7.01855 10.5C7.01855 12.4192 8.57993 13.9806 10.4991 13.9806C12.4183 13.9806 13.9797 12.4192 13.9797 10.5C13.9797 8.58084 12.4183 7.01947 10.4991 7.01947ZM10.4991 12.284C9.51545 12.284 8.71516 11.4837 8.71516 10.5C8.71516 9.51632 9.51545 8.71603 10.4991 8.71603C11.4828 8.71603 12.2831 9.51632 12.2831 10.5C12.2831 11.4837 11.4828 12.284 10.4991 12.284Z" fill="#EEE5FF"/>
							</g>
							<defs>
							<clipPath id="clip0_3136_3442">
							<rect width="21" height="21" fill="white"/>
							</clipPath>
							</defs>
						</svg>
					</div>
			</NavLink>
			
			<div className="icon report">
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.7673 17.2107L12.0173 2.04402C11.7145 1.52019 11.1481 1.16669 10.5 1.16669C9.85192 1.16669 9.2855 1.52019 8.98275 2.04402L0.23275 17.2107C0.0851667 17.4674 0 17.7654 0 18.0834C0 19.0494 0.784 19.8334 1.75 19.8334H19.25C20.216 19.8334 21 19.0494 21 18.0834C21 17.7654 20.9154 17.4674 20.7673 17.2107ZM1.74883 18.0851L10.4983 2.91669H10.5L10.5012 2.91844L19.25 18.0834L1.74883 18.0851ZM10.5 14C9.856 14 9.33333 14.5227 9.33333 15.1667C9.33333 15.8113 9.85542 16.3334 10.5 16.3334C11.1446 16.3334 11.6667 15.8107 11.6667 15.1667C11.6667 14.5227 11.1446 14 10.5 14ZM9.33333 8.75002C9.33333 8.81652 9.33917 8.88244 9.34967 8.94602L9.92425 12.3481C9.9715 12.6239 10.2113 12.8334 10.5 12.8334C10.7888 12.8334 11.0285 12.6239 11.0752 12.348L11.6497 8.94599C11.6608 8.88244 11.6667 8.81652 11.6667 8.75002C11.6667 8.10602 11.1446 7.58335 10.5 7.58335C9.856 7.58335 9.33333 8.10602 9.33333 8.75002Z" fill="#EEE5FF"/>
			</svg>
			</div>
      </aside>
	)
}

export default Sidebar;