import { isPresent } from '@ember/utils';

export default function scaleHelperOptions(scale, domain, range, hash) {
  scale.domain(domain || []);

  // Add the range
  if (hash && hash.round) {
    scale.rangeRound(range || []);
  } else {
    scale.range(range || []);
  }

  // Add Clamping
  if (hash && isPresent(hash.clamp)) {
    scale.clamp(hash.clamp);
  }

  // Add niceness
  if (hash && isPresent(hash.nice)) {
    scale.nice(hash.nice);
  }

  return scale;
}
