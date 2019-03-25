import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import RentalPage from "./RentalPage";
import WaitPage from "./WaitPage";
import * as ClaseParaIrnos from "./PagesManage/ParaIrnosUrl";
import * as ClaseRentaLugar from './PagesManage/RentaLugarUrl';
import * as ClaseFechas from './ManejoFechas';


const botonBuscar = <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={cargarAlquileres}>Buscar</a>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(botonBuscar, wrapper) : null;


document.getElementById("llegada").min = ClaseFechas.armarFechaHoy();
document.getElementById("salida").min = ClaseFechas.armarFechaHoy();

let urlParairnos = "";
let urlRentalugar = "";

const mapeoClima = new Map();

var ciudad = "";
var llegada = "";
var salida = "";
var cantPersonas = "";
var ciudadConEspacios ="";

export{ciudadConEspacios, llegada, salida, cantPersonas, mapeoClima};

export default function cargarAlquileres(){
	obtenerInformacion();
	replaceCiudad();
	if (realizarValidacion() == 5)
		return;
	cargarArreglo();

	const wrapper = document.getElementById("ppal");
	wrapper ? ReactDOM.render(<App />, wrapper) : null;	
}


function obtenerInformacion(){
	ciudad = document.getElementById('ciudad').value;
	llegada = document.getElementById('llegada').value;
	salida = document.getElementById('salida').value;
	cantPersonas = document.getElementById('cantPersonas').value;
}

function realizarValidacion(){
	var validaFecha = ClaseFechas.chequeoFechas(llegada, salida);

	var hayPersonas = (cantPersonas!= "");

	if (validaFecha == 0 && hayPersonas){
		urlParairnos = ClaseParaIrnos.armarUrlSinFechaParaIrnos(ciudad, cantPersonas);
		urlRentalugar = ClaseRentaLugar.armarUrlSinFechaRental(ciudad, cantPersonas);
	}
	else if (validaFecha == 0 && !hayPersonas){
		urlParairnos = ClaseParaIrnos.armarUrlParaIrnosBasica(ciudad);
		urlRentalugar = ClaseRentaLugar.armarUrlRentalBasica(ciudad);
	}
	else if (validaFecha == 2) {
		var llegadaPI = ClaseFechas.rearmarFecha(llegada);
		var salidaPI = ClaseFechas.rearmarFecha(salida);

		if (hayPersonas){
		 	urlParairnos = ClaseParaIrnos.armarUrlParaIrnosCompleta(ciudad, cantPersonas, llegadaPI, salidaPI);
			urlRentalugar = ClaseRentaLugar.armarUrlRentalCompleta(ciudad, cantPersonas, llegada, salida);	
		}
		else {
			urlParairnos = ClaseParaIrnos.armarUrlParaIrnosConFechaSinPersonas(ciudad, llegadaPI, salidaPI);
			urlRentalugar = ClaseRentaLugar.armarUrlRentalConFechaSinPersonas(ciudad, llegada, salida);
		}
 	}
 	else
 		return 5;
}

function replaceCiudad(){
	ciudadConEspacios = ciudad.replace(/-/g,' ');
	ciudadConEspacios = ciudadConEspacios.replace(/\b\w/g, l => l.toUpperCase());
}


function cargarArreglo(){
 	mapeoClima.set("Mar Del Plata", "https://forecast7.com/es/n38d01n57d54/mar-del-plata/");
 	mapeoClima.set("Monte Hermoso", "https://forecast7.com/es/n38d99n61d29/monte-hermoso/");
 	mapeoClima.set("Pinamar", "https://forecast7.com/es/n37d11n56d86/pinamar/");
 	mapeoClima.set("Miramar", "https://forecast7.com/es/n38d27n57d84/miramar/");
 	mapeoClima.set("Mar De Ajo", "https://forecast7.com/es/n36d72n56d68/mar-de-ajo/");
 	mapeoClima.set("Villa Gesell", "https://forecast7.com/es/n37d26n56d97/villa-gesell/");
 	mapeoClima.set("Mar De Las Pampas", "https://forecast7.com/es/n37d33n57d02/mar-de-las-pampas/");
}

export function crearCadenaInformacion(){
	if (cantPersonas=="" && llegada=="")
	{
		return "";
	}
	else
	{
		if(cantPersonas!="" && llegada=="")
		{
			return "para "+cantPersonas+" personas";
		}
		else
		{	
			if(cantPersonas=="" && llegada !="")
			{
				return "desde el "+llegada+" hasta el "+salida+"";
			}
			else
			{
				return "para "+cantPersonas+" personas desde el "+llegada+" hasta el "+salida+"";
			}
		}
	}

}

const App = () => (
  <DataProvider endpoint="api/scrap/" 
                render={data => <RentalPage data={data} />}
                render2={data2 => <WaitPage data2={data2} />} 
                urlParairnosDP= {urlParairnos} 
                urlRentalDP= {urlRentalugar} />
);

