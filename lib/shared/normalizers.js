export function floatToDataUnits(num, decimalPlaces=2, floor=0) {
  let number   = num
  let units    = 'Ki'
  const oneKi  = Math.pow(2, 10)
  const oneMi  = Math.pow(2, 20)
  const oneGi  = Math.pow(2, 30)
  const oneTi  = Math.pow(2, 40)
  const places = Math.pow(10, decimalPlaces)

  if (isNaN(number) || (number < floor)) return '0'

  if (num < oneMi) {
    number = Math.round(num / oneKi * places) / places
  }
  else if (num >= oneMi && num < oneGi) {
    number = Math.round(num / oneMi * places) / places
    units = 'Mi'
  }
  else if (num >= oneGi && num < oneTi) {
    number = Math.round(num / oneGi * places) / places
    units = 'Gi'
  }
  else if (num >= oneTi) {
    number = Math.round(num / oneTi * places) / places
    units = 'Ti'
  }

  return  `${number} ${units}`
}

export function floatFloorToPlaces(num, decimalPlaces=2, floor=0) {
  if (isNaN(num) || (num < floor)) return floor

  const places = Math.pow(10, decimalPlaces)

  return Math.round(num * places) / places
}
