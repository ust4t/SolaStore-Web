import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

import {
  emblaMain,
  embla__viewport,
  embla__container,
} from "./EmblaSlider.module.css";

export default function EmblaSlider({ children, config }) {
  const [viewportRef, embla] = useEmblaCarousel({
    ...config,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className={emblaMain}>
        <div className={embla__viewport} ref={viewportRef}>
          <div className={`${embla__container}`}>{children}</div>
        </div>
        {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
      </div>
    </>
  );
}
