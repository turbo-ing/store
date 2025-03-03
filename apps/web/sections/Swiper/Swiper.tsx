import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import mobileCoverIMG from "@/public/image/section1/mobile-cover.svg";
import { SOCIALS_LINKS } from "../../../../packages/sdk/constants/socials";

const Slides = () => {
  const slides: {
    image: string;
    link?: string;
    openAsNewTab?: boolean;
  }[] = [
    {
      image:
        "https://res.cloudinary.com/dw4kivbv0/image/upload/w_2400,f_auto,fl_progressive:semi,q_auto:best/v1/store/slides/fgrrbnj4nszspwtpekpe",
    },
    {
      image:
        "https://res.cloudinary.com/dw4kivbv0/image/upload/w_2400,f_auto,fl_progressive:semi,q_auto:best/v1/store/slides/lcahkwvpo8htyesmxpa2",
    },
    {
      image:
        "https://res.cloudinary.com/dw4kivbv0/image/upload/w_2400,f_auto,fl_progressive:semi,q_auto:best/v1/store/slides/pkfoaj76fsxrozcszvo3",
    },
  ];

  return (
    <>
      {slides.map((slide, index) =>
        slide.link ? (
          <Link
            key={index}
            href={slide.link}
            target={slide.openAsNewTab ? "_blank" : undefined}
            rel={slide.openAsNewTab ? "noopener noreferrer" : undefined}
            className="min-w-0 flex-[0_0_100%]"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Image
                width={1600}
                height={1000}
                src={slide.image}
                alt="Slide"
                className="w-full"
              />
            </div>
          </Link>
        ) : (
          <div key={index} className="min-w-0 flex-[0_0_100%]">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                width={1600}
                height={1000}
                src={slide.image}
                alt="Slide"
                className="w-full"
              />
            </div>
          </div>
        ),
      )}
      <div key={"custom-lottery"} className="min-w-0 flex-[0_0_100%]">
        <div className="relative flex h-full w-full items-center justify-center">
          <Link href={"/games/lottery/global"}>
            <Image
              width={3200}
              height={1000}
              src={
                "https://res.cloudinary.com/dw4kivbv0/image/upload/w_2400,f_auto,fl_progressive:semi,q_auto:best/v1/store/slides/rtr6icdamjmh2kndh6q7"
              }
              alt="Slide"
              className="w-full"
            />
          </Link>
          <div
            className={
              "absolute left-[3.385vw] bottom-[2.344vw] flex flex-col items-start justify-start"
            }
          >
            <span className={"text-[1.302vw] text-foreground font-light"}>
              Free tickets in our social channels:
            </span>
            <div
              className={
                "flex flex-row items-center justify-center gap-[0.781vw]"
              }
            >
              <Link
                href={SOCIALS_LINKS.discord}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className="hover:opacity-80"
              >
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"w-[2.188vw] h-[2.188vw]"}
                >
                  <circle cx="21" cy="21" r="21" fill="#FF5B23" />
                  <path
                    d="M32.7555 10.0777C30.6779 9.10916 28.4285 8.40622 26.0854 8.00007C26.0648 7.99941 26.0444 8.00327 26.0255 8.01137C26.0066 8.01946 25.9897 8.03161 25.976 8.04693C25.6948 8.56243 25.3668 9.23412 25.1481 9.74961C22.6628 9.37471 20.1354 9.37471 17.6501 9.74961C17.4314 9.2185 17.1033 8.56243 16.8065 8.04693C16.7909 8.01569 16.7441 8.00007 16.6972 8.00007C14.3541 8.40622 12.1203 9.10916 10.0271 10.0777C10.0114 10.0777 9.99582 10.0933 9.9802 10.1089C5.73132 16.4666 4.55975 22.6525 5.13772 28.7759C5.13772 28.8071 5.15334 28.8384 5.18458 28.854C7.99635 30.9159 10.6988 32.1656 13.3699 32.9935C13.4168 33.0091 13.4637 32.9935 13.4793 32.9623C14.1041 32.1031 14.6665 31.1971 15.1507 30.2442C15.182 30.1818 15.1507 30.1193 15.0882 30.1037C14.1978 29.76 13.3543 29.3539 12.5264 28.8852C12.4639 28.854 12.4639 28.7603 12.5108 28.7134C12.6826 28.5884 12.8545 28.4478 13.0263 28.3229C13.0575 28.2916 13.1044 28.2916 13.1356 28.3073C18.5092 30.7597 24.3046 30.7597 29.6157 28.3073C29.6469 28.2916 29.6938 28.2916 29.725 28.3229C29.8969 28.4635 30.0687 28.5884 30.2405 28.729C30.303 28.7759 30.303 28.8696 30.2249 28.9008C29.4126 29.3851 28.5535 29.7756 27.6631 30.1193C27.6006 30.1349 27.585 30.213 27.6006 30.2599C28.1005 31.2127 28.6628 32.1188 29.272 32.9779C29.3189 32.9935 29.3658 33.0091 29.4126 32.9935C32.0994 32.1656 34.8018 30.9159 37.6136 28.854C37.6448 28.8384 37.6605 28.8071 37.6605 28.7759C38.3478 21.6996 36.5201 15.5606 32.818 10.1089C32.8024 10.0933 32.7867 10.0777 32.7555 10.0777ZM15.963 25.0425C14.3541 25.0425 13.0107 23.5585 13.0107 21.7309C13.0107 19.9032 14.3228 18.4192 15.963 18.4192C17.6188 18.4192 18.931 19.9188 18.9154 21.7309C18.9154 23.5585 17.6032 25.0425 15.963 25.0425ZM26.8508 25.0425C25.2418 25.0425 23.8984 23.5585 23.8984 21.7309C23.8984 19.9032 25.2106 18.4192 26.8508 18.4192C28.5066 18.4192 29.8188 19.9188 29.8031 21.7309C29.8031 23.5585 28.5066 25.0425 26.8508 25.0425Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </Link>
              <Link
                href={SOCIALS_LINKS.telegram}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className="hover:opacity-80"
              >
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"w-[2.188vw] h-[2.188vw]"}
                >
                  <circle cx="21" cy="21" r="21" fill="#FF5B23" />
                  <path
                    d="M31.2393 8.28414L4.97434 18.484C3.91739 18.959 3.5599 19.9102 4.71887 20.4265L11.457 22.5829L27.7488 12.4431C28.6384 11.8066 29.5491 11.9763 28.7654 12.6766L14.7729 25.4353L14.3334 30.8348C14.7405 31.6684 15.4859 31.6723 15.9614 31.258L19.8327 27.5691L26.4628 32.5689C28.0027 33.487 28.8406 32.8945 29.1719 31.2118L33.5207 10.4745C33.9722 8.40318 33.2022 7.49054 31.2393 8.28414Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </Link>
              <Link
                href={SOCIALS_LINKS.twitter}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className="hover:opacity-80"
              >
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"w-[2.188vw] h-[2.188vw]"}
                >
                  <circle cx="21" cy="21" r="21" fill="#FF5B23" />
                  <path
                    d="M28.8764 8H33.1361L23.8306 18.5903L34.7778 33H26.2056L19.4931 24.2597L11.8111 33H7.54722L17.5014 21.6736L7 8H15.7889L21.8583 15.9889L28.8764 8ZM27.3819 30.4611H29.7431L14.5056 10.4056H11.9722L27.3819 30.4611Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Swiper() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 8000 })],
  );

  return (
    <>
      <div className="banner-mask relative">
        <svg
          width="1502"
          height="481"
          viewBox="0 0 1502 481"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden h-full w-full lg:block"
        ></svg>
        <svg
          width="1502"
          height="481"
          viewBox="0 0 1502 481"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute bottom-0 top-0 z-40 hidden h-full w-full lg:block"
        >
          <path
            d="M1 51V430C1 457.614 23.3858 480 51 480H650.474C663.726 480 676.436 474.739 685.812 465.373L723.596 427.627C732.971 418.261 745.681 413 758.933 413H1451C1478.61 413 1501 390.614 1501 363V51C1501 23.3858 1478.61 1 1451 1H51C23.3858 1 1 23.3858 1 51Z"
            stroke="#D2FF00"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute left-0 top-0 hidden h-full w-full lg:block">
          <div className="h-full w-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full w-full">
              <Slides />
            </div>
          </div>
        </div>

        <div
          className={
            "block h-full w-full rounded-[0.521vw] border border-left-accent lg:hidden"
          }
        >
          <div
            className={
              'relative flex flex-col items-center justify-center bg-[url("/image/grid.svg")] bg-center p-[0.833vw]'
            }
          >
            <Image
              src={mobileCoverIMG}
              alt={"MobileCover"}
              className={"min-h-[450px]"}
            />
            <div
              className={
                "absolute bottom-[18%] px-[2%] text-center text-[1.042vw] font-medium text-left-accent"
              }
            >
              This is just a preview page. If you want to play games or take a
              part in competitions - please use Web-version
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
