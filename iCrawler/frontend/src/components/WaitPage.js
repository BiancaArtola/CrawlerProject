import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";


const WaitPage = ({ data2 }) =>
  !data2.length ? (
    <p>Nothing to show</p>
  ) : (
    <div className="column">
    	  <header className="masthead" id="header">
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in">Estamos buscando los mejores alquileres...</div>
          <div className="intro-heading text-uppercase">Espere unos segundos</div>  
            <img src="../static/img/Carga.gif" alt="loading..." />
          <div className="container">
            <div className="row"></div>
          </div>
        </div>
        
        <div className="container">
          <div id="app" className="columns"></div>
        </div> 
      </div>
    
      </header>
    </div>
  );

WaitPage.propTypes = {
  data2: PropTypes.array.isRequired
};
export default WaitPage;
      