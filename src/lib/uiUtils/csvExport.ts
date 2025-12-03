import { unparse } from 'papaparse'

export const downloadCSV = async <T>(
  setLoading: (loading: boolean) => void,
  fetchData: () => Promise<{ data?: { items: T[]; count: number } | null; error?: Error }>,
  transformData: (items: T[]) => Record<string, unknown>[],
  filename: string,
  entityName: string,
  maxRecords: number = 2000,
): Promise<void> => {
  setLoading(true)
  try {
    const { data: csvData, error: csvError } = await fetchData()

    if (csvError) {
      console.error(`Error fetching ${entityName} for CSV download:`, csvError)
      alert(`Error downloading CSV: ${csvError.message}`)
      return
    }

    if ((csvData?.count ?? 0) > maxRecords) {
      alert(
        `Cannot download more than ${maxRecords} ${entityName} at once. Please contact support for a full data export.`,
      )
      return
    }

    const allItems: T[] = csvData?.items || []
    const transformedData = transformData(allItems)

    const csv = unparse(transformedData, {
      quotes: true,
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ',',
      header: true,
      newline: '\r\n',
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error downloading CSV:', err)
    alert('An error occurred while downloading the CSV')
  } finally {
    setLoading(false)
  }
}
