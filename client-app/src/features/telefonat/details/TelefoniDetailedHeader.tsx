import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Telefoni } from "../../../app/models/telefoni";
import { useStore } from "../../../app/stores/store";

const telefoniImageStyle = {
  filter: "brightness(60%)",
};

const telefoniImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  telefoni: Telefoni;
}

export default observer(function TelefoniDetailedHeader({ telefoni }: Props) {
  const {telefoniStore: {updatePrezencen, loading, cancelTelefoniToggle}} = useStore();
  return (
    <Segment.Group style={{ width: "75%" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {telefoni.isCancelled &&
          <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}}
            ribbon color='red' content='Cancelled'/>
        }
        <Image
          src={`/assets/telefonat/${telefoni.kategoria}.png`}
          fluid
          style={telefoniImageStyle}
        />
        <Segment style={telefoniImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={telefoni.emri}
                  style={{ color: "white" }}
                />
                <p>{format(telefoni.data!, "dd MMM yyyy")}</p>
                <p>
                  Hosted by <strong><Link to={`/pofiles/${telefoni.host?.username}`}>{telefoni.host?.displayName}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {telefoni.isHost ? (
          <>
          <Button color={telefoni.isCancelled ? 'green' : 'red'} floated="left"
            basic content={telefoni.isCancelled ? 'Re-Aktivizo Telefonin' : 'Cancel Telefonin'}
            onClick={cancelTelefoniToggle} loading={loading}/>
          <Button
            disabled={telefoni.isCancelled}
            as={Link}
            to={`/manage/${telefoni.id}`}
            color="orange"
            floated="right"
          >
            Menaxho Telefonin
          </Button>
          </>
        ) : telefoni.isInteresed ? (
          <Button loading={loading} onClick={updatePrezencen}>Anulo te shikuarit</Button>
        ) : (
          <Button disabled={telefoni.isCancelled} loading={loading}
            onClick={updatePrezencen} color="teal">Shiko Telefonin
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
