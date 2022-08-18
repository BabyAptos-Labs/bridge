import API_HELPER from "../../lib/apiHelper";

export default function handler(req, res) {
    const {
        query: { from, to },
        method,
    } = req;

    API_HELPER.get("rate/" + from + "/" + to)
        .then((response) => {
            console.log("response", response);

            if (!response.error && response.rate) {
                res.status(200).json(response.rate);
                return;
            }

            res.status(406).json("error");
            return false;
        })
        .catch((error) => {
            console.log("error", error);
            res.status(406).json(error);
        });
}
