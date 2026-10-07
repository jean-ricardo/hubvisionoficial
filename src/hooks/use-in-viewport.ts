import { useEffect, useState, type RefObject } from "react";

/** IntersectionObserver-based visibility; starts autoplay without any user gesture. */
export function useInViewport(ref: RefObject<Element | null>, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}
