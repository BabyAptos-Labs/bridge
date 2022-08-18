import styles from "../styles/ConnectModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Connect = (props) => {
    return (
        <div className={styles.walletConnect}>
            <div className={styles.walletConnect__inner}>
                <button className={styles.closeModal} onClick={props.onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button className="button" onClick={props.onMetamask}>
                    Metamask
                </button>
                <button className="button" onClick={props.onWalletConnect}>
                    WalletConnect
                </button>
            </div>
        </div>
    );
};

export default Connect;
