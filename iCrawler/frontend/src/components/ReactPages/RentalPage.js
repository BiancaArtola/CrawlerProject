import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import {ciudadConEspacios, mapeoClima} from "./../App";
import { Component } from 'react'; 
import ScrollUpButton from "react-scroll-up-button"; 
import NavbarComponent from "./../ReactComponents/NavbarComponent";
import ClimaComponent from "./../ReactComponents/ClimaComponent";
import EmptySectionComponent from "./../ReactComponents/EmptySectionComponent";
import {crearCadenaInformacion} from "./../App";

const RentalPage = ({ data }) =>
  !data.length ? (
    <div className="column">     
      <NavbarComponent />
      <EmptySectionComponent />
    </div>
  ) : (
  <div className="column">
    <NavbarComponent />   
    <ClimaComponent />

    <section className="bg-light" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">                
                <div className="container"> 
                  <h2 class="section-heading text-uppercase">Alquileres en {ciudadConEspacios}</h2>
                  <h3 className="section-subheading text-muted">Se han encontrado <strong>{data.length} resultados</strong> {crearCadenaInformacion()}.</h3>          
                </div>
          </div>        
        </div>   
        <div className="row">        
          {data.map(propiedad => CardListItem({ propiedad }))}      
        </div>
      </div>
    </section>

    <ScrollUpButton />
  </div>
);

const CardListItem = ({ propiedad }) => (
    <div className="col-md-4 col-sm-6 portfolio-item">
          <a className="portfolio-link" data-toggle="modal" href={propiedad.url} target="_blank">
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