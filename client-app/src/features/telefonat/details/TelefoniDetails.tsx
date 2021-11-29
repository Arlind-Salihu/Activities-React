import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TelefoniDetailedChat from "./TelefoniDetailedChat";
import TelefoniDetailedHeader from "./TelefoniDetailedHeader";
import TelefoniDetailedInfo from "./TelefoniDetailedInfo";
import TelefoniDetailedSidebar from "./TelefoniDetailedSidebar";

export default observer(function TelefoniDetails() {
  const { telefoniStore } = useStore();
  const {
    selectedTelefoni: telefoni,
    loadTelefoni,
    loadingInitial,
  } = telefoniStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTelefoni(id);
  }, [id, loadTelefoni]);

  if (loadingInitial || !telefoni)
    return (
      <LoadingComponent content={"Te dhenat e telefonit jane duke u hapur!"}/>
    );
  return (
    <Grid>
      <Grid.Column width={10}>
        <TelefoniDetailedHeader telefoni={telefoni}/>
        <TelefoniDetailedInfo telefoni={telefoni}/>
        <TelefoniDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <TelefoniDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
});
