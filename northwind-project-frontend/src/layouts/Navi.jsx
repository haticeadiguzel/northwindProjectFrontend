import React, { useState } from "react";
import CartSummary from "./CartSummary";
import { Container, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navi() {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const { cartItems } = useSelector((state) => state.cart);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const history = useNavigate();

  function handleSignOut(params) {
    setIsAuthenticated(false);
    history("/");
  }

  function handleSignIn(params) {
    setIsAuthenticated(true);
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <MenuItem
            as={NavLink}
            to="/products"
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <MenuItem
            name="messages"
            active={activeItem === "messages"}
            onClick={handleItemClick}
          />

          <MenuMenu position="right">
            {cartItems.length > 0 && <CartSummary />}
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </MenuMenu>
        </Container>
      </Menu>
    </div>
  );
}
