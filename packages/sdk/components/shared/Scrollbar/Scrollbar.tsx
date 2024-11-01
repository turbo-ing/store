import { motion, PanInfo, useScroll, useTransform } from "framer-motion";
import { RefObject, useRef } from "react";

export default function Scrollbar({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleHeight =
    ((containerRef.current?.clientHeight || 0) /
      (containerRef.current?.scrollHeight || 1)) *
    (scrollbarRef.current?.offsetHeight || 0);

  const yPos = useTransform(
    scrollYProgress,
    [0, 1],
    [
      0,
      (scrollbarRef.current?.offsetHeight || 0) -
        (handleRef.current?.offsetHeight || 0),
    ],
  );

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    containerRef?.current?.scrollBy({
      top: info.offset.y,
    });
  };

  return (
    <motion.div
      ref={scrollbarRef}
      className="w-[0.833vw] h-full rounded-[0.26vw] outline outline-left-accent"
    >
      <motion.div
        ref={handleRef}
        className="w-full rounded-[0.26vw] bg-left-accent"
        drag="y"
        dragConstraints={scrollbarRef}
        dragMomentum={false}
        dragElastic={0}
        style={{
          y: yPos,
          height: handleHeight,
        }}
        onDrag={handleDrag}
      />
    </motion.div>
  );
}
