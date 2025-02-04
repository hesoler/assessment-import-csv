// for string enums
export function getEnumKeyByValue (enumObj: any, value: string): string | undefined {
  return Object.keys(enumObj).find(key => enumObj[key] === value)
}

export function getArrayEnumValues (enumObj: any): string[] {
  return Object.values(enumObj)
}

export function getArrayEnumKeys (enumObj: any): string[] {
  return Object.keys(enumObj)
}

/** params @date - date value with 'yyyy-MM-dd' format */
export function isValidDate (date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false

  const [year, month, dia] = date.split('-').map(Number)

  if (month < 1 || month > 12) return false

  // Validate the day according to the month
  const daysPerMonth = [31, (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  return !(dia < 1 || dia > daysPerMonth[month - 1])
}

// console.log(isValidDate('2023-10-05')) // true
// console.log(isValidDate('2023-02-29')) // false (no es año bisiesto)
// console.log(isValidDate('2023-13-01')) // false (mes inválido)
