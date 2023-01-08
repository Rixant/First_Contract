import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import MyCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = ({address}) => {

    const [value, setValue] = React.useState(0);

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = MyCampaign(address);
        
        // contibute to the campaign
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Button primary>
                Contribute
            </Button>
        </Form>
    );

};

export default ContributeForm;