import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Produkti } from "../../../app/models/produkti";

interface Props{
    produkti: Produkti;
    cancleSelectProdukti: () => void;
    openForm: (id: string) => void;

}

export default function ProduktiDetails({produkti, cancleSelectProdukti, openForm}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${produkti.kategoria}.png`}/>
      <Card.Content>
        <Card.Header>{produkti.emri}</Card.Header>
        <Card.Meta>
          <span>{produkti.data}</span>
        </Card.Meta>
        <Card.Description>
            {produkti.pershkrimi}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(produkti.id)} basic color='blue' content='Edit'/>
            <Button onClick={cancleSelectProdukti} basic color='red' content='Cancel'/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
