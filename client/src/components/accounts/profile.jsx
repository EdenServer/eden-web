import { Alert, Button, Input, Modal, notification, Row } from 'antd';
import React from 'react';
import { Segment, List, Message, Card, Image, Icon } from 'semantic-ui-react';
import apiUtil from '../../apiUtil';
import images from '../../images';

export default ({ user, logout, reload }) => {
  const [modalOpen, setModalOpen] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [confirmEmail, setConfirmEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const lastLogin = new Date(user.timelastmodify);
  const [notify, banner] = notification.useNotification();

  const cancelUpdate = () => {
    setModalOpen(null);
    setEmail('');
    setConfirmEmail('');
    setConfirmPassword('');
    setPassword('');
    setOldPassword('');
  };
  const updateField = (field, payload) => {
    apiUtil.put(
      {
        url: `/api/v1/accounts/${field}`,
        headers: payload,
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
          notify.error({
            duration: 3,
            key: 'notification',
            message: `Unable to update ${field}`,
            placement: 'top',
          });
        }
      }
    );
  };

  return (
    <>
      {banner}
      <Modal
        open={modalOpen === 'email'}
        onCancel={cancelUpdate}
        footer={[
          <Button onClick={cancelUpdate}>Cancel</Button>,
          <Button
            disabled={oldPassword.length < 6 || email.length < 6 || email !== confirmEmail}
            type="primary"
            onClick={() =>
              updateField('email', {
                email,
                oldpass: oldPassword,
              })
            }
          >
            Update email
          </Button>,
        ]}
        title="Update Email"
      >
        <Row gutter={[8, 8]}>
          <Input placeholder="new email" value={email} onChange={e => setEmail(e.target.value)} size="large" />
          <Input placeholder="confirm new email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} size="large" />
          <Input.Password placeholder="current password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} size="large" />
        </Row>
      </Modal>
      <Modal
        open={modalOpen === 'password'}
        onCancel={cancelUpdate}
        footer={[
          <Button onClick={cancelUpdate}>Cancel</Button>,
          <Button
            disabled={oldPassword.length < 6 || password.length < 6 || password !== confirmPassword || oldPassword === password}
            type="primary"
            onClick={() =>
              updateField('password', {
                newpass: password,
                oldpass: oldPassword,
              })
            }
          >
            Update password
          </Button>,
        ]}
        title="Update password"
      >
        <Row gutter={[8, 8]}>
          <Input.Password placeholder="new password" value={password} onChange={e => setPassword(e.target.value)} size="large" />
          <Input.Password placeholder="confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} size="large" />
          <Input.Password placeholder="current password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} size="large" />
        </Row>
      </Modal>
      <Segment>
        <List>
          <List.Item icon="user" content={user.login} />
          <List.Item icon="envelope" content={user.email || 'no recovery email'} />
          <List.Item icon="clock" content={`${lastLogin.toLocaleDateString()} ${lastLogin.toLocaleTimeString()}`} />
        </List>
        {user.chars.length === 0 ? (
          <Message info>
            <Message.Header>No characters have been created for this account.</Message.Header>
            <Message.Content>Log into the game and create a character to start playing on Eden!</Message.Content>
          </Message>
        ) : (
          <Card.Group>
            {user.chars.map((char, i) => (
              <Card key={`char_${i}`}>
                <Card.Content>
                  <Image rounded floated="right" src={images.avatar(char.avatar)} />
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
        <Row style={{ marginTop: '8px' }} justify="space-between">
          <Row gutter={[8, 8]}>
            <Button style={{ marginRight: '8px' }} onClick={() => setModalOpen('email')}>
              {user.email ? 'Change' : 'Add'} Email
            </Button>
            <Button onClick={() => setModalOpen('password')}>Change Password</Button>
          </Row>
          <Button type="dashed" danger onClick={logout}>
            Logout
          </Button>
        </Row>
      </Segment>
    </>
  );
};
