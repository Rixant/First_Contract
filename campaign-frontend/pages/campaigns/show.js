import React, { useEffect, useState } from "react";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import MyCampaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

const CampaignShow = ({ summary }) => {

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Column width={10}>
            {summary ? (
                    <Card.Group>
                    <Card>
                        <Card.Content style={{ textAlign: "left", overflow: "auto" }}>
                        <Card.Header>Minimum Contribution</Card.Header>
                        <Card.Description>{summary[0]}</Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content style={{ textAlign: "left", overflow: "auto" }}>
                        <Card.Header>Balance</Card.Header>
                        <Card.Description>{summary[1]}</Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content style={{ textAlign: "left", overflow: "auto" }}>
                        <Card.Header>Requests Count</Card.Header>
                        <Card.Description>{summary[2]}</Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content style={{ textAlign: "left", overflow: "auto" }}>
                        <Card.Header>Approval Count</Card.Header>
                        <Card.Description>{summary[3]}</Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content style={{ textAlign: "left", overflow: "auto" }}>
                        <Card.Header>Manager</Card.Header>
                        <Card.Description>{summary[4]}</Card.Description>
                        </Card.Content>
                    </Card>
                    </Card.Group>
                ) : (
                    <p>Loading summary...</p>
                )}
            </Grid.Column>

            <Grid.Column width={6}>
                <ContributeForm />
            </Grid.Column>
        </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (props) => {
  const campaign = MyCampaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  return { summary };
};

export default CampaignShow;