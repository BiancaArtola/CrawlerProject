import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";


const RentalPage = ({ data }) =>
  !data.length ? (
    <p>Nothing to show</p>
  ) : (
  <div className="column">
      
   <section className="bg-light" id="portfolio">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Alquileres disponibles</h2>
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