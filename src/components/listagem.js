import React, { useState, useEffect } from "react";
import {apagar, listagem} from "../services/database";
import {Typography} from "@material-ui/core";
import Confirmacao from "./confirmacao";
import {Redirect} from "react-router-dom";

const Listagem = ({ user }) => {
  const [editar, setEditar] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [confirmar, setConfirmar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const token = user.token;

  useEffect(() => {
    if (produtos.length === 0) {
      listagem()
        .then(response => {
          setProdutos(response.data)
        })
        .catch(error => {
          alert(error)
        })
    }
  }, [produtos]);

  const apagarProduto = () => {
    apagar(produtoSelecionado, token)
      .then(response => {
        alert(response.data)
        setProdutos([]);
        setConfirmar(false)
        setProdutoSelecionado(null)
      })
      .catch(error => {
        alert(error)
      })
  }

  const alertaApagar = (id) => {
    setProdutoSelecionado(id)
    setConfirmar(true)
  }

  const editarProduto = (id) => {
    localStorage.setItem('id', id);
    setEditar(true);
  }

  if (editar) {
    return <Redirect to="cadastrar" />
  }

  return (
    <div className="h-full">
      <div className="container mx-auto">
        <br />
        <Typography className="produto-titulo" variant="h5">
          Products
        </Typography>
        <br />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-8">
          {produtos.map(produto => (
            <div className="flex flex-col bg-white rounded-xl shadow-xl items-center space-y-4 p-4 m-4">
              <div className="h-1/2">
                <img className="rounded-xl h-48" src={produto.imagem} alt="product" />
              </div>
              <div className="h-1/2">
                <p className="text-lg capitalize text-center font-medium mt-4">
                  {produto.nome}
                </p>
                <p className="text-sm capitalize text-left mt-2 text-gray-400">
                  {produto.descricao}
                </p>
                <p className="text-center font-medium text-2xl mt-2">
                  R$ {produto.preco}
                </p>
                <p className="-mt-1 text-sm text-center text-gray-300">
                  {produto.quantidade} in stock
                </p>
                {
                  token && (
                    <div className="flex flex-row w-full justify-center space-x-4 mt-2">
                      <button
                        className="bg-gray-600 text-gray-200 rounded py-1 px-2 hover:bg-gray-700"
                        onClick={() => editarProduto(produto._id)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-gray-600 text-gray-200 rounded py-1 px-2 hover:bg-gray-700"
                        onClick={() => alertaApagar(produto._id)}
                      >
                        Excluir
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        confirmar
        &&
        <Confirmacao
          open={confirmar}
          positive="Apagar"
          negative="Cancelar"
          onAceept={() => apagarProduto()}
          onClose={() => setConfirmar(false)}
          message={`Deseja realmente excluír o produtos selecionado?`}
        />
      }
    </div>
  )
}

export default Listagem;