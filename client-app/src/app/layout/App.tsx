import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Produkti } from "../models/produkti";
import NavBar from "./NavBar";
import ProduktiDashboard from "../../features/produktet/dashboard/ProduktiDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [produktet, setProduktet] = useState<Produkti[]>([]);
  const [selectedProdukti, setSelectedProdukti] = useState<Produkti | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Produkti[]>("http://localhost:5000/api/produktet")
      .then((response) => {
        setProduktet(response.data);
      });
  }, []);

  function handleSelectProdukti(id: string){
    setSelectedProdukti(produktet.find(x => x.id === id))
  }

  function handleCancelSelectProdukti(){
    setSelectedProdukti(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectProdukti(id) : handleCancelSelectProdukti();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditProdukti(produkti: Produkti){
    produkti.id
    ? setProduktet([...produktet.filter(x => x.id !== produkti.id), produkti]) 
    : setProduktet([...produktet, {...produkti, id: uuid()}]);
    setEditMode(false);
    setSelectedProdukti(produkti);
  }
  
  function handleDeleteProdukti(id: string){
    setProduktet([...produktet.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
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
        />
      </Container>
    </>
  );
}

export default App;
