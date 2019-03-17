import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import RentalPage from "./RentalPage";
import WaitPage from "./WaitPage";

const botonBuscar = <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={obtenerInformacion}>Buscar</a>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(botonBuscar, wrapper) : null;

var urlParairnos = "";
var urlRentalugar = "";

function obtenerInformacion(){
	var ciudad = document.getElementById('ciudad').value;
	var llegada = document.getElementById('llegada').value;
	var salida = document.getElementById('salida').value;
	var cantPersonas = document.getElementById('cantPersonas').value;

	var validaFecha = chequeoFechas(llegada, salida);
	if (validaFecha == 2) {
		var llegadaPI = rearmarFecha(llegada);
		var salidaPI = rearmarFecha(salida);

	 	urlParairnos = armarUrlParaIrnos("https://www.parairnos.com/alquileres-en-", ciudad, cantPersonas, llegadaPI, salidaPI);
		urlRentalugar = armarUrlRental("http://www.rentalugar.com/alquileres-en-la-costa/", ciudad, cantPersonas, llegada, salida);	

		const wrapper = document.getElementById("ppal");
	    wrapper ? ReactDOM.render(<App />, wrapper) : null;	
 	}
 	else
 		alert("no sigas");
}

function chequeoFechas(llegada, salida){
	var validaLlegada = esAnteriorAHoy(llegada);
	if (validaLlegada == 2){
		var validaSalida = esAnteriorAHoy(salida);	
		if (validaSalida == 2)
			return compararLlegadaySalida(llegada, salida);
	}
	return 1;		
}

function compararLlegadaySalida(llegada, salida){
	var fechaLlegada = new Date(llegada);

	var AnoLlegada = fechaLlegada.getFullYear();
	var MesLlegada = fechaLlegada.getMonth();
	var DiaLlegada = fechaLlegada.getDate();

	var fechaSalida = new Date(salida);

	var AnoSalida= fechaSalida.getFullYear();
	var MesSalida = fechaSalida.getMonth();
	var DiaSalida = fechaSalida.getDate();

	if ((AnoSalida < AnoLlegada) || (AnoSalida == AnoLlegada && MesSalida < MesLlegada) || (AnoSalida == AnoLlegada && MesSalida == MesLlegada && DiaSalida < DiaLlegada)){
	    alert ("La fecha de salida no debe ser menor que la fecha de ingreso. ");
	    return 1;
	}
	else 
		return 2;
}

function esAnteriorAHoy(fecha){
	var date = new Date(fecha);

	var AnoFecha = date.getFullYear();
	var MesFecha = date.getMonth();
	var DiaFecha = date.getDate();

	var Hoy = new Date();
	 
	var AnoHoy = Hoy.getFullYear();
	var MesHoy = Hoy.getMonth();
	var DiaHoy = Hoy.getDate();

	if ((AnoFecha < AnoHoy) || (AnoFecha == AnoHoy && MesFecha < MesHoy) || (AnoFecha == AnoHoy && MesFecha == MesHoy && DiaFecha < DiaHoy)){
	    alert ("La fecha introducida es anterior a Hoy");
	    return 1;
	}
	else 
		return 2;
}

function rearmarFecha(fecha){
	var date = new Date(fecha);
	var year, month, day;

	if ( !!date.valueOf() ) { // Valid date
	    year = date.getFullYear();
	    month = date.getMonth()+1;
	    day = date.getDate()+1;
	}

	var fecha = day+"-"+month+"-"+year+"";
	return fecha
}


function armarUrlParaIrnos(url, ciudad, cantPersonas, llegada, salida){
	var urlConCiudad= url.concat(ciudad);
	var urlCiudadPersonas= urlConCiudad+"-para-"+cantPersonas+"-personas-";
	var urlFinal = urlCiudadPersonas+"del-"+llegada+"-al-"+salida;
	return urlFinal;
}

function armarUrlRental(url, ciudad, cantPersonas, llegada, salida){
	var urlConCiudad = url.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlRentalugar = urlRentalugar.concat("-buenos-aires");
	var urlCapacidad = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad(cantPersonas);
	var urlFecha = urlCapacidad+"&from="+llegada+"&to="+salida;
	return urlFecha;
}

function armarArregloCapacidad(cantPersonas){
	var numeroPrincipal = [262,261,260,259,258,257,256,255,254,253,252,251,250,249,248];
	var stringCapacidad = "";
	for (var i=cantPersonas-1; i<15; i++)
		stringCapacidad= stringCapacidad+""+numeroPrincipal[i]+",";

	//Elimino ultimo elemento del string porque es una coma
	stringCapacidad = stringCapacidad.slice(0, -1);
	return stringCapacidad;
}

const App = () => (
  <DataProvider endpoint="api/scrap/" 
                render={data => <RentalPage data={data} />}
                render2={data2 => <WaitPage data2={data2} />} 
                urlParairnosDP= {urlParairnos} 
                urlRentalDP= {urlRentalugar} />
);

