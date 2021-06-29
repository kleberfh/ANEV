import React from "react";
import {Link} from "react-router-dom";
import Logo from '../assets/logo.png'

const Header = ({ user }) => {

  const logged = user.name !== '';

  return (
    <div className="container mx-auto py-4">
      <div className="mx-auto flex flex-row justify-between items-center">
        <img
          alt="logo ite"
          className="h-14"
          src={Logo}
        />
        <p className="font-semibold text-xl">
          Welcome to Apple Store
          {logged ? `, ${user.name}` : '.'}
        </p>
        <div className="flex flex-row space-x-4">
          {logged ? (
            <Link to="cadastrar" style={{textDecoration: 'none'}}>
              <button
                className="flex items-center rounded text-xl text-white bg-gray-600 opacity-60 px-4 py-2 hover:bg-gray-500"
              >
                New product
              </button>
            </Link>
          ) : ''}
          <Link to={user.name ? 'sair' : 'login'} style={{textDecoration: 'none'}}>
            <button
              className="flex items-center rounded text-xl text-white bg-gray-800 opacity-60 px-4 py-2 hover:bg-gray-600"
            >
              {logged ? 'Logout' : 'Admin login'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;