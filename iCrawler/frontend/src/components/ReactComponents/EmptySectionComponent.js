import React, {Component} from "react";
import { Navbar, Nav } from 'react-bootstrap';

class EmptySectionComponent extends Component {
	render() {
		return (
			<section className="bg-light" id="portfolio">
			    <div className="container">
			      <div className="row">
			        <div className="col-lg-12 text-center">                
			              <div className="container"> 
			                <h2 class="section-heading text-uppercase">No se han encontrado resultados</h2>
			                <h3 className="section-subheading text-muted">Realice una nueva busqueda</h3>               
			              </div>
			        </div>        
			      </div>  			     
			   </div>
			</section>

		)
	}
}

export default EmptySectionComponent