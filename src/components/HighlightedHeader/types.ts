export type ChartTab = 'attributes' | 'intensity'

export const SUPPORTED_COLUMNS_MAPPING = {
  'projectInfo.buildingType': 'Building Type',
  'metaData.source.name': 'Source',
  'softwareInfo.lcaSoftware': 'LCA Software',
  'projectInfo.buildingTypology': 'Building Typology',
  'projectInfo.generalEnergyClass': 'Energy Class',
  'projectInfo.roofType': 'Roof Type',
  'projectInfo.frameType': 'Frame Type',
}

export const SUPPORTED_COLUMNS = Object.keys(SUPPORTED_COLUMNS_MAPPING)
