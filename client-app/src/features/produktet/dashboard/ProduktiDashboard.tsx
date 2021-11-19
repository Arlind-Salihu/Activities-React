import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ProduktiList from "./ProduktiList";

export default observer(function ProduktiDashboard() {

  const {produktiStore} = useStore();
  const {loadProduktet, produktiRegistry} = produktiStore;

  useEffect(() => {
    if(produktiRegistry.size <= 1) loadProduktet();
  }, [produktiRegistry.size, loadProduktet]);


  if (produktiStore.loadingInitial)
    return <LoadingComponent content="Te dhenat jane duke u hapur!"/>;
  return (
    <Grid>
      <Grid.Column width="10">
        <ProduktiList/>
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Produktet Filters</h2>
      </Grid.Column>
    </Grid>
  );
})