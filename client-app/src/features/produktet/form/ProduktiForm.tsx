import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProduktiForm() {

  const {produktiStore} = useStore();
  const {selectedProdukti, closeForm, createProdukti, updateProdukti, loading} = produktiStore;

  const initialState = selectedProdukti ?? {
    id: '',
    emri: '',
    kategoria: '',
    brendi: '',
    data: '',
    pershkrimi: '',
    cmimi: 0,
  };

  const [produkti, setProdukti] = useState(initialState);

  function handleSubmit() {
    produkti.id ? updateProdukti(produkti) : createProdukti(produkti);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProdukti({ ...produkti, [name]: value });
  }

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
          onClick={closeForm}
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
})