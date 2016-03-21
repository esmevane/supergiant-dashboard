export function hexToRGBA(hex, opacity = 100) {
  if (!hex) {
    return `rgba(0,0,0,1)`
  } else {
    const baseline = hex.replace('#','')

    let r = parseInt(baseline.substring(0,2), 16)
    let g = parseInt(baseline.substring(2,4), 16)
    let b = parseInt(baseline.substring(4,6), 16)

    return `rgba(${r},${g},${b},${opacity/100})`
  }
}
