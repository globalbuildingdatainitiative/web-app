// Function to map assembly data into an array of InputAssembly
import {
  ImpactCategoryKey,
  InputAssembly,
  InputClassification, InputImpactData,
  InputProduct,
  LifeCycleStage,
  Unit,
} from '@queries'
import { uuidv4 } from '@graphql-tools/mock/utils'

type ProjectData = Record<string, string | number>
type AssemblyData = Record<string, string | number>

export const getAssemblies = (assemblyDataArray: AssemblyData[], projectData: ProjectData): InputAssembly[] => {
  return assemblyDataArray.map((assemblyData) => {
    // Map the products for each assembly
    const products: InputProduct[] = [
      {
        id: uuidv4(),
        name: String(assemblyData['product.name']) || '',
        description: assemblyData['assembly.description'] as string || '',
        referenceServiceLife: assemblyData['product.reference_service_life'] as number || 0,
        impactData: getImpactData(projectData, assemblyData),
        quantity: assemblyData['product.quantity'] as number || 0,
        unit: assemblyData['product.unit'] as Unit || '',
        type: 'actual',
        metaData: null,//getProductMetaData(projectData, assemblyData),
        results: null,
        transport: null,
      },
    ]

    // Map each assembly with its data and associated products
    return {
      id: uuidv4(),
      name: assemblyData['assembly.name'] as string || '',
      description: assemblyData['assembly.description'] as string || '',
      comment: assemblyData['assembly.comment'] as string || '',
      quantity: assemblyData['assembly.areaType.value'] as number || 0,
      unit: assemblyData['assembly.areaType.unit'] as Unit || '',
      classification: [
        {
          system: projectData['classification_system'] || '',
          code: assemblyData['assembly.classification.code'] || '',
          name: assemblyData['assembly.classification.code'] || '',
        } as InputClassification,
      ],
      products: products,
      type: 'actual',
      metaData: null, // {
        // volume: {
        //   value: projectData['meta_data.volume.value'] || 0,
        //   unit: projectData['meta_data.volume.unit'] || 'unknown',
        // },
      // },
      category: '',
      results: null,
    }
  })
}

const getProductMetaData = (projectData: ProjectData, assemblyData: AssemblyData) => ({
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
})

const getImpactData = (projectData: ProjectData, assemblyData: AssemblyData) => ({
  id: uuidv4(),
  name: assemblyData['epd.name'] || '',
  declaredUnit: assemblyData['epd.declared_unit'] || '',
  version: '',
  publishedDate: new Date().toISOString().split('T')[0],
  validUntil: new Date().toISOString().split('T')[0],
  formatVersion: process.env.LCAX_VERSION || '',
  source: { name: assemblyData['epd.source.name'], type: 'actual', url: null },
  subtype: 'generic',
  standard: ((assemblyData['epd.standard'] as string) || '').toLowerCase().replace('+', ''),
  location: ((projectData['location.country'] as string) || '').toLowerCase(),
  impacts: getImpacts(assemblyData),
  type: 'actual',
  comment: '',
  conversions: null,
  metaData: null,
  referenceServiceLife: null,
} as InputImpactData)

const getImpacts = (assemblyData: AssemblyData) => {
  return Object.values(ImpactCategoryKey).reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue]:  collectImpacts(currentValue, assemblyData)}), {}) as Record<ImpactCategoryKey, Record<LifeCycleStage, number>>
}

const collectImpacts = (category: string, assemblyData: AssemblyData) => {
  return Object.values(LifeCycleStage).reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue]: assemblyData[`epd.impacts.${category}.${currentValue}`]}), {})
}