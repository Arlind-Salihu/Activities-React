import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import LaptopiDetailedChat from "./LaptopiDetailedChat";
import LaptopiDetailedHeader from "./LaptopiDetailedHeader";
import LaptopiDetailedInfo from "./LaptopiDetailedInfo";
import LaptopiDetailedSidebar from "./LaptopiDetailedSidebar";

export default observer(function LaptopiDetails() {
  const { laptopiStore } = useStore();
  const {
    selectedLaptopi: laptopi,
    loadLaptopi,
    loadingInitial,
  } = laptopiStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadLaptopi(id);
  }, [id, loadLaptopi]);

  if (loadingInitial || !laptopi)
    return (
      <LoadingComponent content={"Te dhenat e laptopit jane duke u hapur!"}/>
    );
  return (
    <Grid>
      <Grid.Column width={10}>
        <LaptopiDetailedHeader laptopi={laptopi}/>
        <LaptopiDetailedInfo laptopi={laptopi}/>
        <LaptopiDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <LaptopiDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
});
