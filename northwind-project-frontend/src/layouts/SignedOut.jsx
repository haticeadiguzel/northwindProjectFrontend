import React from "react";
import { Button, MenuItem } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <MenuItem>
        <Button onClick={signIn} primary>
          Log In
        </Button>
        <Button primary style={{ marginLeft: "0.5em" }}>
          Register
        </Button>
      </MenuItem>
    </div>
  );
}
