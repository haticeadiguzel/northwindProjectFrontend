import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu } from "semantic-ui-react";

export default function CartSummary() {
  return (
    <div>
      <Dropdown item text="Your Cart">
        <DropdownMenu>
          <DropdownItem>Acer Laptop</DropdownItem>
          <DropdownItem>Asus Laptop</DropdownItem>
          <DropdownItem>Dell Laptop</DropdownItem>
          <DropdownDivider/>
          <DropdownItem as={NavLink} to = "/cart">Go to cart</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
