import Col from "../components/Col";
import Row from "../components/Row";
import Image from "next/image";
import Container from "../components/Container";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <Row>
            <Col xs="12" md="6">
              <div className={styles.footer__logo}>
                <Image
                  styles={{ marginRight: "3rem" }}
                  src="/images/logo.png"
                  alt="Blockblend"
                  width={70}
                  height={77}
                  layout="fixed"
                />
                Blockblend
              </div>
            </Col>
            <Col xs="12" md="6" customClass={styles.footer__right}>
              <ul className={styles.footer__links}>
                <li>
                  <a rel="noreferrer" href="https://t.me/blockblendIO" target="_blank">Telegram</a>
                </li>
                <li>
                  <a rel="noreferrer" href="https://twitter.com/blockblendIO" target="_blank">Twitter</a>
                </li>
                <li>
                  <a rel="noreferrer" href="https://www.reddit.com/r/BlockBlendIO/" target="_blank">Reddit</a>
                </li>
                <li>
                  <a href="https://medium.com/@blockblendIO" target="_blank" rel="noreferrer">Medium</a>
                </li>
                <li>
                  <a rel="noreferrer" href="https://discord.gg/DRsYecKgzF" target="_blank">Discord</a>
                </li>
                <li>
                  <a rel="noreferrer" href="https://bscscan.com/address/0x69b0af16fdd2e80968eb505cd41dc26efb2b80bf#code" target="_blank">Contract (BSC)</a>
                </li>
                <li>
                  <a rel="noreferrer" href="https://etherscan.io/address/0xa06eb8532267c6455c92c25022c7f3775ae2007a#code" target="_blank">Contract (ETH)</a>
                </li>
                <li>
                  <a rel="noreferrer" href="https://audits.solidgrp.io/blockblend/summary" target="_blank">Audit</a>
                </li>
              </ul>
              <p>
                Blockblend.io &copy; 2022 • All rights reserved.<br />
                BlockBlend is a developmental platform. Please use at your own risk.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
