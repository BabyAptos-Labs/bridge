import styles from "../../styles/Dapp.module.scss";
import Col from "../Col";
import Row from "../Row";

import Question from "../UI/Question";
import CustomSelect from "../CustomSelect";

const NetworkSelector = ({
    networks,
    selected,
    onSelect,
    callerNetwork,
    setCallerNetwork,
}) => {
    return (
        <>
            <Row>
                <Col xs="12" sm="6">
                    <label className={styles.dapp__label} htmlFor="rec_network">
                        From
                        <Question
                            ans="Select source blockchain"
                        />
                    </label>
                    <CustomSelect
                        key={2}
                        customGroup="bnetwork"
                        options={networks}
                        onSelect={setCallerNetwork}
                        selected={callerNetwork ? callerNetwork : false}
                    />
                </Col>

                <Col xs="12" sm="6">
                    <label className={styles.dapp__label} htmlFor="rec_network">
                        To
                        <Question
                            ans="Select receiving blockchain"
                        />
                    </label>
                    <CustomSelect
                        key={1}
                        customGroup="network"
                        options={networks}
                        onSelect={onSelect}
                        selected={
                            selected
                                ? selected
                                : callerNetwork
                                ? callerNetwork
                                : false
                        }
                    />
                </Col>
            </Row>
        </>
    );
};
export default NetworkSelector;
