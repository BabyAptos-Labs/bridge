import API_HELPER from "../../lib/apiHelper";
import NETWORK_HELPER from "../../lib/networkHelper";

export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });

        return false;
    }

    let inputs = req.body;

    let form_inputs = [
        "output_network",
        "input_network",
        "recipient",
        "amount",
        "referal",
        "secret",
        "delay",
        "caller",
    ];

    for (let i = 0; i < form_inputs.length; i++) {
        let k = form_inputs[i];

        if (typeof inputs[k] == "undefined" || !inputs[k]) {
            inputs[k] = "";
        }
    }

    let required_inputs = [
        "output_network",
        "input_network",
        "recipient",
        "delay",
    ];

    for (let i = 0; i < required_inputs.length; i++) {
        let k = required_inputs[i];

        let wrong = false;

        if (!inputs[k] || inputs[k] == "") {
            wrong = true;
        }

        if (k == "delay") {
            if (![10, 30, 60, 360, 720, 1440].includes(parseInt(inputs[k]))) {
                wrong = true;
            }
        }

        if (wrong) {
            res.status(200).json({
                success: false,
                field: k,
                message: "Input " + k + " is missing or invalid value",
            });
            return false;
        }
    }

    if (inputs["amount"]) {
        if (inputs["caller"] == "") {
            res.status(200).json({
                success: false,
                field: "amount",
                message: "Connect Your Wallet",
            });
            return false;
        }

        let contract_amount = [
            100000000000000000, 1000000000000000000, 10000000000000000000,
            50000000000000000000,
        ];

        if (inputs["input_network"] == "pol") {
            contract_amount = [
                50000000000000000000, 100000000000000000000,
                1000000000000000000000, 10000000000000000000000,
            ];
        }

        if (inputs["input_network"] == "avax") {
            contract_amount = [
                1000000000000000000, 10000000000000000000,
                100000000000000000000, 1000000000000000000000,
            ];
        }

        /*if (!contract_amount.includes(parseInt(inputs["amount"]))) {
            res.status(200).json({
                success: false,
                message: "Input amount has invalid value",
            });
            return false;
        }*/
    }

    let from_network = NETWORK_HELPER.getNetworkData(inputs["input_network"]);
    let to_network = NETWORK_HELPER.getNetworkData(inputs["output_network"]);

    if (!(from_network && to_network)) {
        res.status(200).json({
            success: false,
            message: "Bad selected networks",
        });

        return false;
    }

    let post_data = {
        input_chain: from_network.value,
        output_chain: to_network.value,
        delay: inputs["delay"] ?? 30,
        to: inputs["recipient"],
    };

    if (inputs["amount"]) {
        post_data["amount"] = inputs["amount"];
    }

    if (inputs["referal"]) {
        post_data["referal"] = inputs["referal"];
    }

    API_HELPER.post("transaction", post_data)
        .then((response) => {
            if (response.error) {
                res.status(200).json({
                    success: false,
                    message: response.message,
                });
                return false;
            }

            if (!response.content) {
                res.status(200).json({
                    success: false,
                    message: "API error!",
                });
                return false;
            }

            let a = new Date(
                (Date.now() / 60000 + parseInt(post_data["delay"])) * 60000
            );
            let b = 1000 * 60 * 5;
            let c = new Date(Math.ceil(new Date(a).getTime() / b) * b);

            res.status(200).json({
                success: true,
                message: {
                    transactionRecipient: inputs["recipient"],
                    transactionId: response.content.id,
                    referal: post_data["referal"] ?? "",
                    treasuryAddress: response.content.treasury,
                    action: response.content.transaction_type,
                    input: {
                        currency: from_network.currency,
                        image: from_network.image,
                        amount: inputs["amount"] ? inputs["amount"] : false,
                        limitations: response.content.limitation,
                    },
                    from_network: from_network,
                    to_network: to_network,
                    expected_delivery: new Date(c).getTime(),
                    recovery: response.content.recovery,
                },
            });
        })
        .catch((error) => {
            res.status(200).json({
                success: false,
                message: error,
            });
            return false;
        });
}
