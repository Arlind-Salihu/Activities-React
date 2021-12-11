import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image} from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer (function NavBar() {
  const {userStore: {user, logout}} = useStore();
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
      <Menu.Item position='right'>
        <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
        <Dropdown pointing='top left' text={user?.displayName}>
          <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/profle/${user?.username}`} text='Profile' icon='user'/>
          <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
          </Dropdown.Menu> 
        </Dropdown>
      </Menu.Item>
      <Menu.Item as={NavLink} to="/errors" name="Errors" />
    </Menu>
  );
})