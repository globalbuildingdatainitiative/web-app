import { InputContribution } from '@queries'

export type ValidationResult = {
  message: string
  projectId: string
}

export const validateContributions = (contributions: InputContribution[]) => {
  const warnings: ValidationResult[] = []

  contributions.forEach((contribution) => {
    if (contribution.project.projectInfo?.grossFloorArea.value === 0) {
      warnings.push({
        message: "The project's GFA is 0, this will cause it to be excluded from analysis.",
        projectId: contribution.project.id,
      })
    }
    if (!contribution.project.results) {
      warnings.push({
        message: "The project doesn't have any results, this will cause it to be excluded from analysis.",
        projectId: contribution.project.id,
      })
    }
  })

  return { warnings }
}
