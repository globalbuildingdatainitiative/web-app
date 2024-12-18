export const camelCaseToHumanCase = (value: string) => {
  const result = value.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const snakeCaseToHumanCase = (value: string) => (
  value.split('_').map(word => capitalizeFirstLetter(word)).join(' ')
)

export const capitalizeFirstLetter = (value: string) => (
  value.charAt(0).toUpperCase() + value.slice(1)
)