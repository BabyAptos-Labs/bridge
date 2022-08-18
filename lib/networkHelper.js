const NETWORK_HELPER = {
    networks: {
        avax: {
            title: "Avalanche",
            image: "/images/avalanche.svg",
            value: "avax",
            currency: "AVAX",
            id: 43114,
        },
        eth: {
            title: "Ethereum",
            image: "/images/eth.svg",
            value: "eth",
            currency: "ETH",
            id: 1,
        },
        pol: {
            title: "Polygon",
            image: "/images/polygon.svg",
            value: "pol",
            currency: "MATIC",
            id: 137,
        },
        bsc: {
            title: "BSC",
            image: "/images/bnb.svg",
            value: "bsc",
            currency: "BNB",
            id: 56,
        },

        bsc_test: {
            title: "BSC - Tesztnet",
            image: "/images/bnb.svg",
            value: "bsc",
            currency: "BNB",
            id: 97,
        },

        cro: {
            title: "Cronos",
            image: "/images/cro.svg",
            value: "cro",
            currency: "CRO",
            id: 25,
        },

        ftm: {
            title: "Fantom",
            image: "/images/ftm.svg",
            value: "ftm",
            currency: "FTM",
            id: 250,
        },

        pls: {
            title: "PulseChain",
            image: "/images/pls.svg",
            value: "pls",
            currency: "PLS",
            id: 941,
        },

        doge: {
            title: "DogeChain",
            image: "/images/wdoge.png",
            value: "doge",
            currency: "WDOGE",
            id: 2000,
        }
    },

    getNetworkData: (key) => {
        if (typeof NETWORK_HELPER.networks[key] != "undefined") {
            return NETWORK_HELPER.networks[key];
        }

        return false;
    },

    getNetworkByChain: (id) => {
        for (let i = 0; i < Object.keys(NETWORK_HELPER.networks).length; i++) {
            let o = Object.keys(NETWORK_HELPER.networks)[i];
            o = NETWORK_HELPER.networks[o];
            if (parseInt(o.id) == parseInt(id)) {
                return o;
            }
        }

        return false;
    },
};

export default NETWORK_HELPER;
