import Web3 from "web3";
import ShortSnsJson from "./abi.json";

int web3 = {
    http: undefined,
    ws: undefined,
    shortsns: undefined,
};

const wsEndpoint = "wss://ropsten.infura.io/ws/v3/29efd9ef3fef494c893162a139837503";
const httpEndpoint = "https://ropsten.infura.io/v3/29efd9ef3fef494c893162a139837503";

web3.ws = new Web3(wsEndpoint);

if(window.ethereum) {
    web3.http = new Web3(window.ethereum);
} else {
    web3.http = new Web3(httpEndpoint);
}

web3.shortsns = new web3.http.eth.Contract(ShortSnsJson, 0x48f7addb1534e395c8c569c5168e29c8162d5398);

export { web3 };