import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import styles from "./Gallery.module.scss";
import Image from "next/image";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Gallery({ images, setSelectedImg, small }) {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images?.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className={styles.gallery_container}>
      <div style={{ display: "flex" }}>
        <div className="prev" onClick={() => paginate(-1)}>
          {small ? (
            <FiArrowLeft
              style={{ top: "50%", position: "relative" }}
              size={44}
            />
          ) : null}
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            className={styles.bigImage}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
        <div className="next" onClick={() => paginate(1)}>
          {small ? (
            <FiArrowRight
              style={{ top: "50%", position: "relative" }}
              size={44}
            />
          ) : null}
        </div>
      </div>

      <div className={styles.smallPhotos_container}>
        {Array.isArray(images) &&
          images?.map((src, index) => (
            <div
              onClick={() => setPage([index, 1])}
              key={index}
              className={styles.smallPhotos}>
              <Image
                alt=""
                style={{
                  borderColor: images[imageIndex] === src ? "red" : null,
                }}
                src={src}
              />
            </div>
          ))}
      </div>
    </div>
  );
}