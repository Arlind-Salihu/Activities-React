import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ProduktiDetailedChat from "./ProduktiDetailedChat";
import ProduktiDetailedHeader from "./ProduktiDetailedHeader";
import ProduktiDetailedInfo from "./ProduktiDetailedInfo";
import ProduktiDetailedSidebar from "./ProduktiDetailedSidebar";

export default observer(function ProduktiDetails() {
  const { produktiStore } = useStore();
  const {
    selectedProdukti: produkti,
    loadProdukti,
    loadingInitial,
  } = produktiStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadProdukti(id);
  }, [id, loadProdukti]);

  if (loadingInitial || !produkti)
    return (
      <LoadingComponent content="Te dhenat e produktit jane duke u hapur!" />
    );
  return (
    <Grid>
      <Grid.Column width={10}>
        <ProduktiDetailedHeader produkti={produkti}/>
        <ProduktiDetailedInfo produkti={produkti}/>
        <ProduktiDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ProduktiDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
});
