import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import MyCampaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const RequestIndex = ({address, requests, requestsCount, approversCount}) => {

    const { Header, Row, HeaderCell, Body } = Table

    const renderRows = () => {
        return requests.map((request, index) => {
            console.log(request);
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
             />;
        })
    }

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
            </Link>

            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
            <div>Found {requestsCount} requests.</div>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (props) => {
    const {address} = props.query;
    const campaign = MyCampaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestsCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call()
            })
    );

    return {address, requests, requestsCount, approversCount};
};

export default RequestIndex;