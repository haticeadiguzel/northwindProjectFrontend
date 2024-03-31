import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";

export default function SignedIn({signOut}) {
  return (
    <div>
      <MenuItem>
        <Image
          avatar
          spaced="right"
          src="https://media.licdn.com/dms/image/D4D03AQEH5EvJYI6fkA/profile-displayphoto-shrink_800_800/0/1708215290249?e=2147483647&v=beta&t=BLGNED7ieXWt0r2Ud3nrGWxfECKebWlaBuV0yskjGR4"
        />
        <Dropdown pointing="top left" text="Hatice">
          <DropdownMenu>
            <DropdownItem text="My Information" icon="info" />
            <DropdownItem
              onClick={signOut}
              text="Log Out"
              icon="sign-out"
            />
          </DropdownMenu>
        </Dropdown>
      </MenuItem>
    </div>
  );
}
