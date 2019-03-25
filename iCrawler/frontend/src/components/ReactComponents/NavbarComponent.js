import React, {Component} from "react";
import { Navbar, Nav } from 'react-bootstrap';

class NavbarComponent extends Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark">
		      <Navbar.Brand href=".">Inicio</Navbar.Brand>    
		    </Navbar>  

		)
	}
}

export default NavbarComponent