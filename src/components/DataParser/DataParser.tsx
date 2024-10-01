import * as XLSX from 'xlsx'
import {
  InputAssembly,
  InputContribution,
  InputProduct,
  InputProject,
  ImpactCategoryKey,
  LifeCycleStage,
} from '@queries'
import { uuidv4 } from '@graphql-tools/mock/utils'
import { calculateProject, convertSLiCE, Project } from 'lcax'

// Function to group assemblies and map them to JSON
export const mapAssembliesToJson = (sheetData: (string | number)[][]) => {
  const headers = sheetData[0]
  const lcaxIndex = headers.indexOf('LCAx Location')
  const valueIndexes = headers.map((header, index) => (header === 'Value' ? index : -1)).filter((index) => index !== -1) // Find indexes of all 'Value' columns
  const groupedAssemblies: Record<string, number | string>[] = []

  for (const valueIndex of valueIndexes) {
    const assemblyGroup: Record<string, string | number> = {}
    for (let i = 1; i < sheetData.length; i++) {
      const row = sheetData[i]
      const info = row[lcaxIndex]
      const value = row[valueIndex]
      if (info && value) {
        assemblyGroup[info] = value
      }
    }
    groupedAssemblies.push(assemblyGroup)
  }
  return groupedAssemblies
}

// Function to map Information and Values columns to JSON
export const mapToJson = (sheetData: (string | number)[][]) => {
  const headers = sheetData[0]
  const lcaxIndex = headers.indexOf('LCAx Location')
  const valueIndexes = headers.map((header, index) => (header === 'Value' ? index : -1)).filter((index) => index !== -1)
  const jsonData: Record<string, number | string> = {}

  for (let i = 1; i < sheetData.length; i++) {
    const row = sheetData[i]
    const info = row[lcaxIndex]

    valueIndexes.forEach((valueIndex) => {
      const value = row[valueIndex]
      if (info && value) {
        jsonData[info] = value
      }
    })
  }
  return jsonData
}

// Parser function for .xlsx files
export const parseXlsxToContribution = async (file: File) => {
  const data = await file.arrayBuffer()
  const workbook = XLSX.read(data, { type: 'array' })
  const projectSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Project'], { header: 1 }) as (string | number)[][]
  const assembliesSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Assemblies'], { header: 1 }) as (
    | string
    | number
  )[][]

  const json = {
    project: mapToJson(projectSheet),
    assemblies: mapAssembliesToJson(assembliesSheet),
  }
  return json
}

export const mapJsonToInputContribution = (json: never): InputContribution[] => {
  const projectData = json['project']
  const assemblyDataArray = json['assemblies']

  // Function to map assembly data into an array of InputAssembly
  const getAssemblies = (assemblyDataArray: Record<string, never>[]): InputAssembly[] => {
    return assemblyDataArray.map((assemblyData) => {
      // Map the products for each assembly
      const products: InputProduct[] = [
        {
          id: uuidv4(),
          name: assemblyData['product.name'] || '',
          description: assemblyData['assembly.description'] || '',
          referenceServiceLife: assemblyData['product.reference_service_life'] || 0,
          impactData: {
            id: uuidv4(),
            name: assemblyData['epd.name'] || '',
            declaredUnit: assemblyData['product.unit'] || '',
            version: '',
            publishedDate: new Date().toISOString().split('T')[0],
            validUntil: new Date().toISOString().split('T')[0],
            formatVersion: process.env.LCAX_VERSION || '',
            source: {
              name: assemblyData['epd.source.name'] || '',
              url: '',
            },
            // @ts-expect-error ignore error
            standard: ((assemblyData['epd.standard'] as string) || '').toLowerCase(),
            // @ts-expect-error ignore error
            location: ((projectData['country'] as string) || '').toLowerCase(),
            impacts: {
              gwp: {
                a0: assemblyData['gwpTotal.a0'] || 0,
                a1a3: assemblyData['gwpTotal.a1a3'] || 0,
                a4: assemblyData['gwpTotal.a4'] || 0,
                a5: assemblyData['gwpTotal.a5'] || 0,
                b1: assemblyData['gwpTotal.b1'] || 0,
                b2: assemblyData['gwpTotal.b2'] || 0,
                b3: assemblyData['gwpTotal.b3'] || 0,
                b4: assemblyData['gwpTotal.b4'] || 0,
                b5: assemblyData['gwpTotal.b5'] || 0,
                b6: assemblyData['gwpTotal.b6'] || 0,
                b7: assemblyData['gwpTotal.b7'] || 0,
                b8: assemblyData['gwpTotal.b8'] || 0,
                c1: assemblyData['gwpTotal.c1'] || 0,
                c2: assemblyData['gwpTotal.c2'] || 0,
                c3: assemblyData['gwpTotal.c3'] || 0,
                c4: assemblyData['gwpTotal.c4'] || 0,
                d: assemblyData['gwpTotal.d'] || 0,
              },
              gwp_fos: {
                a0: assemblyData['gwpFos.a0'] || 0,
                a1a3: assemblyData['gwpFos.a1a3'] || 0,
                a4: assemblyData['gwpFos.a4'] || 0,
                a5: assemblyData['gwpFos.a5'] || 0,
                b1: assemblyData['gwpFos.b1'] || 0,
                b2: assemblyData['gwpFos.b2'] || 0,
                b3: assemblyData['gwpFos.b3'] || 0,
                b4: assemblyData['gwpFos.b4'] || 0,
                b5: assemblyData['gwpFos.b5'] || 0,
                b6: assemblyData['gwpFos.b6'] || 0,
                b7: assemblyData['gwpFos.b7'] || 0,
                b8: assemblyData['gwpFos.b8'] || 0,
                c1: assemblyData['gwpFos.c1'] || 0,
                c2: assemblyData['gwpFos.c2'] || 0,
                c3: assemblyData['gwpFos.c3'] || 0,
                c4: assemblyData['gwpFos.c4'] || 0,
                d: assemblyData['gwpFos.d'] || 0,
              },
              gwp_bio: {
                a0: assemblyData['gwpBio.a0'] || 0,
                a1a3: assemblyData['gwpBio.a1a3'] || 0,
                a4: assemblyData['gwpBio.a4'] || 0,
                a5: assemblyData['gwpBio.a5'] || 0,
                b1: assemblyData['gwpBio.b1'] || 0,
                b2: assemblyData['gwpBio.b2'] || 0,
                b3: assemblyData['gwpBio.b3'] || 0,
                b4: assemblyData['gwpBio.b4'] || 0,
                b5: assemblyData['gwpBio.b5'] || 0,
                b6: assemblyData['gwpBio.b6'] || 0,
                b7: assemblyData['gwpBio.b7'] || 0,
                b8: assemblyData['gwpBio.b8'] || 0,
                c1: assemblyData['gwpBio.c1'] || 0,
                c2: assemblyData['gwpBio.c2'] || 0,
                c3: assemblyData['gwpBio.c3'] || 0,
                c4: assemblyData['gwpBio.c4'] || 0,
                d: assemblyData['gwpBio.d'] || 0,
              },
              gwp_lul: {
                a0: assemblyData['gwpLuluc.a0'] || 0,
                a1a3: assemblyData['gwpLuluc.a1a3'] || 0,
                a4: assemblyData['gwpLuluc.a4'] || 0,
                a5: assemblyData['gwpLuluc.a5'] || 0,
                b1: assemblyData['gwpLuluc.b1'] || 0,
                b2: assemblyData['gwpLuluc.b2'] || 0,
                b3: assemblyData['gwpLuluc.b3'] || 0,
                b4: assemblyData['gwpLuluc.b4'] || 0,
                b5: assemblyData['gwpLuluc.b5'] || 0,
                b6: assemblyData['gwpLuluc.b6'] || 0,
                b7: assemblyData['gwpLuluc.b7'] || 0,
                b8: assemblyData['gwpLuluc.b8'] || 0,
                c1: assemblyData['gwpLuluc.c1'] || 0,
                c2: assemblyData['gwpLuluc.c2'] || 0,
                c3: assemblyData['gwpLuluc.c3'] || 0,
                c4: assemblyData['gwpLuluc.c4'] || 0,
                d: assemblyData['gwpLuluc.d'] || 0,
              },
              odp: {
                a0: assemblyData['odp.a0'] || 0,
                a1a3: assemblyData['odp.a1a3'] || 0,
                a4: assemblyData['odp.a4'] || 0,
                a5: assemblyData['odp.a5'] || 0,
                b1: assemblyData['odp.b1'] || 0,
                b2: assemblyData['odp.b2'] || 0,
                b3: assemblyData['odp.b3'] || 0,
                b4: assemblyData['odp.b4'] || 0,
                b5: assemblyData['odp.b5'] || 0,
                b6: assemblyData['odp.b6'] || 0,
                b7: assemblyData['odp.b7'] || 0,
                b8: assemblyData['odp.b8'] || 0,
                c1: assemblyData['odp.c1'] || 0,
                c2: assemblyData['odp.c2'] || 0,
                c3: assemblyData['odp.c3'] || 0,
                c4: assemblyData['odp.c4'] || 0,
                d: assemblyData['odp.d'] || 0,
              },
              ap: {
                a0: assemblyData['ap.a0'] || 0,
                a1a3: assemblyData['ap.a1a3'] || 0,
                a4: assemblyData['ap.a4'] || 0,
                a5: assemblyData['ap.a5'] || 0,
                b1: assemblyData['ap.b1'] || 0,
                b2: assemblyData['ap.b2'] || 0,
                b3: assemblyData['ap.b3'] || 0,
                b4: assemblyData['ap.b4'] || 0,
                b5: assemblyData['ap.b5'] || 0,
                b6: assemblyData['ap.b6'] || 0,
                b7: assemblyData['ap.b7'] || 0,
                b8: assemblyData['ap.b8'] || 0,
                c1: assemblyData['ap.c1'] || 0,
                c2: assemblyData['ap.c2'] || 0,
                c3: assemblyData['ap.c3'] || 0,
                c4: assemblyData['ap.c4'] || 0,
                d: assemblyData['ap.d'] || 0,
              },
              ep: {
                a0: assemblyData['ep.a0'] || 0,
                a1a3: assemblyData['ep.a1a3'] || 0,
                a4: assemblyData['ep.a4'] || 0,
                a5: assemblyData['ep.a5'] || 0,
                b1: assemblyData['ep.b1'] || 0,
                b2: assemblyData['ep.b2'] || 0,
                b3: assemblyData['ep.b3'] || 0,
                b4: assemblyData['ep.b4'] || 0,
                b5: assemblyData['ep.b5'] || 0,
                b6: assemblyData['ep.b6'] || 0,
                b7: assemblyData['ep.b7'] || 0,
                b8: assemblyData['ep.b8'] || 0,
                c1: assemblyData['ep.c1'] || 0,
                c2: assemblyData['ep.c2'] || 0,
                c3: assemblyData['ep.c3'] || 0,
                c4: assemblyData['ep.c4'] || 0,
                d: assemblyData['ep.d'] || 0,
              },
              ep_fw: {
                a0: assemblyData['epFw.a0'] || 0,
                a1a3: assemblyData['epFw.a1a3'] || 0,
                a4: assemblyData['epFw.a4'] || 0,
                a5: assemblyData['epFw.a5'] || 0,
                b1: assemblyData['epFw.b1'] || 0,
                b2: assemblyData['epFw.b2'] || 0,
                b3: assemblyData['epFw.b3'] || 0,
                b4: assemblyData['epFw.b4'] || 0,
                b5: assemblyData['epFw.b5'] || 0,
                b6: assemblyData['epFw.b6'] || 0,
                b7: assemblyData['epFw.b7'] || 0,
                b8: assemblyData['epFw.b8'] || 0,
                c1: assemblyData['epFw.c1'] || 0,
                c2: assemblyData['epFw.c2'] || 0,
                c3: assemblyData['epFw.c3'] || 0,
                c4: assemblyData['epFw.c4'] || 0,
                d: assemblyData['epFw.d'] || 0,
              },
              ep_mar: {
                a0: assemblyData['epMar.a0'] || 0,
                a1a3: assemblyData['epMar.a1a3'] || 0,
                a4: assemblyData['epMar.a4'] || 0,
                a5: assemblyData['epMar.a5'] || 0,
                b1: assemblyData['epMar.b1'] || 0,
                b2: assemblyData['epMar.b2'] || 0,
                b3: assemblyData['epMar.b3'] || 0,
                b4: assemblyData['epMar.b4'] || 0,
                b5: assemblyData['epMar.b5'] || 0,
                b6: assemblyData['epMar.b6'] || 0,
                b7: assemblyData['epMar.b7'] || 0,
                b8: assemblyData['epMar.b8'] || 0,
                c1: assemblyData['epMar.c1'] || 0,
                c2: assemblyData['epMar.c2'] || 0,
                c3: assemblyData['epMar.c3'] || 0,
                c4: assemblyData['epMar.c4'] || 0,
                d: assemblyData['epMar.d'] || 0,
              },
              ep_ter: {
                a0: assemblyData['epTer.a0'] || 0,
                a1a3: assemblyData['epTer.a1a3'] || 0,
                a4: assemblyData['epTer.a4'] || 0,
                a5: assemblyData['epTer.a5'] || 0,
                b1: assemblyData['epTer.b1'] || 0,
                b2: assemblyData['epTer.b2'] || 0,
                b3: assemblyData['epTer.b3'] || 0,
                b4: assemblyData['epTer.b4'] || 0,
                b5: assemblyData['epTer.b5'] || 0,
                b6: assemblyData['epTer.b6'] || 0,
                b7: assemblyData['epTer.b7'] || 0,
                b8: assemblyData['epTer.b8'] || 0,
                c1: assemblyData['epTer.c1'] || 0,
                c2: assemblyData['epTer.c2'] || 0,
                c3: assemblyData['epTer.c3'] || 0,
                c4: assemblyData['epTer.c4'] || 0,
                d: assemblyData['epTer.d'] || 0,
              },
              pocp: {
                a0: assemblyData['pocp.a0'] || 0,
                a1a3: assemblyData['pocp.a1a3'] || 0,
                a4: assemblyData['pocp.a4'] || 0,
                a5: assemblyData['pocp.a5'] || 0,
                b1: assemblyData['pocp.b1'] || 0,
                b2: assemblyData['pocp.b2'] || 0,
                b3: assemblyData['pocp.b3'] || 0,
                b4: assemblyData['pocp.b4'] || 0,
                b5: assemblyData['pocp.b5'] || 0,
                b6: assemblyData['pocp.b6'] || 0,
                b7: assemblyData['pocp.b7'] || 0,
                b8: assemblyData['pocp.b8'] || 0,
                c1: assemblyData['pocp.c1'] || 0,
                c2: assemblyData['pocp.c2'] || 0,
                c3: assemblyData['pocp.c3'] || 0,
                c4: assemblyData['pocp.c4'] || 0,
                d: assemblyData['pocp.d'] || 0,
              },
              adpe: {
                a0: assemblyData['adpe.a0'] || 0,
                a1a3: assemblyData['adpe.a1a3'] || 0,
                a4: assemblyData['adpe.a4'] || 0,
                a5: assemblyData['adpe.a5'] || 0,
                b1: assemblyData['adpe.b1'] || 0,
                b2: assemblyData['adpe.b2'] || 0,
                b3: assemblyData['adpe.b3'] || 0,
                b4: assemblyData['adpe.b4'] || 0,
                b5: assemblyData['adpe.b5'] || 0,
                b6: assemblyData['adpe.b6'] || 0,
                b7: assemblyData['adpe.b7'] || 0,
                b8: assemblyData['adpe.b8'] || 0,
                c1: assemblyData['adpe.c1'] || 0,
                c2: assemblyData['adpe.c2'] || 0,
                c3: assemblyData['adpe.c3'] || 0,
                c4: assemblyData['adpe.c4'] || 0,
                d: assemblyData['adpe.d'] || 0,
              },
              adpf: {
                a0: assemblyData['adpf.a0'] || 0,
                a1a3: assemblyData['adpf.a1a3'] || 0,
                a4: assemblyData['adpf.a4'] || 0,
                a5: assemblyData['adpf.a5'] || 0,
                b1: assemblyData['adpf.b1'] || 0,
                b2: assemblyData['adpf.b2'] || 0,
                b3: assemblyData['adpf.b3'] || 0,
                b4: assemblyData['adpf.b4'] || 0,
                b5: assemblyData['adpf.b5'] || 0,
                b6: assemblyData['adpf.b6'] || 0,
                b7: assemblyData['adpf.b7'] || 0,
                b8: assemblyData['adpf.b8'] || 0,
                c1: assemblyData['adpf.c1'] || 0,
                c2: assemblyData['adpf.c2'] || 0,
                c3: assemblyData['adpf.c3'] || 0,
                c4: assemblyData['adpf.c4'] || 0,
                d: assemblyData['adpf.d'] || 0,
              },
              penre: {
                a0: assemblyData['penre.a0'] || 0,
                a1a3: assemblyData['penre.a1a3'] || 0,
                a4: assemblyData['penre.a4'] || 0,
                a5: assemblyData['penre.a5'] || 0,
                b1: assemblyData['penre.b1'] || 0,
                b2: assemblyData['penre.b2'] || 0,
                b3: assemblyData['penre.b3'] || 0,
                b4: assemblyData['penre.b4'] || 0,
                b5: assemblyData['penre.b5'] || 0,
                b6: assemblyData['penre.b6'] || 0,
                b7: assemblyData['penre.b7'] || 0,
                b8: assemblyData['penre.b8'] || 0,
                c1: assemblyData['penre.c1'] || 0,
                c2: assemblyData['penre.c2'] || 0,
                c3: assemblyData['penre.c3'] || 0,
                c4: assemblyData['penre.c4'] || 0,
                d: assemblyData['penre.d'] || 0,
              },
              pere: {
                a0: assemblyData['pere.a0'] || 0,
                a1a3: assemblyData['pere.a1a3'] || 0,
                a4: assemblyData['pere.a4'] || 0,
                a5: assemblyData['pere.a5'] || 0,
                b1: assemblyData['pere.b1'] || 0,
                b2: assemblyData['pere.b2'] || 0,
                b3: assemblyData['pere.b3'] || 0,
                b4: assemblyData['pere.b4'] || 0,
                b5: assemblyData['pere.b5'] || 0,
                b6: assemblyData['pere.b6'] || 0,
                b7: assemblyData['pere.b7'] || 0,
                b8: assemblyData['pere.b8'] || 0,
                c1: assemblyData['pere.c1'] || 0,
                c2: assemblyData['pere.c2'] || 0,
                c3: assemblyData['pere.c3'] || 0,
                c4: assemblyData['pere.c4'] || 0,
                d: assemblyData['pere.d'] || 0,
              },
              perm: {
                a0: assemblyData['perm.a0'] || 0,
                a1a3: assemblyData['perm.a1a3'] || 0,
                a4: assemblyData['perm.a4'] || 0,
                a5: assemblyData['perm.a5'] || 0,
                b1: assemblyData['perm.b1'] || 0,
                b2: assemblyData['perm.b2'] || 0,
                b3: assemblyData['perm.b3'] || 0,
                b4: assemblyData['perm.b4'] || 0,
                b5: assemblyData['perm.b5'] || 0,
                b6: assemblyData['perm.b6'] || 0,
                b7: assemblyData['perm.b7'] || 0,
                b8: assemblyData['perm.b8'] || 0,
                c1: assemblyData['perm.c1'] || 0,
                c2: assemblyData['perm.c2'] || 0,
                c3: assemblyData['perm.c3'] || 0,
                c4: assemblyData['perm.c4'] || 0,
                d: assemblyData['perm.d'] || 0,
              },
              pert: {
                a0: assemblyData['pert.a0'] || 0,
                a1a3: assemblyData['pert.a1a3'] || 0,
                a4: assemblyData['pert.a4'] || 0,
                a5: assemblyData['pert.a5'] || 0,
                b1: assemblyData['pert.b1'] || 0,
                b2: assemblyData['pert.b2'] || 0,
                b3: assemblyData['pert.b3'] || 0,
                b4: assemblyData['pert.b4'] || 0,
                b5: assemblyData['pert.b5'] || 0,
                b6: assemblyData['pert.b6'] || 0,
                b7: assemblyData['pert.b7'] || 0,
                b8: assemblyData['pert.b8'] || 0,
                c1: assemblyData['pert.c1'] || 0,
                c2: assemblyData['pert.c2'] || 0,
                c3: assemblyData['pert.c3'] || 0,
                c4: assemblyData['pert.c4'] || 0,
                d: assemblyData['pert.d'] || 0,
              },
              penrt: {
                a0: assemblyData['penrt.a0'] || 0,
                a1a3: assemblyData['penrt.a1a3'] || 0,
                a4: assemblyData['penrt.a4'] || 0,
                a5: assemblyData['penrt.a5'] || 0,
                b1: assemblyData['penrt.b1'] || 0,
                b2: assemblyData['penrt.b2'] || 0,
                b3: assemblyData['penrt.b3'] || 0,
                b4: assemblyData['penrt.b4'] || 0,
                b5: assemblyData['penrt.b5'] || 0,
                b6: assemblyData['penrt.b6'] || 0,
                b7: assemblyData['penrt.b7'] || 0,
                b8: assemblyData['penrt.b8'] || 0,
                c1: assemblyData['penrt.c1'] || 0,
                c2: assemblyData['penrt.c2'] || 0,
                c3: assemblyData['penrt.c3'] || 0,
                c4: assemblyData['penrt.c4'] || 0,
                d: assemblyData['penrt.d'] || 0,
              },
              penrm: {
                a0: assemblyData['penrm.a0'] || 0,
                a1a3: assemblyData['penrm.a1a3'] || 0,
                a4: assemblyData['penrm.a4'] || 0,
                a5: assemblyData['penrm.a5'] || 0,
                b1: assemblyData['penrm.b1'] || 0,
                b2: assemblyData['penrm.b2'] || 0,
                b3: assemblyData['penrm.b3'] || 0,
                b4: assemblyData['penrm.b4'] || 0,
                b5: assemblyData['penrm.b5'] || 0,
                b6: assemblyData['penrm.b6'] || 0,
                b7: assemblyData['penrm.b7'] || 0,
                b8: assemblyData['penrm.b8'] || 0,
                c1: assemblyData['penrm.c1'] || 0,
                c2: assemblyData['penrm.c2'] || 0,
                c3: assemblyData['penrm.c3'] || 0,
                c4: assemblyData['penrm.c4'] || 0,
                d: assemblyData['penrm.d'] || 0,
              },
              sm: {
                a0: assemblyData['sm.a0'] || 0,
                a1a3: assemblyData['sm.a1a3'] || 0,
                a4: assemblyData['sm.a4'] || 0,
                a5: assemblyData['sm.a5'] || 0,
                b1: assemblyData['sm.b1'] || 0,
                b2: assemblyData['sm.b2'] || 0,
                b3: assemblyData['sm.b3'] || 0,
                b4: assemblyData['sm.b4'] || 0,
                b5: assemblyData['sm.b5'] || 0,
                b6: assemblyData['sm.b6'] || 0,
                b7: assemblyData['sm.b7'] || 0,
                b8: assemblyData['sm.b8'] || 0,
                c1: assemblyData['sm.c1'] || 0,
                c2: assemblyData['sm.c2'] || 0,
                c3: assemblyData['sm.c3'] || 0,
                c4: assemblyData['sm.c4'] || 0,
                d: assemblyData['sm.d'] || 0,
              },
              pm: {
                a0: assemblyData['pm.a0'] || 0,
                a1a3: assemblyData['pm.a1a3'] || 0,
                a4: assemblyData['pm.a4'] || 0,
                a5: assemblyData['pm.a5'] || 0,
                b1: assemblyData['pm.b1'] || 0,
                b2: assemblyData['pm.b2'] || 0,
                b3: assemblyData['pm.b3'] || 0,
                b4: assemblyData['pm.b4'] || 0,
                b5: assemblyData['pm.b5'] || 0,
                b6: assemblyData['pm.b6'] || 0,
                b7: assemblyData['pm.b7'] || 0,
                b8: assemblyData['pm.b8'] || 0,
                c1: assemblyData['pm.c1'] || 0,
                c2: assemblyData['pm.c2'] || 0,
                c3: assemblyData['pm.c3'] || 0,
                c4: assemblyData['pm.c4'] || 0,
                d: assemblyData['pm.d'] || 0,
              },
              irp: {
                a0: assemblyData['irp.a0'] || 0,
                a1a3: assemblyData['irp.a1a3'] || 0,
                a4: assemblyData['irp.a4'] || 0,
                a5: assemblyData['irp.a5'] || 0,
                b1: assemblyData['irp.b1'] || 0,
                b2: assemblyData['irp.b2'] || 0,
                b3: assemblyData['irp.b3'] || 0,
                b4: assemblyData['irp.b4'] || 0,
                b5: assemblyData['irp.b5'] || 0,
                b6: assemblyData['irp.b6'] || 0,
                b7: assemblyData['irp.b7'] || 0,
                b8: assemblyData['irp.b8'] || 0,
                c1: assemblyData['irp.c1'] || 0,
                c2: assemblyData['irp.c2'] || 0,
                c3: assemblyData['irp.c3'] || 0,
                c4: assemblyData['irp.c4'] || 0,
                d: assemblyData['irp.d'] || 0,
              },
              etp_fw: {
                a0: assemblyData['etpFw.a0'] || 0,
                a1a3: assemblyData['etpFw.a1a3'] || 0,
                a4: assemblyData['etpFw.a4'] || 0,
                a5: assemblyData['etpFw.a5'] || 0,
                b1: assemblyData['etpFw.b1'] || 0,
                b2: assemblyData['etpFw.b2'] || 0,
                b3: assemblyData['etpFw.b3'] || 0,
                b4: assemblyData['etpFw.b4'] || 0,
                b5: assemblyData['etpFw.b5'] || 0,
                b6: assemblyData['etpFw.b6'] || 0,
                b7: assemblyData['etpFw.b7'] || 0,
                b8: assemblyData['etpFw.b8'] || 0,
                c1: assemblyData['etpFw.c1'] || 0,
                c2: assemblyData['etpFw.c2'] || 0,
                c3: assemblyData['etpFw.c3'] || 0,
                c4: assemblyData['etpFw.c4'] || 0,
                d: assemblyData['etpFw.d'] || 0,
              },
              htp_c: {
                a0: assemblyData['htpC.a0'] || 0,
                a1a3: assemblyData['htpC.a1a3'] || 0,
                a4: assemblyData['htpC.a4'] || 0,
                a5: assemblyData['htpC.a5'] || 0,
                b1: assemblyData['htpC.b1'] || 0,
                b2: assemblyData['htpC.b2'] || 0,
                b3: assemblyData['htpC.b3'] || 0,
                b4: assemblyData['htpC.b4'] || 0,
                b5: assemblyData['htpC.b5'] || 0,
                b6: assemblyData['htpC.b6'] || 0,
                b7: assemblyData['htpC.b7'] || 0,
                b8: assemblyData['htpC.b8'] || 0,
                c1: assemblyData['htpC.c1'] || 0,
                c2: assemblyData['htpC.c2'] || 0,
                c3: assemblyData['htpC.c3'] || 0,
                c4: assemblyData['htpC.c4'] || 0,
                d: assemblyData['htpC.d'] || 0,
              },
              htp_nc: {
                a0: assemblyData['htpNc.a0'] || 0,
                a1a3: assemblyData['htpNc.a1a3'] || 0,
                a4: assemblyData['htpNc.a4'] || 0,
                a5: assemblyData['htpNc.a5'] || 0,
                b1: assemblyData['htpNc.b1'] || 0,
                b2: assemblyData['htpNc.b2'] || 0,
                b3: assemblyData['htpNc.b3'] || 0,
                b4: assemblyData['htpNc.b4'] || 0,
                b5: assemblyData['htpNc.b5'] || 0,
                b6: assemblyData['htpNc.b6'] || 0,
                b7: assemblyData['htpNc.b7'] || 0,
                b8: assemblyData['htpNc.b8'] || 0,
                c1: assemblyData['htpNc.c1'] || 0,
                c2: assemblyData['htpNc.c2'] || 0,
                c3: assemblyData['htpNc.c3'] || 0,
                c4: assemblyData['htpNc.c4'] || 0,
                d: assemblyData['htpNc.d'] || 0,
              },
              sqp: {
                a0: assemblyData['sqp.a0'] || 0,
                a1a3: assemblyData['sqp.a1a3'] || 0,
                a4: assemblyData['sqp.a4'] || 0,
                a5: assemblyData['sqp.a5'] || 0,
                b1: assemblyData['sqp.b1'] || 0,
                b2: assemblyData['sqp.b2'] || 0,
                b3: assemblyData['sqp.b3'] || 0,
                b4: assemblyData['sqp.b4'] || 0,
                b5: assemblyData['sqp.b5'] || 0,
                b6: assemblyData['sqp.b6'] || 0,
                b7: assemblyData['sqp.b7'] || 0,
                b8: assemblyData['sqp.b8'] || 0,
                c1: assemblyData['sqp.c1'] || 0,
                c2: assemblyData['sqp.c2'] || 0,
                c3: assemblyData['sqp.c3'] || 0,
                c4: assemblyData['sqp.c4'] || 0,
                d: assemblyData['sqp.d'] || 0,
              },
              rsf: {
                a0: assemblyData['rsf.a0'] || 0,
                a1a3: assemblyData['rsf.a1a3'] || 0,
                a4: assemblyData['rsf.a4'] || 0,
                a5: assemblyData['rsf.a5'] || 0,
                b1: assemblyData['rsf.b1'] || 0,
                b2: assemblyData['rsf.b2'] || 0,
                b3: assemblyData['rsf.b3'] || 0,
                b4: assemblyData['rsf.b4'] || 0,
                b5: assemblyData['rsf.b5'] || 0,
                b6: assemblyData['rsf.b6'] || 0,
                b7: assemblyData['rsf.b7'] || 0,
                b8: assemblyData['rsf.b8'] || 0,
                c1: assemblyData['rsf.c1'] || 0,
                c2: assemblyData['rsf.c2'] || 0,
                c3: assemblyData['rsf.c3'] || 0,
                c4: assemblyData['rsf.c4'] || 0,
                d: assemblyData['rsf.d'] || 0,
              },
              nrsf: {
                a0: assemblyData['nrsf.a0'] || 0,
                a1a3: assemblyData['nrsf.a1a3'] || 0,
                a4: assemblyData['nrsf.a4'] || 0,
                a5: assemblyData['nrsf.a5'] || 0,
                b1: assemblyData['nrsf.b1'] || 0,
                b2: assemblyData['nrsf.b2'] || 0,
                b3: assemblyData['nrsf.b3'] || 0,
                b4: assemblyData['nrsf.b4'] || 0,
                b5: assemblyData['nrsf.b5'] || 0,
                b6: assemblyData['nrsf.b6'] || 0,
                b7: assemblyData['nrsf.b7'] || 0,
                b8: assemblyData['nrsf.b8'] || 0,
                c1: assemblyData['nrsf.c1'] || 0,
                c2: assemblyData['nrsf.c2'] || 0,
                c3: assemblyData['nrsf.c3'] || 0,
                c4: assemblyData['nrsf.c4'] || 0,
                d: assemblyData['nrsf.d'] || 0,
              },
              fw: {
                a0: assemblyData['fw.a0'] || 0,
                a1a3: assemblyData['fw.a1a3'] || 0,
                a4: assemblyData['fw.a4'] || 0,
                a5: assemblyData['fw.a5'] || 0,
                b1: assemblyData['fw.b1'] || 0,
                b2: assemblyData['fw.b2'] || 0,
                b3: assemblyData['fw.b3'] || 0,
                b4: assemblyData['fw.b4'] || 0,
                b5: assemblyData['fw.b5'] || 0,
                b6: assemblyData['fw.b6'] || 0,
                b7: assemblyData['fw.b7'] || 0,
                b8: assemblyData['fw.b8'] || 0,
                c1: assemblyData['fw.c1'] || 0,
                c2: assemblyData['fw.c2'] || 0,
                c3: assemblyData['fw.c3'] || 0,
                c4: assemblyData['fw.c4'] || 0,
                d: assemblyData['fw.d'] || 0,
              },
              hwd: {
                a0: assemblyData['hwd.a0'] || 0,
                a1a3: assemblyData['hwd.a1a3'] || 0,
                a4: assemblyData['hwd.a4'] || 0,
                a5: assemblyData['hwd.a5'] || 0,
                b1: assemblyData['hwd.b1'] || 0,
                b2: assemblyData['hwd.b2'] || 0,
                b3: assemblyData['hwd.b3'] || 0,
                b4: assemblyData['hwd.b4'] || 0,
                b5: assemblyData['hwd.b5'] || 0,
                b6: assemblyData['hwd.b6'] || 0,
                b7: assemblyData['hwd.b7'] || 0,
                b8: assemblyData['hwd.b8'] || 0,
                c1: assemblyData['hwd.c1'] || 0,
                c2: assemblyData['hwd.c2'] || 0,
                c3: assemblyData['hwd.c3'] || 0,
                c4: assemblyData['hwd.c4'] || 0,
                d: assemblyData['hwd.d'] || 0,
              },
              nhwd: {
                a0: assemblyData['nhwd.a0'] || 0,
                a1a3: assemblyData['nhwd.a1a3'] || 0,
                a4: assemblyData['nhwd.a4'] || 0,
                a5: assemblyData['nhwd.a5'] || 0,
                b1: assemblyData['nhwd.b1'] || 0,
                b2: assemblyData['nhwd.b2'] || 0,
                b3: assemblyData['nhwd.b3'] || 0,
                b4: assemblyData['nhwd.b4'] || 0,
                b5: assemblyData['nhwd.b5'] || 0,
                b6: assemblyData['nhwd.b6'] || 0,
                b7: assemblyData['nhwd.b7'] || 0,
                b8: assemblyData['nhwd.b8'] || 0,
                c1: assemblyData['nhwd.c1'] || 0,
                c2: assemblyData['nhwd.c2'] || 0,
                c3: assemblyData['nhwd.c3'] || 0,
                c4: assemblyData['nhwd.c4'] || 0,
                d: assemblyData['nhwd.d'] || 0,
              },
              rwd: {
                a0: assemblyData['rwd.a0'] || 0,
                a1a3: assemblyData['rwd.a1a3'] || 0,
                a4: assemblyData['rwd.a4'] || 0,
                a5: assemblyData['rwd.a5'] || 0,
                b1: assemblyData['rwd.b1'] || 0,
                b2: assemblyData['rwd.b2'] || 0,
                b3: assemblyData['rwd.b3'] || 0,
                b4: assemblyData['rwd.b4'] || 0,
                b5: assemblyData['rwd.b5'] || 0,
                b6: assemblyData['rwd.b6'] || 0,
                b7: assemblyData['rwd.b7'] || 0,
                b8: assemblyData['rwd.b8'] || 0,
                c1: assemblyData['rwd.c1'] || 0,
                c2: assemblyData['rwd.c2'] || 0,
                c3: assemblyData['rwd.c3'] || 0,
                c4: assemblyData['rwd.c4'] || 0,
                d: assemblyData['rwd.d'] || 0,
              },
              cru: {
                a0: assemblyData['cru.a0'] || 0,
                a1a3: assemblyData['cru.a1a3'] || 0,
                a4: assemblyData['cru.a4'] || 0,
                a5: assemblyData['cru.a5'] || 0,
                b1: assemblyData['cru.b1'] || 0,
                b2: assemblyData['cru.b2'] || 0,
                b3: assemblyData['cru.b3'] || 0,
                b4: assemblyData['cru.b4'] || 0,
                b5: assemblyData['cru.b5'] || 0,
                b6: assemblyData['cru.b6'] || 0,
                b7: assemblyData['cru.b7'] || 0,
                b8: assemblyData['cru.b8'] || 0,
                c1: assemblyData['cru.c1'] || 0,
                c2: assemblyData['cru.c2'] || 0,
                c3: assemblyData['cru.c3'] || 0,
                c4: assemblyData['cru.c4'] || 0,
                d: assemblyData['cru.d'] || 0,
              },
              mrf: {
                a0: assemblyData['mrf.a0'] || 0,
                a1a3: assemblyData['mrf.a1a3'] || 0,
                a4: assemblyData['mrf.a4'] || 0,
                a5: assemblyData['mrf.a5'] || 0,
                b1: assemblyData['mrf.b1'] || 0,
                b2: assemblyData['mrf.b2'] || 0,
                b3: assemblyData['mrf.b3'] || 0,
                b4: assemblyData['mrf.b4'] || 0,
                b5: assemblyData['mrf.b5'] || 0,
                b6: assemblyData['mrf.b6'] || 0,
                b7: assemblyData['mrf.b7'] || 0,
                b8: assemblyData['mrf.b8'] || 0,
                c1: assemblyData['mrf.c1'] || 0,
                c2: assemblyData['mrf.c2'] || 0,
                c3: assemblyData['mrf.c3'] || 0,
                c4: assemblyData['mrf.c4'] || 0,
                d: assemblyData['mrf.d'] || 0,
              },
              mer: {
                a0: assemblyData['mer.a0'] || 0,
                a1a3: assemblyData['mer.a1a3'] || 0,
                a4: assemblyData['mer.a4'] || 0,
                a5: assemblyData['mer.a5'] || 0,
                b1: assemblyData['mer.b1'] || 0,
                b2: assemblyData['mer.b2'] || 0,
                b3: assemblyData['mer.b3'] || 0,
                b4: assemblyData['mer.b4'] || 0,
                b5: assemblyData['mer.b5'] || 0,
                b6: assemblyData['mer.b6'] || 0,
                b7: assemblyData['mer.b7'] || 0,
                b8: assemblyData['mer.b8'] || 0,
                c1: assemblyData['mer.c1'] || 0,
                c2: assemblyData['mer.c2'] || 0,
                c3: assemblyData['mer.c3'] || 0,
                c4: assemblyData['mer.c4'] || 0,
                d: assemblyData['mer.d'] || 0,
              },
              eee: {
                a0: assemblyData['eee.a0'] || 0,
                a1a3: assemblyData['eee.a1a3'] || 0,
                a4: assemblyData['eee.a4'] || 0,
                a5: assemblyData['eee.a5'] || 0,
                b1: assemblyData['eee.b1'] || 0,
                b2: assemblyData['eee.b2'] || 0,
                b3: assemblyData['eee.b3'] || 0,
                b4: assemblyData['eee.b4'] || 0,
                b5: assemblyData['eee.b5'] || 0,
                b6: assemblyData['eee.b6'] || 0,
                b7: assemblyData['eee.b7'] || 0,
                b8: assemblyData['eee.b8'] || 0,
                c1: assemblyData['eee.c1'] || 0,
                c2: assemblyData['eee.c2'] || 0,
                c3: assemblyData['eee.c3'] || 0,
                c4: assemblyData['eee.c4'] || 0,
                d: assemblyData['eee.d'] || 0,
              },
              eet: {
                a0: assemblyData['eet.a0'] || 0,
                a1a3: assemblyData['eet.a1a3'] || 0,
                a4: assemblyData['eet.a4'] || 0,
                a5: assemblyData['eet.a5'] || 0,
                b1: assemblyData['eet.b1'] || 0,
                b2: assemblyData['eet.b2'] || 0,
                b3: assemblyData['eet.b3'] || 0,
                b4: assemblyData['eet.b4'] || 0,
                b5: assemblyData['eet.b5'] || 0,
                b6: assemblyData['eet.b6'] || 0,
                b7: assemblyData['eet.b7'] || 0,
                b8: assemblyData['eet.b8'] || 0,
                c1: assemblyData['eet.c1'] || 0,
                c2: assemblyData['eet.c2'] || 0,
                c3: assemblyData['eet.c3'] || 0,
                c4: assemblyData['eet.c4'] || 0,
                d: assemblyData['eet.d'] || 0,
              },
            },
            type: 'actual',
          },
          quantity: assemblyData['product.quantity'] || 0,
          unit: assemblyData['product.unit'] || '',
          type: 'actual',
          metaData: {
            product_class: String(assemblyData['meta_data.product_class'] || ''),
            strength: String(assemblyData['meta_data.strength'] || 0),
            density: String(assemblyData['meta_data.density'] || 0),
            density_unit: String(assemblyData['meta_data.density_unit'] || ''),
            exposure_classes: String(assemblyData['meta_data.exposure_classes'] || ''),
            concrete_precast: String(assemblyData['meta_data.concrete_precast'] || ''),
            brick_type: String(assemblyData['meta_data.brick_type'] || ''),
            brick_grout_included: String(assemblyData['meta_data.brick_grout_included'] || ''),
            timber_type: String(assemblyData['meta_data.timber_type'] || ''),
            grout_type: String(assemblyData['meta_data.grout_type'] || ''),
          },
        },
      ]

      // Map each assembly with its data and associated products
      return {
        id: uuidv4(),
        name: assemblyData['assembly.name'] || '',
        description: assemblyData['assembly.description'] || '',
        comment: assemblyData['assembly.comment'] || '',
        quantity: assemblyData['assembly.areaType.value'] || 0,
        unit: assemblyData['assembly.areaType.unit'] || '',
        classification: [
          {
            system: projectData['classification_system'] || '',
            code: assemblyData['assembly.classification.code'] || '',
            name: assemblyData['assembly.classification.code'] || '',
          },
        ],
        products: products,
        type: 'actual',
        metaData: {
          volume: String(assemblyData['meta_data.volume'] || 0),
          volumeUnit: String(assemblyData['meta_data.unit'] || ''),
        },
      }
    })
  }

  // Fetching list of assemblies
  const assemblies: InputAssembly[] = getAssemblies(assemblyDataArray)

  // Function to map impact categories
  const mapImpactCategories = (assemblies: InputAssembly[]): ImpactCategoryKey[] => {
    const impactTypes = Object.values(ImpactCategoryKey)
    const stages = [
      'a0',
      'a1a3',
      'a4',
      'a5',
      'b1',
      'b2',
      'b3',
      'b4',
      'b5',
      'b6',
      'b7',
      'b8',
      'c1',
      'c2',
      'c3',
      'c4',
      'd',
    ]

    const usedImpactTypes = new Set<ImpactCategoryKey>()

    for (const assembly of assemblies) {
      for (const product of assembly.products) {
        for (const impactType of impactTypes) {
          const lcaxKey = impactType.toLowerCase()

          for (const stage of stages) {
            const value = product.impactData?.impacts?.[lcaxKey]?.[stage]
            if (value !== null && value !== undefined && value !== '' && Number(value) !== 0) {
              usedImpactTypes.add(impactType)
              break // Exit the stage loop once we find a non-zero value
            }
          }
        }
      }
    }
    return Array.from(usedImpactTypes)
  }

  // Function to map life cycle stages
  const mapLifeCycleStages = (assemblies: InputAssembly[]): LifeCycleStage[] => {
    const stages = Object.values(LifeCycleStage)
    const usedStages = new Set<LifeCycleStage>()

    for (const assembly of assemblies) {
      for (const product of assembly.products) {
        for (const impactType of Object.values(ImpactCategoryKey)) {
          const lcaxKey = impactType.toLowerCase()

          for (const stage of stages) {
            const value = product.impactData?.impacts?.[lcaxKey]?.[stage]
            if (value !== null && value !== undefined && value !== '' && Number(value) !== 0) {
              usedStages.add(stage as LifeCycleStage)
            }
          }
        }
      }
    }

    return usedStages.size > 0 ? Array.from(usedStages) : ['none' as LifeCycleStage]
  }

  const inputProject: InputProject = {
    id: uuidv4(),
    name: projectData['name'] || 'Unknown Project',
    description: projectData['description'] || '',
    comment: projectData['comment'] || '',
    location: {
      address: projectData['address'] || '',
      city: projectData['city'] || '',
      // @ts-expect-error has to be lower case
      country: ((projectData['country'] as string) || '').toLowerCase(),
    },
    owner: projectData['owner'] || 'Unknown Owner',
    formatVersion: process.env.LCAX_VERSION || '',
    lciaMethod: projectData['lcia_method'] || '',
    classificationSystem: projectData['classification_system'] || '',
    referenceStudyPeriod: projectData['reference_study_period'] || 0,
    lifeCycleStages: mapLifeCycleStages(assemblies),
    impactCategories: mapImpactCategories(assemblies),
    assemblies: assemblies,
    results: null,
    projectInfo: {
      type: 'buildingInfo',
      // @ts-expect-error has to be lower case
      buildingType: ((projectData['project_info.building_info.building_type'] as string) || '')
        .toLowerCase()
        .replace(/ /g, '_'),
      // @ts-expect-error has to be lower case
      buildingTypology: [((projectData['project_info.building_info.building_typology'] as string) || '').toLowerCase()],
      certifications: [projectData['certifications'] || 'unknown'],
      buildingMass: {
        value: projectData['project_info.building_info.building_mass.value'] || 0,
        unit: projectData['project_info.building_info.building_mass.unit'] || 'unknown',
      },
      buildingHeight: {
        value: projectData['project_info.building_info.building_height.value'] || 0,
        unit: projectData['project_info.building_info.building_height.unit'] || 'unknown',
      },
      grossFloorArea: {
        value: projectData['gross_floor_area.value'] || 0,
        unit: projectData['gross_floor_area.unit'] || 'unknown',
        definition: '',
      },
      heatedFloorArea: {
        value: projectData['heated_floor_area.value'] || 0,
        unit: projectData['heated_floor_area.unit'] || 'unknown',
        definition: '',
      },
      buildingFootprint: {
        value: projectData['project_info.building_info.building_footprint.value'] || 0,
        unit: projectData['project_info.building_info.building_footprint.unit'] || 'unknown',
      },
      floorsAboveGround: projectData['floors_above_ground'] || 0,
      floorsBelowGround: projectData['floors_below_ground'] || 0,
      roofType: projectData['roof_type'] || '',
      frameType: projectData['frame_type'] || '',
      buildingCompletionYear: projectData['project_info.building_info.building_completion_year'] || 0,
      buildingPermitYear: projectData['building_permit_year'] || 0,
      energyDemandHeating: projectData['energy_demand_heating'] || 0,
      energySupplyHeating: projectData['energy_supply_heating'] || 0,
      energyDemandElectricity: projectData['energy_demand_electricity'] || 0,
      energySupplyElectricity: projectData['energy_supply_electricity'] || 0,
      exportedElectricity: projectData['exported_electricity'] || 0,
      generalEnergyClass: projectData['general_energy_class'] || '',
      localEnergyClass: projectData['local_energy_class'] || '',
      buildingUsers: projectData['building_users'] || '',
      buildingModelScope: [projectData['project_info.building_info.building_model_scope'] || ''],
    },
    projectPhase: projectData['project_phase'] || '',
    softwareInfo: {
      lcaSoftware: projectData['lca_software'] || '',
    },
    metaData: {
      projectClassificationSystem: String(projectData['meta_data.project_classification_system'] || ''),
      image: String(projectData['meta_data.image'] || ''),
      climateZone: String(projectData['meta_data.climate_zone'] || ''),
      // owner: {
      //   contact: String(projectData['meta_data.owner.contact'] || ''),
      //   webDomain: String(projectData['meta_data.owner.web'] || ''),
      //   location: String(projectData['meta_data.owner.location'] || ''),
      //   country: String(projectData['meta_data.owner.country'] || ''),
      //   email: String(projectData['meta_data.owner.email'] || ''),
      //   phone: String(projectData['meta_data.owner.phone'] || ''),
      //   type: String(projectData['meta_data.owner.type'] || ''),
      //   representative: String(projectData['meta_data.owner.representative'] || ''),
      // },
      nameOfAssessor: String(projectData['meta_data.assessment_assessor_name'] || ''),
      emailOfAssessor: String(projectData['meta_data.assessment_assessor_email'] || ''),
      assessorOrganization: String(projectData['meta_data.assessment_assessor_organization'] || ''),
      dataReportedYear: String(projectData['meta_data.assessment_year'] || 0),
      dateOfAssessment: String(projectData['meta_data.assessment_date'] || ''),
      purposeOfAssessment: String(projectData['meta_data.purpose_of_assessment'] || ''),
      isCompliantISO21931: String(projectData['meta_data.assessment_21931_compliance'] || false),
      isCompliantEN15978: String(projectData['meta_data.assessment_15978_compliance'] || false),
      isCompliantRICS2017: String(projectData['meta_data.assessment_rics_2017_compliance'] || false),
      isCompliantRICS2023: String(projectData['meta_data.assessment_rics_2023_compliance'] || true),
      isCompliantASHRAE240P: String(projectData['meta_data.assessment_ashrae_240p_compliance'] || true),
      thirdPartyVerified: String(projectData['meta_data.assessment_verified'] || false),
      verifierInfo: String(projectData['meta_data.assessment_verified_info'] || ''),
      validityPeriodYears: String(projectData['meta_data.assessment_validity_period'] || 0),
      uncertaintyPercentage: String(projectData['meta_data.assessment_ec_uncertainty'] || false),
      lcaSoftwareVersion: String(projectData['meta_data.lca_software_version'] || ''),
      newlyBuiltArea: String(projectData['meta_data.newly_built_area.value'] || 0),
      retrofittedArea: String(projectData['meta_data.retrofitted_area.value'] || 0),
      demolishedArea: String(projectData['meta_data.demolished_area.value'] || 0),
      existingArea: String(projectData['meta_data.existing_area.value'] || 0),
      detailedConstructionType: String(projectData['meta_data.building_project_construction_type_2'] || ''),
      infrastructureConstructionType: String(projectData['meta_data.infrastructure_project_construction_type'] || ''),
      infrastructureSectorType: String(projectData['meta_data.infrastructure_sector_type'] || ''),
      buildingUseType: String(projectData['meta_data.building_use_type'] || ''),
      infrastructureUseType: String(projectData['meta_data.infrastructure_use_type'] || ''),
      projectWorkAreaM2: String(projectData['meta_data.project_work_area_m2'] || 0),
      projectSiteAreaM2: String(projectData['meta_data.project_site_area_m2'] || 0),
      conditionedFloorAreaM2: String(projectData['meta_data.conditioned_floor_area_m2'] || 0),
      unconditionedFloorAreaM2: String(projectData['meta_data.unconditioned_floor_area_m2'] || 0),
      enclosedParkingAreaM2: String(projectData['meta_data.enclosed_parking_area_m2'] || 0),
      detachedParkingAreaM2: String(projectData['meta_data.detached_parking_area_m2'] || 0),
      ibcConstructionType: String(projectData['meta_data.ibc_construction_type'] || ''),
      projectSurroundings: String(projectData['meta_data.project_surroundings'] || ''),
      projectHistoric: String(projectData['meta_data.project_historic'] || ''),
      occupantLoad: String(projectData['meta_data.occupant_load'] || 0),
      meanRoofHeight: String(projectData['meta_data.mean_roof_height'] || 0),
      windowWallRatio: String(projectData['meta_data.window_wall_ratio'] || 0),
      thermalEnvelopeArea: String(projectData['meta_data.thermal_envelope_area'] || 0),
      residentialUnits: String(projectData['meta_data.residential_units'] || 0),
      expectedBuildingLifeYears: String(projectData['meta_data.project_expected_life'] || 0),
      resultsValidatedAsBuilt: String(projectData['meta_data.results_validated_as_built'] || false),
      resultsValidatedAsBuiltDescription: String(projectData['meta_data.results_validated_as_built_description'] || ''),
      assessmentCutoffMethod: String(projectData['meta_data.assessment_cutoff_type'] || ''),
      materialsPercentageAssessmentMass: String(projectData['meta_data.assessment_cutoff'] || 0),
      materialsCostAssessment95: String(projectData['meta_data.assessment_cost_cutoff'] || false),
      heritageStatus: String(projectData['meta_data.heritage_status'] || ''),
      energyModelingTool: String(projectData['meta_data.project_tool_energy_modeling'] || ''),
      energyModelingToolVersion: String(projectData['meta_data.project_tool_energy_modeling_version'] || ''),
      architectOfRecord: String(projectData['meta_data.architect_of_record'] || ''),
      projectUserStudio: String(projectData['meta_data.project_user_studio'] || ''),
      generalContractor: String(projectData['meta_data.general_contractor'] || ''),
      mepEngineer: String(projectData['meta_data.mep_engineer'] || ''),
      sustainabilityConsultant: String(projectData['meta_data.sustainability_consultant'] || ''),
      structuralEngineer: String(projectData['meta_data.structural_engineer'] || ''),
      civilEngineer: String(projectData['meta_data.civil_engineer'] || ''),
      landscapeConsultant: String(projectData['meta_data.landscape_consultant'] || ''),
      interiorDesigner: String(projectData['meta_data.interior_designer'] || ''),
      otherProjectTeamMember: String(projectData['meta_data.other_project_team'] || ''),
      workCompletionYear: String(projectData['meta_data.work_completion_year'] || ''),
      buildingPermitYear: String(projectData['building_permit_year'] || ''),
      constructionStart: String(projectData['meta_data.construction_start'] || ''),
      constructionYearExistingBuilding: String(projectData['meta_data.construction_year_existing_building'] || ''),
      buildingOccupancyStart: String(projectData['meta_data.building_occupancy_start'] || ''),
      designCompletion: String(projectData['meta_data.design_completion'] || ''),
      projectTotalCostCurrency: String(projectData['meta_data.project_total_cost_currency'] || ''),
      projectTotalCost: String(projectData['meta_data.project_total_cost'] || ''),
      projectHardCost: String(projectData['meta_data.project_hard_cost'] || ''),
      projectSoftCost: String(projectData['meta_data.project_soft_cost'] || ''),
      projectSiteworksCost: String(projectData['meta_data.project_siteworks_cost'] || ''),
      projectCostSource: String(projectData['meta_data.project_cost_source'] || ''),
      systemColumnGridLong: String(projectData['meta_data.system_column_grid_long'] || ''),
      systemRiskCategory: String(projectData['meta_data.system_risk_category'] || ''),
      systemLiveLoad: String(projectData['meta_data.system_live_load'] || ''),
      systemSnowLoad: String(projectData['meta_data.system_snow_load'] || ''),
      systemWindSpeed: String(projectData['meta_data.system_wind_speed'] || ''),
      systemSeismicDesignCategory: String(projectData['meta_data.system_seismic_design_category'] || ''),
      systemHorizontalGravitySystem: String(projectData['meta_data.system_horizontal_gravity_system'] || ''),
      systemVerticalGravitySystem: String(projectData['meta_data.system_vertical_gravity_system'] || ''),
      systemLateralSystem: String(projectData['meta_data.system_lateral_system'] || ''),
      systemPodium: String(projectData['meta_data.system_podium'] || ''),
      allowableSoilBearingPressurePSF: String(
        projectData['meta_data.system_allowable_soil_bearing_pressure_psf'] || '',
      ),
      systemFoundationType: String(projectData['meta_data.system_foundation_type'] || ''),
      secondaryHorizontalGravitySystem: String(projectData['meta_data.secondary_horizontal_gravity_system'] || ''),
      secondaryVerticalGravitySystem: String(projectData['meta_data.secondary_vertical_gravity_system'] || ''),
    },
  }

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
  project = calculateProject(project)

  return parseLcaxToContribution([project])
}

export const parseSLiCEtoContribution = (uint8Array: Uint8Array): InputContribution[] => {
  const projects = convertSLiCE(uint8Array)

  return parseLcaxToContribution(projects)
}

export const parseLcaxToContribution = (projects: Project[]): InputContribution[] =>
  projects.map((project) => {
    const assemblies = Object.values(project.assemblies).map((assembly) => {
      // @ts-expect-error products is in type
      const products = Object.values(assembly.products) as InputProduct[]
      return { ...assembly, products }
    }) as InputAssembly[]
    return { project: { ...project, assemblies } as InputProject }
  })
