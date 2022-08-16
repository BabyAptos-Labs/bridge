import Col from "../components/Col";
import Row from "../components/Row";
import styles from "../styles/Confirmation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SVGLoader from "./Mixer/SVGLoader";
import Countdown from "react-countdown";
import swal from "sweetalert";

const toDigit = (time) => {
    if (parseInt(time) < 10) {
        time = "0" + time;
    }

    return time;
};

const countdownRender = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <></>;
    }

    return (
        <span>
            {toDigit(hours)}:{toDigit(minutes)}:{toDigit(seconds)}
        </span>
    );
};

const Confirmation = ({
    onClose,
    onConfirm,
    transactionData,
    limitations,
    user_account,
    onConnect,
    contractTransaction,
}) => {
    if (typeof transactionData != "object") {
        return <Loading onClose={onClose}></Loading>;
    }

    const min = limitations[1];
    const max = limitations[limitations.length - 1];

    if (contractTransaction) {
        return (
            <div className={styles.dapp_confirmation}>
                <div className={styles.dapp_confirmation__inner}>
                    <header>Transaction in progress...</header>
                    <Row>
                        <Col xs="12">
                            <center>
                                <SVGLoader></SVGLoader>
                            </center>
                            Please do not close the window!
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dapp_confirmation}>
            <div className={styles.dapp_confirmation__inner}>
                <header>
                    Confirmation
                    <button
                        className={styles.closeModal}
                        onClick={() => {
                            onClose(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </header>
                {transactionData.action == "interact" ? (
                    ""
                ) : (
                    <div className={styles.confirmation__sendTo}>
                        <div className={styles.confirmation__label}>
                            Send {transactionData.input.currency}{" "}
                            <strong>
                                within{" "}
                                <Countdown
                                    key={transactionData.expected_delivery}
                                    date={transactionData.expected_delivery}
                                    renderer={countdownRender}
                                ></Countdown>
                            </strong>{" "}
                            to
                        </div>
                        <div
                            className={styles.confirmation__val}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    transactionData.treasuryAddress
                                );

                                swal("Copied to clipboard", "", "success", {
                                    buttons: false,
                                    timer: 3000,
                                });
                            }}
                        >
                            {transactionData.treasuryAddress}{" "}
                            <button className={styles.confirmation__copy}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                    </div>
                )}
                <Row>
                    <Col xs="12">
                        <div className={styles.confirmation__label}>
                            Recipient
                        </div>
                        <div className={styles.confirmation__val}>
                            {transactionData.transactionRecipient}
                        </div>
                    </Col>

                    <Col xs="6">
                        <div className={styles.confirmation__label}>From</div>
                        <div className={styles.confirmation__val}>
                            <div>
                                <Image
                                    src={transactionData.from_network.image}
                                    alt={transactionData.from_network.title}
                                    layout="fill"
                                />
                            </div>{" "}
                            {transactionData.from_network.title}
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className={styles.confirmation__label}>To</div>
                        <div className={styles.confirmation__val}>
                            <div>
                                <Image
                                    src={transactionData.to_network.image}
                                    alt={transactionData.to_network.title}
                                    layout="fill"
                                />
                            </div>
                            {transactionData.to_network.title}
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className={styles.confirmation__label}>Amount</div>
                        <div className={styles.confirmation__val}>
                            <div>
                                <Image
                                    src={transactionData.input.image}
                                    alt={transactionData.input.currency}
                                    layout="fill"
                                />
                            </div>{" "}
                            {transactionData.input.amount
                                ? transactionData.input.amount /
                                      1000000000000000000 +
                                  " " +
                                  transactionData.input.currency
                                : "min. " +
                                  min / 1000000000000000000 +
                                  ", max. " +
                                  max / 1000000000000000000}
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className={styles.confirmation__label}>
                            Estimated delivery*
                        </div>
                        <div className={styles.confirmation__val}>
                            {new Date(
                                transactionData.expected_delivery
                            ).toLocaleString("en-US")}
                        </div>
                    </Col>
                    <Col xs="12">
                        <label className={styles.confirmation__label}>
                            Please backup your recovery key
                        </label>
                        <div
                            className={styles.confirmation__recovery}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    transactionData.recovery
                                );

                                swal("Copied to clipboard", "", "success", {
                                    buttons: false,
                                    timer: 3000,
                                });
                            }}
                        >
                            {transactionData.recovery}
                        </div>
                        {/* {transactionData.action != "interact" && (
              <p className="text-center mt-05">
                <small>
                  Send only {transactionData.input.currency} to this deposit
                  address.
                </small>
              </p>
            )} */}
                    </Col>
                    <Col xs="12" customClass="pt-0">
                        {transactionData.action == "interact" ? (
                            <button className="button" onClick={onConfirm}>
                                Confirm transaction
                            </button>
                        ) : (
                            <button
                                className="button button__large"
                                onClick={onConfirm}
                            >
                                Close<small>I saved my recovery key</small>
                            </button>
                        )}
                    </Col>
                    <p className="text-center mt-0">
                        <small>
                            I hereby declare that the assets I am bridging are not from any criminal or illegal sources/activities.  In the event that they are found to be in question, I would accept the consequences of having the assets frozen and my information forwarded to the authorities in charge when requested.
                        </small>
                        <br />
                        <small>
                            * Estimated time of anonymous transaction is subject
                            to change. In rare cases, when the volume is low the
                            platform needs extra time to achieve the anonymity.
                        </small>
                    </p>
                </Row>
            </div>
        </div>
    );
};

const Loading = ({ onClose }) => {
    return (
        <div className={styles.dapp_confirmation}>
            <div className={styles.dapp_confirmation__inner}>
                <header>
                    Transaction
                    <button
                        className={styles.closeModal}
                        onClick={() => {
                            onClose(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </header>
                <Row>
                    <Col xs="12">
                        <center>
                            <SVGLoader></SVGLoader>
                        </center>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Confirmation;
