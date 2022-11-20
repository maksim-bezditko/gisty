// import { useLocation, Switch, Route,  } from "react-router-dom";



// const ModalSwitch = () => {
// 	const location = useLocation();

// 	let background = location.state && location.state.background;

// 	return (
// 		<div>
// 		  <Switch location={background || location}>
// 			 <Route exact path="/" children={<Home />} />
// 			 <Route path="/gallery" children={<Gallery />} />
// 			 <Route path="/img/:id" children={<ImageView />} />
// 		  </Switch>
// 		  {background && <Route path="/img/:id" children={<Modal />} />}
// 		</div>
// 	 );
// }

// export default ModalSwitch;
