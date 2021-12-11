import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TelefoniFilters from "./TelefoniFilters";
import TelefoniList from "./TelefoniList";

export default observer(function TelefoniDashboard() {

  const {telefoniStore} = useStore();
  const {loadTelefonat, telefoniRegistry} = telefoniStore;

  useEffect(() => {
    if(telefoniRegistry.size <= 1) loadTelefonat();
  }, [telefoniRegistry.size, loadTelefonat]);


  if (telefoniStore.loadingInitial)
    return <LoadingComponent content={"Te dhenat per produktet e Telefonave jane duke u hapur!"}/>;
  return (
    <Grid>
      <Grid.Column width="10">
        <TelefoniList/>
      </Grid.Column>
      <Grid.Column width="6">
        <TelefoniFilters/>
      </Grid.Column>
    </Grid>
  );
})