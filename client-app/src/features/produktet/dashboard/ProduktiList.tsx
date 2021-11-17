import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProduktiList() {

  const {produktiStore} = useStore();
  const {deleteProdukti, produktetByDate, loading} = produktiStore;
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
        {produktetByDate.map((produkti) => (
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
                  loading={loading && target === produkti.id}
                  onClick={(e) => handleProduktiDelete(e, produkti.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Button
                  onClick={() => produktiStore.selectProdukti(produkti.id)}
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
})
