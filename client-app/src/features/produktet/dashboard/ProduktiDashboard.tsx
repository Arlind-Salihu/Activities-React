import React from "react";
import { Grid } from "semantic-ui-react";
import { Produkti } from "../../../app/models/produkti";
import ProduktiDetails from "../details/ProduktiDetails";
import ProduktiForm from "../form/ProduktiForm";
import ProduktiList from "./ProduktiList";

interface Props {
  produktet: Produkti[];
  selectedProdukti: Produkti | undefined;
  selectProdukti: (id: string) => void;
  cancleSelectProdukti: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (produkti: Produkti) => void;
  deleteProdukti: (id: string) => void;
  submitting: boolean;
}

export default function ProduktiDashboard({
  produktet,
  selectedProdukti,
  selectProdukti,
  cancleSelectProdukti,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteProdukti,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ProduktiList
          produktet={produktet}
          selectProdukti={selectProdukti}
          deleteProdukti={deleteProdukti}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedProdukti && !editMode && (
          <ProduktiDetails
            produkti={selectedProdukti}
            cancleSelectProdukti={cancleSelectProdukti}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ProduktiForm
            closeForm={closeForm}
            produkti={selectedProdukti}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
