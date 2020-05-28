import React from "react";
import { Form, Button, Message } from "semantic-ui-react";

export default ({ error, login, changePage }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Form error={error}>
      <Message
        error
        header="Invalid Credentials"
        content="Check your username and password and try again."
      />
      <Form.Field error={error}>
        <label>Username</label>
        <input
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Field>
      <Form.Field error={error}>
        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Button
          floated="right"
          primary
          onClick={() => login(username, password)}
        >
          Login
        </Button>
        <Button size="mini" basic onClick={changePage}>
          New Account
        </Button>
      </Form.Field>
    </Form>
  );
};
