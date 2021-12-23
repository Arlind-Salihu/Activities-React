//Others
import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//HomePage
import HomePage from "../../features/home/HomePage";

//Profile
import ProfilePage from "../../features/profiles/ProfilePage";

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
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <ToastContainer position="bottom-right" hideProgressBar />;
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute exact path="/telefonat" component={TelefoniDashboard}/>
                <PrivateRoute path="/telefonat/:id" component={TelefoniDetails}/>
                <PrivateRoute key={location.key} path={["/createTelefoni", "/manage/:id"]} component={TelefoniForm}/>
                <PrivateRoute path="/profiles/:username" component={ProfilePage}/>
                <PrivateRoute path="/errors" component={TestErrors} />
                
                <Route path="/server-error" component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
