import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x25A62c116220Bf5C0F32Ce2312CDDaFEbCF35724'
);

export default instance;