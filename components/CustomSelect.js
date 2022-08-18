import { useEffect, useState } from "react";
import styles from "../styles/CustomSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const CustomSelect = ({ options, selected, onSelect, customGroup }) => {
    const [dataError, setDataError] = useState(false);

    const refreshSelect = () => {
        if (typeof options == "undefined" || typeof selected == "undefined") {
            setDataError(true);
            return false;
        }

        if (options.length == 0) {
            setDataError(true);
            return false;
        }

        if (!selected) {
            let o = options[0];
            setCurrentOptionTitle(o.title ? o.title : o.value);
            if (typeof o.image != "undefined") {
                setCurrentOptionIcon(o.image);
            }
            onSelect && onSelect(o.value);
            return false;
        }

        for (let i = 0; i < options.length; i++) {
            let o = options[i];

            if (o.value == selected) {
                setCurrentOptionTitle(o.title ? o.title : o.value);
                if (typeof o.image != "undefined") {
                    setCurrentOptionIcon(o.image);
                }
                onSelect && onSelect(o.value);
                return false;
            }
        }
    };

    useEffect(refreshSelect, []);
    useEffect(refreshSelect, [options]);

    const [currentOptionTitle, setCurrentOptionTitle] = useState(false);

    const [currentOptionIcon, setCurrentOptionIcon] = useState(false);

    const [visibility, setVisibility] = useState(false);

    const fieldChangeHandler = (e) => {
        setCurrentOptionTitle(e.target.getAttribute("data-title"));
        setCurrentOptionIcon(e.target.getAttribute("data-icon"));
        setVisibility(false);

        onSelect && onSelect(e.target.getAttribute("data-value"));
    };

    const visibilityHandler = () => {
        setVisibility(!visibility);
    };

    if (dataError) {
        return <></>;
    }

    return (
        <div
            className={
                visibility
                    ? `${styles.visible} ${styles.select_box}`
                    : `${styles.select_box}`
            }
            onClick={visibilityHandler}
        >
            <div className={styles.select_box__selected}>
                {currentOptionIcon && (
                    <span className={styles.select_box__icon}>
                        <Image src={currentOptionIcon} layout="fill" />
                    </span>
                )}{" "}
                {currentOptionTitle}
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className={styles.select_box__options}>
                {options.map((o, key) => {
                    return (
                        <div className={styles.select_box__items} key={key}>
                            <input
                                id={customGroup + "_" + key}
                                type="radio"
                                data-title={o.title}
                                data-value={o.value ? o.value : o.title}
                                data-icon={o.image}
                                value={o.contract}
                                name={customGroup}
                                onChange={fieldChangeHandler}
                            />
                            <label htmlFor={customGroup + "_" + key}>
                                {currentOptionIcon && (
                                    <span className={styles.select_box__icon}>
                                        <Image src={o.image} layout="fill" />
                                    </span>
                                )}
                                {o.title}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomSelect;
