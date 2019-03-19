import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import obtenerInformacion from "./App";
import recargar from "./App";
import {ciudadConEspacios, llegada, salida, cantPersonas, mapeoClima} from "./App";
import { Component } from 'react'; 
import { Form, FormControl, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const RentalPage = ({ data }) =>
  !data.length ? (
    <div className="column">
     
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand onClick={recargar} href="../static/img/ubicacion.png">Home</Navbar.Brand>    
    </Navbar>  

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

  </div>

  ) : (
  <div className="column">
     
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#">Home</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
  </Navbar>  

  <br />

   <a className="weatherwidget-io" href={mapeoClima.get(ciudadConEspacios)} 
    data-label_1={ciudadConEspacios} data-label_2="WEATHER" data-theme="pure" >{ciudadConEspacios} WEATHER</a>

   <section className="bg-light" id="portfolio">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">                
              <div className="container"> 
                <h2 class="section-heading text-uppercase">Alquileres en {ciudadConEspacios}</h2>
                <h3 className="section-subheading text-muted">Se han encontrado <strong>{data.length} resultados</strong>.</h3>               
              </div>
        </div>        
      </div>   
      <div className="row">        
        {
          data.map(propiedad => CardListItem({ propiedad }))
        }      
      </div>
    </div>
   </section>

  </div>
);

const CardListItem = ({ propiedad }) => (
    <div className="col-md-4 col-sm-6 portfolio-item">
          <a className="portfolio-link" data-toggle="modal" href={propiedad.url}>
            <div className="portfolio-hover">
              <div className="portfolio-hover-content">
                <i className="fas fa-plus fa-3x"></i>
              </div>
            </div>
            <img className="img-fluid" src={propiedad.imagen} style={{width: '100%',height: '15vw'}} />
          </a>
          <div className="portfolio-caption">
            <h4>{propiedad.titulo}</h4>
            <p className="text-muted">{propiedad.direccion}</p>
          </div>
        </div>
);

        

RentalPage.propTypes = {
  data: PropTypes.array.isRequired
};
export default RentalPage;