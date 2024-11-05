import { Project } from 'lcax'
import { InputAssembly, InputContribution, InputProduct, InputProject } from '@queries'

export const parseLcaxToContribution = (projects: Project[]): InputContribution[] =>
  projects.map((project) => {
    const assemblies = Object.values(project.assemblies).map((assembly) => {
      // @ts-expect-error products is in type
      const products = Object.values(assembly.products) as InputProduct[]
      return { ...assembly, products }
    }) as InputAssembly[]
    return { project: { ...project, assemblies } as InputProject }
  })
