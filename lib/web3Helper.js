import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
var web3 = new Web3("https://bsc-dataseed1.ninicoin.io/");
const ethereum_provider = null;
const localStorageId = "user-web3-address";
const required_network = false;
let changeCallbackFunction = false;
let networkCallbackFunction = false;
import swal from "sweetalert";

const web3Helper = {
    setSelectedNetwork: (id) => {
        networkCallbackFunction(id);
    },

    getNetworkClient: (network) => {
        var web3 = new Web3("https://bsc-dataseed1.ninicoin.io/");
        if (network == "eth") {
            web3 = new Web3(
                "https://mainnet.infura.io/v3/a86d7314fe034531b404fad6138e7c49"
            );
        }

        return web3;
    },

    switchNetwork: async (network_id) => {
        try {
            await ethereum_provider.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId: web3Helper.getClient().utils.toHex(network_id),
                    },
                ],
            });

            swal("Network", "Network switched!", "success");
        } catch (err) {
            swal("Network", "The network switch could't happened", "warning");
        }

        return true;
    },

    getClient: () => {
        return web3;
    },

    getAccounts: () => {
        return new Promise(async (resolve, reject) => {
            if (typeof window == "undefined") {
                return reject(false);
            }

            if (typeof window.ethereum == "undefined") {
                const provider = new WalletConnectProvider({
                    rpc: {
                        1: "https://mainnet.infura.io/v3/a86d7314fe034531b404fad6138e7c49",
                        56: "https://bsc-dataseed1.ninicoin.io/",
                        43114: "https://api.avax.network/ext/bc/C/rpc",
                        137: "https://polygon-rpc.com",
                        25: "https://evm.cronos.org",
                        250: "https://rpc.ftm.tools/",
                        941:"https://rpc.v2b.testnet.pulsechain.com"
                    },
                    chainId: 56,
                });

                return provider
                    .enable()
                    .then(async () => {
                        web3 = new Web3(provider);
                        ethereum_provider = provider;
                        return resolve(await web3.eth.getAccounts());
                    })
                    .catch(() => {
                        return reject(false);
                    });
            }

            const selectedNetwork = await web3.eth.net.getId();

            if (required_network && selectedNetwork != required_network) {
                return reject(false);
            }

            web3 = new Web3(
                Web3.givenProvider || "https://bsc-dataseed1.ninicoin.io/"
            );

            ethereum_provider = ethereum;

            ethereum_provider
                .request({
                    method: "eth_requestAccounts",
                })
                .then((accounts) => {
                    resolve(accounts);
                })
                .catch(() => {
                    reject(false);
                });
        });
    },

    getCurrentAccount: (method, callback, network_callback) => {
        if (typeof callback == "undefined") {
            changeCallbackFunction = false;
            networkCallbackFunction = false;
        } else {
            changeCallbackFunction = callback;
            networkCallbackFunction = network_callback;
        }

        if (typeof method == "undefined") {
            method = "load";
        }

        return new Promise(async (resolve, reject) => {
            let storedAddress = false;

            if (method == "load") {
                storedAddress = await web3Helper.getStoredAddress();
                if (!storedAddress) {
                    return reject(false);
                }
            }

            web3Helper
                .getAccounts()
                .then((accounts) => {
                    if (changeCallbackFunction) {
                        ethereum_provider.on(
                            "accountsChanged",
                            (new_accounts) => {
                                if (new_accounts.length == 0) {
                                    web3Helper.disconnectClickAction();
                                }

                                web3Helper
                                    .getClient()
                                    .eth.getChainId()
                                    .then((id) => {
                                        changeCallbackFunction(accounts[0]);
                                        networkCallbackFunction(id);
                                    });
                            }
                        );

                        ethereum_provider.on("chainChanged", (new_accounts) => {
                            web3Helper
                                .getClient()
                                .eth.getChainId()
                                .then((id) => {
                                    networkCallbackFunction(id);
                                });
                        });

                        web3Helper
                            .getClient()
                            .eth.getChainId()
                            .then((id) => {
                                changeCallbackFunction(accounts[0]);
                                networkCallbackFunction(id);
                            });
                    }
                    ethereum_provider.on(
                        "disconnect",
                        web3Helper.disconnectClickAction
                    );

                    if (storedAddress && storedAddress == accounts[0]) {
                        return resolve(storedAddress);
                    }

                    localStorage.setItem(localStorageId, accounts[0]);

                    return resolve(accounts[0]);
                })
                .catch((error) => {
                    return reject(false);
                });
        });
    },

    shortAddress: (address) => {
        let returnedString = "";

        for (let i = 0; i < 4; i++) {
            returnedString += address.charAt(i);
        }

        returnedString += "...";

        for (let i = address.length - 4; i < address.length; i++) {
            returnedString += address.charAt(i);
        }

        return returnedString;
    },

    getStoredAddress: async () => {
        if (typeof window != "undefined") {
            let storedAddress = await localStorage.getItem(localStorageId);

            if (
                !(
                    storedAddress == "" ||
                    storedAddress == null ||
                    storedAddress == "null"
                )
            ) {
                if (web3.utils.isAddress(storedAddress)) {
                    return storedAddress;
                }
            }
        }

        return false;
    },

    disconnectClickAction: async () => {
        if (changeCallbackFunction) {
            changeCallbackFunction(false);
            networkCallbackFunction(false);
        }

        if (await web3Helper.getStoredAddress()) {
            localStorage.setItem(localStorageId, false);
        }
    },
};

export default web3Helper;
