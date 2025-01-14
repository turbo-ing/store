import githubImg from "../public/image/socials/github.svg";
import githubImgWhite from "../public/image/socials/github-white.svg";
import twitterImg from "../public/image/socials/twitter.svg";
import twitterImgWhite from "../public/image/socials/twitter-white.svg";
import mediumImg from "../public/image/socials/medium.svg";
import mediumImgWhite from "../public/image/socials/medium-white.svg";
import TelegramImage from "../public/image/socials/telegram.svg";
import TelegramImageWhite from "../public/image/socials/telegram-white.svg";
import DiscordImage from "../public/image/socials/discord.svg";
import DiscordImageWhite from "../public/image/socials/discord-white.svg";

export const SOCIALS_LINKS = {
  github: "https://github.com/ZkNoid/zknoid",
  twitter: "https://twitter.com/ZkNoid",
  medium: "https://medium.com/@zknoid",
  telegram: "https://t.me/ZkNoid",
  discord: "https://discord.gg/hndRCZwQnb",
};

export const SOCIALS = [
  {
    id: "github",
    name: "Github",
    link: SOCIALS_LINKS.github,
    image: githubImg,
    whiteImage: githubImgWhite,
  },
  {
    id: "twitter",
    name: "Twitter",
    link: SOCIALS_LINKS.twitter,
    image: twitterImg,
    whiteImage: twitterImgWhite,
  },
  {
    id: "medium",
    name: "Medium",
    link: SOCIALS_LINKS.medium,
    image: mediumImg,
    whiteImage: mediumImgWhite,
  },
  {
    id: "telegram",
    name: "Telegram",
    link: SOCIALS_LINKS.telegram,
    image: TelegramImage,
    whiteImage: TelegramImageWhite,
  },
  {
    id: "discord",
    name: "Discord",
    link: SOCIALS_LINKS.discord,
    image: DiscordImage,
    whiteImage: DiscordImageWhite,
  },
];

export const MOBILE_HEADER_SOCIALS = SOCIALS.filter(
  (item) => item.id === "github" || item.id === "twitter",
);
