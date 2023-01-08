import React from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

const RequestNew = ({ adddress }) => {

    const [value, setValue] = React.useState(100);
    const [description, setDescription] = React.useState('Coin');
    const [recipient, setRecipient] = React.useState(null);

    return (
        <Layout>
            <Form>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Field>


                <Form.Field>
                    <label>Value in Ether</label>
                    <Input 
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </Form.Field>


                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                    />
                </Form.Field>

                <Button primary>Create!</Button>
            </Form>
        </Layout>
    )
}

RequestNew.getInitialProps = (props) => {
    const { address } = props.query;

    return { address}
}

export default RequestNew;