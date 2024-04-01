import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  Label,
} from "semantic-ui-react";

export default function CartSummary() {
  //useSelector ile magazadaki state erisiyoruz
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <Dropdown item text="Your Cart">
        <DropdownMenu>
          {cartItems.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}
              <Label>{cartItem.quantity}</Label>
            </DropdownItem>
          ))}
          <DropdownDivider />
          <DropdownItem as={NavLink} to="/cart">
            Go to cart
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
