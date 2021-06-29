import React, { useState } from "react";
import {login} from "../services/database";
import { Redirect } from 'react-router-dom';
import {Button, TextField, Typography} from "@material-ui/core";

const Login = ({ setUser }) => {
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [logado, setLogado] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    login(usuario, senha)
      .then(response => {
          if (!response.data.token) {
            alert('Dados incorretos.')
          } else {
            setUser({
              name: usuario,
              token: response.data.token
            })
            setLogado(true);
          }
      })
      .catch(error => {
        alert(error);
      })
  }

  if (logado) {
    return <Redirect to="/" />
  }

  return (
    <div className="h-full w-full">
      <div className="w-1/2 mx-auto rounded-xl bg-gray-100 shadow-xl p-8">
        <Typography variant="h4">
          Login
        </Typography>
        <form className="flex flex-col space-y-6" onSubmit={handleOnSubmit}>
          <TextField
            required
            label="Usuário"
            className="input"
            placeholder="Usuário"
            color="disabled"
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            required
            label="Senha"
            value={senha}
            type="password"
            className="input"
            color="disabled"
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button
            type="submit"
            color="disabled"
            variant="contained"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login;