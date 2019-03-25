import React, {Component} from "react";
import {ciudadConEspacios, mapeoClima} from "./../App";

class ClimaComponent extends Component {
	render() {
		return (
			 <a className="weatherwidget-io" href={mapeoClima.get(ciudadConEspacios)} 
    		data-label_1={ciudadConEspacios} data-label_2="TIEMPO" data-theme="pure" >{ciudadConEspacios} TIEMPO</a>

		)
	}
}

export default ClimaComponent
