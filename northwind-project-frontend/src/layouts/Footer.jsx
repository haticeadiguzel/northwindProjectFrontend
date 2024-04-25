import React, { useState } from "react";
import { Menu, MenuItem, Segment } from "semantic-ui-react";
import "../App.css";

export default function Footer() {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="footer">
      <Segment inverted>
        <Menu inverted pointing secondary>
          <MenuItem
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <MenuItem
            name="messages"
            active={activeItem === "messages"}
            onClick={handleItemClick}
          />
          <MenuItem
            name="friends"
            active={activeItem === "friends"}
            onClick={handleItemClick}
          />
        </Menu>
      </Segment>
    </div>
  );
}
