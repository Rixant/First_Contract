import React from 'react';
import factory from '../factory';


function Campaign () {

    const [campaigns, setCampaigns] = React.useState([]);

    React.useEffect(async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        setCampaigns(campaigns);
    });

    return (
        <div>campaigns[0]</div>
    );

}