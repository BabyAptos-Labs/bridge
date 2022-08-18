import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Header.module.scss";
import { useEffect, useState } from "react";
import web3Helper from "../lib/web3Helper";

const ConnectButtonHandler = ({ setConnectedNetwork, setConnectedAddress }) => {
    const [network, setNetwork] = useState(false);
    const [address, setAddress] = useState(false);

    const handleConnectClick = async () => {
        if (address) {
            web3Helper.disconnectClickAction();
            return false;
        }

        web3Helper
            .getCurrentAccount("click", setAddress, setNetwork)
            .then((wallet) => {
                setAddress(wallet.address);
                setNetwork(wallet.network);
            })
            .catch(() => {});
    };

    useEffect(() => {
        web3Helper
            .getCurrentAccount("load", setAddress, setNetwork)
            .then((wallet) => {
                setAddress(wallet.address);
                setNetwork(wallet.network);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (typeof setConnectedNetwork != "undefined") {
            setConnectedNetwork(network);
        }
    }, [network]);

    useEffect(() => {
        if (typeof setConnectedAddress != "undefined") {
            setConnectedAddress(address);
        }
    }, [address]);

    return (
        <button className={styles.header__wallet} onClick={handleConnectClick}>
            <FontAwesomeIcon icon={faWallet} />
            {address ? web3Helper.shortAddress(address) : "Connect wallet"}
        </button>
    );
};

export default ConnectButtonHandler;
