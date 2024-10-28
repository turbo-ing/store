import Link from "next/link";
import Image from "next/image";
import zknoidLogo from "../../../public/image/zknoid-logo.svg";
import { SOCIALS } from "../../../constants/socials";

export default function Footer() {
  return (
    <div className="mx-[2.604vw] mb-[2.604vw] mt-[5.208vw] flex flex-col gap-[1.979vw]">
      <div className={"grid grid-cols-3 w-full"}>
        <div className={"w-full"}>
          <Link
            href={"/"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={"hover:opacity-80"}
          >
            <Image
              src={zknoidLogo}
              alt={"Zknoid logo"}
              className={"h-full w-[11.458vw]"}
            />
          </Link>
        </div>
        <div
          className={"flex flex-row items-center justify-center gap-[2.083vw]"}
        >
          <Link
            href={"https://zknoid.io"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={"hover:opacity-80 font-museo text-[0.833vw] font-medium"}
          >
            About us
          </Link>
          <Link
            href={"https://github.com/ZkNoid"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={"hover:opacity-80 font-museo text-[0.833vw] font-medium"}
          >
            Github
          </Link>
          <Link
            href={"https://zknoid.medium.com"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={"hover:opacity-80 font-museo text-[0.833vw] font-medium"}
          >
            Blog
          </Link>
          <Link
            href={"https://docs.zknoid.io"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={"hover:opacity-80 font-museo text-[0.833vw] font-medium"}
          >
            Documentation
          </Link>
        </div>
        <div />
      </div>
      <div className={"flex flex-row items-center justify-between w-full"}>
        <div className={"flex flex-row items-center gap-[0.833vw]"}>
          {SOCIALS.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className={"flex items-center justify-center hover:opacity-80"}
            >
              <Image
                alt={item.name}
                src={item.whiteImage}
                className={"h-[1.25vw] w-[1.25vw]"}
              />
            </Link>
          ))}
        </div>
        <div className={"font-mono text-[0.625vw] font-light"}>
          © {new Date().getFullYear()} ZkNoid: all rights reserved
        </div>
      </div>
    </div>
  );
}
