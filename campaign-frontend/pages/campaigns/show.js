import React, { Component } from "react";
import Layout from "../../components/Layout";
import MyCampaign from "../../ethereum/campaign";

const CampaignShow = async (props) => {

    const [minContribution, setMinContribution] = React.useState(0);
    const [balance, setBalance] = React.useState(0);
    const [requestsCount, setRequestsCount] = React.useState(0);
    const [approversCount, setApproversCount] = React.useState(0);
    const [manager, setManager] = React.useState('');

    React.useEffect((props) => {
        const fetchSummary =  async (props) => {
            const campaign = MyCampaign(props.query.address);
            const summary = await campaign.methods.getSummary().call();
            setMinContribution(summary[0]);
            setBalance(summary[1]);
            setRequestsCount(summary[2]);
            setApproversCount(summary[3]);
            setManager(summary[4]);
        }

        console.log(summary);

        fetchSummary().catch(console.error);
    })
    
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    );

}

export default CampaignShow;