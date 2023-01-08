import React from 'react';
import { Input, Form, Button, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

function CampaignNew () {
    const [minContribution, setMinContribution] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (event) => {
        // prevent the browser from submitting by default
        event.preventDefault();

        setLoading(true);
        setErrorMessage('');

        // create a new campaign 
        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createCampaign(minContribution)
                .send({
                    from: accounts[0]
                })

            Router.pushRoute('/');
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    };

    return (
        <Layout>
            <h1>New Campaign!</h1>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label="wei" 
                        labelPosition="right"
                        value={minContribution}
                        onChange={event => setMinContribution(event.target.value)}
                    />
                </Form.Field>

                <Message error header="Oops!" content={errorMessage} />
                <Button loading={loading} primary>Create!</Button>
            </Form>
        </Layout>
    );
}

export default CampaignNew;