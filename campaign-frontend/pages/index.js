import React from 'react';
import { Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';

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
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} /> 
    }


    return (
        <div>
            {renderCampaigns()}
        </div>
    )

}

export default App;