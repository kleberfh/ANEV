import React from "react";
import {Redirect} from "react-router-dom";

const Sair = ({ setUser }) => {
  localStorage.removeItem('nome')
  localStorage.removeItem('token')
  setUser({ name: '', token: ''})

  return <Redirect to="/" />
}

export default Sair;