import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x1651A6de0967fecb00F6CAfae21aE4d84d815E96'
);

export default instance;