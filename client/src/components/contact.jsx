import React from "react";
import { Form, Button, Message, Dropdown } from "semantic-ui-react";
import Reaptcha from "reaptcha";
import apiUtil from "../apiUtil";

const subjects = [
  {
    key: "report",
    value: "report",
    text: "I want to report a violation of the Eden terms and conditions",
  },
  {
    key: "appeal",
    value: "appeal",
    text: "I want to appeal my suspension or ban to the GM team",
  },
  {
    key: "support",
    value: "support",
    text: "I need to talk to someone regarding an install or configuration",
  },
  {
    key: "password",
    value: "password",
    text: "I need to talk to someone regarding my lost login info",
  },
  {
    key: "corruption",
    value: "corruption",
    text: "I want to report a case of GM corruption",
  },
  {
    key: "other",
    value: "other",
    text: "I need to talk to someone regarding something else",
  },
];

const Contact = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [verify, setVerify] = React.useState(null);

  const contact = () => {
    apiUtil.post(
      {
        url: "/api/v1/misc/contact",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          name,
          email,
          subject,
          message,
          verify,
        },
      },
      (error, res) => {
        if (!error && res.status !== 400) {
          alert("submitted request");
          setName("");
          setEmail("");
          setSubject(null);
          setMessage("");
          setVerify(null);
        } else {
          alert("not submitted request");
        }
      }
    );
  };

  return (
    <Message className="gm_rules-section">
      <Form>
        <Form.Group widths={2}>
          <Form.Field>
            <label>Character Name</label>
            <input
              placeholder="Character Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Subject</label>
          <Dropdown
            fluid
            selection
            options={subjects}
            value={subject}
            onChange={(_e, { value }) => setSubject(value)}
            placeholder="Select the appropriate subject otherwise your message may be ignored."
          />
        </Form.Field>
        <Form.Field>
          <label>Message</label>
          <textarea
            placeholder="Message (required)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Reaptcha
            sitekey="6LdRetoUAAAAADZCMb3UVu28kka1IDVTeZLTWY3w"
            onVerify={(key) => setVerify(key)}
          />
        </Form.Field>
        <Button disabled={!verify || message.length < 15} onClick={contact}>
          Submit
        </Button>
      </Form>
    </Message>
  );
};

export default Contact;
