import styles from "../styles/Header.module.scss";
import Image from "next/image";

const HeaderNetworkSelector = ({ selectedNetwork }) => {
    if (selectedNetwork == undefined) {
        return <></>;
    }

    return (
        <>
            <div className={styles.header__network}>
                <Image
                    styles={{ marginRight: "3rem" }}
                    src={selectedNetwork.image}
                    alt={selectedNetwork.title}
                    width={20}
                    height={20}
                    layout="fixed"
                />
                <span>{selectedNetwork.title}</span>
            </div>
        </>
    );
};

export default HeaderNetworkSelector;
