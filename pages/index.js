//UI Imports
import Header from "../components/Header";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import MixerInterface from "../components/Mixer/MixerInterface";
import NETWORK_HELPER from "../lib/networkHelper";
import styles from "../styles/Dapp.module.scss";

import { useEffect, useState } from "react";

export default function App() {
    const [connectedNetwork, setConnectedNetwork] = useState(false);
    const [connectedAddress, setConnectedAddress] = useState(false);
    const [inputNetworkData, setInputNetworkData] = useState(false);

    const onConnect = false;

    useEffect(() => {
        let netD = NETWORK_HELPER.getNetworkByChain(connectedNetwork);
        if (netD) {
            setInputNetworkData(netD);
        }
    }, [connectedNetwork]);

    return (
        <>
            <Header
                networkSetter={setConnectedNetwork}
                accountSetter={setConnectedAddress}
                onConnect={onConnect}
            />
            <Container>
                <Row>
                    <MixerInterface
                        input_network={inputNetworkData}
                        user_account={connectedAddress}
                        onConnect={onConnect}
                    ></MixerInterface>
                </Row>
                <Row customClass={styles.dapp__blocks}>
                    <Col xs="12">
                        <h2>
                            how it <span>works?</span>
                        </h2>
                    </Col>
                    <Col xs="12" sm="4">
                        <div>
                            <h3>Deposit</h3>
                            <p>
                                Complete the form above and click
                                &quot;next&quot;. Confirm the transaction to
                                deposit funds into the BEAR Anonymous
                                Bridge.
                            </p>
                            <p>
                                If you do not wish to connect your wallet,
                                select &quot;Custom&quot; and send any amount of
                                your choice within the minimum and maximum to
                                the generated address displayed when you click
                                &quot;next&quot;.
                            </p>
                        </div>
                    </Col>
                    <Col xs="12" sm="4">
                        <div>
                            <h3>Wait..</h3>
                            <p>
                                To improve your privacy, we recommend using a
                                higher timer delay of up to 24 hours from the
                                &quot;Advanced Options&quot; tab.
                            </p>
                            <p>
                                Selecting the &quot;Custom&quot; option allows
                                you to deposit as many times as you want to the
                                generated address up to the maximum allowed.
                            </p>
                            <p>
                                All funds has to be deposited within the
                                selected delay period.
                            </p>
                        </div>
                    </Col>
                    <Col xs="12" sm="4">
                        <div>
                            <h3>Delivery</h3>
                            <p>
                                Your assets will arrive in the wallet of the
                                selected recipient blockchain as the native
                                tokens, NOT as wrapped tokens.
                            </p>
                            <p>
                                For example: If you sent $ETH and the recipient
                                network is Cronos, you will receive native $CRO
                                tokens.
                            </p>
                            <p>
                                There is never a need to claim your tokens
                                because it will arrive automatically after the
                                timer delay.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
