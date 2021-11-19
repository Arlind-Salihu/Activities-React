import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ProduktiDashboard from "../../features/produktet/dashboard/ProduktiDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProduktiForm from "../../features/produktet/form/ProduktiForm";
import ProduktiDetails from "../../features/produktet/details/ProduktiDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      
      <Route path={'/(.+)'} render={() => (
        <>
         <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/produktet" component={ProduktiDashboard} />
        <Route path="/produktet/:id" component={ProduktiDetails} />
        <Route
          key={location.key}
          path={["/createProdukti", "/manage/:id"]}
          component={ProduktiForm}
        />
      </Container>
        </>
      )}
      />
    </>
  );
}

export default observer(App);
