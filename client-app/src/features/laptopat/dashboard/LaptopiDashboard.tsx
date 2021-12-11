import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import LaptopiFilters from "./LaptopiFilters";
import LaptopiList from "./LaptopiList";

export default observer(function LaptopiDashboard() {

  const {laptopiStore} = useStore();
  const {loadLaptopat, laptopiRegistry} = laptopiStore;

  useEffect(() => {
    if(laptopiRegistry.size <= 1) loadLaptopat();
  }, [laptopiRegistry.size, loadLaptopat]);


  if (laptopiStore.loadingInitial)
    return <LoadingComponent content={"Te dhenat per produktet e Laptopave jane duke u hapur!"}/>;
  return (
    <Grid>
      <Grid.Column width="10">
        <LaptopiList/>
      </Grid.Column>
      <Grid.Column width="6">
        <LaptopiFilters/>
      </Grid.Column>
    </Grid>
  );
})