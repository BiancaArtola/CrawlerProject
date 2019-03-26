import React, {Component} from "react";

class HeaderComponentWaitPage extends Component {
	render() {
		return (
			<header className="masthead" id="header">
	          <div className="container">
	            <div className="intro-text">
	              <div className="intro-lead-in">Estamos buscando los mejores alquileres...</div>
	              <div className="intro-heading text-uppercase">Espere unos segundos</div>  
	                <img src="../static/img/Gif/Carga.gif" alt="loading..." />
	              <div className="container">
	                <div className="row"></div>
	              </div>
	            </div>
	        
		        <div className="container">
		          <div id="app" className="columns"></div>
		        </div> 
	      	  </div>	    
	     	</header>
		)
	}
}

export default HeaderComponentWaitPage