import { useMemo, useState } from "react";
import CardBG from "../assets/card-background/credit_card_bg.jpeg";
import CHIPCARD from "../assets/card-asserts/chip.png";
import VISA from "../assets/card-type/visa.png";
import MasterCard from "../assets/card-type/mastercard.png";
import discover from "../assets/card-type/discover.png";
import unionpay from "../assets/card-type/unionpay.png";
import American from "../assets/card-type/american.png";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import clsx from "clsx";
import "./card.css";

type CardProps = {
  cardNumber?: string;
  cardForm?: any;
  flagRotate?: boolean;
};

export const Card = ({
  cardNumber,
  cardForm = {
    name: "Roberto",
    lastName: "Monjardin",
    expiration_month: "12",
    expiration_year: "25",
    cvv2: "433",
  },
  flagRotate,
}: CardProps) => {
  const [parent] = useAutoAnimate();

  const CARDS = {
    visa: "^4",
    mastercard: "^5[1-5]", //first digit 5 , 2nd digit from 1-5 ..
    americanexpress: "^3[47]",
    discover: "^6011",
    unionpay: "^62",
  };
  const cardType = (cardNumber: string) => {
    const number = cardNumber;
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return "visa"; // default type
  };
  const [cardTypeImg, setCardTypeImg] = useState("");
  const useCardType = useMemo(() => {
    if (cardNumber) {
      setCardTypeImg(cardType(cardNumber));
    }
    return cardType(cardNumber ?? "");
    // console.log(useCardType);
  }, [cardNumber]);

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div
        className={clsx(
          "relative w-4/5 duration max-sm:w-full",
          flagRotate && "rotateCard duration-500"
        )}
      >
        <div className="relative">
          <img src={CardBG} alt="CARDBG" className="rounded-2xl" />
          {!flagRotate ? (
            <>
              <div
                ref={parent}
                className="absolute w-10 top-5 left-5 max-sm:w-7"
              >
                <img src={CHIPCARD} alt="CHIPCARD" />
              </div>
              <div
                ref={parent}
                className="absolute w-14 top-5 right-5 max-sm:w-10"
              >
                <img
                  src={
                    cardTypeImg === "americanexpress"
                      ? American
                      : cardTypeImg === "mastercard"
                      ? MasterCard
                      : cardTypeImg === "visa"
                      ? VISA
                      : cardTypeImg === "unionpay"
                      ? unionpay
                      : cardTypeImg === "discover"
                      ? discover
                      : VISA
                  }
                  alt={useCardType ? useCardType : cardNumber}
                />
              </div>
              <div className="absolute top-1/3 text-white text-3xl font-bold  w-full h-14 grid grid-cols-1  items-center text-center max-sm:text-2xl max-sm:font-semibold">
                <div ref={parent} className="col-span-1">
                  {cardNumber && cardNumber.length === 0
                    ? "0000 0000 0000 0000"
                    : cardNumber}
                </div>
              </div>
              <div className="absolute bottom-5 text-white text-xs w-full grid grid-cols-3 items-start justify-around max-sm:text-xs">
                <div className="flex flex-col col-span-2 ml-3 ">
                  <div>Card Holder</div>
                  <div>{`${cardForm.name.toUpperCase()} ${cardForm.lastName.toUpperCase()} `}</div>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <div>Expiration</div>
                  {cardForm.expiration_month.length === 0 ? (
                    <div>{`MM / YY`}</div>
                  ) : (
                    <div>{`${cardForm.expiration_month} / ${cardForm.expiration_year}`}</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                ref={parent}
                className="absolute w-full bg-black h-12 top-10 max-sm:h-8"
              ></div>
              <div className="absolute top-1/3  w-full  h-24 flex flex-col items-center justify-center ">
                <div className="text-white items-rotate self-start ml-10 font-semibold mb-2 max-sm:text-xs">
                  CVV
                </div>
                <div className="bg-white w-11/12 h-10 rounded-lg items-rotate flex flex-col items-end justify-center ">
                  <span className="mr-5 italic max-sm:text-xs font-bold">
                    {cardForm.cvv2}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
