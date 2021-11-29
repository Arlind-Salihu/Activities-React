import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TelefoniListItem from "./TelefoniListItem";

export default observer(function TelefoniList() {
  const { telefoniStore } = useStore();
  const { groupedTelefonat } = telefoniStore;

  //style={{marginLeft:"30%", width:"100%"}}
  return (
    <>
      {groupedTelefonat.map(([group, telefonat]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {telefonat.map((telefoni) => (
            <TelefoniListItem key={telefoni.id} telefoni={telefoni} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
