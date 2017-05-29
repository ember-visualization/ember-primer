import {
  curveBasisOpen,
  curveBasis,
  curveBundle,
  curveCardinalClosed,
  curveCardinalOpen,
  curveCardinal,
  curveCatmullRomClosed,
  curveCatmullRomOpen,
  curveCatmullRom,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore
} from 'd3-shape';

const curveFunctions = {
  'basis-open': curveBasisOpen,
  'basis': curveBasis,
  'bundle': curveBundle,
  'cardinal-closed': curveCardinalClosed,
  'cardinal-open': curveCardinalOpen,
  'cardinal': curveCardinal,
  'catmull-rom-closed': curveCatmullRomClosed,
  'catmull-rom-open': curveCatmullRomOpen,
  'catmull-rom': curveCatmullRom,
  'linear-closed': curveLinearClosed,
  'linear': curveLinear,
  'monotone-x': curveMonotoneX,
  'monotone-y': curveMonotoneY,
  'natural': curveNatural,
  'step': curveStep,
  'step-after': curveStepAfter,
  'step-before': curveStepBefore
};

export default function curveLookup(curve) {
  return curveFunctions[curve];
}
