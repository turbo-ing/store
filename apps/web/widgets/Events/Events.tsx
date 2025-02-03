"use client";

import {
  ALL_GAME_EVENT_TYPES,
  GAME_EVENTS,
  getEventType,
  useEventTimer,
  ZkNoidEvent,
  ZkNoidEventType,
} from "@zknoid/sdk/lib/platform/game_events";
import Lottie from "react-lottie";
import SnakeNoEvents from "../../lib/assets/ZKNoid_Snake_Intro_03_05.json";
import { cn } from "@zknoid/sdk/lib/helpers";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

export const EventFilter = ({
  eventType,
  selected,
  typesSelected,
  setTypesSelected,
}: {
  eventType: ZkNoidEventType;
  typesSelected: ZkNoidEventType[];
  setTypesSelected: (types: ZkNoidEventType[]) => void;
  selected?: boolean;
}) => {
  return (
    <button
      className={cn(
        "rounded-[0.26vw] border border-foreground px-[0.521vw] py-[0.26vw] text-center font-plexsans text-[0.833vw] text-foreground",

        selected
          ? "border-left-accent bg-left-accent text-bg-dark"
          : "cursor-pointer hover:border-left-accent hover:text-left-accent",
      )}
      onClick={() => setTypesSelected([eventType])}
    >
      {eventType}
    </button>
  );
};

export const EventItem = ({
  headText,
  description,
  prizePool,
  event,
  image,
  textColor = "white",
}: {
  headText: string;
  description: string;
  prizePool?: { text: string; color: "left-accent" | "white" };
  event: ZkNoidEvent;
  image: string;
  textColor?: "white" | "black";
}) => {
  const eventCounter = useEventTimer(event);
  const time = eventCounter.startsIn
    ? `${eventCounter.startsIn.days}d ${
        eventCounter.startsIn.hours
      }:${eventCounter.startsIn.minutes}:${Math.trunc(
        eventCounter.startsIn.seconds!,
      )}`
    : "";

  return (
    <div
      className={cn(
        "flex flex-col group relative border ml-[0.781vw] border-left-accent rounded-[0.26vw] min-w-0 flex-[0_0_49.5%]",
        textColor === "black" ? "text-bg-dark" : "text-foreground",
      )}
    >
      <div
        className={
          "h-full flex flex-col p-[1.042vw] gap-[0.521vw] absolute left-0 top-0"
        }
      >
        <span className={"text-[1.25vw] font-bold font-museo"}>{headText}</span>
        <span
          className={"text-[0.833vw] leading-[110%] font-plexsans max-w-[50%]"}
        >
          {description}
        </span>
        {prizePool && (
          <span
            className={cn(
              "leading-[110%] font-extrabold text-[1.25vw] font-plexsans uppercase",
              prizePool.color == "left-accent"
                ? "text-left-accent"
                : "text-foreground",
            )}
          >
            Prize pool {prizePool.text}
          </span>
        )}
        {time.length > 0 && (
          <span className={cn("text-[1.563vw] font-museo font-medium mt-auto")}>
            {eventCounter.type == ZkNoidEventType.UPCOMING_EVENTS && (
              <>START IN {time}</>
            )}
            {eventCounter.type == ZkNoidEventType.CURRENT_EVENTS && (
              <>END IN {time}</>
            )}
          </span>
        )}
      </div>
      <div className={"w-full h-full overflow-hidden rounded-[0.13vw]"}>
        <Image
          src={image}
          width={700}
          height={300}
          alt={"Event image"}
          className={"w-full h-full object-center object-cover"}
        />
      </div>
      <div
        className={
          "absolute -bottom-[1px] z-[1] -right-[1px] flex flex-col justify-end items-end pt-[0.375vw] pl-[0.375vw] rounded-tl-[0.26vw] border-t border-l border-left-accent bg-bg-grey"
        }
      >
        <div
          className={
            "group-hover:bg-left-accent bg-bg-grey py-[0.781vw] px-[1.25vw] rounded-[0.26vw] flex flex-col justify-center items-center border border-left-accent"
          }
        >
          <svg
            width="27"
            height="45"
            viewBox="0 0 27 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"w-[1.042vw] h-[2.083vw]"}
          >
            <path
              d="M2.86182 2.73242L22.6674 22.5658L2.86182 42.3991"
              stroke="#D2FF00"
              strokeWidth="5.66667"
              className={"group-hover:stroke-bg-grey"}
            />
          </svg>
        </div>
      </div>
      <Link
        href={event.link}
        className={"absolute left-0 top-0 w-full h-full"}
      />
    </div>
  );
};

export default function Events({
  eventTypesSelected,
  setEventTypesSelected,
}: {
  eventTypesSelected: ZkNoidEventType[];
  setEventTypesSelected: (eventTypes: ZkNoidEventType[]) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    align: "start",
    containScroll: false,
    slidesToScroll: 1,
    skipSnaps: true,
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const filteredEvents = GAME_EVENTS.filter(
    (x) =>
      eventTypesSelected.includes(getEventType(x)) ||
      eventTypesSelected.length == 0 ||
      x.eventEnds > Date.now(),
  );

  useEffect(() => {
    GAME_EVENTS.filter((x) => x.eventEnds > Date.now()).length == 0
      ? setEventTypesSelected([ZkNoidEventType.PAST_EVENTS])
      : setEventTypesSelected([ZkNoidEventType.CURRENT_EVENTS]);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div id={"events"} className="flex flex-col gap-[0.833vw]">
      <span className={"font-museo text-[1.667vw] font-bold text-foreground"}>
        Events & Competitions
      </span>
      <div className={"flex flex-row gap-[0.781vw]"}>
        {ALL_GAME_EVENT_TYPES.map((eventType) => (
          <EventFilter
            key={eventType}
            eventType={eventType}
            typesSelected={eventTypesSelected}
            setTypesSelected={setEventTypesSelected}
            selected={eventTypesSelected.includes(eventType)}
          />
        ))}
      </div>
      {filteredEvents.length == 0 && (
        <div className="h-[352px] w-fit">
          <Lottie
            options={{
              animationData: SnakeNoEvents,
              rendererSettings: {
                className: "z-0 h-full",
              },
            }}
          ></Lottie>
        </div>
      )}
      {filteredEvents.length > 0 && (
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className={"flex flex-row w-full"}>
            {filteredEvents.map((event, index) => (
              <EventItem
                key={index}
                headText={event.name}
                description={event.description}
                prizePool={event.prizePool}
                event={event}
                image={event.image}
                textColor={event.textColor}
              />
            ))}
          </div>
        </div>
      )}
      <div className={"flex flex-row gap-[0.182vw] mx-auto mt-[0.781vw]"}>
        {[...Array(filteredEvents.length)].map((_, index) => (
          <motion.div
            key={index}
            className={"h-[0.313vw] rounded-full border-left-accent border"}
            animate={
              index == selectedIndex
                ? { backgroundColor: "#D2FF00", width: "0.938vw" }
                : { width: "0.313vw" }
            }
          />
        ))}
      </div>
    </div>
  );
}
