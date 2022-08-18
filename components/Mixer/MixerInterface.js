import Col from "../Col";
import Row from "../Row";

import styles from "../../styles/Dapp.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import Question from "../UI/Question";
import NetworkSelector from "./NetworkSelector";
import TransactionExtra from "./TransactionExtra";

import { useEffect, useState } from "react";

import Confirmation from "../Confirmation";

import NETWORK_HELPER from "../../lib/networkHelper";
import web3Helper from "../../lib/web3Helper";
import SVGLoader from "./SVGLoader";
import swal from "sweetalert";

const MixerInterface = ({ input_network, user_account, onConnect }) => {
    const [networks, setNetworks] = useState(false);
    const [mixerData, setMixerData] = useState(false);
    const [contractTransaction, setContractTransaction] = useState(false);

    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [isCompleted, setIsCompleated] = useState(false);

    const [recipientNetwork, setRecipientNetwork] = useState(false);
    const [callerNetwork, setCallerNetwork] = useState(false);
    const [advancedOptions, setAdvancedOptions] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [transactionReferal, setTransactionReferal] = useState("");
    const [transactionSecret, setTransactionSecret] = useState("");
    const [transactionDelay, setTransactionDelay] = useState(10);
    const [currency, setCurrency] = useState("BNB");
    const [outputCurrency, setOutputCurrency] = useState("BNB");
    const [selectableAmounts, setSelectableAmounts] = useState([
        100000000000000000,
        1000000000000000000,
        10000000000000000000,
        50000000000000000000,
        false,
    ]);

    const [delayOptions, setDelayOptions] = useState([
        { title: "10 minutes", value: 10 },
        { title: "30 minutes", value: 30 },
        { title: "1 hour", value: 60 },
        { title: "6 hours", value: 360 },
        { title: "12 hours", value: 720 },
        { title: "24 hours", value: 1440 },
    ]);

    const [expectedDelivery, setExpnectedDelivery] = useState(
        new Date(Date.now())
    );

    const calculateExpected = () => {
        let a = new Date(
            (Date.now() / 60000 + parseInt(transactionDelay)) * 60000
        );
        let b = 1000 * 60 * 5;
        let c = new Date(Math.ceil(new Date(a).getTime() / b) * b);
        setExpnectedDelivery(c);
    };

    useEffect(calculateExpected, [transactionDelay]);
    useEffect(calculateExpected, []);

    const [changeRate, setChangeRate] = useState(0);

    useEffect(() => {
        let net_w = NETWORK_HELPER.getNetworkData(recipientNetwork);
        setOutputCurrency(net_w.currency);

        setChangeRate(0);
        fetch("/api/rate?from=" + callerNetwork + "&to=" + recipientNetwork)
            .then(async (rate) => {
                let a = await rate.json();
                setChangeRate(a);
            })
            .catch((error) => {
                setChangeRate(0);
                console.log("error", error);
            });
    }, [callerNetwork, recipientNetwork]);

    useEffect(() => {
        let net_w = NETWORK_HELPER.getNetworkData(callerNetwork);

        if (net_w) {
            setCurrency(net_w.currency);

            if (
                net_w.currency == "MATIC" ||
                net_w.currency == "FTM" ||
                net_w.currency == "PLS"
            ) {
                setSelectableAmounts([
                    false,
                    50000000000000000000,
                    100000000000000000000,
                    1000000000000000000000,
                    10000000000000000000000,
                ]);
            } else if (net_w.currency == "AVAX") {
                setSelectableAmounts([
                    false,
                    1000000000000000000,
                    10000000000000000000,
                    100000000000000000000,
                    1000000000000000000000,
                ]);
            } else if (net_w.currency == "CRO") {
                setSelectableAmounts([
                    false,
                    100000000000000000000,
                    1000000000000000000000,
                    10000000000000000000000,
                ]);
            } else if (net_w.currency == "WDOGE") {
                setSelectableAmounts([
                    false,
                    500000000000000000000,
                    1000000000000000000000,
                    10000000000000000000000,
                    50000000000000000000000,
                ]);
            } else {
                setSelectableAmounts([
                    false,
                    100000000000000000,
                    1000000000000000000,
                    10000000000000000000,
                    50000000000000000000,
                ]);
            }
        }
    }, [callerNetwork]);

    useEffect(() => {
        setCallerNetwork(input_network.value);
        setCurrency(input_network.currency);
    }, [input_network]);

    useEffect(() => {
        if (typeof input_network != "undefined") {
            setCallerNetwork(input_network.value);
            setCurrency(input_network.currency);
        }

        fetch("/api/networks")
            .then((response) => {
                response
                    .json()
                    .then((data) => {
                        setNetworks(data);
                    })
                    .catch(() => {});
            })
            .catch(() => {});
    }, []);

    const postHelper = (url, postData) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                body: JSON.stringify(postData),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            })
                .then((response) => {
                    response
                        .json(() => {})
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            resolve({ success: false, message: error });
                        });
                })
                .catch((error) => {
                    resolve({ success: false, message: error });
                });
        });
    };

    const handleSubmitEvent = async (evt) => {
        evt.preventDefault();
        setMixerData(true);

        if (
            typeof input_network.value != "undefined" &&
            input_network.value != callerNetwork &&
            amount != false
        ) {
            swall("Network", "You are on different network!", "info");
            setMixerData(false);
            return false;
        }

        let postData = {
            output_network: recipientNetwork,
            input_network: callerNetwork,
            recipient: recipient,
            amount: amount,
            referal: transactionReferal,
            secret: transactionSecret,
            delay: transactionDelay,
            caller: user_account,
        };

        let api_reponse = await postHelper("/api/transaction", postData);

        if (!api_reponse.success) {
            setMixerData(false);
            swal(
                "Oops something went wrong",
                api_reponse.message ? api_reponse.message : "Undefined error",
                "warning"
            );
            return false;
        }

        setMixerData(api_reponse.message);
    };

    const handleTransactionConfirmation = async (event) => {
        event.preventDefault();
        setContractTransaction(true);
        if (!user_account) {
            setContractTransaction(false);
            return setMixerData(false);
        }

        if (mixerData.action == "interact") {
            const contractAbi = require("../../lib/abi/mixer.js");
            const w3 = web3Helper.getClient();
            const mixerContract = new w3.eth.Contract(
                contractAbi,
                mixerData.treasuryAddress
            );

            let value = mixerData.input.amount / 1000000000000000000;
            if (value >= 1) {
                value = w3.utils.toWei(
                    w3.utils.toBN(
                        Math.floor(mixerData.input.amount / 1000000000000000000)
                    ),
                    "ether"
                );
            } else {
                value = mixerData.input.amount;
            }

            try {
                let txHash = await mixerContract.methods
                    .bbmDeposit(
                        parseInt(mixerData.transactionId),
                        mixerData.referal
                    )
                    .send({
                        from: user_account,
                        value: value,
                    });

                if (txHash && typeof txHash.transactionHash != "undefined") {
                    let api_reponse = await postHelper("/api/register", {
                        id: mixerData.transactionId,
                        hash: txHash.transactionHash,
                    });
                    setContractTransaction(false);
                    return setMixerData(false);
                }
            } catch (e) {
                swal("Oops", e.message, "error");
                setContractTransaction(false);
                return setMixerData(false);
            }
        }

        setContractTransaction(false);
        return setMixerData(false);
    };

    const toggleAdvancedOptions = (e) => {
        e.preventDefault();
        setAdvancedOptions(!advancedOptions);
    };

    useEffect(() => {
        setAccepted(false);
        setButtonEnabled(false);
        setIsCompleated(false);
    }, [mixerData]);

    const [accepted, setAccepted] = useState(false);

    return (
        <>
            {mixerData && (
                <Confirmation
                    user_account={user_account}
                    transactionData={mixerData}
                    onClose={setMixerData}
                    onConfirm={handleTransactionConfirmation}
                    onConnect={onConnect}
                    limitations={selectableAmounts}
                    contractTransaction={contractTransaction}
                    setButtonEnabled={setButtonEnabled}
                    isCompleted={isCompleted}
                    setIsCompleated={setIsCompleated}
                    buttonEnabled={buttonEnabled}
                    accepted={accepted}
                    setAccepted={setAccepted}
                />
            )}

            <Col xs="12" md="4" customClass="col-md-offset-4">
                <div className={styles.dapp_box}>
                    <form onSubmit={handleSubmitEvent}>
                        <Content
                            networks={networks}
                            setRecipientNetwork={setRecipientNetwork}
                            setTransactionDelay={setTransactionDelay}
                            setRecipient={setRecipient}
                            setAmount={setAmount}
                            setTransactionReferal={setTransactionReferal}
                            setTransactionSecret={setTransactionSecret}
                            currency={currency}
                            callerNetwork={callerNetwork}
                            setCallerNetwork={setCallerNetwork}
                            recipientNetwork={recipientNetwork}
                            selectableAmounts={selectableAmounts}
                            delayOptions={delayOptions}
                            toggleAdvancedOptions={toggleAdvancedOptions}
                            advancedOptions={advancedOptions}
                            setAdvancedOptions={setAdvancedOptions}
                            changeRate={changeRate}
                            outputCurrency={outputCurrency}
                            amount={amount}
                            transactionReferal={transactionReferal}
                            expectedDelivery={expectedDelivery}
                        />
                    </form>
                </div>

                <Row>
                    <Col xs="12" customClass="text-center">
                        <div className="transaction__details">
                            <div>
                                <span>Transaction Fee:</span>{" "}
                                <span>0.5% - 1%</span>
                            </div>
                            <div>
                                <span>Expected Delivery:</span>{" "}
                                <span>
                                    {
                                        //4/28/2022, 4:24:47 PM
                                        expectedDelivery.toLocaleString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "numeric",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )
                                    }{" "}
                                    <a
                                        href="#"
                                        rel="noreferrer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAdvancedOptions(true);
                                        }}
                                    >
                                        Change
                                    </a>
                                </span>
                            </div>
                            {recipientNetwork != callerNetwork &&
                            changeRate != 0 ? (
                                <div>
                                    <span>Exchange Rate:</span>{" "}
                                    <span>
                                        1 {currency} ≈{" "}
                                        {parseFloat(changeRate).toFixed(4)}{" "}
                                        {outputCurrency}
                                    </span>
                                </div>
                            ) : null}
                            <div>
                                <span>Discount/Referral Code:</span>{" "}
                                <span>
                                    {transactionReferal != ""
                                        ? transactionReferal
                                        : null}{" "}
                                    <a
                                        href="#"
                                        rel="noreferrer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAdvancedOptions(true);
                                        }}
                                    >
                                        {transactionReferal != ""
                                            ? "Change"
                                            : "Add"}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

const Content = ({
    networks,
    changeRate,
    setRecipientNetwork,
    setTransactionDelay,
    setRecipient,
    setAmount,
    setTransactionSecret,
    setTransactionReferal,
    currency,
    callerNetwork,
    setCallerNetwork,
    recipientNetwork,
    selectableAmounts,
    delayOptions,
    toggleAdvancedOptions,
    advancedOptions,
    outputCurrency,
    amount,
    transactionReferal,
    setAdvancedOptions,
    expectedDelivery,
}) => {
    if (!networks) {
        return (
            <>
                <center>
                    <SVGLoader></SVGLoader>
                </center>
            </>
        );
    }

    return (
        <>
            <NetworkSelector
                networks={networks}
                selected={recipientNetwork}
                onSelect={setRecipientNetwork}
                callerNetwork={callerNetwork}
                setCallerNetwork={setCallerNetwork}
            />
            <Row>
                <Col xs="12" sm="12">
                    <label className={styles.dapp__label} htmlFor="recipient">
                        Recipient
                        <Question ans="Input destination wallet address" />
                    </label>
                    <input
                        type="text"
                        name="recipient"
                        autoComplete="off"
                        onChange={(e) => setRecipient(e.currentTarget.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <label className={styles.dapp__label} htmlFor="rec_network">
                        Amount
                        <Question ans="Choose pre-defined sending amount or input custom" />
                    </label>
                    <AmountSelector
                        setAmount={setAmount}
                        currency={currency}
                        amounts={selectableAmounts}
                    />

                    <div className={styles.dapp__notification}>
                        <p className="text-center">
                            {!amount ? (
                                <small>
                                    With the <strong>custom</strong> option you
                                    can send assets without connecting your
                                    wallet!
                                    <br />
                                    The bridge will automatically retrieve the
                                    sent amount from the deposit address.
                                </small>
                            ) : (
                                <small>
                                    To bridge a fixed amount connect your wallet
                                    <br />
                                    and choose an amount from the list above.
                                </small>
                            )}
                        </p>
                    </div>
                </Col>
            </Row>
            {advancedOptions && (
                <TransactionExtra
                    onSelectDelay={setTransactionDelay}
                    setTransactionSecret={setTransactionSecret}
                    setTransactionReferal={setTransactionReferal}
                    delayOptions={delayOptions}
                ></TransactionExtra>
            )}
            <button
                className={`${styles.dapp__advanced} button button__transparent`}
                onClick={toggleAdvancedOptions}
            >
                {!advancedOptions ? "Advanced Mode" : "Simple Mode"}{" "}
                <FontAwesomeIcon icon={faGear} />
            </button>
            <Row>
                <Col xs="12">
                    <button className="button button__large">Next</button>
                </Col>
                <Col xs="12" customClass="pb-0">
                    <p className="text-center">
                        For support join to our <a href="https://t.me/ProtocolBEAR" rel="norefferer" target="_blank">Telegram group</a><br />
                        <small>Powered by <a href="https://blockblend.io/" target="_blank" rel="noreferrer">blockblend.io</a></small>
                    </p>
                </Col>
            </Row>
        </>
    );
};

const AmountSelector = ({ setAmount, amounts, currency }) => {
    return (
        <div className={styles.amount}>
            {amounts.map((value, key) => (
                <AmountOption
                    key={key}
                    value={value}
                    setAmount={setAmount}
                    currency={currency}
                />
            ))}
        </div>
    );
};

const AmountOption = ({ value, setAmount, currency }) => {
    return (
        <div>
            <input
                type="radio"
                id={"amount-" + value}
                name="input-amount"
                onChange={() => setAmount(value)}
            />
            <label htmlFor={"amount-" + value}>
                {value
                    ? value / 1000000000000000000 > 5
                        ? Math.ceil(value / 1000000000000000000) +
                          " " +
                          currency
                        : value / 1000000000000000000 + " " + currency
                    : "Custom"}
            </label>
        </div>
    );
};

export default MixerInterface;
