import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Reaptcha from 'reaptcha';

const useField = (name) => {
    const [getter, setter] = React.useState('');

    return {
        name,
        label: name,
        fluid: true,
        value: getter,
        placeholder: name,
        onChange: (e) => setter(e.target.value),
    }
};

export default ({ error, register, changePage, verify, verified }) => {
    const username = useField('Username');
    const password = useField('Password');
    const email = useField('Email');
    const confirmUsername = useField('Confirm Username');
    const confirmPassword = useField('Confirm Password');
    const confirmEmail = useField('Confirm Email');
    const inputGroup = {
        username,
        password,
        email,
        confirmUsername,
        confirmPassword,
        confirmEmail,
    };

    return (
        <Form error={Object.keys(error).length > 0}>
            <Message error header="Registration Error" list={Object.values(error)} />
            <Form.Group widths='equal'>
                <Form.Input error={!!error.username} {...username} />
                <Form.Input error={!!error.confirmUsername} {...confirmUsername} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input error={!!error.password} {...password} />
                <Form.Input error={!!error.confirmPassword} {...confirmPassword} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input error={!!error.email} {...email} />
                <Form.Input error={!!error.confirmEmail} {...confirmEmail} />
            </Form.Group>
            <Form.Field>
                <Button floated="right" primary disabled={!verified} onClick={() => register(inputGroup)}>Register</Button>
                <Button size="mini" basic onClick={changePage}>Existing Account</Button>
            </Form.Field>
            <Reaptcha
                sitekey="6LdRetoUAAAAADZCMb3UVu28kka1IDVTeZLTWY3w"
                onVerify={key => verify(key)}
            />
        </Form>
    );
};
