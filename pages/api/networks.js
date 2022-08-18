import API_HELPER from "../../lib/apiHelper";
import NETWORK_HELPER from "../../lib/networkHelper";

export default function handler(req, res) {
    API_HELPER.get("networks")
        .then((response) => {
            let available_networks = [];
            for (let i = 0; i < response.content.length; i++) {
                let d = response.content[i];
                let network_data = NETWORK_HELPER.getNetworkData(d.symbol);
                if (network_data) {
                    available_networks.push(network_data);
                }
            }

            if (available_networks.length) {
                res.status(200).json(available_networks);
                return false;
            }

            res.status(200).json([]);
            return false;
        })
        .catch((error) => {
            res.status(406).json(error);
        });

    return false;
}
