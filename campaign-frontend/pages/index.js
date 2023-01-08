import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

function App(){

    const [campaigns, setCampaigns] = React.useState([]);

    React.useEffect( () => {

        // fetch deployed campaign addresses
        const fetchCampaigns = async () => {
            const data = await factory.methods.getDeployedCampaigns().call();
            setCampaigns(data);
        }

        fetchCampaigns().catch(console.error)
    });


    const renderCampaigns = () => {
        // redder campaign data in Cards
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (
                <Link route={`/campaigns/${address}`}>
                    View Campaign
                </Link>),
                fluid: true
            };
        });

        return <Card.Group items={items} /> 
    }

    return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                
                <Link route='/campaign/new'>
                    <Button
                        floated="right"
                        content="Create Campaign"
                        icon="add circle"
                        primary
                    />
                </Link>

                {renderCampaigns()}
            </div>
        </Layout>
        
    )

}

export default App;