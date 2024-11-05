import { InputContribution } from '@queries'
import { convertSLiCE } from 'lcax'
import { parseLcaxToContribution } from './index.ts'

export const parseSLiCEtoContribution = (uint8Array: Uint8Array): InputContribution[] => {
  const projects = convertSLiCE(uint8Array)

  return parseLcaxToContribution(projects)
}
