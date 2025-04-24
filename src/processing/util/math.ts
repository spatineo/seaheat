// a0=1.655E-1
// b0=7.6554E-1
// l1=5.9529E-2
// l2=5.4914E-4
// v2=2.4341E-3
// d0=1026.75

// Ta=T-10 # missä T on ulosvirtauksen lämpötila (sisäänvirtauksen T vähennettynä lämpöpumpussa tapahtuva viileneminen)
// Sa=S-35 # missä S on ulosvirtauksen suolaisuus (eli sama kuin sisäänvirtauksen suolaisuus)

// ulosvirtauksen_tiheys=(d0+(-a0*(1+0.5*l1*Ta)*Ta+b0*(1-0.5*l2*Sa)*Sa-v2*Ta*Sa))
export const densityOfOutflow = (T: number, S: number): number => {
  const a0 = 1.655E-1
  const b0 = 7.6554E-1
  const l1 = 5.9529E-2
  const l2 = 5.4914E-4
  const v2 = 2.4341E-3
  const d0 = 1026.75

  const Ta = T - 10
  const Sa = S - 35

  return (d0 + (-a0 * (1 + 0.5 * l1 * Ta) * Ta + b0 * (1 - 0.5 * l2 * Sa) * Sa - v2 * Ta * Sa))
}

// sqrt( (R_orig**2) / lim)
// missä lim = 0.01
// eslint-disable-next-line @typescript-eslint/naming-convention
export const normalizedImpactRadius = (R_orig: number) => {
  const lim = 0.01
  return Math.sqrt(R_orig ** 2 / lim)
}
