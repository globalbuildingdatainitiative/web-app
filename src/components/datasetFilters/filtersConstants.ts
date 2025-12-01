import { alpha3AndUnknownToCountryName, formatCountryName } from '@lib'
import { BoxPlotOrientation } from 'components/BoxPlot'
import { BuildingTypology, LifeCycleStage } from 'queries/generated'

const formatEnumValue = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const capitalizeEnumValue = (value: string): string => {
  return value.toUpperCase()
}

export const buildingTypologyOptions = Object.values(BuildingTypology).map((value) => ({
  value,
  label: formatEnumValue(value),
}))

export const lifeCycleOptions = [
  ...Object.values(LifeCycleStage).map((value) => ({
    value,
    label: capitalizeEnumValue(value),
  })),
]

export const countryOptions = Object.entries(alpha3AndUnknownToCountryName).map(([key, val]) => ({
  value: key,
  label: formatCountryName(val),
}))

const frameTypeKeys = [
  'Concrete (In-Situ)',
  'Concrete (Precast)',
  'Concrete (PT)',
  'frame concrete',
  'frame steel',
  'frame wood',
  'In-Situ RC',
  'Masonry & Timber',
  'Masonry/Concrete',
  'Masonry/Timber',
  'massive brick',
  'massive concrete',
  'massive wood',
  'other', // there's one entry with lowercase 'o' in the dataset
  'Other',
  'SteelFrame/Composite',
  'SteelFrame/Other',
  'SteelFrame/Precast',
  'SteelFrame/Timber',
  'TimberFrame(Glulam/CLT)',
  'TimberFrame(Softwood)',
  'Unknown',
] as const

export type FrameTypeOption = (typeof frameTypeKeys)[number]
const frameTypeKeyToLabel: Record<FrameTypeOption, string> = {
  'Concrete (In-Situ)': 'Concrete (In-Situ)',
  'Concrete (Precast)': 'Concrete (Precast)',
  'Concrete (PT)': 'Concrete (Post-Tensioned)',
  'frame concrete': 'Concrete Frame',
  'frame steel': 'Steel Frame',
  'frame wood': 'Wood Frame',
  'In-Situ RC': 'In-Situ Reinforced Concrete',
  'Masonry & Timber': 'Masonry & Timber',
  'Masonry/Concrete': 'Masonry / Concrete',
  'Masonry/Timber': 'Masonry / Timber',
  'massive brick': 'Massive Brick',
  'massive concrete': 'Massive Concrete',
  'massive wood': 'Massive Wood',
  other: 'other (lowercase)',
  Other: 'Other',
  'SteelFrame/Composite': 'Steel Frame / Composite',
  'SteelFrame/Other': 'Steel Frame / Other',
  'SteelFrame/Precast': 'Steel Frame / Precast',
  'SteelFrame/Timber': 'Steel Frame / Timber',
  'TimberFrame(Glulam/CLT)': 'Timber Frame (Glulam/CLT)',
  'TimberFrame(Softwood)': 'Timber Frame (Softwood)',
  Unknown: 'Unknown',
}

export function formatFrameType(frameType: string): string {
  return frameTypeKeyToLabel[frameType as FrameTypeOption] || frameType
}

export const frameTypeOptions = frameTypeKeys.map((frameType) => ({
  value: frameType,
  label: formatFrameType(frameType),
}))

const lcaSoftwareKeys = ['MMG-Building-LCA-Tool', 'Other', 'SimaPro', 'Structural Carbon Toolkit'] as const

export type LcaSoftwareOption = (typeof lcaSoftwareKeys)[number]
const lcaSoftwareKeyToLabel: Record<LcaSoftwareOption, string> = {
  'MMG-Building-LCA-Tool': 'MMG Building LCA Tool',
  Other: 'Other',
  SimaPro: 'SimaPro',
  'Structural Carbon Toolkit': 'Structural Carbon Toolkit',
}

export function formatLcaSoftware(name: string): string {
  return lcaSoftwareKeyToLabel[name as LcaSoftwareOption] || name
}

export const lcaSoftwareOptions = lcaSoftwareKeys.map((software) => ({
  value: software,
  label: formatLcaSoftware(software),
}))

const sourceKeys = ['BECD', 'CarbEnMats', 'SLiCE', 'StructuralPanda'] as const

export type SourceOption = (typeof sourceKeys)[number]
const sourceKeyToLabel: Record<SourceOption, string> = {
  BECD: 'BECD',
  CarbEnMats: 'CarbEnMats',
  SLiCE: 'SLiCE',
  StructuralPanda: 'Structural Panda',
}

export function formatSource(source: string): string {
  return sourceKeyToLabel[source as SourceOption] || source
}

export const sourceOptions = sourceKeys.map((source) => ({
  value: source,
  label: formatSource(source),
}))

export const boxPlotOrientationOptions: { value: BoxPlotOrientation; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
]
