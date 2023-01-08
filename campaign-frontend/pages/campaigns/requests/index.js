import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import MyCampaign from '../../../ethereum/campaign';

const RequestIndex = ({address, requests}) => {

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <Button primary>Add Request</Button>
            </Link>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (props) => {
    const {address} = props.query;
    const campaign = MyCampaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call()
            })
    );

    return {address, requests};
};

export default RequestIndex;