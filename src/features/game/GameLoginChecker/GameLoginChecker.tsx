/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import { FC, useEffect, useState } from "react";
import GameWrapper from "../GameWrapper/GameWrapper";
import { toNano } from "@ton/core";
import {
  CHAIN,
  SendTransactionRequest,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import styles from "./GameLoginChecker.module.scss";

const GameLoginChecker: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  console.log("🚀 ~ wallet:", wallet);

  const [isPaid, setIsPaid] = useState(false);
  const [isTankYouVisible, setIsTankYouVisible] = useState(false);
  console.log("🚀 ~ isPaid:", isPaid);

  useEffect(() => {
    if (!isTankYouVisible) return;
    setTimeout(() => {
      setIsTankYouVisible(false);
    }, 1000);
  }, [isTankYouVisible]);

  const [payValue] = useState(1);
  // const [payValueTest, setPayValueTest] = useState(1);

  // const handlePayMore = async () => {
  //   setPayValue(payValueTest);
  //   handlePay();
  // };

  const handlePay = async () => {
    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      network: CHAIN.TESTNET,
      messages: [
        {
          address: "0QDmiXPOTeV34BgpeV9IrLL1w3SfPSxmbVTu99uQcgy9J7X1",
          amount: String(toNano(payValue)),
        },
      ],
    };

    try {
      const response = await tonConnectUI.sendTransaction(transaction);
      console.log("🚀 ~ handlePay ~ response:", response);
      setIsPaid(true);
      setIsTankYouVisible(true);
    } catch (error) {
      console.error("Payment incorrect");
      console.error(error);
    }
  };

  if (!wallet) {
    return <div>Login!</div>;
  }

  if (!isPaid) {
    return (
      <div className={styles.flex}>
        <button onClick={handlePay} className={styles.btnPrimary}>
          BET 1 TON
        </button>
        {/* <span>or</span>
        <div className={styles.myValue}>
          <input
            type="number"
            id="bet"
            className={styles.bet}
            placeholder="1"
            min={1}
            max={100}
            onInput={(event) => setPayValueTest(Number(event.target.))}
          />
          <button onClick={handlePayMore} className={styles.btnPrimary}>
            bet
          </button>
        </div> */}
      </div>
    );
  }

  if (isTankYouVisible) {
    return <div>You&apos;re paid!!! Let&apos;s play!</div>;
  }

  return <GameWrapper />;
};

export default GameLoginChecker;
