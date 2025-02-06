import { InputContribution } from '@queries'
import schema from '../../assets/openbdf.json'
import addFormats from "ajv-formats"

import Ajv2020 from "ajv/dist/2020"
const ajv = new Ajv2020()
addFormats(ajv)

export type ValidationResult = {
  message: string
  projectId: string
}

export const validateContributions = (contributions: InputContribution[]) => {
  const warnings: ValidationResult[] = []
  const errors: ValidationResult[] = []

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
    const validate = ajv.compile(schema)
    if (!validate(contribution.project)) {
      validate.errors?.forEach((error) => {
        errors.push({
          message: `${error.message} - ${error.instancePath.replaceAll('/', '.')}`,
          projectId: contribution.project.id,
        })
      })
    }
  })

  return { warnings, errors }
}