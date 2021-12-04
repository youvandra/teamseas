import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";
import { Hooks } from "providers";

const ConnectButton = styled(WalletDialogButton)`

padding: 15px 22px !important;
    width: -moz-fit-content !important;
    width: fit-content !important;
    font-family: "Montserrat", sans-serif !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    background-color: #e75480 !important;
    border-radius: 20px !important`;
const ConnectButtonPure = styled(WalletDialogButton)`
    span {
    box-shadow: unset !important;
  font-family: "Montserrat", sans-serif !important;
    background-color: unset !important;
      color: #0c7097 !important;
       font-size: 13px !important;
    font-weight: bold;
    padding: 0px !important;
    },
    button {
    box-shadow: unset !important;
      padding: 0px !important;
    background-color: unset !important;
  font-family: "Montserrat", sans-serif !important;
    color: white !important;
   font-size: 13px !important;
    font-weight: bold;
    }
    span:hover {
      color: #E3597F !important;
      border: unset !important;

    }
    span {
      padding: 0px !important;
    }
`;
const ConnectButtonMobile = styled(WalletDialogButton)`
    span {
    box-shadow: unset !important;

    background-color: unset !important;
    font-family: "Poppins", sans-serif !important;
    color: white !important;
       font-size: 1.1rem;
    font-weight: bold;
    },
    button {
    box-shadow: unset !important;
      padding: 0px !important;
    background-color: unset !important;
    font-family: "Poppins", sans-serif !important;
    color: white !important;
    font-size: 1.1rem;
    font-weight: bold;
    }
    span:hover {
      color: #E3597F !important;
      border: unset !important;

    }
    span {
      font-size: 22px;
    }
`;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
  [x: string]: any;
  navbar: any;
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const { wallet_, setWallet_, setDatas, publicKey, setPublicKey, candyM, setCandyM } = useContext(Hooks)
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);
      setDatas([itemsRemaining, itemsAvailable])
      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
      setCandyM(candyMachine)
    })();
  };

  const onMint = async () => {
    // alert('masuk')
    try {
      setIsMinting(true);
      if ((wallet || wallet_) && (candyMachine?.program || candyM?.program)) {
        // alert('sini')
        const mintTxId = await mintOneToken(
          candyMachine || candyM,
          props.config,
          wallet?.publicKey || publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // alert('gagal')
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
        setWallet_(true)
        setPublicKey(wallet.publicKey)
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  useEffect(() => {

  }, [wallet_])

  return (
    <main>
      {/* {wallet && (
        <p>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
      )}

      {wallet && <p>Balance: {(balance || 0).toLocaleString()} SOL</p>}

      {wallet && <p>Total Available: {itemsAvailable}</p>}

      {wallet && <p>Redeemed: {itemsRedeemed}</p>}

      {wallet && <p>Remaining: {itemsRemaining}</p>} */}

      <MintContainer>
        {!wallet_ ? props.navbar ? (
          <ConnectButtonPure>CONNECT WALLET</ConnectButtonPure>
        ) : props.mobile ? (
          <ConnectButtonMobile>CONNECT WALLET</ConnectButtonMobile>
        ) : (
          <ConnectButton>CONNECT WALLET</ConnectButton>
        ) : (
          <MintButton
            disabled={isSoldOut || isMinting || !isActive}
            onClick={() => onMint()}
            variant="contained"
            style={{
              // margin-top: 20px !important;
              width: '100%',
              backgroundColor: 'unset',
              boxShadow: 'unset',
              fontStyle: 'bold',
              fontSize: '22px',
              color: 'white',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {isSoldOut ? (
              "SOLD OUT"
            ) : isActive ? (
              isMinting ? (
                <div className="mx-auto">
                  <CircularProgress />
                </div>
              ) : (
                <div className="stat">PURCHASE</div>
              )
            ) : (
              <Countdown
                date={startDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            )}
          </MintButton>
        )}
      </MintContainer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;