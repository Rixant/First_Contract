import React from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import MyCampaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

const RequestNew = ({ address }) => {

    const [value, setValue] = React.useState(0);
    const [description, setDescription] = React.useState('Coin');
    const [recipient, setRecipient] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = MyCampaign(address);

        setLoading(true);
        setErrorMessage('');

        // create a new request
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({from: accounts[0]})

            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    }

    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                Back
            </Link>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
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

                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>Create!</Button>
            </Form>
        </Layout>
    )
}

RequestNew.getInitialProps = (props) => {
    const { address } = props.query;

    return { address}
}

export default RequestNew;