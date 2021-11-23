import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ProduktiDashboard from "../../features/produktet/dashboard/ProduktiDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProduktiForm from "../../features/produktet/form/ProduktiForm";
import ProduktiDetails from "../../features/produktet/details/ProduktiDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>;
      <Route exact path="/" component={HomePage} />
      
      <Route path={'/(.+)'} render={() => (
        <>
         <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
        <Route exact path="/produktet" component={ProduktiDashboard} />
        <Route path="/produktet/:id" component={ProduktiDetails} />
        <Route key={location.key} path={["/createProdukti", "/manage/:id"]} component={ProduktiForm}/>

        <Route path='/errors' component={TestErrors}/>
        <Route path='/server-error' component={ServerError}/>
        <Route component={NotFound}/>
        </Switch>
      </Container>
      
        </>
      )}
      />
    </>
  );
}

export default observer(App);
