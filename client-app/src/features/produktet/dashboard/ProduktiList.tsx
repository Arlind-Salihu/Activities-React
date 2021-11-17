import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Produkti } from "../../../app/models/produkti";

interface Props {
  produktet: Produkti[];
  selectProdukti: (id: string) => void;
  deleteProdukti: (id: string) => void;
  submitting: boolean;
}

export default function ProduktiList({
  produktet,
  selectProdukti,
  deleteProdukti,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleProduktiDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteProdukti(id);
  }
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
                <div>{produkti.cmimi + "€"}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  name={produkti.id}
                  loading={submitting && target === produkti.id}
                  onClick={(e) => handleProduktiDelete(e, produkti.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Button
                  onClick={() => selectProdukti(produkti.id)}
                  floated="right"
                  content="View"
                  color="instagram"
                />
                <Label basic content={produkti.kategoria} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
