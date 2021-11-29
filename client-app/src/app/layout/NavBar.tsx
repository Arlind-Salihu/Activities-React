import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }}/>
          Tech E-Commerce
        </Menu.Item>
      </Container>

      <Menu.Item as={NavLink} to="/telefonat" name="Telefonat" />
      <Menu.Item as={NavLink} to="/laptopat" name="Laptopat" />
      <Menu.Item as={NavLink} to="/orat" name="Orat" />

      <Dropdown item style={{backgroundColor: "#3D83A9", color: "white", fontSize: "16px"}} text="Krijo Produktin">
        <Dropdown.Menu style={{backgroundColor: "#AEB6BF"}}>
          <Dropdown.Item>
            <Button
              as={NavLink}
              to="/createTelefoni"
              style={{backgroundColor: "#AEB6BF"}}
              content="Krijo Telefonin"
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Button
              as={NavLink}
              to="/createLaptopi"
              style={{backgroundColor: "#AEB6BF"}}
              content="Krijo Laptopin"
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Button
              as={NavLink}
              to="/createOra"
              style={{backgroundColor: "#AEB6BF"}}
              content="Krijo Oren"
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item as={NavLink} to="/errors" name="Errors" />
    </Menu>
  );
}
