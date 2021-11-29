import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

//Telefonat
import TelefoniDashboard from "../../features/telefonat/dashboard/TelefoniDashboard";
import TelefoniDetails from "../../features/telefonat/details/TelefoniDetails";
import TelefoniForm from "../../features/telefonat/form/TelefoniForm";

//Laptopat
import LaptopiDashboard from "../../features/laptopat/dashboard/LaptopiDashboard";
import LaptopiDetails from "../../features/laptopat/details/LaptopiDetails";
import LaptopiForm from "../../features/laptopat/form/LaptopiForm";

import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";




//Laptopat

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
        <Route exact path="/telefonat" component={TelefoniDashboard} />
        <Route path="/telefonat/:id" component={TelefoniDetails} />
        <Route key={location.key} path={['/createTelefoni', '/manage/:id']} component={TelefoniForm}/>

        <Route exact path="/laptopat" component={LaptopiDashboard} />
        <Route path="/laptopat/:id" component={LaptopiDetails} />
        <Route key={location.key} path={['/createLaptopi', '/manageLaptopi/:id']} component={LaptopiForm}/>

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
