import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ProduktiDetails() {
  const { produktiStore } = useStore();
  const {
    selectedProdukti: produkti,
    loadProdukti,
    loadingInitial,
  } = produktiStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadProdukti(id);
  }, [id, loadProdukti]);

  if (loadingInitial || !produkti)
    return (
      <LoadingComponent content="Te dhenat e produktit jane duke u hapur!" />
    );
  return (
    <Card style={{ marginLeft: "33%", width: "35%" }}>
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
            as={Link}
            to={`/manage/${produkti.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={`/produktet`}
            basic
            color="red"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
