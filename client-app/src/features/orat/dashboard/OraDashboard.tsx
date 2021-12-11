import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import OraFilters from "./OraFilters";
import OraList from "./OraList";

export default observer(function OraDashboard() {

  const {oraStore} = useStore();
  const {loadOrat, oraRegistry} = oraStore;

  useEffect(() => {
    if(oraRegistry.size <= 1) loadOrat();
  }, [oraRegistry.size, loadOrat]);


  if (oraStore.loadingInitial)
    return <LoadingComponent content={"Te dhenat per produktet e Orave jane duke u hapur!"}/>;
  return (
    <Grid>
      <Grid.Column width="10">
        <OraList/>
      </Grid.Column>
      <Grid.Column width="6">
        <OraFilters/>
      </Grid.Column>
    </Grid>
  );
})