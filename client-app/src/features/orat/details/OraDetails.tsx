import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import OraDetailedChat from "./OraDetailedChat";
import OraDetailedHeader from "./OraDetailedHeader";
import OraDetailedInfo from "./OraDetailedInfo";
import OraDetailedSidebar from "./OraDetailedSidebar";

export default observer(function OraDetails() {
  const { oraStore } = useStore();
  const {
    selectedOra: ora,
    loadOra,
    loadingInitial,
  } = oraStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadOra(id);
  }, [id, loadOra]);

  if (loadingInitial || !ora)
    return (
      <LoadingComponent content={"Te dhenat e orat jane duke u hapur!"}/>
    );
  return (
    <Grid>
      <Grid.Column width={10}>
        <OraDetailedHeader ora={ora}/>
        <OraDetailedInfo ora={ora}/>
        <OraDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <OraDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
});
