import API_HELPER from "../../lib/apiHelper";

export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });

        return false;
    }

    let inputs = req.body;

    let form_inputs = ["id", "hash"];

    for (let i = 0; i < form_inputs.length; i++) {
        let k = form_inputs[i];

        if (typeof inputs[k] == "undefined" || !inputs[k]) {
            inputs[k] = "";
        }
    }

    let post_data = {
        tx_hash: inputs["hash"],
        id: inputs["id"],
    };

    API_HELPER.post("transaction/register", post_data)
        .then((response) => {
            if (response.error) {
                res.status(200).json({
                    success: false,
                    message: response.message,
                });
                return false;
            }

            res.status(200).json({
                success: true,
                message: "success",
            });
            return false;
        })
        .catch((error) => {
            res.status(200).json({
                success: false,
                message: error,
            });
            return false;
        });
}
