//Others
import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//LogIn
import LoginForm from "../../features/users/LoginForm";

//HomePage
import HomePage from "../../features/home/HomePage";

//Telefonat
import TelefoniDashboard from "../../features/telefonat/dashboard/TelefoniDashboard";
import TelefoniDetails from "../../features/telefonat/details/TelefoniDetails";
import TelefoniForm from "../../features/telefonat/form/TelefoniForm";

//Laptopat
import LaptopiDashboard from "../../features/laptopat/dashboard/LaptopiDashboard";
import LaptopiDetails from "../../features/laptopat/details/LaptopiDetails";
import LaptopiForm from "../../features/laptopat/form/LaptopiForm";

//Orat
import OraDashboard from "../../features/orat/dashboard/OraDashboard";
import OraDetails from "../../features/orat/details/OraDetails";
import OraForm from "../../features/orat/form/OraForm";

//Errors
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";


function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  
  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content="Loading app..."/>

  return (
    <>
      
      <ModalContainer/>
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
        <ToastContainer position='bottom-right' hideProgressBar/>;
         <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
        <Route exact path="/telefonat" component={TelefoniDashboard} />
        <Route path="/telefonat/:id" component={TelefoniDetails} />
        <Route key={location.key} path={['/createTelefoni', '/manage/:id']} component={TelefoniForm}/>

        <Route exact path="/laptopat" component={LaptopiDashboard} />
        <Route path="/laptopat/:id" component={LaptopiDetails} />
        <Route key={location.key} path={['/createLaptopi', '/manageLaptopi/:id']} component={LaptopiForm}/>

        <Route exact path="/orat" component={OraDashboard} />
        <Route path="/orat/:id" component={OraDetails} />
        <Route key={location.key} path={['/createOra', '/manageOra/:id']} component={OraForm}/>

        <Route path='/errors' component={TestErrors}/>
        <Route path='/server-error' component={ServerError}/>
        <Route path='/login' component={LoginForm}/>
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
