import { InputAssembly, InputContribution, InputProduct } from '@queries'
import { calculateProject, Project } from 'lcax'
import { parseLcaxToContribution } from '../parseLCAx.ts'
import { getAssemblies } from './getAssemblies.ts'
import { getProject } from './getProject.ts'

export const mapJsonToInputContribution = (json: never): InputContribution[] => {
  const projectData = json['project']
  const assemblyDataArray = json['assemblies']

  // Fetching list of assemblies
  const assemblies: InputAssembly[] = getAssemblies(assemblyDataArray, projectData)

  // Create a new type that extends the InputProject and make id required

  const inputProject = getProject(projectData, assemblies)

  const _assemblies = assemblies.reduce(
    (previousAssembly, nextAssembly) => {
      const _nextProducts = nextAssembly.products.reduce(
        (previousProduct, nextProduct) => {
          return { ...previousProduct, [nextProduct.id]: nextProduct }
        },
        {} as { [key: string]: InputProduct },
      )
      return { ...previousAssembly, [nextAssembly.id]: { ...nextAssembly, products: _nextProducts } }
    },
    {} as { [key: string]: { [key: string]: InputAssembly } },
  )

  let project = { ...inputProject, assemblies: _assemblies } // expects assemblies and products to be objects with key=id, value=object
  // debugger
  project = calculateProject(project as unknown as Project)

  // @ts-expect-error Ignoring type mismatch for calculateProject
  return parseLcaxToContribution([project])
}
