import { DateTime, DurationObjectUnits, Interval } from "luxon";
import { useEffect, useState } from "react";
import { SOCIALS_LINKS } from "../../constants/socials";

export enum ZkNoidEventType {
  PAST_EVENTS = "Past events",
  CURRENT_EVENTS = "Current events",
  UPCOMING_EVENTS = "Upcoming events",
}

export const ALL_GAME_EVENT_TYPES = [
  ZkNoidEventType.PAST_EVENTS,
  ZkNoidEventType.CURRENT_EVENTS,
  ZkNoidEventType.UPCOMING_EVENTS,
];

export type ZkNoidEvent = {
  name: string;
  description: string;
  prizePool?: { text: string; color: "white" | "left-accent" };
  eventStarts: number;
  eventEnds: number;
  link: string;
  image: string;
  textColor?: "white" | "black";
};

export const GAME_EVENTS: ZkNoidEvent[] = [
  {
    name: "ETHGlobal Online Hack",
    description:
      "Discover the world of provable, zero-knowledge game development on Mina Protocol! Create your own fair game environment based on the modular “plug and play” SDK From ZkNoid.",
    eventStarts: new Date("2024-08-23").getTime(),
    eventEnds: new Date("2024-09-13").getTime(),
    link: "https://ethglobal.com/events/ethonline2024",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/etiuiudpxcjdeu6kqt8r",
    textColor: "black",
  },
  {
    name: "ETHGlobal Singapore Hack",
    description:
      "Discover the world of provable, zero-knowledge game development on Mina Protocol! Create your own fair game environment based on the modular “plug and play” SDK From ZkNoid.",
    eventStarts: new Date("2024-09-20").getTime(),
    eventEnds: new Date("2024-09-22").getTime(),
    link: "https://ethglobal.com/events/singapore2024",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/vwr9hbzkuruf68nxxih0",
    textColor: "black",
  },
  {
    name: "ZkNoid Bounty for Gamers",
    description:
      "To participate in the bounty, simply record your ZkNoid gaming journey with any screen recording software and send it to us. Be creative, using editing software is encouraged! Don’t forget to describe your experience in a comment to the submission.",
    prizePool: { text: "500 $MINA", color: "white" },
    eventStarts: new Date("2024-09-13").getTime(),
    eventEnds: new Date("2024-10-04").getTime(),
    link: "https://github.com/ZkNoid/zknoid/issues/13",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/zwx9etjctw3xjoigdfbt",
    textColor: "white",
  },
  {
    name: "Lottery L1 Testnet",
    description:
      "The long-awaited event: The lottery game testnet is coming. The testnet allows users to test game features, check tasks, do it, help the team fix bugs and get rewards.",
    prizePool: { text: "500 $MINA", color: "left-accent" },
    eventStarts: new Date("2024-10-14").getTime(),
    eventEnds: new Date("2024-10-28T19:00:00.000+03:00").getTime(),
    link: "https://quest.zknoid.io",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/icwduehzsvuguqgxb1g0",
    textColor: "white",
  },
  {
    name: "Lottery L1 Mainnet",
    description: "Try your luck and win Jackpot!",
    eventStarts: new Date("2025-01-15").getTime(),
    eventEnds: new Date("2025-01-30T01:00:00.000+03:00").getTime(),
    link: "/games/lottery/global",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/c5gyuxt5ay7kmf9ibp9u",
    textColor: "white",
  },
  {
    name: "Lottery L1 Festival",
    description: "Join daily events, complete tasks and get prizes!",
    eventStarts: new Date("2025-01-27").getTime(),
    eventEnds: new Date("2025-02-07T00:00:00.000+03:00").getTime(),
    link: "/games/lottery/global",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/tlekt2gampj4htfp3zhk",
    textColor: "white",
  },
  {
    name: "Free Lottery L1 Trial",
    description:
      "Follow us on social networks! There you can find free access codes for free participation in the lottery.",
    eventStarts: new Date("2025-01-15").getTime(),
    eventEnds: new Date("2025-01-30T00:00:00.000+03:00").getTime(),
    link: SOCIALS_LINKS.twitter,
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/amnfxivmsobxov4ks4hy",
    textColor: "white",
  },
  {
    name: "",
    description: "",
    eventStarts: new Date("2025-02-03T15:00:00.000+03:00").getTime(),
    eventEnds: new Date("2025-02-07T15:00:00.000+03:00").getTime(),
    link: SOCIALS_LINKS.twitter,
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/fbllffrkuzwrlckmkrlk",
  },
  {
    name: "",
    description: "",
    eventStarts: new Date("2025-02-06T15:00:00.000+03:00").getTime(),
    eventEnds: new Date("2025-02-06T16:00:00.000+03:00").getTime(),
    link: "https://x.com/minacryptocom",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/w7cngpqm2ikulqwi1tkk",
  },
  {
    name: "",
    description: "",
    eventStarts: new Date("2025-02-04T15:00:00.000+03:00").getTime(),
    eventEnds: new Date("2025-02-07T15:00:00.000+03:00").getTime(),
    link: "https://www.tileville.xyz/competitions",
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/wcusrtvzkqyilrnl9nzf",
  },
  {
    name: "",
    description: "",
    eventStarts: new Date("2025-02-05T15:00:00.000+03:00").getTime(),
    eventEnds: new Date("2025-02-06T15:00:00.000+03:00").getTime(),
    link: SOCIALS_LINKS.twitter,
    image:
      "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3200,f_auto,q_auto:best/v1/store/events/d1xghz6od0etqweelpvm",
  },
];

export const getEventType = (event: ZkNoidEvent): ZkNoidEventType => {
  const now = Date.now();

  if (event.eventStarts > now) return ZkNoidEventType.UPCOMING_EVENTS;

  if (event.eventEnds > now) return ZkNoidEventType.CURRENT_EVENTS;

  return ZkNoidEventType.PAST_EVENTS;
};

const getEventTime = (event: ZkNoidEvent) => {
  const now = DateTime.now();
  let comparedTime;

  if (event.eventStarts > now.toMillis()) {
    comparedTime = event.eventStarts;
  } else if (event.eventEnds > now.toMillis()) {
    comparedTime = event.eventEnds;
  } else {
    comparedTime = event.eventEnds;
  }

  return Interval.fromDateTimes(now, DateTime.fromMillis(comparedTime))
    .toDuration(["days", "hours", "minutes", "seconds"])
    .toObject();
};

export const useEventTimer = (event: ZkNoidEvent) => {
  const [type, setType] = useState<ZkNoidEventType>();
  const [startsIn, setStartsIn] = useState<DurationObjectUnits>();

  useEffect(() => {
    const newType = getEventType(event);
    const newTime = getEventTime(event);

    setType(newType);
    setStartsIn(newTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newType = getEventType(event);
      const newTime = getEventTime(event);

      setType(newType);
      setStartsIn(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  return { type, startsIn };
};
