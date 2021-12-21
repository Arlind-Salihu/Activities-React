import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserTelefoni } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";
const panes = [
  { menuItem: "Future Events", pane: { key: "future" } },
  { menuItem: "Past Events", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];
export default observer(function ProfileTelefonat() {
  const { profileStore } = useStore();
  const { loadUserTelefonat, profile, loadingTelefonat, userTelefonat } = profileStore;

  useEffect(() => {
    loadUserTelefonat(profile!.username);
  }, [loadUserTelefonat, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserTelefonat(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };
  return (
    <Tab.Pane loading={loadingTelefonat}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Telefonat"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userTelefonat.map((telefoni: UserTelefoni) => (
              <Card
                as={Link}
                to={`/telefonat/${telefoni.id}`}
                key={telefoni.id}
              >
                <Image
                  src={`/assets/telefonat/${telefoni.kategoria}.png`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{telefoni.emri}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(telefoni.data), "do LLL")}</div>
                    <div>{format(new Date(telefoni.data), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
