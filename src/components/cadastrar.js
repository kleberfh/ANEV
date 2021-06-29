import React, { useState, useEffect } from "react";
import {adicionar, detalhes, editar} from "../services/database";
import {Button, Container, TextField, Typography} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";

const Cadastrar = ({ user }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [cadastrado, setCadastrado] = useState(false);

  const token = user.token;

  const produto = localStorage.getItem('id')

  useEffect(() => {
    if (produto) {
      detalhes(produto, token)
        .then(response => {
          setNome(response.data.nome)
          setPreco(parseFloat(response.data.preco))
          setImagem(response.data.imagem)
          setDescricao(response.data.descricao)
          setQuantidade(parseInt(response.data.quantidade))
        })
        .catch(error => alert(error))
    }

    return () => {
      localStorage.removeItem('id');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (produto) {
      editar({
        _id: produto,
        nome,
        preco,
        imagem,
        descricao,
        quantidade,
      }, token).then(response => {
        alert(response.data);
        localStorage.removeItem('id');
        setCadastrado(true);
      }).catch(error => {
        alert(error);
      })
    } else {
      adicionar({
        nome,
        preco,
        imagem,
        descricao,
        quantidade,
        ativo: true,
      }, token).then(response => {
        alert(response.data);
        setCadastrado(true);
      }).catch(error => {
        alert(error);
      })
    }
  }

  if (!token || cadastrado) {
    return <Redirect to="/" />
  }

  return (
    <Container>
      <Typography variant="h4">
        Register new product
      </Typography>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
        <br />
        <TextField
          required
          value={nome}
          label="Name"
          onChange={(e) => setNome(e.target.value)}
        />
        <br />
        <TextField
          required
          value={preco}
          label="Price"
          type="number"
          onChange={(e) => setPreco(e.target.value)}
        />
        <br />
        <TextField
          required
          value={imagem}
          label="Image url"
          onChange={(e) => setImagem(e.target.value)}
        />
        <br />
        <TextField
          required
          value={descricao}
          label="Description"
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br />
        <TextField
          required
          value={quantidade}
          label="Quantity"
          type="number"
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          color="disabled"
          variant="contained"
        >
          {produto ? 'Save' : 'Register'}
        </Button>
        <br />
        <Link to="/" style={{textDecoration: 'none'}}>
          <Button
            type="submit"
            color="disabled"
            variant="outlined"
          >
            Cencel
          </Button>
        </Link>
      </form>
    </Container>
  )
}

export default Cadastrar;