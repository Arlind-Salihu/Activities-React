import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default observer(function ProduktiForm() {
  const history = useHistory();
  const { produktiStore } = useStore();
  const {
    createProdukti,
    updateProdukti,
    loading,
    loadProdukti,
    loadingInitial,
  } = produktiStore;
  const { id } = useParams<{ id: string }>();

  const [produkti, setProdukti] = useState({
    id: "",
    emri: "",
    kategoria: "",
    brendi: "",
    data: "",
    pershkrimi: "",
    cmimi: 0,
  });

  useEffect(() => {
    if (id) loadProdukti(id).then((produkti) => setProdukti(produkti!));
  }, [id, loadProdukti]);

  function handleSubmit() {
    if (produkti.id.length === 0) {
      let newProdukti = {
        ...produkti,
        id: uuid(),
      };
      createProdukti(newProdukti).then(() =>
        history.push(`/produktet/${newProdukti.id}`)
      );
    } else {
      updateProdukti(produkti).then(() =>
        history.push(`/produktet/${produkti.id}`)
      );
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProdukti({ ...produkti, [name]: value });
  }

  if (loadingInitial)
    return (
      <LoadingComponent content={"Te dhenat e produktit jane duke u hapur!"} />
    );

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Emri"
          value={produkti.emri}
          name="emri"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Kategoria"
          value={produkti.kategoria}
          name="kategoria"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Brendi"
          value={produkti.brendi}
          name="brendi"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Data"
          value={produkti.data}
          name="data"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Pershkrimi"
          value={produkti.pershkrimi}
          name="pershkrimi"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Cmimi"
          value={produkti.cmimi}
          name="cmimi"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
          value={produkti.emri}
          name="emri"
          onChange={handleInputChange}
        />
        <Button
          as={Link}
          to="/produktet"
          floated="right"
          type="button"
          content="Cancel"
          value={produkti.emri}
          name="emri"
          onChange={handleInputChange}
        />
      </Form>
    </Segment>
  );
});
