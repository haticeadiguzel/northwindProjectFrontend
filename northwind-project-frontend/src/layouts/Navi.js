import React from "react";
import CartSummary from "./CartSummary";
import {
  Button,
  Container,
  Menu,
  MenuItem,
  MenuMenu,
} from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <MenuItem name="home" />
          <MenuItem name="messages" />

          <MenuMenu position="right">
            <CartSummary/>

            <MenuItem>
              <Button primary>Sign Up</Button>
            </MenuItem>
          </MenuMenu>
        </Container>
      </Menu>
    </div>
  );
}
