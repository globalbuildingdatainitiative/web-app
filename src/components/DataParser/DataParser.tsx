/*
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

type RequiredInputProject = Omit<InputProject, 'id'> & { id: string }

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

  // Create a new type that extends the InputProject and make id required

  const inputProject: RequiredInputProject = {
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
  // @ts-expect-error Ignoring type mismatch for calculateProject
  project = calculateProject(project)

  // @ts-expect-error Ignoring type mismatch for calculateProject
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
*/

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

type RequiredInputProject = Omit<InputProject, 'id'> & { id: string }

// Function to group assemblies and map them to JSON
export const mapAssembliesToJson = (sheetData: (string | number)[][]) => {
  const headers = sheetData[0]
  const lcaxIndex = headers.indexOf('openBDF')
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
  const lcaxIndex = headers.indexOf('openBDF')
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
            declaredUnit: assemblyData['epd.declared_unit'] || '',
            version: '',
            publishedDate: new Date().toISOString().split('T')[0],
            validUntil: new Date().toISOString().split('T')[0],
            formatVersion: process.env.LCAX_VERSION || '',
            source: assemblyData['epd.source.name'] || '',
            // @ts-expect-error ignore error
            standard: ((assemblyData['epd.standard'] as string) || '').toLowerCase(),
            // @ts-expect-error ignore error
            location: ((projectData['location.country'] as string) || '').toLowerCase(),
            impacts: {
              gwp: {
                a0: assemblyData['epd.impacts.gwp.a0'] || 0,
                a1a3: assemblyData['epd.impacts.gwp.a1a3'] || 0,
                a4: assemblyData['epd.impacts.gwp.a4'] || 0,
                a5: assemblyData['epd.impacts.gwp.a5'] || 0,
                b1: assemblyData['epd.impacts.gwp.b1'] || 0,
                b2: assemblyData['epd.impacts.gwp.b2'] || 0,
                b3: assemblyData['epd.impacts.gwp.b3'] || 0,
                b4: assemblyData['epd.impacts.gwp.b4'] || 0,
                b5: assemblyData['epd.impacts.gwp.b5'] || 0,
                b6: assemblyData['epd.impacts.gwp.b6'] || 0,
                b7: assemblyData['epd.impacts.gwp.b7'] || 0,
                b8: assemblyData['epd.impacts.gwp.b8'] || 0,
                c1: assemblyData['epd.impacts.gwp.c1'] || 0,
                c2: assemblyData['epd.impacts.gwp.c2'] || 0,
                c3: assemblyData['epd.impacts.gwp.c3'] || 0,
                c4: assemblyData['epd.impacts.gwp.c4'] || 0,
                d: assemblyData['epd.impacts.gwp.d'] || 0,
              },
              gwp_fos: {
                a0: assemblyData['epd.impacts.gwp_fos.a0'] || 0,
                a1a3: assemblyData['epd.impacts.gwp_fos.a1a3'] || 0,
                a4: assemblyData['epd.impacts.gwp_fos.a4'] || 0,
                a5: assemblyData['epd.impacts.gwp_fos.a5'] || 0,
                b1: assemblyData['epd.impacts.gwp_fos.b1'] || 0,
                b2: assemblyData['epd.impacts.gwp_fos.b2'] || 0,
                b3: assemblyData['epd.impacts.gwp_fos.b3'] || 0,
                b4: assemblyData['epd.impacts.gwp_fos.b4'] || 0,
                b5: assemblyData['epd.impacts.gwp_fos.b5'] || 0,
                b6: assemblyData['epd.impacts.gwp_fos.b6'] || 0,
                b7: assemblyData['epd.impacts.gwp_fos.b7'] || 0,
                b8: assemblyData['epd.impacts.gwp_fos.b8'] || 0,
                c1: assemblyData['epd.impacts.gwp_fos.c1'] || 0,
                c2: assemblyData['epd.impacts.gwp_fos.c2'] || 0,
                c3: assemblyData['epd.impacts.gwp_fos.c3'] || 0,
                c4: assemblyData['epd.impacts.gwp_fos.c4'] || 0,
                d: assemblyData['epd.impacts.gwp_fos.d'] || 0,
              },
              gwp_bio: {
                a0: assemblyData['epd.impacts.gwp_bio.a0'] || 0,
                a1a3: assemblyData['epd.impacts.gwp_bio.a1a3'] || 0,
                a4: assemblyData['epd.impacts.gwp_bio.a4'] || 0,
                a5: assemblyData['epd.impacts.gwp_bio.a5'] || 0,
                b1: assemblyData['epd.impacts.gwp_bio.b1'] || 0,
                b2: assemblyData['epd.impacts.gwp_bio.b2'] || 0,
                b3: assemblyData['epd.impacts.gwp_bio.b3'] || 0,
                b4: assemblyData['epd.impacts.gwp_bio.b4'] || 0,
                b5: assemblyData['epd.impacts.gwp_bio.b5'] || 0,
                b6: assemblyData['epd.impacts.gwp_bio.b6'] || 0,
                b7: assemblyData['epd.impacts.gwp_bio.b7'] || 0,
                b8: assemblyData['epd.impacts.gwp_bio.b8'] || 0,
                c1: assemblyData['epd.impacts.gwp_bio.c1'] || 0,
                c2: assemblyData['epd.impacts.gwp_bio.c2'] || 0,
                c3: assemblyData['epd.impacts.gwp_bio.c3'] || 0,
                c4: assemblyData['epd.impacts.gwp_bio.c4'] || 0,
                d: assemblyData['epd.impacts.gwp_bio.d'] || 0,
              },
              gwp_lul: {
                a0: assemblyData['epd.impacts.gwp_lul.a0'] || 0,
                a1a3: assemblyData['epd.impacts.gwp_lul.a1a3'] || 0,
                a4: assemblyData['epd.impacts.gwp_lul.a4'] || 0,
                a5: assemblyData['epd.impacts.gwp_lul.a5'] || 0,
                b1: assemblyData['epd.impacts.gwp_lul.b1'] || 0,
                b2: assemblyData['epd.impacts.gwp_lul.b2'] || 0,
                b3: assemblyData['epd.impacts.gwp_lul.b3'] || 0,
                b4: assemblyData['epd.impacts.gwp_lul.b4'] || 0,
                b5: assemblyData['epd.impacts.gwp_lul.b5'] || 0,
                b6: assemblyData['epd.impacts.gwp_lul.b6'] || 0,
                b7: assemblyData['epd.impacts.gwp_lul.b7'] || 0,
                b8: assemblyData['epd.impacts.gwp_lul.b8'] || 0,
                c1: assemblyData['epd.impacts.gwp_lul.c1'] || 0,
                c2: assemblyData['epd.impacts.gwp_lul.c2'] || 0,
                c3: assemblyData['epd.impacts.gwp_lul.c3'] || 0,
                c4: assemblyData['epd.impacts.gwp_lul.c4'] || 0,
                d: assemblyData['epd.impacts.gwp_lul.d'] || 0,
              },
              odp: {
                a0: assemblyData['epd.impacts.odp.a0'] || 0,
                a1a3: assemblyData['epd.impacts.odp.a1a3'] || 0,
                a4: assemblyData['epd.impacts.odp.a4'] || 0,
                a5: assemblyData['epd.impacts.odp.a5'] || 0,
                b1: assemblyData['epd.impacts.odp.b1'] || 0,
                b2: assemblyData['epd.impacts.odp.b2'] || 0,
                b3: assemblyData['epd.impacts.odp.b3'] || 0,
                b4: assemblyData['epd.impacts.odp.b4'] || 0,
                b5: assemblyData['epd.impacts.odp.b5'] || 0,
                b6: assemblyData['epd.impacts.odp.b6'] || 0,
                b7: assemblyData['epd.impacts.odp.b7'] || 0,
                b8: assemblyData['epd.impacts.odp.b8'] || 0,
                c1: assemblyData['epd.impacts.odp.c1'] || 0,
                c2: assemblyData['epd.impacts.odp.c2'] || 0,
                c3: assemblyData['epd.impacts.odp.c3'] || 0,
                c4: assemblyData['epd.impacts.odp.c4'] || 0,
                d: assemblyData['epd.impacts.odp.d'] || 0,
              },
              ap: {
                a0: assemblyData['epd.impacts.ap.a0'] || 0,
                a1a3: assemblyData['epd.impacts.ap.a1a3'] || 0,
                a4: assemblyData['epd.impacts.ap.a4'] || 0,
                a5: assemblyData['epd.impacts.ap.a5'] || 0,
                b1: assemblyData['epd.impacts.ap.b1'] || 0,
                b2: assemblyData['epd.impacts.ap.b2'] || 0,
                b3: assemblyData['epd.impacts.ap.b3'] || 0,
                b4: assemblyData['epd.impacts.ap.b4'] || 0,
                b5: assemblyData['epd.impacts.ap.b5'] || 0,
                b6: assemblyData['epd.impacts.ap.b6'] || 0,
                b7: assemblyData['epd.impacts.ap.b7'] || 0,
                b8: assemblyData['epd.impacts.ap.b8'] || 0,
                c1: assemblyData['epd.impacts.ap.c1'] || 0,
                c2: assemblyData['epd.impacts.ap.c2'] || 0,
                c3: assemblyData['epd.impacts.ap.c3'] || 0,
                c4: assemblyData['epd.impacts.ap.c4'] || 0,
                d: assemblyData['epd.impacts.ap.d'] || 0,
              },
              ep: {
                a0: assemblyData['epd.impacts.ep.a0'] || 0,
                a1a3: assemblyData['epd.impacts.ep.a1a3'] || 0,
                a4: assemblyData['epd.impacts.ep.a4'] || 0,
                a5: assemblyData['epd.impacts.ep.a5'] || 0,
                b1: assemblyData['epd.impacts.ep.b1'] || 0,
                b2: assemblyData['epd.impacts.ep.b2'] || 0,
                b3: assemblyData['epd.impacts.ep.b3'] || 0,
                b4: assemblyData['epd.impacts.ep.b4'] || 0,
                b5: assemblyData['epd.impacts.ep.b5'] || 0,
                b6: assemblyData['epd.impacts.ep.b6'] || 0,
                b7: assemblyData['epd.impacts.ep.b7'] || 0,
                b8: assemblyData['epd.impacts.ep.b8'] || 0,
                c1: assemblyData['epd.impacts.ep.c1'] || 0,
                c2: assemblyData['epd.impacts.ep.c2'] || 0,
                c3: assemblyData['epd.impacts.ep.c3'] || 0,
                c4: assemblyData['epd.impacts.ep.c4'] || 0,
                d: assemblyData['epd.impacts.ep.d'] || 0,
              },
              ep_fw: {
                a0: assemblyData['epd.impacts.ep_fw.a0'] || 0,
                a1a3: assemblyData['epd.impacts.ep_fw.a1a3'] || 0,
                a4: assemblyData['epd.impacts.ep_fw.a4'] || 0,
                a5: assemblyData['epd.impacts.ep_fw.a5'] || 0,
                b1: assemblyData['epd.impacts.ep_fw.b1'] || 0,
                b2: assemblyData['epd.impacts.ep_fw.b2'] || 0,
                b3: assemblyData['epd.impacts.ep_fw.b3'] || 0,
                b4: assemblyData['epd.impacts.ep_fw.b4'] || 0,
                b5: assemblyData['epd.impacts.ep_fw.b5'] || 0,
                b6: assemblyData['epd.impacts.ep_fw.b6'] || 0,
                b7: assemblyData['epd.impacts.ep_fw.b7'] || 0,
                b8: assemblyData['epd.impacts.ep_fw.b8'] || 0,
                c1: assemblyData['epd.impacts.ep_fw.c1'] || 0,
                c2: assemblyData['epd.impacts.ep_fw.c2'] || 0,
                c3: assemblyData['epd.impacts.ep_fw.c3'] || 0,
                c4: assemblyData['epd.impacts.ep_fw.c4'] || 0,
                d: assemblyData['epd.impacts.ep_fw.d'] || 0,
              },
              ep_mar: {
                a0: assemblyData['epd.impacts.ep_mar.a0'] || 0,
                a1a3: assemblyData['epd.impacts.ep_mar.a1a3'] || 0,
                a4: assemblyData['epd.impacts.ep_mar.a4'] || 0,
                a5: assemblyData['epd.impacts.ep_mar.a5'] || 0,
                b1: assemblyData['epd.impacts.ep_mar.b1'] || 0,
                b2: assemblyData['epd.impacts.ep_mar.b2'] || 0,
                b3: assemblyData['epd.impacts.ep_mar.b3'] || 0,
                b4: assemblyData['epd.impacts.ep_mar.b4'] || 0,
                b5: assemblyData['epd.impacts.ep_mar.b5'] || 0,
                b6: assemblyData['epd.impacts.ep_mar.b6'] || 0,
                b7: assemblyData['epd.impacts.ep_mar.b7'] || 0,
                b8: assemblyData['epd.impacts.ep_mar.b8'] || 0,
                c1: assemblyData['epd.impacts.ep_mar.c1'] || 0,
                c2: assemblyData['epd.impacts.ep_mar.c2'] || 0,
                c3: assemblyData['epd.impacts.ep_mar.c3'] || 0,
                c4: assemblyData['epd.impacts.ep_mar.c4'] || 0,
                d: assemblyData['epd.impacts.ep_mar.d'] || 0,
              },
              ep_ter: {
                a0: assemblyData['epd.impacts.ep_ter.a0'] || 0,
                a1a3: assemblyData['epd.impacts.ep_ter.a1a3'] || 0,
                a4: assemblyData['epd.impacts.ep_ter.a4'] || 0,
                a5: assemblyData['epd.impacts.ep_ter.a5'] || 0,
                b1: assemblyData['epd.impacts.ep_ter.b1'] || 0,
                b2: assemblyData['epd.impacts.ep_ter.b2'] || 0,
                b3: assemblyData['epd.impacts.ep_ter.b3'] || 0,
                b4: assemblyData['epd.impacts.ep_ter.b4'] || 0,
                b5: assemblyData['epd.impacts.ep_ter.b5'] || 0,
                b6: assemblyData['epd.impacts.ep_ter.b6'] || 0,
                b7: assemblyData['epd.impacts.ep_ter.b7'] || 0,
                b8: assemblyData['epd.impacts.ep_ter.b8'] || 0,
                c1: assemblyData['epd.impacts.ep_ter.c1'] || 0,
                c2: assemblyData['epd.impacts.ep_ter.c2'] || 0,
                c3: assemblyData['epd.impacts.ep_ter.c3'] || 0,
                c4: assemblyData['epd.impacts.ep_ter.c4'] || 0,
                d: assemblyData['epd.impacts.ep_ter.d'] || 0,
              },
              pocp: {
                a0: assemblyData['epd.impacts.pocp.a0'] || 0,
                a1a3: assemblyData['epd.impacts.pocp.a1a3'] || 0,
                a4: assemblyData['epd.impacts.pocp.a4'] || 0,
                a5: assemblyData['epd.impacts.pocp.a5'] || 0,
                b1: assemblyData['epd.impacts.pocp.b1'] || 0,
                b2: assemblyData['epd.impacts.pocp.b2'] || 0,
                b3: assemblyData['epd.impacts.pocp.b3'] || 0,
                b4: assemblyData['epd.impacts.pocp.b4'] || 0,
                b5: assemblyData['epd.impacts.pocp.b5'] || 0,
                b6: assemblyData['epd.impacts.pocp.b6'] || 0,
                b7: assemblyData['epd.impacts.pocp.b7'] || 0,
                b8: assemblyData['epd.impacts.pocp.b8'] || 0,
                c1: assemblyData['epd.impacts.pocp.c1'] || 0,
                c2: assemblyData['epd.impacts.pocp.c2'] || 0,
                c3: assemblyData['epd.impacts.pocp.c3'] || 0,
                c4: assemblyData['epd.impacts.pocp.c4'] || 0,
                d: assemblyData['epd.impacts.pocp.d'] || 0,
              },
              adpe: {
                a0: assemblyData['epd.impacts.adpe.a0'] || 0,
                a1a3: assemblyData['epd.impacts.adpe.a1a3'] || 0,
                a4: assemblyData['epd.impacts.adpe.a4'] || 0,
                a5: assemblyData['epd.impacts.adpe.a5'] || 0,
                b1: assemblyData['epd.impacts.adpe.b1'] || 0,
                b2: assemblyData['epd.impacts.adpe.b2'] || 0,
                b3: assemblyData['epd.impacts.adpe.b3'] || 0,
                b4: assemblyData['epd.impacts.adpe.b4'] || 0,
                b5: assemblyData['epd.impacts.adpe.b5'] || 0,
                b6: assemblyData['epd.impacts.adpe.b6'] || 0,
                b7: assemblyData['epd.impacts.adpe.b7'] || 0,
                b8: assemblyData['epd.impacts.adpe.b8'] || 0,
                c1: assemblyData['epd.impacts.adpe.c1'] || 0,
                c2: assemblyData['epd.impacts.adpe.c2'] || 0,
                c3: assemblyData['epd.impacts.adpe.c3'] || 0,
                c4: assemblyData['epd.impacts.adpe.c4'] || 0,
                d: assemblyData['epd.impacts.adpe.d'] || 0,
              },
              adpf: {
                a0: assemblyData['epd.impacts.adpf.a0'] || 0,
                a1a3: assemblyData['epd.impacts.adpf.a1a3'] || 0,
                a4: assemblyData['epd.impacts.adpf.a4'] || 0,
                a5: assemblyData['epd.impacts.adpf.a5'] || 0,
                b1: assemblyData['epd.impacts.adpf.b1'] || 0,
                b2: assemblyData['epd.impacts.adpf.b2'] || 0,
                b3: assemblyData['epd.impacts.adpf.b3'] || 0,
                b4: assemblyData['epd.impacts.adpf.b4'] || 0,
                b5: assemblyData['epd.impacts.adpf.b5'] || 0,
                b6: assemblyData['epd.impacts.adpf.b6'] || 0,
                b7: assemblyData['epd.impacts.adpf.b7'] || 0,
                b8: assemblyData['epd.impacts.adpf.b8'] || 0,
                c1: assemblyData['epd.impacts.adpf.c1'] || 0,
                c2: assemblyData['epd.impacts.adpf.c2'] || 0,
                c3: assemblyData['epd.impacts.adpf.c3'] || 0,
                c4: assemblyData['epd.impacts.adpf.c4'] || 0,
                d: assemblyData['epd.impacts.adpf.d'] || 0,
              },
              penre: {
                a0: assemblyData['epd.impacts.penre.a0'] || 0,
                a1a3: assemblyData['epd.impacts.penre.a1a3'] || 0,
                a4: assemblyData['epd.impacts.penre.a4'] || 0,
                a5: assemblyData['epd.impacts.penre.a5'] || 0,
                b1: assemblyData['epd.impacts.penre.b1'] || 0,
                b2: assemblyData['epd.impacts.penre.b2'] || 0,
                b3: assemblyData['epd.impacts.penre.b3'] || 0,
                b4: assemblyData['epd.impacts.penre.b4'] || 0,
                b5: assemblyData['epd.impacts.penre.b5'] || 0,
                b6: assemblyData['epd.impacts.penre.b6'] || 0,
                b7: assemblyData['epd.impacts.penre.b7'] || 0,
                b8: assemblyData['epd.impacts.penre.b8'] || 0,
                c1: assemblyData['epd.impacts.penre.c1'] || 0,
                c2: assemblyData['epd.impacts.penre.c2'] || 0,
                c3: assemblyData['epd.impacts.penre.c3'] || 0,
                c4: assemblyData['epd.impacts.penre.c4'] || 0,
                d: assemblyData['epd.impacts.penre.d'] || 0,
              },
              pere: {
                a0: assemblyData['epd.impacts.pere.a0'] || 0,
                a1a3: assemblyData['epd.impacts.pere.a1a3'] || 0,
                a4: assemblyData['epd.impacts.pere.a4'] || 0,
                a5: assemblyData['epd.impacts.pere.a5'] || 0,
                b1: assemblyData['epd.impacts.pere.b1'] || 0,
                b2: assemblyData['epd.impacts.pere.b2'] || 0,
                b3: assemblyData['epd.impacts.pere.b3'] || 0,
                b4: assemblyData['epd.impacts.pere.b4'] || 0,
                b5: assemblyData['epd.impacts.pere.b5'] || 0,
                b6: assemblyData['epd.impacts.pere.b6'] || 0,
                b7: assemblyData['epd.impacts.pere.b7'] || 0,
                b8: assemblyData['epd.impacts.pere.b8'] || 0,
                c1: assemblyData['epd.impacts.pere.c1'] || 0,
                c2: assemblyData['epd.impacts.pere.c2'] || 0,
                c3: assemblyData['epd.impacts.pere.c3'] || 0,
                c4: assemblyData['epd.impacts.pere.c4'] || 0,
                d: assemblyData['epd.impacts.pere.d'] || 0,
              },
              perm: {
                a0: assemblyData['epd.impacts.perm.a0'] || 0,
                a1a3: assemblyData['epd.impacts.perm.a1a3'] || 0,
                a4: assemblyData['epd.impacts.perm.a4'] || 0,
                a5: assemblyData['epd.impacts.perm.a5'] || 0,
                b1: assemblyData['epd.impacts.perm.b1'] || 0,
                b2: assemblyData['epd.impacts.perm.b2'] || 0,
                b3: assemblyData['epd.impacts.perm.b3'] || 0,
                b4: assemblyData['epd.impacts.perm.b4'] || 0,
                b5: assemblyData['epd.impacts.perm.b5'] || 0,
                b6: assemblyData['epd.impacts.perm.b6'] || 0,
                b7: assemblyData['epd.impacts.perm.b7'] || 0,
                b8: assemblyData['epd.impacts.perm.b8'] || 0,
                c1: assemblyData['epd.impacts.perm.c1'] || 0,
                c2: assemblyData['epd.impacts.perm.c2'] || 0,
                c3: assemblyData['epd.impacts.perm.c3'] || 0,
                c4: assemblyData['epd.impacts.perm.c4'] || 0,
                d: assemblyData['epd.impacts.perm.d'] || 0,
              },
              pert: {
                a0: assemblyData['epd.impacts.pert.a0'] || 0,
                a1a3: assemblyData['epd.impacts.pert.a1a3'] || 0,
                a4: assemblyData['epd.impacts.pert.a4'] || 0,
                a5: assemblyData['epd.impacts.pert.a5'] || 0,
                b1: assemblyData['epd.impacts.pert.b1'] || 0,
                b2: assemblyData['epd.impacts.pert.b2'] || 0,
                b3: assemblyData['epd.impacts.pert.b3'] || 0,
                b4: assemblyData['epd.impacts.pert.b4'] || 0,
                b5: assemblyData['epd.impacts.pert.b5'] || 0,
                b6: assemblyData['epd.impacts.pert.b6'] || 0,
                b7: assemblyData['epd.impacts.pert.b7'] || 0,
                b8: assemblyData['epd.impacts.pert.b8'] || 0,
                c1: assemblyData['epd.impacts.pert.c1'] || 0,
                c2: assemblyData['epd.impacts.pert.c2'] || 0,
                c3: assemblyData['epd.impacts.pert.c3'] || 0,
                c4: assemblyData['epd.impacts.pert.c4'] || 0,
                d: assemblyData['epd.impacts.pert.d'] || 0,
              },
              penrt: {
                a0: assemblyData['epd.impacts.penrt.a0'] || 0,
                a1a3: assemblyData['epd.impacts.penrt.a1a3'] || 0,
                a4: assemblyData['epd.impacts.penrt.a4'] || 0,
                a5: assemblyData['epd.impacts.penrt.a5'] || 0,
                b1: assemblyData['epd.impacts.penrt.b1'] || 0,
                b2: assemblyData['epd.impacts.penrt.b2'] || 0,
                b3: assemblyData['epd.impacts.penrt.b3'] || 0,
                b4: assemblyData['epd.impacts.penrt.b4'] || 0,
                b5: assemblyData['epd.impacts.penrt.b5'] || 0,
                b6: assemblyData['epd.impacts.penrt.b6'] || 0,
                b7: assemblyData['epd.impacts.penrt.b7'] || 0,
                b8: assemblyData['epd.impacts.penrt.b8'] || 0,
                c1: assemblyData['epd.impacts.penrt.c1'] || 0,
                c2: assemblyData['epd.impacts.penrt.c2'] || 0,
                c3: assemblyData['epd.impacts.penrt.c3'] || 0,
                c4: assemblyData['epd.impacts.penrt.c4'] || 0,
                d: assemblyData['epd.impacts.penrt.d'] || 0,
              },
              penrm: {
                a0: assemblyData['epd.impacts.penrm.a0'] || 0,
                a1a3: assemblyData['epd.impacts.penrm.a1a3'] || 0,
                a4: assemblyData['epd.impacts.penrm.a4'] || 0,
                a5: assemblyData['epd.impacts.penrm.a5'] || 0,
                b1: assemblyData['epd.impacts.penrm.b1'] || 0,
                b2: assemblyData['epd.impacts.penrm.b2'] || 0,
                b3: assemblyData['epd.impacts.penrm.b3'] || 0,
                b4: assemblyData['epd.impacts.penrm.b4'] || 0,
                b5: assemblyData['epd.impacts.penrm.b5'] || 0,
                b6: assemblyData['epd.impacts.penrm.b6'] || 0,
                b7: assemblyData['epd.impacts.penrm.b7'] || 0,
                b8: assemblyData['epd.impacts.penrm.b8'] || 0,
                c1: assemblyData['epd.impacts.penrm.c1'] || 0,
                c2: assemblyData['epd.impacts.penrm.c2'] || 0,
                c3: assemblyData['epd.impacts.penrm.c3'] || 0,
                c4: assemblyData['epd.impacts.penrm.c4'] || 0,
                d: assemblyData['epd.impacts.penrm.d'] || 0,
              },
              sm: {
                a0: assemblyData['epd.impacts.sm.a0'] || 0,
                a1a3: assemblyData['epd.impacts.sm.a1a3'] || 0,
                a4: assemblyData['epd.impacts.sm.a4'] || 0,
                a5: assemblyData['epd.impacts.sm.a5'] || 0,
                b1: assemblyData['epd.impacts.sm.b1'] || 0,
                b2: assemblyData['epd.impacts.sm.b2'] || 0,
                b3: assemblyData['epd.impacts.sm.b3'] || 0,
                b4: assemblyData['epd.impacts.sm.b4'] || 0,
                b5: assemblyData['epd.impacts.sm.b5'] || 0,
                b6: assemblyData['epd.impacts.sm.b6'] || 0,
                b7: assemblyData['epd.impacts.sm.b7'] || 0,
                b8: assemblyData['epd.impacts.sm.b8'] || 0,
                c1: assemblyData['epd.impacts.sm.c1'] || 0,
                c2: assemblyData['epd.impacts.sm.c2'] || 0,
                c3: assemblyData['epd.impacts.sm.c3'] || 0,
                c4: assemblyData['epd.impacts.sm.c4'] || 0,
                d: assemblyData['epd.impacts.sm.d'] || 0,
              },
              pm: {
                a0: assemblyData['epd.impacts.pm.a0'] || 0,
                a1a3: assemblyData['epd.impacts.pm.a1a3'] || 0,
                a4: assemblyData['epd.impacts.pm.a4'] || 0,
                a5: assemblyData['epd.impacts.pm.a5'] || 0,
                b1: assemblyData['epd.impacts.pm.b1'] || 0,
                b2: assemblyData['epd.impacts.pm.b2'] || 0,
                b3: assemblyData['epd.impacts.pm.b3'] || 0,
                b4: assemblyData['epd.impacts.pm.b4'] || 0,
                b5: assemblyData['epd.impacts.pm.b5'] || 0,
                b6: assemblyData['epd.impacts.pm.b6'] || 0,
                b7: assemblyData['epd.impacts.pm.b7'] || 0,
                b8: assemblyData['epd.impacts.pm.b8'] || 0,
                c1: assemblyData['epd.impacts.pm.c1'] || 0,
                c2: assemblyData['epd.impacts.pm.c2'] || 0,
                c3: assemblyData['epd.impacts.pm.c3'] || 0,
                c4: assemblyData['epd.impacts.pm.c4'] || 0,
                d: assemblyData['epd.impacts.pm.d'] || 0,
              },
              irp: {
                a0: assemblyData['epd.impacts.irp.a0'] || 0,
                a1a3: assemblyData['epd.impacts.irp.a1a3'] || 0,
                a4: assemblyData['epd.impacts.irp.a4'] || 0,
                a5: assemblyData['epd.impacts.irp.a5'] || 0,
                b1: assemblyData['epd.impacts.irp.b1'] || 0,
                b2: assemblyData['epd.impacts.irp.b2'] || 0,
                b3: assemblyData['epd.impacts.irp.b3'] || 0,
                b4: assemblyData['epd.impacts.irp.b4'] || 0,
                b5: assemblyData['epd.impacts.irp.b5'] || 0,
                b6: assemblyData['epd.impacts.irp.b6'] || 0,
                b7: assemblyData['epd.impacts.irp.b7'] || 0,
                b8: assemblyData['epd.impacts.irp.b8'] || 0,
                c1: assemblyData['epd.impacts.irp.c1'] || 0,
                c2: assemblyData['epd.impacts.irp.c2'] || 0,
                c3: assemblyData['epd.impacts.irp.c3'] || 0,
                c4: assemblyData['epd.impacts.irp.c4'] || 0,
                d: assemblyData['epd.impacts.irp.d'] || 0,
              },
              etp_fw: {
                a0: assemblyData['epd.impacts.etp_fw.a0'] || 0,
                a1a3: assemblyData['epd.impacts.etp_fw.a1a3'] || 0,
                a4: assemblyData['epd.impacts.etp_fw.a4'] || 0,
                a5: assemblyData['epd.impacts.etp_fw.a5'] || 0,
                b1: assemblyData['epd.impacts.etp_fw.b1'] || 0,
                b2: assemblyData['epd.impacts.etp_fw.b2'] || 0,
                b3: assemblyData['epd.impacts.etp_fw.b3'] || 0,
                b4: assemblyData['epd.impacts.etp_fw.b4'] || 0,
                b5: assemblyData['epd.impacts.etp_fw.b5'] || 0,
                b6: assemblyData['epd.impacts.etp_fw.b6'] || 0,
                b7: assemblyData['epd.impacts.etp_fw.b7'] || 0,
                b8: assemblyData['epd.impacts.etp_fw.b8'] || 0,
                c1: assemblyData['epd.impacts.etp_fw.c1'] || 0,
                c2: assemblyData['epd.impacts.etp_fw.c2'] || 0,
                c3: assemblyData['epd.impacts.etp_fw.c3'] || 0,
                c4: assemblyData['epd.impacts.etp_fw.c4'] || 0,
                d: assemblyData['epd.impacts.etp_fw.d'] || 0,
              },
              htp_c: {
                a0: assemblyData['epd.impacts.htp_c.a0'] || 0,
                a1a3: assemblyData['epd.impacts.htp_c.a1a3'] || 0,
                a4: assemblyData['epd.impacts.htp_c.a4'] || 0,
                a5: assemblyData['epd.impacts.htp_c.a5'] || 0,
                b1: assemblyData['epd.impacts.htp_c.b1'] || 0,
                b2: assemblyData['epd.impacts.htp_c.b2'] || 0,
                b3: assemblyData['epd.impacts.htp_c.b3'] || 0,
                b4: assemblyData['epd.impacts.htp_c.b4'] || 0,
                b5: assemblyData['epd.impacts.htp_c.b5'] || 0,
                b6: assemblyData['epd.impacts.htp_c.b6'] || 0,
                b7: assemblyData['epd.impacts.htp_c.b7'] || 0,
                b8: assemblyData['epd.impacts.htp_c.b8'] || 0,
                c1: assemblyData['epd.impacts.htp_c.c1'] || 0,
                c2: assemblyData['epd.impacts.htp_c.c2'] || 0,
                c3: assemblyData['epd.impacts.htp_c.c3'] || 0,
                c4: assemblyData['epd.impacts.htp_c.c4'] || 0,
                d: assemblyData['epd.impacts.htp_c.d'] || 0,
              },
              htp_nc: {
                a0: assemblyData['epd.impacts.htp_nc.a0'] || 0,
                a1a3: assemblyData['epd.impacts.htp_nc.a1a3'] || 0,
                a4: assemblyData['epd.impacts.htp_nc.a4'] || 0,
                a5: assemblyData['epd.impacts.htp_nc.a5'] || 0,
                b1: assemblyData['epd.impacts.htp_nc.b1'] || 0,
                b2: assemblyData['epd.impacts.htp_nc.b2'] || 0,
                b3: assemblyData['epd.impacts.htp_nc.b3'] || 0,
                b4: assemblyData['epd.impacts.htp_nc.b4'] || 0,
                b5: assemblyData['epd.impacts.htp_nc.b5'] || 0,
                b6: assemblyData['epd.impacts.htp_nc.b6'] || 0,
                b7: assemblyData['epd.impacts.htp_nc.b7'] || 0,
                b8: assemblyData['epd.impacts.htp_nc.b8'] || 0,
                c1: assemblyData['epd.impacts.htp_nc.c1'] || 0,
                c2: assemblyData['epd.impacts.htp_nc.c2'] || 0,
                c3: assemblyData['epd.impacts.htp_nc.c3'] || 0,
                c4: assemblyData['epd.impacts.htp_nc.c4'] || 0,
                d: assemblyData['epd.impacts.htp_nc.d'] || 0,
              },
              sqp: {
                a0: assemblyData['epd.impacts.sqp.a0'] || 0,
                a1a3: assemblyData['epd.impacts.sqp.a1a3'] || 0,
                a4: assemblyData['epd.impacts.sqp.a4'] || 0,
                a5: assemblyData['epd.impacts.sqp.a5'] || 0,
                b1: assemblyData['epd.impacts.sqp.b1'] || 0,
                b2: assemblyData['epd.impacts.sqp.b2'] || 0,
                b3: assemblyData['epd.impacts.sqp.b3'] || 0,
                b4: assemblyData['epd.impacts.sqp.b4'] || 0,
                b5: assemblyData['epd.impacts.sqp.b5'] || 0,
                b6: assemblyData['epd.impacts.sqp.b6'] || 0,
                b7: assemblyData['epd.impacts.sqp.b7'] || 0,
                b8: assemblyData['epd.impacts.sqp.b8'] || 0,
                c1: assemblyData['epd.impacts.sqp.c1'] || 0,
                c2: assemblyData['epd.impacts.sqp.c2'] || 0,
                c3: assemblyData['epd.impacts.sqp.c3'] || 0,
                c4: assemblyData['epd.impacts.sqp.c4'] || 0,
                d: assemblyData['epd.impacts.sqp.d'] || 0,
              },
              rsf: {
                a0: assemblyData['epd.impacts.rsf.a0'] || 0,
                a1a3: assemblyData['epd.impacts.rsf.a1a3'] || 0,
                a4: assemblyData['epd.impacts.rsf.a4'] || 0,
                a5: assemblyData['epd.impacts.rsf.a5'] || 0,
                b1: assemblyData['epd.impacts.rsf.b1'] || 0,
                b2: assemblyData['epd.impacts.rsf.b2'] || 0,
                b3: assemblyData['epd.impacts.rsf.b3'] || 0,
                b4: assemblyData['epd.impacts.rsf.b4'] || 0,
                b5: assemblyData['epd.impacts.rsf.b5'] || 0,
                b6: assemblyData['epd.impacts.rsf.b6'] || 0,
                b7: assemblyData['epd.impacts.rsf.b7'] || 0,
                b8: assemblyData['epd.impacts.rsf.b8'] || 0,
                c1: assemblyData['epd.impacts.rsf.c1'] || 0,
                c2: assemblyData['epd.impacts.rsf.c2'] || 0,
                c3: assemblyData['epd.impacts.rsf.c3'] || 0,
                c4: assemblyData['epd.impacts.rsf.c4'] || 0,
                d: assemblyData['epd.impacts.rsf.d'] || 0,
              },
              nrsf: {
                a0: assemblyData['epd.impacts.nrsf.a0'] || 0,
                a1a3: assemblyData['epd.impacts.nrsf.a1a3'] || 0,
                a4: assemblyData['epd.impacts.nrsf.a4'] || 0,
                a5: assemblyData['epd.impacts.nrsf.a5'] || 0,
                b1: assemblyData['epd.impacts.nrsf.b1'] || 0,
                b2: assemblyData['epd.impacts.nrsf.b2'] || 0,
                b3: assemblyData['epd.impacts.nrsf.b3'] || 0,
                b4: assemblyData['epd.impacts.nrsf.b4'] || 0,
                b5: assemblyData['epd.impacts.nrsf.b5'] || 0,
                b6: assemblyData['epd.impacts.nrsf.b6'] || 0,
                b7: assemblyData['epd.impacts.nrsf.b7'] || 0,
                b8: assemblyData['epd.impacts.nrsf.b8'] || 0,
                c1: assemblyData['epd.impacts.nrsf.c1'] || 0,
                c2: assemblyData['epd.impacts.nrsf.c2'] || 0,
                c3: assemblyData['epd.impacts.nrsf.c3'] || 0,
                c4: assemblyData['epd.impacts.nrsf.c4'] || 0,
                d: assemblyData['epd.impacts.nrsf.d'] || 0,
              },
              fw: {
                a0: assemblyData['epd.impacts.fw.a0'] || 0,
                a1a3: assemblyData['epd.impacts.fw.a1a3'] || 0,
                a4: assemblyData['epd.impacts.fw.a4'] || 0,
                a5: assemblyData['epd.impacts.fw.a5'] || 0,
                b1: assemblyData['epd.impacts.fw.b1'] || 0,
                b2: assemblyData['epd.impacts.fw.b2'] || 0,
                b3: assemblyData['epd.impacts.fw.b3'] || 0,
                b4: assemblyData['epd.impacts.fw.b4'] || 0,
                b5: assemblyData['epd.impacts.fw.b5'] || 0,
                b6: assemblyData['epd.impacts.fw.b6'] || 0,
                b7: assemblyData['epd.impacts.fw.b7'] || 0,
                b8: assemblyData['epd.impacts.fw.b8'] || 0,
                c1: assemblyData['epd.impacts.fw.c1'] || 0,
                c2: assemblyData['epd.impacts.fw.c2'] || 0,
                c3: assemblyData['epd.impacts.fw.c3'] || 0,
                c4: assemblyData['epd.impacts.fw.c4'] || 0,
                d: assemblyData['epd.impacts.fw.d'] || 0,
              },
              hwd: {
                a0: assemblyData['epd.impacts.hwd.a0'] || 0,
                a1a3: assemblyData['epd.impacts.hwd.a1a3'] || 0,
                a4: assemblyData['epd.impacts.hwd.a4'] || 0,
                a5: assemblyData['epd.impacts.hwd.a5'] || 0,
                b1: assemblyData['epd.impacts.hwd.b1'] || 0,
                b2: assemblyData['epd.impacts.hwd.b2'] || 0,
                b3: assemblyData['epd.impacts.hwd.b3'] || 0,
                b4: assemblyData['epd.impacts.hwd.b4'] || 0,
                b5: assemblyData['epd.impacts.hwd.b5'] || 0,
                b6: assemblyData['epd.impacts.hwd.b6'] || 0,
                b7: assemblyData['epd.impacts.hwd.b7'] || 0,
                b8: assemblyData['epd.impacts.hwd.b8'] || 0,
                c1: assemblyData['epd.impacts.hwd.c1'] || 0,
                c2: assemblyData['epd.impacts.hwd.c2'] || 0,
                c3: assemblyData['epd.impacts.hwd.c3'] || 0,
                c4: assemblyData['epd.impacts.hwd.c4'] || 0,
                d: assemblyData['epd.impacts.hwd.d'] || 0,
              },
              nhwd: {
                a0: assemblyData['epd.impacts.nhwd.a0'] || 0,
                a1a3: assemblyData['epd.impacts.nhwd.a1a3'] || 0,
                a4: assemblyData['epd.impacts.nhwd.a4'] || 0,
                a5: assemblyData['epd.impacts.nhwd.a5'] || 0,
                b1: assemblyData['epd.impacts.nhwd.b1'] || 0,
                b2: assemblyData['epd.impacts.nhwd.b2'] || 0,
                b3: assemblyData['epd.impacts.nhwd.b3'] || 0,
                b4: assemblyData['epd.impacts.nhwd.b4'] || 0,
                b5: assemblyData['epd.impacts.nhwd.b5'] || 0,
                b6: assemblyData['epd.impacts.nhwd.b6'] || 0,
                b7: assemblyData['epd.impacts.nhwd.b7'] || 0,
                b8: assemblyData['epd.impacts.nhwd.b8'] || 0,
                c1: assemblyData['epd.impacts.nhwd.c1'] || 0,
                c2: assemblyData['epd.impacts.nhwd.c2'] || 0,
                c3: assemblyData['epd.impacts.nhwd.c3'] || 0,
                c4: assemblyData['epd.impacts.nhwd.c4'] || 0,
                d: assemblyData['epd.impacts.nhwd.d'] || 0,
              },
              rwd: {
                a0: assemblyData['epd.impacts.rwd.a0'] || 0,
                a1a3: assemblyData['epd.impacts.rwd.a1a3'] || 0,
                a4: assemblyData['epd.impacts.rwd.a4'] || 0,
                a5: assemblyData['epd.impacts.rwd.a5'] || 0,
                b1: assemblyData['epd.impacts.rwd.b1'] || 0,
                b2: assemblyData['epd.impacts.rwd.b2'] || 0,
                b3: assemblyData['epd.impacts.rwd.b3'] || 0,
                b4: assemblyData['epd.impacts.rwd.b4'] || 0,
                b5: assemblyData['epd.impacts.rwd.b5'] || 0,
                b6: assemblyData['epd.impacts.rwd.b6'] || 0,
                b7: assemblyData['epd.impacts.rwd.b7'] || 0,
                b8: assemblyData['epd.impacts.rwd.b8'] || 0,
                c1: assemblyData['epd.impacts.rwd.c1'] || 0,
                c2: assemblyData['epd.impacts.rwd.c2'] || 0,
                c3: assemblyData['epd.impacts.rwd.c3'] || 0,
                c4: assemblyData['epd.impacts.rwd.c4'] || 0,
                d: assemblyData['epd.impacts.rwd.d'] || 0,
              },
              cru: {
                a0: assemblyData['epd.impacts.cru.a0'] || 0,
                a1a3: assemblyData['epd.impacts.cru.a1a3'] || 0,
                a4: assemblyData['epd.impacts.cru.a4'] || 0,
                a5: assemblyData['epd.impacts.cru.a5'] || 0,
                b1: assemblyData['epd.impacts.cru.b1'] || 0,
                b2: assemblyData['epd.impacts.cru.b2'] || 0,
                b3: assemblyData['epd.impacts.cru.b3'] || 0,
                b4: assemblyData['epd.impacts.cru.b4'] || 0,
                b5: assemblyData['epd.impacts.cru.b5'] || 0,
                b6: assemblyData['epd.impacts.cru.b6'] || 0,
                b7: assemblyData['epd.impacts.cru.b7'] || 0,
                b8: assemblyData['epd.impacts.cru.b8'] || 0,
                c1: assemblyData['epd.impacts.cru.c1'] || 0,
                c2: assemblyData['epd.impacts.cru.c2'] || 0,
                c3: assemblyData['epd.impacts.cru.c3'] || 0,
                c4: assemblyData['epd.impacts.cru.c4'] || 0,
                d: assemblyData['epd.impacts.cru.d'] || 0,
              },
              mrf: {
                a0: assemblyData['epd.impacts.mrf.a0'] || 0,
                a1a3: assemblyData['epd.impacts.mrf.a1a3'] || 0,
                a4: assemblyData['epd.impacts.mrf.a4'] || 0,
                a5: assemblyData['epd.impacts.mrf.a5'] || 0,
                b1: assemblyData['epd.impacts.mrf.b1'] || 0,
                b2: assemblyData['epd.impacts.mrf.b2'] || 0,
                b3: assemblyData['epd.impacts.mrf.b3'] || 0,
                b4: assemblyData['epd.impacts.mrf.b4'] || 0,
                b5: assemblyData['epd.impacts.mrf.b5'] || 0,
                b6: assemblyData['epd.impacts.mrf.b6'] || 0,
                b7: assemblyData['epd.impacts.mrf.b7'] || 0,
                b8: assemblyData['epd.impacts.mrf.b8'] || 0,
                c1: assemblyData['epd.impacts.mrf.c1'] || 0,
                c2: assemblyData['epd.impacts.mrf.c2'] || 0,
                c3: assemblyData['epd.impacts.mrf.c3'] || 0,
                c4: assemblyData['epd.impacts.mrf.c4'] || 0,
                d: assemblyData['epd.impacts.mrf.d'] || 0,
              },
              mer: {
                a0: assemblyData['epd.impacts.mer.a0'] || 0,
                a1a3: assemblyData['epd.impacts.mer.a1a3'] || 0,
                a4: assemblyData['epd.impacts.mer.a4'] || 0,
                a5: assemblyData['epd.impacts.mer.a5'] || 0,
                b1: assemblyData['epd.impacts.mer.b1'] || 0,
                b2: assemblyData['epd.impacts.mer.b2'] || 0,
                b3: assemblyData['epd.impacts.mer.b3'] || 0,
                b4: assemblyData['epd.impacts.mer.b4'] || 0,
                b5: assemblyData['epd.impacts.mer.b5'] || 0,
                b6: assemblyData['epd.impacts.mer.b6'] || 0,
                b7: assemblyData['epd.impacts.mer.b7'] || 0,
                b8: assemblyData['epd.impacts.mer.b8'] || 0,
                c1: assemblyData['epd.impacts.mer.c1'] || 0,
                c2: assemblyData['epd.impacts.mer.c2'] || 0,
                c3: assemblyData['epd.impacts.mer.c3'] || 0,
                c4: assemblyData['epd.impacts.mer.c4'] || 0,
                d: assemblyData['epd.impacts.mer.d'] || 0,
              },
              eee: {
                a0: assemblyData['epd.impacts.eee.a0'] || 0,
                a1a3: assemblyData['epd.impacts.eee.a1a3'] || 0,
                a4: assemblyData['epd.impacts.eee.a4'] || 0,
                a5: assemblyData['epd.impacts.eee.a5'] || 0,
                b1: assemblyData['epd.impacts.eee.b1'] || 0,
                b2: assemblyData['epd.impacts.eee.b2'] || 0,
                b3: assemblyData['epd.impacts.eee.b3'] || 0,
                b4: assemblyData['epd.impacts.eee.b4'] || 0,
                b5: assemblyData['epd.impacts.eee.b5'] || 0,
                b6: assemblyData['epd.impacts.eee.b6'] || 0,
                b7: assemblyData['epd.impacts.eee.b7'] || 0,
                b8: assemblyData['epd.impacts.eee.b8'] || 0,
                c1: assemblyData['epd.impacts.eee.c1'] || 0,
                c2: assemblyData['epd.impacts.eee.c2'] || 0,
                c3: assemblyData['epd.impacts.eee.c3'] || 0,
                c4: assemblyData['epd.impacts.eee.c4'] || 0,
                d: assemblyData['epd.impacts.eee.d'] || 0,
              },
              eet: {
                a0: assemblyData['epd.impacts.eet.a0'] || 0,
                a1a3: assemblyData['epd.impacts.eet.a1a3'] || 0,
                a4: assemblyData['epd.impacts.eet.a4'] || 0,
                a5: assemblyData['epd.impacts.eet.a5'] || 0,
                b1: assemblyData['epd.impacts.eet.b1'] || 0,
                b2: assemblyData['epd.impacts.eet.b2'] || 0,
                b3: assemblyData['epd.impacts.eet.b3'] || 0,
                b4: assemblyData['epd.impacts.eet.b4'] || 0,
                b5: assemblyData['epd.impacts.eet.b5'] || 0,
                b6: assemblyData['epd.impacts.eet.b6'] || 0,
                b7: assemblyData['epd.impacts.eet.b7'] || 0,
                b8: assemblyData['epd.impacts.eet.b8'] || 0,
                c1: assemblyData['epd.impacts.eet.c1'] || 0,
                c2: assemblyData['epd.impacts.eet.c2'] || 0,
                c3: assemblyData['epd.impacts.eet.c3'] || 0,
                c4: assemblyData['epd.impacts.eet.c4'] || 0,
                d: assemblyData['epd.impacts.eet.d'] || 0,
              },
            },
            type: 'actual',
            //comment: '',
            //conversions: null,
            //metaData: null,
            //referenceServiceLife: null,
            //subtype: null,
          },
          quantity: assemblyData['product.quantity'] || 0,
          unit: assemblyData['product.unit'] || '',
          type: 'actual',
          metaData: {
            product_class: String(assemblyData['meta_data.product_class'] || ''),
            strength: {
              value: projectData['meta_data.strength.value'] || 0,
              unit: projectData['meta_data.strength.unit'] || 'unknown',
            },
            density: {
              value: projectData['meta_data.density.value'] || 0,
              unit: projectData['meta_data.density.unit'] || 'unknown',
            },
            exposure_classes: String(assemblyData['meta_data.exposure_classes'] || ''),
            concrete_precast: String(assemblyData['meta_data.concrete_precast'] || ''),
            brick_type: String(assemblyData['meta_data.brick_type'] || ''),
            brick_grout_included: String(assemblyData['meta_data.brick_grout_included'] || ''),
            timber_type: String(assemblyData['meta_data.timber_type'] || ''),
            grout_type: String(assemblyData['meta_data.grout_type'] || ''),
          },
          results: null,
          transport: null,
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
          volume: {
              value: projectData['meta_data.volume.value'] || 0,
              unit: projectData['meta_data.volume.unit'] || 'unknown',
            },
        },
        category: '',
        results: null,
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

  // Create a new type that extends the InputProject and make id required

  const inputProject: RequiredInputProject = {
    id: uuidv4(),
    name: projectData['name'] || 'Unknown Project',
    description: projectData['description'] || '',
    comment: projectData['comment'] || '',
    classificationSystem: projectData['classification_system'] || '',
    projectPhase: projectData['project_phase'],
    location: {
      address: projectData['location.address'] || '',
      city: projectData['location.city'] || '',
      // @ts-expect-error has to be lower case
      country: ((projectData['location.country'] as string) || '').toLowerCase(),
      latitude: projectData['location.latitude'] || 0,
      longitude: projectData['location.longitude'] || 0,
    },
    owner: projectData['owner'] || 'Unknown Owner',
    lifeCycleStages: mapLifeCycleStages(assemblies),
    referenceStudyPeriod: projectData['reference_study_period'] || 0,
    lciaMethod: projectData['lcia_method'] || '',


    formatVersion: process.env.LCAX_VERSION || '',
    impactCategories: mapImpactCategories(assemblies),
    assemblies: assemblies,
    results: null,

    softwareInfo: {
      calculationType: projectData['calculation_type'] || '',
      lcaSoftware: projectData['lca_software'] || '',
    },

    projectInfo: {
      type: 'buildingInfo',
      buildingFootprint: {
        value: projectData['project_info.building_info.building_footprint.value'] || 0,
        unit: projectData['project_info.building_info.building_footprint.unit'] || 'unknown',
      },
      buildingHeight: {
        value: projectData['project_info.building_info.building_height.value'] || 0,
        unit: projectData['project_info.building_info.building_height.unit'] || 'unknown',
      },
      buildingMass: {
        value: projectData['project_info.building_info.building_mass.value'] || 0,
        unit: projectData['project_info.building_info.building_mass.unit'] || 'unknown',
      },
      buildingModelScope: [projectData['project_info.building_info.building_model_scope'] || ''],
      // @ts-expect-error has to be lower case
      buildingType: ((projectData['project_info.building_info.building_type'] as string) || '')
        .toLowerCase()
        .replace(/ /g, '_'),
      // @ts-expect-error has to be lower case
      buildingTypology: [((projectData['project_info.building_info.building_typology'] as string) || '').toLowerCase()],
      buildingUsers: projectData['building_users'] || '',
      certifications: [projectData['certifications'] || 'unknown'],
      floorsAboveGround: projectData['floors_above_ground'] || 0,
      floorsBelowGround: projectData['floors_below_ground'] || 0,
      frameType: projectData['frame_type'] || '',
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
      roofType: projectData['roof_type'] || '',
      buildingCompletionYear: projectData['project_info.building_info.building_completion_year'] || 0,
      buildingPermitYear: projectData['building_permit_year'] || 0,
      energyDemandHeating: projectData['building_info.energy_demand_heating'] || 0,
      energySupplyHeating: projectData['building_info.energy_supply_heating'] || 0,
      energyDemandElectricity: projectData['building_info.energy_demand_electricity'] || 0,
      energySupplyElectricity: projectData['building_info.energy_supply_electricity'] || 0,
      exportedElectricity: projectData['building_info.exported_electricity'] || 0,
      generalEnergyClass: projectData['building_info.general_energy_class'] || '',
      localEnergyClass: projectData['building_info.local_energy_class'] || '',
    },

    metaData: {
      // Information
      projectClassificationSystem: String(projectData['meta_data.project_classification_system'] || ''),
      image: String(projectData['meta_data.image'] || ''),

      // Location
      climateZone: String(projectData['meta_data.climate_zone'] || ''),

      // Owner Information
      owner: {
         contact: String(projectData['meta_data.owner.contact'] || ''),
         webDomain: String(projectData['meta_data.owner.web'] || ''),
         country: String(projectData['meta_data.owner.country'] || ''),
         email: String(projectData['meta_data.owner.email'] || ''),
         type: String(projectData['meta_data.owner.type'] || ''),
         representative: String(projectData['meta_data.owner.representative'] || ''),
       },

      // LCA Information
      assessmentMethodologyDescription: String(projectData['meta_data.assessment.assessment_methodology_description'] || ''),
      assessmentUncertainty: String(projectData['meta_data.assessment.uncertainty'] || ''),
      assessmentCutoffMethod: String(projectData['meta_data.assessment.cutoff_method'] || ''),
      nameOfAssessor: String(projectData['meta_data.assessment.assessor.name'] || ''),
      emailOfAssessor: String(projectData['meta_data.assessment.assessor.email'] || ''),
      assessorOrganization: String(projectData['meta_data.assessment.assessor.organization'] || ''),
      dataReportedYear: String(projectData['meta_data.assessment.year'] || 0),
      dateOfAssessment: String(projectData['meta_data.assessment.date'] || ''),
      materialQuantitySource: String(projectData['meta_data.assessment.quantity_source'] || ''),
      materialQuantitySourceDetail: String(projectData['meta_data.assessment.quantity_source_detail'] || ''),
      purposeOfAssessment: String(projectData['meta_data.assessment.purpose'] || ''),
      isCompliantISO21931: String(projectData['meta_data.assessment.iso21931_compliance'] || false),
      isCompliantEN15978: String(projectData['meta_data.assessment.iso15978_compliance'] || false),
      isCompliantRICS2017: String(projectData['meta_data.assessment.rics_2017_compliance'] || false),
      isCompliantRICS2023: String(projectData['meta_data.assessment.rics_2023_compliance'] || false),
      isCompliantASHRAE240P: String(projectData['meta_data.assessment.ashrae_240p_compliance'] || false),
      isCompliantSEIPrestandard: String(projectData['meta_data.assessment.sei_prestandard_compliance'] || false),
      thirdPartyVerified: String(projectData['meta_data.assessment.verified'] || false),
      verifierInfo: String(projectData['meta_data.assessment.verified_info'] || ''),
      validityPeriodYears: String(projectData['meta_data.assessment.validity_period'] || 0),
      validationDescription: String(projectData['meta_data.assessment.results_validation_description'] || ''),
      toolReportUpload: String(projectData['meta_data.assessment.tool_report_upload'] || ''),
      reportName: String(projectData['meta_data.assessment.report_name'] || ''),
      additionalLcaReportName: String(projectData['meta_data.assessment.additional_lca_report_name'] || ''),
      projectPhaseAtReporting: String(projectData['meta_data.assessment.project_phase_at_reporting'] || ''),
      projectPhaseAtAssessment: String(projectData['meta_data.assessment.project_phase_at_time_of_assessment'] || ''),
      operationalEnergyIncluded: String(projectData['meta_data.assessment.operational_energy_included'] || ''),
      biogenicCarbonIncluded: String(projectData['meta_data.assessment.biogenic_carbon_included'] || ''),
      biogenicCarbonAccountingMethod: String(projectData['meta_data.assessment.biogenic_carbon_accounting_method'] || ''),
      bioSustainabilityCertification: String(projectData['meta_data.assessment.bio_sustainability_certification'] || ''),
      biogenicCarbonDescription: String(projectData['meta_data.assessment.biogenic_carbon_description'] || ''),
      projectRefrigerants: String(projectData['meta_data.assessment.project_refrigerants'] || ''),
      refrigerantTypeIncluded: String(projectData['meta_data.assessment.refrigerant_type_included'] || ''),
      substructureScope: String(projectData['meta_data.assessment.substructure_scope'] || ''),
      shellSuperstructureScope: String(projectData['meta_data.assessment.shell_superstructure_scope'] || ''),
      shellExteriorEnclosureScope: String(projectData['meta_data.assessment.shell_exterior_enclosure_scope'] || ''),
      interiorConstructionScope: String(projectData['meta_data.assessment.interior_construction_scope'] || ''),
      interiorFinishesScope: String(projectData['meta_data.assessment.interior_finishes_scope'] || ''),
      servicesMechanicalScope: String(projectData['meta_data.assessment.services_mechanical_scope'] || ''),
      servicesElectricalScope: String(projectData['meta_data.assessment.services_electrical_scope'] || ''),
      servicesPlumbingScope: String(projectData['meta_data.assessment.services_plumbing_scope'] || ''),
      siteworkScope: String(projectData['meta_data.assessment.sitework_scope'] || ''),
      equipmentScope: String(projectData['meta_data.assessment.equipment_scope'] || ''),
      furnishingsScope: String(projectData['meta_data.assessment.furnishings_scope'] || ''),
      LCARequirements: String(projectData['meta_data.assessment.lca_requirements'] || ''),

      // Software Info
      lcaSoftwareVersion: String(projectData['meta_data.lca_software_version'] || ''),
      lcaDatabase: String(projectData['meta_data.lca_database'] || ''),
      lcaDatabaseVersion: String(projectData['meta_data.lca_database_version'] || ''),
      lcaDatabaseOther: String(projectData['meta_data.lca_database_other'] || ''),
      lcaModelType: String(projectData['meta_data.lca_model_type'] || ''),

      // Project Info
      interstitialFloors: String(projectData['meta_data.interstitial_floors'] || ''),
      newlyBuiltArea: String(projectData['meta_data.newly_built_area.value'] || 0),
      retrofittedArea: String(projectData['meta_data.retrofitted_area.value'] || 0),
      demolishedArea: String(projectData['meta_data.demolished_area.value'] || 0),
      existingArea: String(projectData['meta_data.existing_area.value'] || 0),
      builtFloorArea: {
        value: String(projectData['meta_data.built_floor_area.value'] || 0),
        unit: String(projectData['meta_data.built_floor_area.unit'] || 'unknown'),
      },
      detailedConstructionType: String(projectData['meta_data.building_project_construction_type_2'] || ''),
      infrastructureConstructionType: String(projectData['meta_data.infrastructure_project_construction_type'] || ''),
      infrastructureSectorType: String(projectData['meta_data.infrastructure_sector_type'] || ''),
      buildingUseType: String(projectData['meta_data.building_use_type'] || ''),
      infrastructureUseType: String(projectData['meta_data.infrastructure_use_type'] || ''),
      projectWorkArea: {
        value: String(projectData['meta_data.project_work_area.value'] || 0),
        unit: String(projectData['meta_data.project_work_area.unit'] || 'unknown'),
      },
      projectSiteArea: {
        value: String(projectData['meta_data.project_site_area.value'] || 0),
        unit: String(projectData['meta_data.project_site_area.unit'] || 'unknown'),
      },
      conditionedFloorArea: {
        value: String(projectData['meta_data.conditioned_floor_area.value'] || 0),
        unit: String(projectData['meta_data.conditioned_floor_area.unit'] || 'unknown'),
      },
      unconditionedFloorArea: {
        value: String(projectData['meta_data.unconditioned_floor_area.value'] || 0),
        unit: String(projectData['meta_data.unconditioned_floor_area.unit'] || 'unknown'),
      },
      enclosedParkingArea: {
        value: String(projectData['meta_data.enclosed_parking_area.value'] || 0),
        unit: String(projectData['meta_data.enclosed_parking_area.unit'] || 'unknown'),
      },
      detachedParkingArea: {
        value: String(projectData['meta_data.detached_parking_area.value'] || 0),
        unit: String(projectData['meta_data.detached_parking_area.unit'] || 'unknown'),
      },
      surfaceParkingArea: {
        value: String(projectData['meta_data.surface_parking_area.value'] || ''),
        unit: String(projectData['meta_data.surface_parking_area.unit'] || 'unknown'),
      },
      detachedParkingStructureArea: {
        value: String(projectData['meta_data.detached_parking_structure_area.value'] || ''),
        unit: String(projectData['meta_data.detached_parking_structure_area.unit'] || 'unknown'),
      },
      ibcConstructionType: String(projectData['meta_data.ibc_construction_type'] || ''),
      projectSurroundings: String(projectData['meta_data.project_surroundings'] || ''),
      projectHistoric: String(projectData['meta_data.project_historic'] || ''),
      fullTimeEquivalent: String(projectData['meta_data.full_time_equivalent'] || ''),
      occupantLoad: String(projectData['meta_data.occupant_load'] || 0),
      meanRoofHeight: String(projectData['meta_data.mean_roof_height'] || 0),
      windowWallRatio: String(projectData['meta_data.window_wall_ratio'] || 0),
      thermalEnvelopeArea: {
        value: String(projectData['meta_data.thermal_envelope_area.value'] || 0),
        unit: String(projectData['meta_data.thermal_envelope_area.unit'] || 'unknown'),
      },
      residentialUnits: String(projectData['meta_data.residential_units'] || ''),
      bedroomCount: String(projectData['meta_data.bedroom_count'] || ''),
      expectedBuildingLifeYears: String(projectData['meta_data.project_expected_life'] || 0),
      resultsValidatedAsBuilt: String(projectData['meta_data.results_validated_as_built'] || false),
      resultsValidatedAsBuiltDescription: String(projectData['meta_data.results_validated_as_built_description'] || ''),
      methodOfCalculatingAssessmentCutoff: String(projectData['meta_data.assessment_cutoff_type'] || ''),
      materialsPercentageAssessmentMass: String(projectData['meta_data.assessment_cutoff'] || 0),
      materialsCostAssessment95: String(projectData['meta_data.assessment_cost_cutoff'] || false),
      heritageStatus: String(projectData['meta_data.heritage_status'] || false),
      omniclassConstructionEntity: String(projectData['meta_data.omniclass_construction_entity'] || ''),

      // Energy Information
      energyModelingTool: String(projectData['meta_data.energy.tool_energy_modeling'] || ''),
      energyModelingToolVersion: String(projectData['meta_data.energy.tool_energy_modeling_version'] || ''),
      energyModelMethodologyReference: String(projectData['meta_data.energy.energy_model_methodology_reference'] || ''),
      gwpEnergySourcesPeriod: String(projectData['meta_data.energy.gwp_energy_sources_period'] || ''),
      siteLocationWeatherData: String(projectData['meta_data.energy.site_location_weather_data'] || ''),
      electricityProvider: String(projectData['meta_data.energy.electricity_provider'] || ''),
      electricitySource: String(projectData['meta_data.energy.electricity_source'] || ''),
      electricityCarbonFactor: String(projectData['meta_data.energy.electricity_carbon_factor'] || ''),
      electricityCarbonFactorSource: String(projectData['meta_data.energy.electricity_carbon_factor_unit'] || ''),

      // Project Team
      architectOfRecord: String(projectData['meta_data.architect_of_record'] || ''),
      userStudio: String(projectData['meta_data.project_user_studio'] || ''),
      generalContractor: String(projectData['meta_data.general_contractor'] || ''),
      mepEngineer: String(projectData['meta_data.mep_engineer'] || ''),
      greenBuildingConsultant: String(projectData['meta_data.sustainability_consultant'] || ''),
      structuralEngineer: String(projectData['meta_data.structural_engineer'] || ''),
      civilEngineer: String(projectData['meta_data.civil_engineer'] || ''),
      landscapeConsultant: String(projectData['meta_data.landscape_consultant'] || ''),
      interiorDesigner: String(projectData['meta_data.interior_designer'] || ''),
      otherProjectTeamMember: String(projectData['meta_data.other_project_team'] || ''),

      // Project Schedule
      workCompletionDate: String(projectData['meta_data.work_completion_year'] || ''),
      anticipatedConstructionStart: String(projectData['meta_data.construction_start'] || ''),
      constructionYearExistingBuilding: String(projectData['meta_data.construction_year_existing_building'] || ''),
      anticipatedOccupancyStart: String(projectData['meta_data.building_occupancy_start'] || ''),

      // Project Cost
      projectCostCurrency: String(projectData['meta_data.cost.currency'] || ''),
      totalProjectCost: String(projectData['meta_data.cost.total_cost'] || 0),
      hardCosts: String(projectData['meta_data.cost.hard_cost'] || 0),
      softCosts: String(projectData['meta_data.cost.soft_cost'] || 0),
      projectEstimatedSiteworksCost: String(projectData['meta_data.cost.siteworks_cost'] || 0),
      projectCostSource: String(projectData['meta_data.cost.cost_source'] || ''),
      costNotes: String(projectData['meta_data.cost.notes'] || ''),

      // Structural System
      columnGridSpacingLongDirection: {
        value: String(projectData['meta_data.structural.column_grid_long.value'] || 0),
        unit: String(projectData['meta_data.structural.column_grid_long.unit'] || 'unknown'),
      },
      projectRiskCategory: String(projectData['meta_data.structural.risk_category'] || ''),
      floorLiveLoad: {
        value: String(projectData['meta_data.structural.live_load.value'] || 0),
        unit: String(projectData['meta_data.structural.live_load.unit'] || 'unknown'),
      },
      GroundSnowLoad: {
        value: String(projectData['meta_data.structural.snow_load.value'] || 0),
        unit: String(projectData['meta_data.structural.snow_load.unit'] || 'unknown'),
      },
      ultimateWindSpeed: {
        value: String(projectData['meta_data.structural.wind_speed.value'] || 0),
        unit: String(projectData['meta_data.structural.wind_speed.unit'] || 'unknown'),
      },
      earthquakeImportanceFactor: String(projectData['meta_data.structural.earthquake_importance_factor'] || ''),
      seismicDesignCategory: String(projectData['meta_data.structural.seismic_design_category'] || ''),
      primaryHorizontalGravitySystem: String(projectData['meta_data.structural.horizontal_gravity_system'] || ''),
      secondaryHorizontalGravitySystem: String(projectData['meta_data.structural.secondary_horizontal_gravity_system'] || ''),
      primaryVerticalGravitySystem: String(projectData['meta_data.structural.vertical_gravity_system'] || ''),
      secondaryVerticalGravitySystem: String(projectData['meta_data.structural.secondary_vertical_gravity_system'] || ''),
      primaryLateralSystem: String(projectData['meta_data.structural.lateral_system'] || ''),
      projectPodium: String(projectData['meta_data.structural.podium'] || ''),
      allowableSoilBearingPressurePSF: {
        value: String(projectData['meta_data.structural.allowable_soil_bearing_pressure.value'] || 0),
        unit: String(projectData['meta_data.structural.allowable_soil_bearing_pressure.unit'] || 'unknown'),
      },
      foundationType: String(projectData['meta_data.structural.foundation_type'] || ''),

      // Journal Publication
      journalAuthors: String(projectData['meta_data.publication.authors'] || ''),
      journalPublicationYear: String(projectData['meta_data.publication.year'] || ''),
      doiUrl: String(projectData['meta_data.publication.doi'] || ''),
      journalTitle: String(projectData['meta_data.publication.title'] || ''),
      journalPublisher: String(projectData['meta_data.publication.publisher'] || ''),
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
  // @ts-expect-error Ignoring type mismatch for calculateProject
  project = calculateProject(project)

  // @ts-expect-error Ignoring type mismatch for calculateProject
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
