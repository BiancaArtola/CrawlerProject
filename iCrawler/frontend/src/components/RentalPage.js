import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import obtenerInformacion from "./App";
import {ciudad, llegada, salida, cantPersonas} from "./App";

const RentalPage = ({ data }) =>
  !data.length ? (
    <p>Nothing to show</p>
  ) : (
  <div className="column">
      
   <section className="bg-light" id="portfolio">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
        
          
              <div className="container">
                <div className="row">
                  <div className="col-sm">    
                   <div className="form-group">
                    <b> Ciudad </b>
                    <select className="custom-select" required id="ciudad" value={ciudad}>                      
                      <option value="mar-del-plata">Mar del plata</option>
                      <option value="monte-hermoso">Monte hermoso</option>
                      <option value="villa-gesell">Villa gesell</option>
                      <option value="mar-de-ajo">Mar de ajó</option>
                      <option value="miramar">Miramar</option>
                      <option value="pinamar">Pinamar</option>
                      <option value="mar-de-las-pampas">Mar de las Pampas</option>
                    </select>

                    <div className="invalid-feedback">Debe seleccionar una ciudad</div>
                   </div> 
                  </div>
                  
                  <div className="col-sm">
                    <form action="/action_page.php" />
                      <b>Fecha llegada:</b> 
                        <input type="date" id="llegada" value={llegada}/>         
                  </div>
                 
                  <div className="col-sm">
                    <form action="/action_page.php" />
                       <b>Fecha salida:</b> 
                          <input type="date" id="salida" value={salida}/>
                    
                  </div>

                  <div className="col-sm">    
                   <div className="form-group">
                    <b> Cantidad de personas </b>
                    <select className="custom-select" required id="cantPersonas" value={cantPersonas}>
                      <option value="">Personas</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div> 
                  </div>

                  <div className="col-sm">   
                    <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={obtenerInformacion}>Buscar</a>
                  </div>    

                </div>
              </div>

        

          <h2 class="section-heading text-uppercase">Alquileres en {ciudad}</h2>
          <h3 className="section-subheading text-muted">Se han encontrado <strong>{data.length} resultados</strong>.</h3>   

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
            <img className="img-fluid" src={propiedad.imagen} />
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