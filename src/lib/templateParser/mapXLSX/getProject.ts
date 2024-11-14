import { uuidv4 } from '@graphql-tools/mock/utils'
import { ImpactCategoryKey, InputAssembly, InputProject, LifeCycleStage } from '@queries'

type RequiredInputProject = Omit<InputProject, 'id'> & { id: string }

type ProjectData = Record<string, string | number>

const formatEnumString = (value: string): string => {
  if (!value) return value

  // Remove leading/trailing spaces and convert to lowercase
  let formatted = value.trim().toLowerCase()

  // Replace spaces with underscores
  formatted = formatted.replace(/\s+/g, '_')

  return formatted
}

export const getProject = (projectData: ProjectData, assemblies: InputAssembly[]) => {
  const result = {
    id: uuidv4(),
    name: (projectData['name'] as string) || 'Unknown Project',
    description: (projectData['description'] as string) || '',
    comment: (projectData['comment'] as string) || '',
    classificationSystem: projectData['classification_system'] || '',
    projectPhase: formatEnumString(String(projectData['project_phase'] || '')),
    location: getLocation(projectData),
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

    projectInfo: getProjectInfo(projectData),

    metaData: getMetaData(projectData),
  } as RequiredInputProject
  //console.log('Final project data:', JSON.stringify(result, null, 2))
  return result
}

const getMetaData = (projectData: ProjectData) => ({
  // Information
  projectClassificationSystem: String(projectData['meta_data.product_classification_system'] || ''),
  image: String(projectData['meta_data.image'] || ''),
  source: { name: String(projectData['meta_data.source.name'] || ''), url: null }, // No such field in the template

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
  assessmentMethodologyDescription: String(
    projectData['meta_data.assessment.assessment_methodology_description'] || '',
  ),
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
  gwpEnergySourcesPeriod: String(projectData['meta_data.energy.gwp_energy_sources_year'] || ''),
  siteLocationWeatherData: String(projectData['meta_data.energy.site_location_weather_data'] || ''),
  electricityProvider: String(projectData['meta_data.energy.electricity_provider'] || ''),
  electricitySource: String(projectData['meta_data.energy.electricity_source'] || ''),
  electricityCarbonFactor: String(projectData['meta_data.energy.electricity_carbon_factor'] || ''),
  electricityCarbonFactorSource: String(projectData['meta_data.energy.electricity_carbon_factor_source'] || ''),

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
  secondaryHorizontalGravitySystem: String(
    projectData['meta_data.structural.secondary_horizontal_gravity_system'] || '',
  ),
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
})

const getProjectInfo = (projectData: ProjectData) => ({
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
  buildingType: ((projectData['project_info.building_info.building_type'] as string) || '')
    .toLowerCase()
    .replace(/ /g, '_'),
  buildingTypology: [((projectData['project_info.building_info.building_typology'] as string) || '').toLowerCase()],
  buildingUsers: projectData['project_info.building_info.building_users'] || 0,
  certifications: [projectData['project_info.building_info.certifications'] || 'unknown'],
  floorsAboveGround: projectData['project_info.building_info.floors_above_ground'] || 0,
  floorsBelowGround: projectData['project_info.building_info.floors_below_ground'] || 0,
  frameType: projectData['project_info.building_info.frame_type'] || '',
  grossFloorArea: {
    value: projectData['project_info.building_info.gross_floor_area.value'] || 0,
    unit: projectData['project_info.building_info.gross_floor_area.unit'] || 'unknown',
    definition: projectData['project_info.building_info.gross_floor_area.definition'] || 'unknown',
  },
  heatedFloorArea: {
    value: projectData['project_info.building_info.heated_floor_area'] || 0,
    unit: projectData['heated_floor_area.unit'] || 'unknown',
    definition: '',
  },
  roofType: projectData['project_info.building_info.roof_type'] || '',

  // Error in parsing this date. It should not be number
  buildingCompletionYear: Number(projectData['project_info.building_info.building_completion_year']),
  buildingPermitYear: projectData['building_permit_year'] || 0,
  energyDemandHeating: projectData['building_info.energy_demand_heating'] || 0,
  energySupplyHeating: projectData['building_info.energy_supply_heating'] || 0,
  energyDemandElectricity: projectData['building_info.energy_demand_electricity'] || 0,
  energySupplyElectricity: projectData['building_info.energy_supply_electricity'] || 0,
  exportedElectricity: projectData['building_info.exported_electricity'] || 0,
  generalEnergyClass: projectData['building_info.general_energy_class'] || '',
  localEnergyClass: projectData['building_info.local_energy_class'] || '',
})

const getLocation = (projectData: ProjectData) => ({
  address: projectData['location.address'] || '',
  city: projectData['location.city'] || '',
  country: ((projectData['location.country'] as string) || 'unknown').toLowerCase(),
  latitude: projectData['location.latitude'] || 0,
  longitude: projectData['location.longitude'] || 0,
})

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

  return usedStages.size > 0 ? Array.from(usedStages) : ['a1a3' as LifeCycleStage]
}

// Function to map impact categories
const mapImpactCategories = (assemblies: InputAssembly[]): ImpactCategoryKey[] => {
  const impactTypes = Object.values(ImpactCategoryKey)
  const stages = ['a0', 'a1a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'c1', 'c2', 'c3', 'c4', 'd']

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
