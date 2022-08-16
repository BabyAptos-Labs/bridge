import Col from "../Col";
import Row from "../Row";
import CustomSelect from "../CustomSelect";
import styles from "../../styles/Dapp.module.scss";

import Question from "../UI/Question";
import { useEffect } from "react";
const TransactionExtra = ({
    onSelectDelay,
    setTransactionSecret,
    setTransactionReferal,
    delayOptions
}) => {
    let default_selected = 0;

    useEffect(() => {
        if (typeof delayOptions == "undefined") {
            networks = {};
        }

        if (typeof delayOptions[default_selected] == "undefined") {
            if (delayOptions.length) {
                default_selected = 1;
            } else {
                default_selected = false;
            }
        }

        if (default_selected) {
            onSelectDelay(delayOptions[default_selected].value);
        }
    }, []);

    useEffect(() => {
        onSelectDelay(delayOptions[0].value);
    },[delayOptions])

    return (
        <Row>
            <Col xs="6" sm="6">
                <label className={styles.dapp__label} htmlFor="rec_network">
                    Delay
                    <Question ans="Wait time before sending starts" />
                </label>
                <CustomSelect
                    customGroup="delay"
                    options={delayOptions}
                    onSelect={onSelectDelay}
                    selected={false}
                />
            </Col>
            {/* <Col xs="6" sm="4">
                <label className={styles.dapp__label} htmlFor="ref_code">
                    Referral code
                    <Question ans="Discount or referral code if available" />
                </label>
                <input
                    type="text"
                    name="ref_code"
                    onChange={(event) =>
                        setTransactionReferal(event.currentTarget.value.toLowerCase())
                    }
                />
            </Col> */}
            <Col xs="12" sm="6">
                <label className={styles.dapp__label} htmlFor="user_secret">
                    User secret
                    <Question ans="Optional unique code for repeat users" />
                </label>
                <input
                    type="text"
                    name="user_secret"
                    onChange={(event) =>
                        setTransactionSecret(event.currentTarget.value)
                    }
                />
            </Col>
        </Row>
    );
};
export default TransactionExtra;
