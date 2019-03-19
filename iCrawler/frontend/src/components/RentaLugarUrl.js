import React from "react";
import ReactDOM from "react-dom";

let urlRentalugar = "";
const urlBaseRental = "http://www.rentalugar.com/alquileres-en-la-costa/";



	export function armarUrlRentalBasica(ciudad){
		var urlConCiudad = urlBaseRental.concat(ciudad);
		if (ciudad == "monte-hermoso")
			urlConCiudad = urlConCiudad.concat("-buenos-aires");
		return urlConCiudad;
	}

	export function armarUrlRentalConFechaSinPersonas(ciudad, llegada, salida){
		var urlConCiudad = urlBaseRental.concat(ciudad);
		if (ciudad == "monte-hermoso")
			urlConCiudad = urlConCiudad.concat("-buenos-aires");
		var urlFecha = urlConCiudad+"/?&from="+llegada+"&to="+salida;
		return urlFecha;
	}

	export function armarUrlSinFechaRental(ciudad, cantPersonas){
		var urlConCiudad = urlBaseRental.concat(ciudad);
		if (ciudad == "monte-hermoso")
			urlConCiudad = urlConCiudad.concat("-buenos-aires");
		var urlFinal = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad(cantPersonas);
		return urlFinal;
	}

	export function armarUrlRentalCompleta(ciudad, cantPersonas, llegada, salida){
		var urlConCiudad = urlBaseRental.concat(ciudad);
		if (ciudad == "monte-hermoso")
			urlRentalugar = urlRentalugar.concat("-buenos-aires");
		var urlCapacidad = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad(cantPersonas);
		var urlFecha = urlCapacidad+"&from="+llegada+"&to="+salida;
		return urlFecha;
	}

 	export function armarArregloCapacidad(cantPersonas){
		var numeroPrincipal = [262,261,260,259,258,257,256,255,254,253,252,251,250,249,248];
		var stringCapacidad = "";
		for (var i=cantPersonas-1; i<15; i++)
			stringCapacidad= stringCapacidad+""+numeroPrincipal[i]+",";

		//Elimino ultimo elemento del string porque es una coma
		stringCapacidad = stringCapacidad.slice(0, -1);
		return stringCapacidad;
	}


