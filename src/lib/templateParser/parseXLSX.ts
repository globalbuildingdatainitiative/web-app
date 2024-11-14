import * as XLSX from 'xlsx'


// Helper function to trim string values while preserving other types
const trimIfString = (value: string | number): string | number => {
  return typeof value === 'string' ? value.trim() : value
}


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
        assemblyGroup[info] = trimIfString(value)
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
        jsonData[info] = trimIfString(value)
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

  return {
    project: mapToJson(projectSheet),
    assemblies: mapAssembliesToJson(assembliesSheet),
  }
}
