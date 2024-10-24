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
      onClick={() =>
        setTypesSelected(
          typesSelected.includes(eventType)
            ? typesSelected.filter((x) => x != eventType)
            : [...typesSelected, eventType],
        )
      }
    >
      {eventType}
    </button>
  );
};

export const EventItem = ({
  headText,
  description,
  event,
  image,
  imageFullWidth = false,
  textColor = "white",
}: {
  headText: string;
  description: string;
  event: ZkNoidEvent;
  image?: string;
  imageFullWidth?: boolean;
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
    <Link
      href={event.link}
      className={"group relative rounded-[0.26vw] border border-left-accent"}
    >
      {image && (
        <div className={"h-full w-full"}>
          <Image
            src={image}
            width={486}
            height={301}
            alt={"Event image"}
            className={cn(
              "h-[15.625vw] w-full rounded-[0.26vw] object-contain object-right 2xl:block",
              {
                "h-full object-center": imageFullWidth,
              },
            )}
          />
        </div>
      )}
      <div
        className={
          "absolute left-0 top-0 mr-auto flex h-full flex-col justify-between p-[1.042vw]"
        }
      >
        <div className={"flex flex-col gap-[0.521vw]"}>
          <span
            className={cn("font-museo text-[1.25vw] font-bold", {
              "text-bg-dark": textColor == "black",
              "text-foreground": textColor == "white",
            })}
          >
            {headText}
          </span>
          <span
            className={cn("max-w-[50%] font-plexsans text-[0.833vw]", {
              "text-bg-dark": textColor == "black",
              "text-foreground": textColor == "white",
            })}
          >
            {description}
          </span>
        </div>
        <div
          className={cn("font-museo text-[1.563vw] font-medium", {
            "text-bg-dark": textColor == "black",
            "text-foreground": textColor == "white",
          })}
        >
          {eventCounter.type == ZkNoidEventType.UPCOMING_EVENTS && (
            <>START IN {time}</>
          )}
          {eventCounter.type == ZkNoidEventType.CURRENT_EVENTS && (
            <>END IN {time}</>
          )}
        </div>
      </div>
      <div
        className={
          "absolute -bottom-[1px] -right-[1px] z-[1] flex items-center justify-center rounded-tl-[0.26vw] border-l border-t border-left-accent bg-bg-grey pl-[0.365vw] pt-[0.365vw]"
        }
      >
        <div
          className={
            "flex h-[3.646vw] w-[3.646vw] items-center justify-center rounded-[0.26vw] border border-left-accent group-hover:bg-left-accent"
          }
        >
          <svg
            width="27"
            height="45"
            viewBox="0 0 27 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"h-[2.083vw] w-[1.042vw]"}
          >
            <path
              d="M2.7998 2.7334L22.6331 22.5667L2.7998 42.4001"
              stroke="#D2FF00"
              stroke-width="5.66667"
              className={"group-hover:stroke-bg-grey"}
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default function Events({
  eventTypesSelected,
  setEventTypesSelected,
}: {
  eventTypesSelected: ZkNoidEventType[];
  setEventTypesSelected: (eventTypes: ZkNoidEventType[]) => void;
}) {
  const filteredEvents = GAME_EVENTS.filter(
    (x) =>
      (eventTypesSelected.includes(getEventType(x)) ||
        eventTypesSelected.length == 0) &&
      x.eventEnds > Date.now(),
  );

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
        <div
          className={"grid w-full grid-cols-1 gap-[0.938vw] lg:!grid-cols-2"}
        >
          {filteredEvents.map((event) => (
            <EventItem
              key={event.name}
              headText={event.name}
              description={event.description}
              event={event}
              image={event.image}
              imageFullWidth={event.imageFullWidth}
              textColor={event.textColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}
