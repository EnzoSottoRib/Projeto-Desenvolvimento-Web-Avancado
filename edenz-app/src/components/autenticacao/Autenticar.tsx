import { JSX, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import fotoTrem from '../../img/trem.jpg';


const Autenticar = ({ children }: { children: JSX.Element }) => {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default Autenticar;
