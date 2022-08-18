const https = require("https");

module.exports = {
    formatMoney: (number, parse) => {
        if (typeof parse == "undefined") {
            parse = false;
        }

        if (!parse) {
            number = parseFloat(number).toFixed(0);
        } else {
            number = parseFloat(number).toFixed(2);
        }

        if (number < 1000) {
            return number;
        }

        return Intl.NumberFormat("en-US").format(number);
    },

    getUSDPrice: (coin) => {
        return new Promise((go, canc) => {
            let url =
                "https://api.coingecko.com/api/v3/simple/price?ids=" +
                coin.id +
                "&vs_currencies=usd";

            return new Promise((resolve, reject) => {
                https
                    .get(url, (res) => {
                        let data = "";
                        res.on("data", (chunk) => {
                            data += chunk;
                        });
                        res.on("end", () => {
                            data = JSON.parse(data);
                            return resolve(data);
                        });
                    })
                    .on("error", (err) => {
                        console.log("err", err);
                        return reject(false);
                    });
            })
                .then((resp) => {
                    if (
                        typeof resp == "undefined" ||
                        typeof resp[coin.id] == "undefined" ||
                        typeof resp[coin.id]["usd"] == "undefined"
                    ) {
                        console.log("aa", resp);
                        return canc(false);
                    }
                    return go(resp[coin.id]["usd"]);
                })
                .catch((error) => {
                    console.log("error", error);
                    return canc(false);
                });
        });
    },
};
