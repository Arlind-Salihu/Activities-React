import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ProduktiDetails from "../details/ProduktiDetails";
import ProduktiForm from "../form/ProduktiForm";
import ProduktiList from "./ProduktiList";

export default observer(function ProduktiDashboard() {

  const {produktiStore} = useStore();
  const {selectedProdukti, editMode} = produktiStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ProduktiList/>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedProdukti && !editMode && (
          <ProduktiDetails/>
        )}
        {editMode && (
          <ProduktiForm/>
        )}
      </Grid.Column>
    </Grid>
  );
})