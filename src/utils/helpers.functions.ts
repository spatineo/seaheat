
export  function heightOfStep(depth: number[], step: number) {
  if (step < 0 || (step+1) >= depth.length) throw new Error("illegal step "+step);
  const a = step > 0 ? depth[step-1] : 0;
  const b = depth[step];
  const c = depth[step+1];
  return (b-a)/2 + (c-b)/2;
}