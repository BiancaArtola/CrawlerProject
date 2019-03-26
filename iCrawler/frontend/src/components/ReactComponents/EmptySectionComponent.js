import React, {Component} from "react";
import { Navbar, Nav } from 'react-bootstrap';
import {crearCadenaInformacion} from "./../App";
import {ciudadConEspacios} from "./../App";

class EmptySectionComponent extends Component {
	render() {
		return (
			<section className="bg-light" id="portfolio">
			    <div className="container">
			      <div className="row">
			        <div className="col-lg-12 text-center">                
			              <div className="container"> 
			                <h2 class="section-heading text-uppercase">No se han encontrado resultados</h2>
			                <h3 className="section-subheading text-muted">En {ciudadConEspacios} {crearCadenaInformacion()}</h3>  
			                <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href=".">Realizar nueva busqueda</a>             
			              </div>
			        </div>        
			      </div>  			     
			   </div>
			</section>

		)
	}
}

export default EmptySectionComponent