"use client";

import { IGameInfo } from "@zknoid/sdk/lib/stores/matchQueue";
import { RandzuField } from "zknoid-chain-dev";
import { useEffect, useRef, useState } from "react";
import { cn } from "@zknoid/sdk/lib/helpers";
import ballGreen from "../assets/ball_green.png";
import ballBlue from "../assets/ball_blue.png";

import Image from "next/image";

interface IGameViewProps {
  gameInfo: IGameInfo<RandzuField> | undefined;
  onCellClicked: (x: number, y: number) => void;
  loadingElement: { x: number; y: number } | undefined;
  loading: boolean;
}

export const GameView = (props: IGameViewProps) => {
  const fieldActive =
    props.gameInfo?.isCurrentUserMove && !props.gameInfo?.winner;
  const highlightCells = props.gameInfo?.isCurrentUserMove && !props.loading;
  const displayBall = (i: number, j: number) =>
    props.gameInfo?.isCurrentUserMove &&
    !props.loading &&
    +props.gameInfo?.field?.value?.[j]?.[i] == 0;
  const isLoadingBall = (i: number, j: number) =>
    props.loadingElement &&
    props.loadingElement.x == i &&
    props.loadingElement.y == j;
  const isCurrentRedBall = props.gameInfo?.currentUserIndex == 0;
  const fieldRef = useRef<HTMLDivElement>(null);

  const [fieldHeight, setFieldHeight] = useState<number | "auto">(0);
  useEffect(() => {
    const resizeField = () => {
      if (window.innerWidth <= 1024) {
        setFieldHeight("auto");
      } else {
        fieldRef.current && setFieldHeight(fieldRef.current.offsetWidth);
      }
      // fieldRef.current && setFieldHeight(fieldRef.current.offsetWidth);
    };
    resizeField();
    addEventListener("resize", resizeField);
    return () => {
      removeEventListener("resize", resizeField);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className={`mx-auto grid grid-cols-15 gap-0 rounded-[5px] bg-foreground/50 pr-1 lg:pr-1 ${
        fieldActive
          ? "border-[3px] border-left-accent p-px lg:border-4"
          : "p-px lg:p-1"
      }`}
      style={{ height: fieldHeight }}
    >
      {[...Array(15).keys()].map((i) =>
        [...Array(15).keys()].map((j) => (
          <div
            key={`${i}_${j}`}
            className={cn(
              "bg-bg-dark",
              highlightCells && "hover:border-bg-dark/50",
              "m-px h-auto max-w-full border border-foreground/50 bg-[length:15px_15px] bg-center bg-no-repeat lg:!bg-[length:auto_auto]",
              "flex items-center justify-center",
              highlightCells && "hover:border-bg-dark/50",
              displayBall(i, j) &&
                (isCurrentRedBall
                  ? `hover:!bg-[url('/ball_green.png')]`
                  : "hover:!bg-[url('/ball_blue.png')]"),
              props.gameInfo && +props.gameInfo.field.value[j][i] == 1
                ? "bg-[url('/ball_green.png')]"
                : "",
              props.gameInfo && +props.gameInfo.field.value[j][i] == 2
                ? "bg-[url('/ball_blue.png')]"
                : "",
              isLoadingBall(i, j) &&
                (isCurrentRedBall
                  ? "bg-opacity-50 bg-[url('/ball_green.png')]"
                  : "bg-opacity-50 bg-[url('/ball_blue.png')]"),
              "group",
              "relative"
            )}
            style={{
              imageRendering: "pixelated",
            }}
            id={`${i}_${j}`}
            onClick={() => props.onCellClicked(i, j)}
          >
            {displayBall(i, j) &&
              (isCurrentRedBall ? (
                <Image
                  src={ballGreen}
                  alt="w-full h-full"
                  className="hidden group-hover:!inline-block absolute top-0 left-0 w-full h-full p-[0.2vw]"
                ></Image>
              ) : (
                <Image
                  src={ballBlue}
                  alt=""
                  className="hidden group-hover:!inline-block absolute top-0 left-0 w-full h-full p-[0.2vw]"
                ></Image>
              ))}
            {props.gameInfo && +props.gameInfo.field.value[j][i] == 1 && (
              <Image
                src={ballGreen}
                alt=""
                className="absolute top-0 left-0 w-full h-full p-[0.2vw]"
              ></Image>
            )}
            {props.gameInfo && +props.gameInfo.field.value[j][i] == 2 && (
              <Image
                src={ballBlue}
                alt=""
                className="absolute top-0 left-0 w-full h-full p-[0.2vw]"
              ></Image>
            )}
            {isLoadingBall(i, j) &&
              (isCurrentRedBall ? (
                <Image
                  src={ballGreen}
                  alt="w-full h-full"
                  className="absolute top-0 left-0 w-full h-full p-[0.2vw] opacity-50"
                ></Image>
              ) : (
                <Image
                  src={ballBlue}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full p-[0.2vw] opacity-50"
                ></Image>
              ))}
          </div>
        ))
      )}
    </div>
  );
};
