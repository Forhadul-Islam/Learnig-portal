import { interpolate } from "flubber";
import { MotionValue, useTransform } from "framer-motion";

const getIndex = (_, index) => index;

function useFlubber(progress, paths) {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });
}

export { getIndex, useFlubber };
