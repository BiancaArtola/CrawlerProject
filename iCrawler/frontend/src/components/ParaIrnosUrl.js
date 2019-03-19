import React from "react";
import ReactDOM from "react-dom";

let urlParairnos = "";
const urlBaseParaIrnos = "https://www.parairnos.com/alquileres-en-";

export function armarUrlParaIrnosBasica(ciudad){
	return urlBaseParaIrnos.concat(ciudad);
}

export function armarUrlParaIrnosConFechaSinPersonas(ciudad, llegadaPI, salidaPI){
		var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
		var urlFinal = urlConCiudad+"-del-"+llegadaPI+"-al-"+salidaPI;
		return urlFinal;
}

export function armarUrlSinFechaParaIrnos(ciudad, cantPersonas){
		var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
		var urlFinal= urlConCiudad+"-para-"+cantPersonas+"-personas";
		return urlFinal;
}

export function armarUrlParaIrnosCompleta(ciudad, cantPersonas, llegadaPI, salidaPI){
		var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
		var urlCiudadPersonas= urlConCiudad+"-para-"+cantPersonas+"-personas-";
		var urlFinal = urlCiudadPersonas+"del-"+llegadaPI+"-al-"+salidaPI;
		return urlFinal;
}
