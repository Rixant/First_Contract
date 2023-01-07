import React from 'react';
import factory from '../factory';


function App(){


    const [campaigns, setCampaigns] = React.useState([]);

    React.useEffect( () => {
        const fetchData = async () => {
        const data = await factory.methods.getDeployedCampaigns().call();
        setCampaigns(data);
        }

        fetchData().catch(console.error);
      
    });

    
}

export default App;