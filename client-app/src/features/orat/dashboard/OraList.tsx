import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import OraListItem from "./OraListItem";

export default observer(function OraList() {
  const { oraStore } = useStore();
  const { groupedOrat } = oraStore;

  //style={{marginLeft:"30%", width:"100%"}}
  return (
    <>
      {groupedOrat.map(([group, orat]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {orat.map((ora) => (
            <OraListItem key={ora.id} ora={ora} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
