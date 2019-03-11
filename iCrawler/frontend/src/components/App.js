import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";

const botonBuscar = <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={obtenerInformacion}>Buscar</a> 

const el= <button onClick={listener}>Click me</button>
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(botonBuscar, wrapper) : null;

function obtenerInformacion(){
	//Si ciudad=1 o ciudad=2 selecciono Monte hermoso o mar del plata, si ciudad="" no selecciono nada
	var ciudad = document.getElementById('ciudad').value;
	var llegada = document.getElementById('llegada').value;
	var salida = document.getElementById('salida').value;

	if (ciudad="error")
		alert("Debe seleccionar una ciudad.");	

	alert("Ciudad "+ciudad);
	alert("Llegada "+llegada);
	alert("Salida "+salida);
}

const App = () => (
  <DataProvider endpoint="api/scrap/" 
                render={data => <Table data={data} />} />
);

function listener(){
	const wrapper = document.getElementById("app");
    wrapper ? ReactDOM.render(<App />, wrapper) : null;
}
