import styles from "../../styles/Dapp.module.scss";

const Question = ({ ans }) => {
    return (
        <div className={styles.question}>
            <span>?</span>
            <div className={styles.answer}>{ans}</div>
        </div>
    );
};

export default Question;
