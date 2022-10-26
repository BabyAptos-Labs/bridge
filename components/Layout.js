import Footer from "./Footer";

import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

const walletConnector = new NodeWalletConnect(
    {
        bridge: "https://bridge.walletconnect.org", // Required
    },
    {
        clientMeta: {
            description: "WalletConnect for Baby Aptos Bridge",
            url: process.env.URL,
            name: "Baby Aptos Bridge",
        },
    }
);

const Layout = ({ children }) => {
    return (
        <>
            <main>
                {children}
                {/* <Footer /> */}
            </main>
        </>
    );
};

export default Layout;
