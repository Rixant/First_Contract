import React from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import MyCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = ({address}) => {

    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = MyCampaign(address);

        setLoading(true);
        setErrorMessage('');
        
        // contibute to the campaign
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${address}`)
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
        setValue('');
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                Contribute
            </Button>
        </Form>
    );

};

export default ContributeForm;