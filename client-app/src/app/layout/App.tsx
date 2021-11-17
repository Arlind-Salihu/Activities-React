import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Produkti } from "../models/produkti";
import NavBar from "./NavBar";
import ProduktiDashboard from "../../features/produktet/dashboard/ProduktiDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [produktet, setProduktet] = useState<Produkti[]>([]);
  const [selectedProdukti, setSelectedProdukti] = useState<
    Produkti | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Produktet.list().then((response) => {
      let produktet: Produkti[] = [];
      response.forEach((produkti) => {
        produkti.data = produkti.data.split("T")[0];
        produktet.push(produkti);
      });
      setProduktet(produktet);
      setLoading(false);
    });
  }, []);

  function handleSelectProdukti(id: string) {
    setSelectedProdukti(produktet.find((x) => x.id === id));
  }

  function handleCancelSelectProdukti() {
    setSelectedProdukti(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectProdukti(id) : handleCancelSelectProdukti();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditProdukti(produkti: Produkti) {
    setSubmitting(true);
    if (produkti.id) {
      agent.Produktet.update(produkti).then(() => {
        setProduktet([
          ...produktet.filter((x) => x.id !== produkti.id),
          produkti,
        ]);
        setSelectedProdukti(produkti);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      produkti.id = uuid();
      agent.Produktet.create(produkti).then(() => {
        setProduktet([...produktet, produkti]);
        setSelectedProdukti(produkti);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteProdukti(id: string) {
    setSubmitting(true);
    agent.Produktet.delete(id).then(() => {
      setProduktet([...produktet.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ProduktiDashboard
          produktet={produktet}
          selectedProdukti={selectedProdukti}
          selectProdukti={handleSelectProdukti}
          cancleSelectProdukti={handleCancelSelectProdukti}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditProdukti}
          deleteProdukti={handleDeleteProdukti}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
