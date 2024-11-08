"use client";

import { FC, useEffect } from "react";
import {
  TonConnectButton,
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import { useWalletStore } from "../walletStore";
// import { TonTransaction } from '../TonTransaction/TonTransaction'
import styles from "./TonUser.module.scss";

export const TonUser: FC = () => {
  const { clearWallet, updateWalletData } = useWalletStore();

  const connectionRestored = useIsConnectionRestored();
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();

  useEffect(() => {
    updateWalletData("walletAddress", wallet?.account?.address || null);
    updateWalletData("walletPublicKey", wallet?.account?.publicKey || null);
  }, [updateWalletData, wallet]);

  const [tonConnectUI] = useTonConnectUI();

  const handleLogout = async () => {
    await tonConnectUI.disconnect();
    clearWallet();
  };

  if (!connectionRestored) {
    return <div className={styles.loading}>Please wait...</div>;
  }

  return (
    <div className={styles.tonUser}>
      {userFriendlyAddress ? (
        <>
          {/* <TonTransaction /> */}

          <button className="ghostButton" onClick={handleLogout}>
            <UserAvatar avatarStr={userFriendlyAddress} />
          </button>
        </>
      ) : (
        <TonConnectButton />
      )}
    </div>
  );
};
