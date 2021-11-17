import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ProduktiDetails() {

  const {produktiStore} = useStore();
  const {selectedProdukti: produkti, openForm, cancelSelectedProdukti} = produktiStore;

  if (!produkti) return <LoadingComponent content={"Loadingggg..."}/>;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${produkti.kategoria}.png`} />
      <Card.Content>
        <Card.Header>{produkti.emri}</Card.Header>
        <Card.Meta>
          <span>{produkti.data}</span>
        </Card.Meta>
        <Card.Description>{produkti.pershkrimi}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(produkti.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedProdukti}
            basic
            color="red"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
