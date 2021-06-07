import React from 'react';
import {
  Segment,
  Label,
  List,
  Message,
  Card,
  Image,
  Icon,
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import apiUtil from '../../apiUtil';
import images from '../../images';

export default ({ user, logout, reload }) => {
  const [modalOpen, setModalOpen] = React.useState(null);
  const [email, setEmail] = React.useState(user.email || '');
  const [password, setPassword] = React.useState('');
  const lastLogin = new Date(user.timelastmodify);

  const updateField = (field, value) => {
    apiUtil.put(
      {
        url: `api/v1/accounts/${field}`,
        headers: { [field]: value },
      },
      (error, res) => {
        if (error) {
          console.error(error);
        } else if (res.status === 200) {
          res
            .text()
            .then(jwt => {
              localStorage.setItem('jwt', jwt);
              reload();
              setModalOpen(null);
            })
            .catch(err => console.error(err));
        } else {
          console.error('Unable to change password.');
        }
      }
    );
  };

  return (
    <>
      <Modal
        className="gm_field-change"
        closeOnDimmerClick
        open={modalOpen === 'email'}
        onClose={() => setModalOpen('email')}
      >
        <Modal.Header>
          <Label color="blue" attached="top">
            Update Email
          </Label>
          <Form>
            <Form.Field>
              <Input
                placeholder="new email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Field>
            <Button negative onClick={() => setModalOpen(null)}>
              Cancel
            </Button>
            <Button primary onClick={() => updateField('email', email)}>
              Save
            </Button>
          </Form>
        </Modal.Header>
      </Modal>
      <Modal
        className="gm_field-change"
        closeOnDimmerClick
        open={modalOpen === 'password'}
        onClose={() => setModalOpen(null)}
      >
        <Modal.Header>
          <Label color="blue" attached="top">
            Update Password
          </Label>
          <Form>
            <Form.Field>
              <Input
                maxLength={15}
                placeholder="new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Field>
            <Button negative onClick={() => setModalOpen(null)}>
              Cancel
            </Button>
            <Button primary onClick={() => updateField('password', password)}>
              Save
            </Button>
          </Form>
        </Modal.Header>
      </Modal>
      <Segment>
        <List>
          <List.Item icon="user" content={user.login} />
          <List.Item
            icon="envelope"
            content={user.email || 'no recovery email'}
          />
          <List.Item
            icon="clock"
            content={`${lastLogin.toLocaleDateString()} ${lastLogin.toLocaleTimeString()}`}
          />
        </List>
        {user.chars.length === 0 ? (
          <Message info>
            <Message.Header>
              No characters have been created for this account.
            </Message.Header>
            <Message.Content>
              Log into the game and create a character to start playing on Eden!
            </Message.Content>
          </Message>
        ) : (
          <Card.Group>
            {user.chars.map((char, i) => (
              <Card key={`char_${i}`}>
                <Card.Content>
                  <Image
                    rounded
                    floated="right"
                    src={images.avatar(char.avatar)}
                  />
                  <Card.Header>{char.name}</Card.Header>
                  <Card.Meta>{char.job}</Card.Meta>
                  <Card.Description>
                    <Icon
                      size="small"
                      name={char.online === 1 ? 'circle' : 'circle outline'}
                      color={char.online === 1 ? 'green' : 'black'}
                      disabled={char.online !== 1}
                    />{' '}
                    {char.title}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
        <div className="gm_profile-buttons">
          <Button onClick={() => setModalOpen('email')}>
            {user.email ? 'Change' : 'Add'} Email
          </Button>
          <Button onClick={() => setModalOpen('password')}>
            Change Password
          </Button>
          <Button floated="right" color="red" onClick={logout}>
            Logout
          </Button>
        </div>
      </Segment>
    </>
  );
};
