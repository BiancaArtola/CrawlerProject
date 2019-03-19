import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import RentalPage from "./RentalPage";
import WaitPage from "./WaitPage";

const botonBuscar = <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={obtenerInformacion}>Buscar</a>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(botonBuscar, wrapper) : null;

let urlParairnos = "";
let urlRentalugar = "";

const urlBaseParaIrnos = "https://www.parairnos.com/alquileres-en-";
const urlBaseRental = "http://www.rentalugar.com/alquileres-en-la-costa/";
const mapeoClima = new Map();


var ciudad = "";
var llegada = "";
var salida = "";
var cantPersonas = "";
var ciudadConEspacios ="";

export{ciudadConEspacios, llegada, salida, cantPersonas, mapeoClima};

export default function obtenerInformacion(){
	ciudad = document.getElementById('ciudad').value;
	llegada = document.getElementById('llegada').value;
	salida = document.getElementById('salida').value;
	cantPersonas = document.getElementById('cantPersonas').value;

	replaceCiudad();
	var validaFecha = chequeoFechas();

	var hayPersonas = (cantPersonas!= "");

	if (validaFecha == 0 && hayPersonas){
		urlParairnos = armarUrlSinFechaParaIrnos();
		urlRentalugar = armarUrlSinFechaRental();
	}
	else if (validaFecha == 0 && !hayPersonas){
		urlParairnos = armarUrlParaIrnosBasica();
		urlRentalugar = armarUrlRentalBasica();
	}
	else if (validaFecha == 2) {
		var llegadaPI = rearmarFecha(llegada);
		var salidaPI = rearmarFecha(salida);

		if (hayPersonas){
		 	urlParairnos = armarUrlParaIrnosCompleta(llegadaPI, salidaPI);
			urlRentalugar = armarUrlRentalCompleta();	
		}
		else {
			urlParairnos = armarUrlParaIrnosConFechaSinPersonas(llegadaPI, salidaPI);
			urlRentalugar = armarUrlRentalConFechaSinPersonas();
		}
 	}
 	else{
 		alert("Debe ingresar correctamente los datos");
 		return ;
 	}

 	cargarArreglo();

	const wrapper = document.getElementById("ppal");
	wrapper ? ReactDOM.render(<App />, wrapper) : null;	
}

function replaceCiudad(){
	ciudadConEspacios = ciudad.replace(/-/g,' ');
	ciudadConEspacios = ciudadConEspacios.replace(/\b\w/g, l => l.toUpperCase());
}

function armarUrlParaIrnosConFechaSinPersonas(llegadaPI, salidaPI){
	var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
	var urlFinal = urlConCiudad+"-del-"+llegadaPI+"-al-"+salidaPI;
	return urlFinal;
}

function armarUrlRentalConFechaSinPersonas(){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlConCiudad = urlConCiudad.concat("-buenos-aires");
	var urlFecha = urlConCiudad+"/?&from="+llegada+"&to="+salida;
	return urlFecha;
}

function armarUrlParaIrnosBasica(){
	return urlBaseParaIrnos.concat(ciudad);
}

function armarUrlRentalBasica(){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlConCiudad = urlConCiudad.concat("-buenos-aires");
	return urlConCiudad;
}

function armarUrlSinFechaParaIrnos(){
	var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
	var urlFinal= urlConCiudad+"-para-"+cantPersonas+"-personas";
	return urlFinal;
}

function armarUrlSinFechaRental(){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlConCiudad = urlConCiudad.concat("-buenos-aires");
	var urlFinal = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad();
	return urlFinal;
}

function chequeoFechas(){
	if (llegada == "" && salida == "")
		return 0;
	else if ((llegada == "" && salida != "") || (llegada != "" && salida == ""))
		return 1	

	var validaLlegada = esAnteriorAHoy(llegada);
	if (validaLlegada == 2){
		var validaSalida = esAnteriorAHoy(salida);	
		if (validaSalida == 2)
			return compararLlegadaySalida(llegada, salida);
	}
	return 1;		
}

function compararLlegadaySalida(){
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


function armarUrlParaIrnosCompleta(llegadaPI, salidaPI){
	var urlConCiudad= urlBaseParaIrnos.concat(ciudad);
	var urlCiudadPersonas= urlConCiudad+"-para-"+cantPersonas+"-personas-";
	var urlFinal = urlCiudadPersonas+"del-"+llegadaPI+"-al-"+salidaPI;
	return urlFinal;
}

function armarUrlRentalCompleta(){
	var urlConCiudad = urlBaseRental.concat(ciudad);
	if (ciudad == "monte-hermoso")
		urlRentalugar = urlRentalugar.concat("-buenos-aires");
	var urlCapacidad = urlConCiudad+"/?capacidad_hasta="+armarArregloCapacidad();
	var urlFecha = urlCapacidad+"&from="+llegada+"&to="+salida;
	return urlFecha;
}

function armarArregloCapacidad(){
	var numeroPrincipal = [262,261,260,259,258,257,256,255,254,253,252,251,250,249,248];
	var stringCapacidad = "";
	for (var i=cantPersonas-1; i<15; i++)
		stringCapacidad= stringCapacidad+""+numeroPrincipal[i]+",";

	//Elimino ultimo elemento del string porque es una coma
	stringCapacidad = stringCapacidad.slice(0, -1);
	return stringCapacidad;
}

function cargarArreglo(){
 	mapeoClima.set("Mar Del Plata", "https://forecast7.com/en/n38d01n57d54/mar-del-plata/");
 	mapeoClima.set("Monte Hermoso", "https://forecast7.com/en/n38d99n61d29/monte-hermoso/");
 	mapeoClima.set("Pinamar", "https://forecast7.com/en/n37d11n56d86/pinamar/");
 	mapeoClima.set("Miramar", "https://forecast7.com/en/n38d27n57d84/miramar/");
 	mapeoClima.set("Mar De Ajo", "https://forecast7.com/en/n36d72n56d68/mar-de-ajo/");
 	mapeoClima.set("Villa Gesell", "https://forecast7.com/en/n37d26n56d97/villa-gesell/");
 	mapeoClima.set("Mar De Las Pampas", "https://forecast7.com/en/n37d33n57d02/mar-de-las-pampas/");
}

export function recargar(){
	alert("recargar")
	window.location.reload();
}

const App = () => (
  <DataProvider endpoint="api/scrap/" 
                render={data => <RentalPage data={data} />}
                render2={data2 => <WaitPage data2={data2} />} 
                urlParairnosDP= {urlParairnos} 
                urlRentalDP= {urlRentalugar} />
);

