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
