import React, {useState} from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Listagem from "./listagem";
import Login from "./login";
import Sair from "./sair";
import Cadastrar from "./cadastrar";
import Header from "./header";

const Router = () => {
  const [user, setUser] = useState({name: '', token: ''});

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route path="/sair">
          <Sair setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/cadastrar">
          <Cadastrar user={user} />
        </Route>
        <Route path="/">
          <Listagem user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Router;