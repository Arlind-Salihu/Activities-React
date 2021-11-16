import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Produkti } from "../../../app/models/produkti";

interface Props {
  produktet: Produkti[];
  selectProdukti: (id:string) => void;
  deleteProdukti: (id:string) => void;
}

export default function ProduktiList({ produktet, selectProdukti, deleteProdukti}: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {produktet.map((produkti) => (
          <Item key={produkti.id}>
            <Item.Content>
              <Item.Header as="a">{produkti.emri}</Item.Header>
              <Item.Meta>{produkti.data}</Item.Meta>
              <Item.Description>
                  <div>{produkti.pershkrimi}</div>
                  <div>{produkti.brendi}</div>
                  <div>{produkti.cmimi+'€'}</div>
              </Item.Description>
              <Item.Extra>
                  <Button onClick={() => selectProdukti(produkti.id)} floated='right' content='View' color='blue'/>
                  <Button onClick={() => deleteProdukti(produkti.id)} floated='right' content='Delete' color='red'/>
                  <Label basic content={produkti.kategoria}/>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
