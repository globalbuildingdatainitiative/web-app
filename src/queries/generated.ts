import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** Represents binary data as Base64-encoded strings, using the standard alphabet. */
  Base64: { input: any; output: any }
  /** Date (isoformat) */
  Date: { input: any; output: any }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any }
  EmailAddress: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
  JSON: { input: any; output: any }
  UUID: { input: any; output: any }
  _FieldSet: { input: any; output: any }
}

export type AcceptInvitationInput = {
  currentPassword?: Scalars['String']['input']
  firstName?: InputMaybe<Scalars['String']['input']>
  id: Scalars['UUID']['input']
  lastName?: InputMaybe<Scalars['String']['input']>
  newPassword?: InputMaybe<Scalars['String']['input']>
}

export enum AggregationMethod {
  AVG = 'AVG',
  DIV = 'DIV',
  MAX = 'MAX',
  MEDIAN = 'MEDIAN',
  MIN = 'MIN',
  PCT25 = 'PCT25',
  PCT75 = 'PCT75',
  STD = 'STD',
  SUM = 'SUM',
}

export type AggregationResult = {
  __typename?: 'AggregationResult'
  aggregation: Array<AggregationResult>
  field: Scalars['String']['output']
  method: AggregationMethod
  value?: Maybe<Scalars['Float']['output']>
}

export type AggregationResultAggregationArgs = {
  apply: Array<InputAggregation>
}

export type AreaType = {
  __typename?: 'AreaType'
  definition: Scalars['String']['output']
  unit: Unit
  value: Scalars['Float']['output']
}

export type Assembly = {
  __typename?: 'Assembly'
  classification?: Maybe<Array<Classification>>
  comment?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  metaData?: Maybe<AssemblyMetaData>
  name: Scalars['String']['output']
  products: Array<Product>
  quantity: Scalars['Float']['output']
  results?: Maybe<Results>
  unit: Unit
}

export type AssemblyMetaData = {
  __typename?: 'AssemblyMetaData'
  volume?: Maybe<ValueUnit>
}

export type AssessmentMetaData = {
  __typename?: 'AssessmentMetaData'
  additionalLcaReportName?: Maybe<Scalars['String']['output']>
  ashrae240pCompliance?: Maybe<Scalars['Boolean']['output']>
  assessmentMethodologyDescription?: Maybe<Scalars['String']['output']>
  assessor?: Maybe<Assessor>
  bioSustainabilityCertification?: Maybe<Scalars['String']['output']>
  biogenicCarbonAccountingMethod?: Maybe<Scalars['String']['output']>
  biogenicCarbonDescription?: Maybe<Scalars['String']['output']>
  biogenicCarbonIncluded?: Maybe<Scalars['Boolean']['output']>
  cutoffMethod?: Maybe<Scalars['String']['output']>
  date?: Maybe<Scalars['Date']['output']>
  en15978Compliance?: Maybe<Scalars['Boolean']['output']>
  equipmentScope?: Maybe<Scalars['String']['output']>
  furnishingsScope?: Maybe<Scalars['String']['output']>
  interiorConstructionScope?: Maybe<Scalars['String']['output']>
  interiorFinishesScope?: Maybe<Scalars['String']['output']>
  iso21931Compliance?: Maybe<Scalars['Boolean']['output']>
  lcaRequirements?: Maybe<Scalars['String']['output']>
  operationalEnergyIncluded?: Maybe<Scalars['Boolean']['output']>
  projectPhaseAtReporting?: Maybe<Scalars['String']['output']>
  projectPhaseAtTimeOfAssessment?: Maybe<Scalars['String']['output']>
  projectRefrigerants?: Maybe<Scalars['String']['output']>
  purpose?: Maybe<Scalars['String']['output']>
  quantitySource?: Maybe<Scalars['String']['output']>
  quantitySourceDetail?: Maybe<Scalars['String']['output']>
  refrigerantTypeIncluded?: Maybe<Scalars['String']['output']>
  reportName?: Maybe<Scalars['String']['output']>
  resultsValidationDescription?: Maybe<Scalars['String']['output']>
  rics2017Compliance?: Maybe<Scalars['Boolean']['output']>
  rics2023Compliance?: Maybe<Scalars['Boolean']['output']>
  seiPrestandardCompliance?: Maybe<Scalars['Boolean']['output']>
  servicesElectricalScope?: Maybe<Scalars['String']['output']>
  servicesMechanicalScope?: Maybe<Scalars['String']['output']>
  servicesPlumbingScope?: Maybe<Scalars['String']['output']>
  shellExteriorEnclosureScope?: Maybe<Scalars['String']['output']>
  shellSuperstructureScope?: Maybe<Scalars['String']['output']>
  siteworkScope?: Maybe<Scalars['String']['output']>
  substructureScope?: Maybe<Scalars['String']['output']>
  toolReportUpload?: Maybe<Scalars['Base64']['output']>
  uncertainty?: Maybe<Scalars['Float']['output']>
  validityPeriod?: Maybe<Scalars['String']['output']>
  verified?: Maybe<Scalars['Boolean']['output']>
  verifiedInfo?: Maybe<Scalars['String']['output']>
  year?: Maybe<Scalars['Int']['output']>
}

export type Assessor = {
  __typename?: 'Assessor'
  email?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  organization?: Maybe<Scalars['String']['output']>
}

export enum BuildingModelScope {
  BUILDING_SERVICES = 'building_services',
  EXTERNAL_WORKS = 'external_works',
  FACILITATING_WORKS = 'facilitating_works',
  FF_E = 'ff_e',
  FINISHES = 'finishes',
  SUBSTRUCTURE = 'substructure',
  SUPERSTRUCTURE_ENVELOPE = 'superstructure_envelope',
  SUPERSTRUCTURE_FRAME = 'superstructure_frame',
  SUPERSTRUCTURE_INTERNAL_ELEMENTS = 'superstructure_internal_elements',
}

export enum BuildingType {
  DECONSTRUCTION_AND_NEW_CONSTRUCTION_WORKS = 'deconstruction_and_new_construction_works',
  DEMOLITION = 'demolition',
  EXTENSION_WORKS = 'extension_works',
  FIT_OUT_WORKS = 'fit_out_works',
  NEW_CONSTRUCTION_WORKS = 'new_construction_works',
  OPERATIONS = 'operations',
  OTHER = 'other',
  RETROFIT_AND_EXTENSION_WORKS = 'retrofit_and_extension_works',
  RETROFIT_WORKS = 'retrofit_works',
  UNKNOWN = 'unknown',
}

export enum BuildingTypology {
  AGRICULTURAL = 'agricultural',
  COMMERCIAL = 'commercial',
  EDUCATIONAL = 'educational',
  HEALTH = 'health',
  INDUSTRIAL = 'industrial',
  INFRASTRUCTURE = 'infrastructure',
  OFFICE = 'office',
  OTHER = 'other',
  PUBLIC = 'public',
  RESIDENTIAL = 'residential',
  UNKNOWN = 'unknown',
}

export type Classification = {
  __typename?: 'Classification'
  code: Scalars['String']['output']
  name: Scalars['String']['output']
  system: Scalars['String']['output']
}

export type Contribution = {
  __typename?: 'Contribution'
  id: Scalars['UUID']['output']
  organizationId: Scalars['UUID']['output']
  project: Project
  public: Scalars['Boolean']['output']
  uploadedAt: Scalars['DateTime']['output']
  user: User
  userId: Scalars['UUID']['output']
}

export type ContributionGraphQlGroupResponse = {
  __typename?: 'ContributionGraphQLGroupResponse'
  aggregation: Array<AggregationResult>
  count: Scalars['Int']['output']
  group: Scalars['String']['output']
  items: Array<Contribution>
}

export type ContributionGraphQlGroupResponseAggregationArgs = {
  apply: Array<InputAggregation>
}

export type ContributionGraphQlGroupResponseItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type ContributionGraphQlResponse = {
  __typename?: 'ContributionGraphQLResponse'
  /** Apply aggregation to the items. The aggregation should be specified in the 'apply' argument, which should be provided in MongoDB aggregation syntax. */
  aggregation: Scalars['JSON']['output']
  /** Total number of items in the filtered dataset. */
  count: Scalars['Int']['output']
  groups: Array<ContributionGraphQlGroupResponse>
  /** The list of items in this pagination window. */
  items?: Maybe<Array<Contribution>>
}

export type ContributionGraphQlResponseAggregationArgs = {
  apply: Scalars['JSON']['input']
}

export type ContributionGraphQlResponseCountArgs = {
  filterBy?: InputMaybe<FilterBy>
}

export type ContributionGraphQlResponseGroupsArgs = {
  groupBy: Scalars['String']['input']
  limit?: Scalars['Int']['input']
}

export type ContributionGraphQlResponseItemsArgs = {
  filterBy?: InputMaybe<FilterBy>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: Scalars['Int']['input']
  sortBy?: InputMaybe<SortBy>
}

export type Conversion = {
  __typename?: 'Conversion'
  metaData: Scalars['String']['output']
  to: Unit
  value: Scalars['Float']['output']
}

export type Cost = {
  __typename?: 'Cost'
  costSource?: Maybe<Scalars['String']['output']>
  currency?: Maybe<Scalars['String']['output']>
  hardCost?: Maybe<Scalars['Float']['output']>
  notes?: Maybe<Scalars['String']['output']>
  siteworksCost?: Maybe<Scalars['Float']['output']>
  softCost?: Maybe<Scalars['Float']['output']>
  totalCost?: Maybe<Scalars['Float']['output']>
}

export enum Country {
  ABW = 'abw',
  AFG = 'afg',
  AGO = 'ago',
  AIA = 'aia',
  ALA = 'ala',
  ALB = 'alb',
  AND_ = 'and_',
  ARE = 'are',
  ARG = 'arg',
  ARM = 'arm',
  ASM = 'asm',
  ATA = 'ata',
  ATF = 'atf',
  ATG = 'atg',
  AUS = 'aus',
  AUT = 'aut',
  AZE = 'aze',
  BDI = 'bdi',
  BEL = 'bel',
  BEN = 'ben',
  BES = 'bes',
  BFA = 'bfa',
  BGD = 'bgd',
  BGR = 'bgr',
  BHR = 'bhr',
  BHS = 'bhs',
  BIH = 'bih',
  BLM = 'blm',
  BLR = 'blr',
  BLZ = 'blz',
  BMU = 'bmu',
  BOL = 'bol',
  BRA = 'bra',
  BRB = 'brb',
  BRN = 'brn',
  BTN = 'btn',
  BVT = 'bvt',
  BWA = 'bwa',
  CAF = 'caf',
  CAN = 'can',
  CCK = 'cck',
  CHE = 'che',
  CHL = 'chl',
  CHN = 'chn',
  CIV = 'civ',
  CMR = 'cmr',
  COD = 'cod',
  COG = 'cog',
  COK = 'cok',
  COL = 'col',
  COM = 'com',
  CPV = 'cpv',
  CRI = 'cri',
  CUB = 'cub',
  CUW = 'cuw',
  CXR = 'cxr',
  CYM = 'cym',
  CYP = 'cyp',
  CZE = 'cze',
  DEU = 'deu',
  DJI = 'dji',
  DMA = 'dma',
  DNK = 'dnk',
  DOM = 'dom',
  DZA = 'dza',
  ECU = 'ecu',
  EGY = 'egy',
  ERI = 'eri',
  ESH = 'esh',
  ESP = 'esp',
  EST = 'est',
  ETH = 'eth',
  FIN = 'fin',
  FJI = 'fji',
  FLK = 'flk',
  FRA = 'fra',
  FRO = 'fro',
  FSM = 'fsm',
  GAB = 'gab',
  GBR = 'gbr',
  GEO = 'geo',
  GGY = 'ggy',
  GHA = 'gha',
  GIB = 'gib',
  GIN = 'gin',
  GLP = 'glp',
  GMB = 'gmb',
  GNB = 'gnb',
  GNQ = 'gnq',
  GRC = 'grc',
  GRD = 'grd',
  GRL = 'grl',
  GTM = 'gtm',
  GUF = 'guf',
  GUM = 'gum',
  GUY = 'guy',
  HKG = 'hkg',
  HMD = 'hmd',
  HND = 'hnd',
  HRV = 'hrv',
  HTI = 'hti',
  HUN = 'hun',
  IDN = 'idn',
  IMN = 'imn',
  IND = 'ind',
  IOT = 'iot',
  IRL = 'irl',
  IRN = 'irn',
  IRQ = 'irq',
  ISL = 'isl',
  ISR = 'isr',
  ITA = 'ita',
  JAM = 'jam',
  JEY = 'jey',
  JOR = 'jor',
  JPN = 'jpn',
  KAZ = 'kaz',
  KEN = 'ken',
  KGZ = 'kgz',
  KHM = 'khm',
  KIR = 'kir',
  KNA = 'kna',
  KOR = 'kor',
  KWT = 'kwt',
  LAO = 'lao',
  LBN = 'lbn',
  LBR = 'lbr',
  LBY = 'lby',
  LCA = 'lca',
  LIE = 'lie',
  LKA = 'lka',
  LSO = 'lso',
  LTU = 'ltu',
  LUX = 'lux',
  LVA = 'lva',
  MAC = 'mac',
  MAF = 'maf',
  MAR = 'mar',
  MCO = 'mco',
  MDA = 'mda',
  MDG = 'mdg',
  MDV = 'mdv',
  MEX = 'mex',
  MHL = 'mhl',
  MKD = 'mkd',
  MLI = 'mli',
  MLT = 'mlt',
  MMR = 'mmr',
  MNE = 'mne',
  MNG = 'mng',
  MNP = 'mnp',
  MOZ = 'moz',
  MRT = 'mrt',
  MSR = 'msr',
  MTQ = 'mtq',
  MUS = 'mus',
  MWI = 'mwi',
  MYS = 'mys',
  MYT = 'myt',
  NAM = 'nam',
  NCL = 'ncl',
  NER = 'ner',
  NFK = 'nfk',
  NGA = 'nga',
  NIC = 'nic',
  NIU = 'niu',
  NLD = 'nld',
  NOR = 'nor',
  NPL = 'npl',
  NRU = 'nru',
  NZL = 'nzl',
  OMN = 'omn',
  PAK = 'pak',
  PAN = 'pan',
  PCN = 'pcn',
  PER = 'per',
  PHL = 'phl',
  PLW = 'plw',
  PNG = 'png',
  POL = 'pol',
  PRI = 'pri',
  PRK = 'prk',
  PRT = 'prt',
  PRY = 'pry',
  PSE = 'pse',
  PYF = 'pyf',
  QAT = 'qat',
  REU = 'reu',
  ROU = 'rou',
  RUS = 'rus',
  RWA = 'rwa',
  SAU = 'sau',
  SDN = 'sdn',
  SEN = 'sen',
  SGP = 'sgp',
  SGS = 'sgs',
  SHN = 'shn',
  SJM = 'sjm',
  SLB = 'slb',
  SLE = 'sle',
  SLV = 'slv',
  SMR = 'smr',
  SOM = 'som',
  SPM = 'spm',
  SRB = 'srb',
  SSD = 'ssd',
  STP = 'stp',
  SUR = 'sur',
  SVK = 'svk',
  SVN = 'svn',
  SWE = 'swe',
  SWZ = 'swz',
  SXM = 'sxm',
  SYC = 'syc',
  SYR = 'syr',
  TCA = 'tca',
  TCD = 'tcd',
  TGO = 'tgo',
  THA = 'tha',
  TJK = 'tjk',
  TKL = 'tkl',
  TKM = 'tkm',
  TLS = 'tls',
  TON = 'ton',
  TTO = 'tto',
  TUN = 'tun',
  TUR = 'tur',
  TUV = 'tuv',
  TWN = 'twn',
  TZA = 'tza',
  UGA = 'uga',
  UKR = 'ukr',
  UMI = 'umi',
  UNKNOWN = 'unknown',
  URY = 'ury',
  USA = 'usa',
  UZB = 'uzb',
  VAT = 'vat',
  VCT = 'vct',
  VEN = 'ven',
  VGB = 'vgb',
  VIR = 'vir',
  VNM = 'vnm',
  VUT = 'vut',
  WLF = 'wlf',
  WSM = 'wsm',
  YEM = 'yem',
  ZAF = 'zaf',
  ZMB = 'zmb',
  ZWE = 'zwe',
}

export enum CountryCodes {
  ABW = 'ABW',
  AFG = 'AFG',
  AGO = 'AGO',
  AIA = 'AIA',
  ALA = 'ALA',
  ALB = 'ALB',
  AND = 'AND',
  ARE = 'ARE',
  ARG = 'ARG',
  ARM = 'ARM',
  ASM = 'ASM',
  ATA = 'ATA',
  ATF = 'ATF',
  ATG = 'ATG',
  AUS = 'AUS',
  AUT = 'AUT',
  AZE = 'AZE',
  BDI = 'BDI',
  BEL = 'BEL',
  BEN = 'BEN',
  BES = 'BES',
  BFA = 'BFA',
  BGD = 'BGD',
  BGR = 'BGR',
  BHR = 'BHR',
  BHS = 'BHS',
  BIH = 'BIH',
  BLR = 'BLR',
  BLZ = 'BLZ',
  BMU = 'BMU',
  BOL = 'BOL',
  BRA = 'BRA',
  BRB = 'BRB',
  BRN = 'BRN',
  BTN = 'BTN',
  BVT = 'BVT',
  BWA = 'BWA',
  CAF = 'CAF',
  CAN = 'CAN',
  CCK = 'CCK',
  CHE = 'CHE',
  CHL = 'CHL',
  CHN = 'CHN',
  CIV = 'CIV',
  CMR = 'CMR',
  COD = 'COD',
  COG = 'COG',
  COK = 'COK',
  COL = 'COL',
  COM = 'COM',
  CPV = 'CPV',
  CRI = 'CRI',
  CUB = 'CUB',
  CUW = 'CUW',
  CXR = 'CXR',
  CYM = 'CYM',
  CYP = 'CYP',
  CZE = 'CZE',
  DEU = 'DEU',
  DJI = 'DJI',
  DMA = 'DMA',
  DNK = 'DNK',
  DOM = 'DOM',
  DZA = 'DZA',
  ECU = 'ECU',
  EGY = 'EGY',
  ERI = 'ERI',
  ESH = 'ESH',
  ESP = 'ESP',
  EST = 'EST',
  ETH = 'ETH',
  FIN = 'FIN',
  FJI = 'FJI',
  FLK = 'FLK',
  FRA = 'FRA',
  FRO = 'FRO',
  FSM = 'FSM',
  GAB = 'GAB',
  GBR = 'GBR',
  GEO = 'GEO',
  GGY = 'GGY',
  GHA = 'GHA',
  GIB = 'GIB',
  GIN = 'GIN',
  GLP = 'GLP',
  GMB = 'GMB',
  GNB = 'GNB',
  GNQ = 'GNQ',
  GRC = 'GRC',
  GRD = 'GRD',
  GRL = 'GRL',
  GTM = 'GTM',
  GUF = 'GUF',
  GUM = 'GUM',
  GUY = 'GUY',
  HKG = 'HKG',
  HMD = 'HMD',
  HND = 'HND',
  HRV = 'HRV',
  HTI = 'HTI',
  HUN = 'HUN',
  IDN = 'IDN',
  IND = 'IND',
  IOT = 'IOT',
  IRL = 'IRL',
  IRN = 'IRN',
  IRQ = 'IRQ',
  ISL = 'ISL',
  ISR = 'ISR',
  ITA = 'ITA',
  JAM = 'JAM',
  JEY = 'JEY',
  JOR = 'JOR',
  JPN = 'JPN',
  KAZ = 'KAZ',
  KEN = 'KEN',
  KGZ = 'KGZ',
  KHM = 'KHM',
  KIR = 'KIR',
  KNA = 'KNA',
  KOR = 'KOR',
  KWT = 'KWT',
  LAO = 'LAO',
  LBN = 'LBN',
  LBR = 'LBR',
  LBY = 'LBY',
  LCA = 'LCA',
  LIE = 'LIE',
  LKA = 'LKA',
  LSO = 'LSO',
  LTU = 'LTU',
  LUX = 'LUX',
  LVA = 'LVA',
  MAC = 'MAC',
  MAF = 'MAF',
  MAR = 'MAR',
  MCO = 'MCO',
  MDA = 'MDA',
  MDG = 'MDG',
  MDV = 'MDV',
  MEX = 'MEX',
  MHL = 'MHL',
  MLI = 'MLI',
  MLT = 'MLT',
  MMR = 'MMR',
  MNE = 'MNE',
  MNG = 'MNG',
  MNP = 'MNP',
  MOZ = 'MOZ',
  MRT = 'MRT',
  MSR = 'MSR',
  MTQ = 'MTQ',
  MUS = 'MUS',
  MWI = 'MWI',
  MYS = 'MYS',
  MYT = 'MYT',
  NAM = 'NAM',
  NCL = 'NCL',
  NER = 'NER',
  NFK = 'NFK',
  NGA = 'NGA',
  NIC = 'NIC',
  NIU = 'NIU',
  NLD = 'NLD',
  NOR = 'NOR',
  NPL = 'NPL',
  NRU = 'NRU',
  NZL = 'NZL',
  OMN = 'OMN',
  PAK = 'PAK',
  PAN = 'PAN',
  PCN = 'PCN',
  PER = 'PER',
  PHL = 'PHL',
  PLW = 'PLW',
  PNG = 'PNG',
  POL = 'POL',
  PRI = 'PRI',
  PRK = 'PRK',
  PRT = 'PRT',
  PRY = 'PRY',
  PSE = 'PSE',
  PYF = 'PYF',
  QAT = 'QAT',
  REU = 'REU',
  ROU = 'ROU',
  RUS = 'RUS',
  RWA = 'RWA',
  RYU = 'RYU',
  SAU = 'SAU',
  SBH = 'SBH',
  SDN = 'SDN',
  SEN = 'SEN',
  SGP = 'SGP',
  SGS = 'SGS',
  SHN = 'SHN',
  SJM = 'SJM',
  SLB = 'SLB',
  SLE = 'SLE',
  SLV = 'SLV',
  SMR = 'SMR',
  SOM = 'SOM',
  SPM = 'SPM',
  SRB = 'SRB',
  SSD = 'SSD',
  STP = 'STP',
  SUR = 'SUR',
  SVK = 'SVK',
  SVN = 'SVN',
  SWE = 'SWE',
  SWZ = 'SWZ',
  SXM = 'SXM',
  SYC = 'SYC',
  SYR = 'SYR',
  TCA = 'TCA',
  TCD = 'TCD',
  TGO = 'TGO',
  THA = 'THA',
  TJK = 'TJK',
  TKL = 'TKL',
  TKM = 'TKM',
  TLS = 'TLS',
  TON = 'TON',
  TTO = 'TTO',
  TUN = 'TUN',
  TUR = 'TUR',
  TUV = 'TUV',
  TWN = 'TWN',
  TZA = 'TZA',
  UGA = 'UGA',
  UKR = 'UKR',
  UMI = 'UMI',
  URY = 'URY',
  USA = 'USA',
  UZB = 'UZB',
  VAT = 'VAT',
  VCT = 'VCT',
  VEN = 'VEN',
  VGB = 'VGB',
  VIR = 'VIR',
  VNM = 'VNM',
  VUT = 'VUT',
  WLF = 'WLF',
  WSM = 'WSM',
  YEM = 'YEM',
  ZAF = 'ZAF',
  ZMB = 'ZMB',
  ZWE = 'ZWE',
}

export type Epd = {
  __typename?: 'EPD'
  comment?: Maybe<Scalars['String']['output']>
  conversions?: Maybe<Array<Conversion>>
  declaredUnit: Unit
  formatVersion: Scalars['String']['output']
  id: Scalars['UUID']['output']
  impacts: Results
  location: Country
  metaData: Scalars['JSON']['output']
  name: Scalars['String']['output']
  publishedDate: Scalars['Date']['output']
  referenceServiceLife?: Maybe<Scalars['Int']['output']>
  source?: Maybe<Source>
  standard: Standard
  subtype: SubType
  validUntil: Scalars['Date']['output']
  version: Scalars['String']['output']
}

export type EpdTechFlow = Epd | TechFlow

export type Energy = {
  __typename?: 'Energy'
  electricityCarbonFactor?: Maybe<Scalars['Float']['output']>
  electricityCarbonFactorSource?: Maybe<Scalars['String']['output']>
  electricityProvider?: Maybe<Scalars['String']['output']>
  electricitySource?: Maybe<Scalars['String']['output']>
  energyModelMethodologyReference?: Maybe<Scalars['String']['output']>
  gwpEnergySourcesYear?: Maybe<Scalars['Float']['output']>
  siteLocationWeatherData?: Maybe<Scalars['String']['output']>
  toolEnergyModeling?: Maybe<Scalars['String']['output']>
  toolEnergyModelingVersion?: Maybe<Scalars['String']['output']>
}

export type FilterBy = {
  contains?: InputMaybe<Scalars['JSON']['input']>
  endsWith?: InputMaybe<Scalars['JSON']['input']>
  equal?: InputMaybe<Scalars['JSON']['input']>
  gt?: InputMaybe<Scalars['JSON']['input']>
  gte?: InputMaybe<Scalars['JSON']['input']>
  in?: InputMaybe<Scalars['JSON']['input']>
  isTrue?: InputMaybe<Scalars['Boolean']['input']>
  lt?: InputMaybe<Scalars['JSON']['input']>
  lte?: InputMaybe<Scalars['JSON']['input']>
  notEqual?: InputMaybe<Scalars['JSON']['input']>
  startsWith?: InputMaybe<Scalars['JSON']['input']>
}

export type FilterOptions = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equal?: InputMaybe<Scalars['String']['input']>
  isTrue?: InputMaybe<Scalars['Boolean']['input']>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export enum GeneralEnergyClass {
  ADVANCED = 'advanced',
  EXISTING = 'existing',
  STANDARD = 'standard',
  UNKNOWN = 'unknown',
}

export enum ImpactCategoryKey {
  ADPE = 'adpe',
  ADPF = 'adpf',
  AP = 'ap',
  CRU = 'cru',
  EEE = 'eee',
  EET = 'eet',
  EP = 'ep',
  EP_FW = 'ep_fw',
  EP_MAR = 'ep_mar',
  EP_TER = 'ep_ter',
  ETP_FW = 'etp_fw',
  FW = 'fw',
  GWP = 'gwp',
  GWP_BIO = 'gwp_bio',
  GWP_FOS = 'gwp_fos',
  GWP_LUL = 'gwp_lul',
  HTP_C = 'htp_c',
  HTP_NC = 'htp_nc',
  HWD = 'hwd',
  IRP = 'irp',
  MER = 'mer',
  MRF = 'mrf',
  NHWD = 'nhwd',
  NRSF = 'nrsf',
  ODP = 'odp',
  PENRE = 'penre',
  PENRM = 'penrm',
  PENRT = 'penrt',
  PERE = 'pere',
  PERM = 'perm',
  PERT = 'pert',
  PM = 'pm',
  POCP = 'pocp',
  RSF = 'rsf',
  RWD = 'rwd',
  SM = 'sm',
  SQP = 'sqp',
  WDP = 'wdp',
}

export type ImpactCategoryResults = {
  __typename?: 'ImpactCategoryResults'
  a0?: Maybe<Scalars['Float']['output']>
  a1a3?: Maybe<Scalars['Float']['output']>
  a4?: Maybe<Scalars['Float']['output']>
  a5?: Maybe<Scalars['Float']['output']>
  b1?: Maybe<Scalars['Float']['output']>
  b2?: Maybe<Scalars['Float']['output']>
  b3?: Maybe<Scalars['Float']['output']>
  b4?: Maybe<Scalars['Float']['output']>
  b5?: Maybe<Scalars['Float']['output']>
  b6?: Maybe<Scalars['Float']['output']>
  b7?: Maybe<Scalars['Float']['output']>
  b8?: Maybe<Scalars['Float']['output']>
  c1?: Maybe<Scalars['Float']['output']>
  c2?: Maybe<Scalars['Float']['output']>
  c3?: Maybe<Scalars['Float']['output']>
  c4?: Maybe<Scalars['Float']['output']>
  d?: Maybe<Scalars['Float']['output']>
  total?: Maybe<Scalars['Float']['output']>
}

export type InputAggregation = {
  field: Scalars['String']['input']
  field2?: InputMaybe<Scalars['String']['input']>
  method: AggregationMethod
}

export type InputAreaType = {
  definition: Scalars['String']['input']
  unit: Unit
  value: Scalars['Float']['input']
}

export type InputAssembly = {
  category?: InputMaybe<Scalars['String']['input']>
  classification?: InputMaybe<Array<InputClassification>>
  comment?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  products: Array<InputProduct>
  quantity: Scalars['Float']['input']
  results?: InputMaybe<Scalars['JSON']['input']>
  type: Scalars['String']['input']
  unit: Unit
}

export type InputClassification = {
  code: Scalars['String']['input']
  name: Scalars['String']['input']
  system: Scalars['String']['input']
}

export type InputContribution = {
  project: InputProject
  public?: Scalars['Boolean']['input']
}

export type InputConversion = {
  metaData?: InputMaybe<Scalars['String']['input']>
  to: Unit
  value: Scalars['Float']['input']
}

export type InputImpactData = {
  comment?: InputMaybe<Scalars['String']['input']>
  conversions?: InputMaybe<Array<InputConversion>>
  declaredUnit: Unit
  formatVersion: Scalars['String']['input']
  id?: InputMaybe<Scalars['UUID']['input']>
  impacts: Scalars['JSON']['input']
  location: Country
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  publishedDate?: InputMaybe<Scalars['Date']['input']>
  referenceServiceLife?: InputMaybe<Scalars['Int']['input']>
  source?: InputMaybe<InputSource>
  standard?: InputMaybe<Standard>
  subtype?: InputMaybe<SubType>
  type: Scalars['String']['input']
  validUntil?: InputMaybe<Scalars['Date']['input']>
  version?: InputMaybe<Scalars['String']['input']>
}

export type InputLocation = {
  address?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  country: Country
}

export type InputOrganization = {
  address: Scalars['String']['input']
  city: Scalars['String']['input']
  country: CountryCodes
  id?: Scalars['UUID']['input']
  metaData?: InputOrganizationMetaData
  name: Scalars['String']['input']
}

export type InputOrganizationMetaData = {
  stakeholders?: Array<StakeholderEnum>
}

export type InputProduct = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  impactData: InputImpactData
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  quantity: Scalars['Float']['input']
  referenceServiceLife: Scalars['Int']['input']
  results?: InputMaybe<Scalars['JSON']['input']>
  transport?: InputMaybe<Scalars['JSON']['input']>
  type: Scalars['String']['input']
  unit: Unit
}

export type InputProject = {
  assemblies: Array<InputAssembly>
  classificationSystem?: InputMaybe<Scalars['String']['input']>
  comment?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  formatVersion: Scalars['String']['input']
  id?: InputMaybe<Scalars['UUID']['input']>
  impactCategories: Array<ImpactCategoryKey>
  lciaMethod?: InputMaybe<Scalars['String']['input']>
  lifeCycleStages: Array<LifeCycleStage>
  location: InputLocation
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  owner?: InputMaybe<Scalars['String']['input']>
  projectInfo?: InputMaybe<InputProjectInfo>
  projectPhase: ProjectPhase
  referenceStudyPeriod?: InputMaybe<Scalars['Int']['input']>
  results?: InputMaybe<Scalars['JSON']['input']>
  softwareInfo: InputSoftwareInfo
}

export type InputProjectInfo = {
  buildingCompletionYear?: InputMaybe<Scalars['Int']['input']>
  buildingFootprint?: InputMaybe<InputValueUnit>
  buildingHeight?: InputMaybe<InputValueUnit>
  buildingMass?: InputMaybe<InputValueUnit>
  buildingModelScope?: InputMaybe<Array<BuildingModelScope>>
  buildingPermitYear?: InputMaybe<Scalars['Int']['input']>
  buildingType?: InputMaybe<BuildingType>
  buildingTypology?: InputMaybe<Array<BuildingTypology>>
  buildingUsers?: InputMaybe<Scalars['Int']['input']>
  certifications?: InputMaybe<Array<Scalars['String']['input']>>
  energyDemandElectricity?: InputMaybe<Scalars['Float']['input']>
  energyDemandHeating?: InputMaybe<Scalars['Float']['input']>
  energySupplyElectricity?: InputMaybe<Scalars['Float']['input']>
  energySupplyHeating?: InputMaybe<Scalars['Float']['input']>
  exportedElectricity?: InputMaybe<Scalars['Float']['input']>
  floorsAboveGround: Scalars['Int']['input']
  floorsBelowGround?: InputMaybe<Scalars['Int']['input']>
  frameType?: InputMaybe<Scalars['String']['input']>
  generalEnergyClass?: InputMaybe<GeneralEnergyClass>
  grossFloorArea: InputAreaType
  heatedFloorArea?: InputMaybe<InputAreaType>
  localEnergyClass?: InputMaybe<Scalars['String']['input']>
  roofType?: InputMaybe<RoofType>
  type: Scalars['String']['input']
}

export type InputSoftwareInfo = {
  calculationType?: InputMaybe<Scalars['String']['input']>
  goalAndScopeDefinition?: InputMaybe<Scalars['String']['input']>
  lcaSoftware: Scalars['String']['input']
}

export type InputSource = {
  name: Scalars['String']['input']
  url?: InputMaybe<Scalars['String']['input']>
}

export type InputValueUnit = {
  unit: Unit
  value: Scalars['Float']['input']
}

export type InviteResult = {
  __typename?: 'InviteResult'
  email: Scalars['String']['output']
  message: Scalars['String']['output']
  status: Scalars['String']['output']
}

export enum InviteStatus {
  ACCEPTED = 'ACCEPTED',
  NONE = 'NONE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export type InviteUsersInput = {
  emails: Array<Scalars['String']['input']>
}

export enum LifeCycleStage {
  A0 = 'a0',
  A1A3 = 'a1a3',
  A4 = 'a4',
  A5 = 'a5',
  B1 = 'b1',
  B2 = 'b2',
  B3 = 'b3',
  B4 = 'b4',
  B5 = 'b5',
  B6 = 'b6',
  B7 = 'b7',
  B8 = 'b8',
  C1 = 'c1',
  C2 = 'c2',
  C3 = 'c3',
  C4 = 'c4',
  D = 'd',
}

export type Location = {
  __typename?: 'Location'
  address?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  country: Country
  countryName: Scalars['String']['output']
  latitude: Scalars['Float']['output']
  longitude: Scalars['Float']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Accept an invitation */
  acceptInvitation: Scalars['Boolean']['output']
  /** Creates new Contributions */
  addContributions: Array<Contribution>
  /** Creates multiple organizations and associates them with the current user */
  createOrganizations: Array<Organization>
  /** Deletes Contributions */
  deleteContributions: Array<Scalars['UUID']['output']>
  /** Deletes a list of Organizations by their IDs and returns a list of deleted IDs */
  deleteOrganizations: Array<Scalars['UUID']['output']>
  /** Impersonate a different user */
  impersonate: Scalars['Boolean']['output']
  /** Invite users to the organization */
  inviteUsers: Array<InviteResult>
  /** Assign admin role to a user */
  makeAdmin: Scalars['Boolean']['output']
  /** Reject an invitation */
  rejectInvitation: Scalars['Boolean']['output']
  /** Resend an invitation */
  resendInvitation: InviteResult
  /** Updates Contributions */
  updateContributions: Array<Contribution>
  /** Updates an existing Organization */
  updateOrganizations: Array<Organization>
  /** Update user details */
  updateUser: User
}

export type MutationAcceptInvitationArgs = {
  user: AcceptInvitationInput
}

export type MutationAddContributionsArgs = {
  contributions: Array<InputContribution>
}

export type MutationCreateOrganizationsArgs = {
  organizations: Array<InputOrganization>
}

export type MutationDeleteContributionsArgs = {
  contributions: Array<Scalars['UUID']['input']>
}

export type MutationDeleteOrganizationsArgs = {
  ids: Array<Scalars['UUID']['input']>
}

export type MutationImpersonateArgs = {
  userId: Scalars['String']['input']
}

export type MutationInviteUsersArgs = {
  input: InviteUsersInput
}

export type MutationMakeAdminArgs = {
  userId: Scalars['String']['input']
}

export type MutationRejectInvitationArgs = {
  userId: Scalars['String']['input']
}

export type MutationResendInvitationArgs = {
  userId: Scalars['String']['input']
}

export type MutationUpdateContributionsArgs = {
  contributions: Array<UpdateContribution>
}

export type MutationUpdateOrganizationsArgs = {
  organizations: Array<InputOrganization>
}

export type MutationUpdateUserArgs = {
  userInput: UpdateUserInput
}

export type Organization = {
  __typename?: 'Organization'
  address: Scalars['String']['output']
  city: Scalars['String']['output']
  country: CountryCodes
  id: Scalars['UUID']['output']
  metaData: OrganizationMetaData
  name: Scalars['String']['output']
}

export type OrganizationFilter = {
  address?: InputMaybe<FilterOptions>
  city?: InputMaybe<FilterOptions>
  country?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  metaData?: InputMaybe<OrganizationMetaDataFilter>
  name?: InputMaybe<FilterOptions>
}

export type OrganizationMetaData = {
  __typename?: 'OrganizationMetaData'
  stakeholders: Array<StakeholderEnum>
}

export type OrganizationMetaDataFilter = {
  stakeholders?: InputMaybe<FilterOptions>
}

export type Owner = {
  __typename?: 'Owner'
  contact?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  representative?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  web?: Maybe<Scalars['String']['output']>
}

export enum Permission {
  CONTRIBUTIONS_CREATE = 'CONTRIBUTIONS_CREATE',
  CONTRIBUTIONS_DELETE = 'CONTRIBUTIONS_DELETE',
  CONTRIBUTIONS_READ = 'CONTRIBUTIONS_READ',
  CONTRIBUTIONS_UPDATE = 'CONTRIBUTIONS_UPDATE',
  MEMBERS_CREATE = 'MEMBERS_CREATE',
  MEMBERS_DELETE = 'MEMBERS_DELETE',
  MEMBERS_READ = 'MEMBERS_READ',
  MEMBERS_UPDATE = 'MEMBERS_UPDATE',
  ORGANIZATIONS_CREATE = 'ORGANIZATIONS_CREATE',
  ORGANIZATIONS_DELETE = 'ORGANIZATIONS_DELETE',
  ORGANIZATIONS_READ = 'ORGANIZATIONS_READ',
  ORGANIZATIONS_UPDATE = 'ORGANIZATIONS_UPDATE',
}

export type Product = {
  __typename?: 'Product'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  impactData: EpdTechFlow
  metaData?: Maybe<ProductMetaData>
  name: Scalars['String']['output']
  quantity: Scalars['Float']['output']
  referenceServiceLife: Scalars['Int']['output']
  results?: Maybe<Results>
  unit: Unit
}

export type ProductMetaData = {
  __typename?: 'ProductMetaData'
  brickGroutIncluded?: Maybe<Scalars['Boolean']['output']>
  brickType?: Maybe<Scalars['String']['output']>
  concretePrecast?: Maybe<Scalars['String']['output']>
  density?: Maybe<ValueUnit>
  exposureClasses?: Maybe<Scalars['String']['output']>
  groutType?: Maybe<Scalars['String']['output']>
  productClass?: Maybe<Scalars['String']['output']>
  strength?: Maybe<ValueUnit>
  timberType?: Maybe<Scalars['String']['output']>
}

export type Project = {
  __typename?: 'Project'
  assemblies: Array<Assembly>
  classificationSystem?: Maybe<Scalars['String']['output']>
  comment?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  formatVersion: Scalars['String']['output']
  id: Scalars['UUID']['output']
  impactCategories: Array<ImpactCategoryKey>
  lciaMethod?: Maybe<Scalars['String']['output']>
  lifeCycleStages: Array<LifeCycleStage>
  location: Location
  metaData?: Maybe<ProjectMetaData>
  name: Scalars['String']['output']
  owner?: Maybe<Scalars['String']['output']>
  projectInfo: ProjectInfo
  projectPhase: ProjectPhase
  referenceStudyPeriod?: Maybe<Scalars['Int']['output']>
  results?: Maybe<Results>
  softwareInfo: SoftwareInfo
}

export type ProjectGraphQlGroupResponse = {
  __typename?: 'ProjectGraphQLGroupResponse'
  aggregation: Array<AggregationResult>
  count: Scalars['Int']['output']
  group: Scalars['String']['output']
  items: Array<Project>
}

export type ProjectGraphQlGroupResponseAggregationArgs = {
  apply: Array<InputAggregation>
}

export type ProjectGraphQlGroupResponseItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type ProjectGraphQlResponse = {
  __typename?: 'ProjectGraphQLResponse'
  /** Apply aggregation to the items. The aggregation should be specified in the 'apply' argument, which should be provided in MongoDB aggregation syntax. */
  aggregation: Scalars['JSON']['output']
  /** Total number of items in the filtered dataset. */
  count: Scalars['Int']['output']
  groups: Array<ProjectGraphQlGroupResponse>
  /** The list of items in this pagination window. */
  items?: Maybe<Array<Project>>
}

export type ProjectGraphQlResponseAggregationArgs = {
  apply: Scalars['JSON']['input']
}

export type ProjectGraphQlResponseCountArgs = {
  filterBy?: InputMaybe<FilterBy>
}

export type ProjectGraphQlResponseGroupsArgs = {
  groupBy: Scalars['String']['input']
  limit?: Scalars['Int']['input']
}

export type ProjectGraphQlResponseItemsArgs = {
  filterBy?: InputMaybe<FilterBy>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: Scalars['Int']['input']
  sortBy?: InputMaybe<SortBy>
}

export type ProjectInfo = {
  __typename?: 'ProjectInfo'
  buildingCompletionYear?: Maybe<Scalars['Int']['output']>
  buildingFootprint?: Maybe<ValueUnit>
  buildingHeight?: Maybe<ValueUnit>
  buildingMass?: Maybe<ValueUnit>
  buildingModelScope?: Maybe<Array<BuildingModelScope>>
  buildingPermitYear?: Maybe<Scalars['Int']['output']>
  buildingType: BuildingType
  buildingTypology: Array<BuildingTypology>
  buildingUsers?: Maybe<Scalars['Int']['output']>
  certifications?: Maybe<Array<Scalars['String']['output']>>
  energyDemandElectricity?: Maybe<Scalars['Float']['output']>
  energyDemandHeating?: Maybe<Scalars['Float']['output']>
  energySupplyElectricity?: Maybe<Scalars['Float']['output']>
  energySupplyHeating?: Maybe<Scalars['Float']['output']>
  exportedElectricity?: Maybe<Scalars['Float']['output']>
  floorsAboveGround: Scalars['Int']['output']
  floorsBelowGround?: Maybe<Scalars['Int']['output']>
  frameType?: Maybe<Scalars['String']['output']>
  generalEnergyClass: GeneralEnergyClass
  grossFloorArea?: Maybe<AreaType>
  heatedFloorArea?: Maybe<AreaType>
  localEnergyClass?: Maybe<Scalars['String']['output']>
  roofType: RoofType
}

export type ProjectMetaData = {
  __typename?: 'ProjectMetaData'
  architectOfRecord?: Maybe<Scalars['String']['output']>
  assessment?: Maybe<AssessmentMetaData>
  assessmentCostCutoff?: Maybe<Scalars['String']['output']>
  assessmentCutoff?: Maybe<Scalars['String']['output']>
  assessmentCutoffType?: Maybe<Scalars['String']['output']>
  bedroomCount?: Maybe<Scalars['Int']['output']>
  buildingOccupancyStart?: Maybe<Scalars['String']['output']>
  buildingProjectConstructionType2?: Maybe<Scalars['String']['output']>
  buildingUseType?: Maybe<Scalars['String']['output']>
  builtFloorArea?: Maybe<ValueUnit>
  civilEngineer?: Maybe<Scalars['String']['output']>
  climateZone?: Maybe<Scalars['String']['output']>
  conditionedFloorArea?: Maybe<ValueUnit>
  constructionStart?: Maybe<Scalars['String']['output']>
  constructionYearExistingBuilding?: Maybe<Scalars['Int']['output']>
  cost?: Maybe<Cost>
  demolishedArea?: Maybe<ValueUnit>
  detachedParkingArea?: Maybe<ValueUnit>
  detachedParkingStructureArea?: Maybe<ValueUnit>
  enclosedParkingArea?: Maybe<ValueUnit>
  energy?: Maybe<Energy>
  existingArea?: Maybe<ValueUnit>
  fullTimeEquivalent?: Maybe<Scalars['Float']['output']>
  generalContractor?: Maybe<Scalars['String']['output']>
  heritageStatus?: Maybe<Scalars['String']['output']>
  ibcConstructionType?: Maybe<Scalars['String']['output']>
  image?: Maybe<Scalars['Base64']['output']>
  infrastructureProjectConstructionType?: Maybe<Scalars['String']['output']>
  infrastructureSectorType?: Maybe<Scalars['String']['output']>
  infrastructureUseType?: Maybe<Scalars['String']['output']>
  interiorDesigner?: Maybe<Scalars['String']['output']>
  interstitialFloors?: Maybe<Scalars['String']['output']>
  landscapeConsultant?: Maybe<Scalars['String']['output']>
  lcaDatabase?: Maybe<Scalars['String']['output']>
  lcaDatabaseOther?: Maybe<Scalars['String']['output']>
  lcaDatabaseVersion?: Maybe<Scalars['String']['output']>
  lcaModelType?: Maybe<Scalars['String']['output']>
  lcaSoftwareVersion?: Maybe<Scalars['String']['output']>
  meanRoofHeight?: Maybe<ValueUnit>
  mepEngineer?: Maybe<Scalars['String']['output']>
  newlyBuiltArea?: Maybe<ValueUnit>
  occupantLoad?: Maybe<Scalars['Float']['output']>
  omniclassConstructionEntity?: Maybe<Scalars['String']['output']>
  otherProjectTeam?: Maybe<Scalars['String']['output']>
  owner?: Maybe<Owner>
  productClassificationSystem?: Maybe<Scalars['String']['output']>
  projectExpectedLife?: Maybe<Scalars['Int']['output']>
  projectHistoric?: Maybe<Scalars['Boolean']['output']>
  projectSiteArea?: Maybe<ValueUnit>
  projectSurroundings?: Maybe<Scalars['String']['output']>
  projectUserStudio?: Maybe<Scalars['String']['output']>
  projectWorkArea?: Maybe<ValueUnit>
  publication?: Maybe<Publication>
  residentialUnits?: Maybe<Scalars['Int']['output']>
  resultsValidatedAsBuilt?: Maybe<Scalars['Boolean']['output']>
  resultsValidatedAsBuiltDescription?: Maybe<Scalars['String']['output']>
  retrofittedArea?: Maybe<ValueUnit>
  source?: Maybe<Source>
  structural?: Maybe<Structural>
  structuralEngineer?: Maybe<Scalars['String']['output']>
  surfaceParkingArea?: Maybe<ValueUnit>
  sustainabilityConsultant?: Maybe<Scalars['String']['output']>
  thermalEnvelopeArea?: Maybe<ValueUnit>
  unconditionedFloorArea?: Maybe<ValueUnit>
  windowWallRatio?: Maybe<Scalars['Float']['output']>
  workCompletionYear?: Maybe<Scalars['Int']['output']>
}

export enum ProjectPhase {
  CONCEPT_DESIGN = 'concept_design',
  CONSTRUCTION = 'construction',
  IN_USE = 'in_use',
  OTHER = 'other',
  POST_COMPLETION = 'post_completion',
  STRATEGIC_DESIGN = 'strategic_design',
  TECHNICAL_DESIGN = 'technical_design',
}

export type Publication = {
  __typename?: 'Publication'
  authors?: Maybe<Scalars['String']['output']>
  doi?: Maybe<Scalars['String']['output']>
  publisher?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  year?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  /** Returns all contributions of a user's organization */
  contributions: ContributionGraphQlResponse
  /** Returns all Organizations */
  organizations: Array<Organization>
  /** Returns all projects of a user's organization */
  projects: ProjectGraphQlResponse
  /** Returns all Roles and their permissions */
  roles: Array<RolePermission>
  /** Returns all Users */
  users: Array<User>
}

export type QueryOrganizationsArgs = {
  filters?: InputMaybe<OrganizationFilter>
}

export type QueryUsersArgs = {
  filters?: InputMaybe<UserFilters>
  sortBy?: InputMaybe<UserSort>
}

export type Results = {
  __typename?: 'Results'
  adpe?: Maybe<ImpactCategoryResults>
  adpf?: Maybe<ImpactCategoryResults>
  ap?: Maybe<ImpactCategoryResults>
  cru?: Maybe<ImpactCategoryResults>
  eee?: Maybe<ImpactCategoryResults>
  eet?: Maybe<ImpactCategoryResults>
  ep?: Maybe<ImpactCategoryResults>
  epFw?: Maybe<ImpactCategoryResults>
  epMar?: Maybe<ImpactCategoryResults>
  epTer?: Maybe<ImpactCategoryResults>
  etpFw?: Maybe<ImpactCategoryResults>
  fw?: Maybe<ImpactCategoryResults>
  gwp?: Maybe<ImpactCategoryResults>
  gwpBio?: Maybe<ImpactCategoryResults>
  gwpFos?: Maybe<ImpactCategoryResults>
  gwpLul?: Maybe<ImpactCategoryResults>
  htpC?: Maybe<ImpactCategoryResults>
  htpNc?: Maybe<ImpactCategoryResults>
  hwd?: Maybe<ImpactCategoryResults>
  irp?: Maybe<ImpactCategoryResults>
  mer?: Maybe<ImpactCategoryResults>
  mrf?: Maybe<ImpactCategoryResults>
  nhwd?: Maybe<ImpactCategoryResults>
  nrsf?: Maybe<ImpactCategoryResults>
  odp?: Maybe<ImpactCategoryResults>
  penre?: Maybe<ImpactCategoryResults>
  penrm?: Maybe<ImpactCategoryResults>
  penrt?: Maybe<ImpactCategoryResults>
  pere?: Maybe<ImpactCategoryResults>
  perm?: Maybe<ImpactCategoryResults>
  pert?: Maybe<ImpactCategoryResults>
  pm?: Maybe<ImpactCategoryResults>
  pocp?: Maybe<ImpactCategoryResults>
  rsf?: Maybe<ImpactCategoryResults>
  rwd?: Maybe<ImpactCategoryResults>
  sm?: Maybe<ImpactCategoryResults>
  sqp?: Maybe<ImpactCategoryResults>
  wdp?: Maybe<ImpactCategoryResults>
}

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER',
}

export type RolePermission = {
  __typename?: 'RolePermission'
  name: Role
  permissions: Array<Permission>
}

export enum RoofType {
  FLAT = 'flat',
  OTHER = 'other',
  PITCHED = 'pitched',
  PYRAMID = 'pyramid',
  SADDLE = 'saddle',
  UNKNOWN = 'unknown',
}

export type SoftwareInfo = {
  __typename?: 'SoftwareInfo'
  calculationType?: Maybe<Scalars['String']['output']>
  goalAndScopeDefinition?: Maybe<Scalars['String']['output']>
  lcaSoftware: Scalars['String']['output']
}

export type SortBy = {
  asc?: InputMaybe<Scalars['String']['input']>
  dsc?: InputMaybe<Scalars['String']['input']>
}

export type Source = {
  __typename?: 'Source'
  name: Scalars['String']['output']
  url?: Maybe<Scalars['String']['output']>
}

export enum StakeholderEnum {
  BUILDING_DATA_OWNERS = 'BUILDING_DATA_OWNERS',
  BUILDING_USERS = 'BUILDING_USERS',
  CIVIL_SOCIETY = 'CIVIL_SOCIETY',
  CLIENTS_INVESTORS_OWNERS = 'CLIENTS_INVESTORS_OWNERS',
  CONSTRUCTION_COMPANIES = 'CONSTRUCTION_COMPANIES',
  CONSTRUCTION_PRODUCT_MANUFACTURERS = 'CONSTRUCTION_PRODUCT_MANUFACTURERS',
  DESIGN_PROFESSIONALS = 'DESIGN_PROFESSIONALS',
  ESG_CONSULTANTS = 'ESG_CONSULTANTS',
  FACILITY_MANAGERS = 'FACILITY_MANAGERS',
  FINANCIAL_SERVICE_PROVIDERS = 'FINANCIAL_SERVICE_PROVIDERS',
  FUNDING_SYSTEM_DEVELOPERS = 'FUNDING_SYSTEM_DEVELOPERS',
  LCA_CONSULTANTS = 'LCA_CONSULTANTS',
  LCA_TOOL_DEVELOPERS = 'LCA_TOOL_DEVELOPERS',
  MEDIA_REPRESENTATIVES = 'MEDIA_REPRESENTATIVES',
  POLICY_LAW_MAKERS = 'POLICY_LAW_MAKERS',
  PRODUCT_LCA_DATABASE_DEVELOPERS = 'PRODUCT_LCA_DATABASE_DEVELOPERS',
  PRODUCT_LCA_EPD_DATA_DEVELOPERS = 'PRODUCT_LCA_EPD_DATA_DEVELOPERS',
  RESEARCHERS = 'RESEARCHERS',
  STANDARDIZATION_BODIES = 'STANDARDIZATION_BODIES',
  SURVEYORS_VALUATION_PROFESSIONALS = 'SURVEYORS_VALUATION_PROFESSIONALS',
  SUSTAINABILITY_ASSESSMENT_SYSTEM_DEVELOPERS = 'SUSTAINABILITY_ASSESSMENT_SYSTEM_DEVELOPERS',
  SUSTAINABILITY_AUDITORS = 'SUSTAINABILITY_AUDITORS',
}

export enum Standard {
  EN15804A1 = 'en15804a1',
  EN15804A2 = 'en15804a2',
  UNKNOWN = 'unknown',
}

export type Structural = {
  __typename?: 'Structural'
  allowableSoilBearingPressure?: Maybe<ValueUnit>
  columnGridLong?: Maybe<ValueUnit>
  earthquakeImportanceFactor?: Maybe<Scalars['Float']['output']>
  foundationType?: Maybe<Scalars['String']['output']>
  horizontalGravitySystem?: Maybe<Scalars['String']['output']>
  lateralSystem?: Maybe<Scalars['String']['output']>
  liveLoad?: Maybe<ValueUnit>
  podium?: Maybe<Scalars['String']['output']>
  riskCategory?: Maybe<Scalars['String']['output']>
  secondaryHorizontalGravitySystem?: Maybe<Scalars['String']['output']>
  secondaryVerticalGravitySystem?: Maybe<Scalars['String']['output']>
  seismicDesignCategory?: Maybe<Scalars['String']['output']>
  snowLoad?: Maybe<ValueUnit>
  verticalGravitySystem?: Maybe<Scalars['String']['output']>
  windSpeed?: Maybe<ValueUnit>
}

export enum SubType {
  GENERIC = 'generic',
  INDUSTRY = 'industry',
  REPRESENTATIVE = 'representative',
  SPECIFIC = 'specific',
}

export type TechFlow = {
  __typename?: 'TechFlow'
  comment?: Maybe<Scalars['String']['output']>
  conversions?: Maybe<Array<Conversion>>
  declaredUnit: Unit
  formatVersion: Scalars['String']['output']
  id: Scalars['UUID']['output']
  impacts: Results
  location: Country
  metaData: Scalars['JSON']['output']
  name: Scalars['String']['output']
  source?: Maybe<Source>
}

export enum Unit {
  KG = 'kg',
  KGM3 = 'kgm3',
  KM = 'km',
  KWH = 'kwh',
  L = 'l',
  M = 'm',
  M2 = 'm2',
  M2R1 = 'm2r1',
  M3 = 'm3',
  PCS = 'pcs',
  TONES = 'tones',
  TONES_KM = 'tones_km',
  UNKNOWN = 'unknown',
}

export type UpdateContribution = {
  id: Scalars['UUID']['input']
  public?: InputMaybe<Scalars['Boolean']['input']>
}

export type UpdateUserInput = {
  currentPassword?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['EmailAddress']['input']>
  firstName?: InputMaybe<Scalars['String']['input']>
  id: Scalars['UUID']['input']
  inviteStatus?: InputMaybe<InviteStatus>
  invited?: InputMaybe<Scalars['Boolean']['input']>
  inviterName?: InputMaybe<Scalars['String']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
  newPassword?: InputMaybe<Scalars['String']['input']>
  organizationId?: InputMaybe<Scalars['UUID']['input']>
  role?: InputMaybe<Role>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']['output']
  firstName?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  inviteStatus: InviteStatus
  invited: Scalars['Boolean']['output']
  inviterName?: Maybe<Scalars['String']['output']>
  lastName?: Maybe<Scalars['String']['output']>
  organization?: Maybe<Organization>
  organizationId?: Maybe<Scalars['UUID']['output']>
  roles?: Maybe<Array<Role>>
  timeJoined: Scalars['DateTime']['output']
}

export type UserFilters = {
  email?: InputMaybe<FilterOptions>
  firstName?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  inviteStatus?: InputMaybe<FilterOptions>
  invited?: InputMaybe<FilterOptions>
  inviterName?: InputMaybe<FilterOptions>
  lastName?: InputMaybe<FilterOptions>
  organizationId?: InputMaybe<FilterOptions>
  timeJoined?: InputMaybe<FilterOptions>
}

export type UserSort = {
  asc?: InputMaybe<Scalars['String']['input']>
  dsc?: InputMaybe<Scalars['String']['input']>
}

export type ValueUnit = {
  __typename?: 'ValueUnit'
  unit: Unit
  value: Scalars['Float']['output']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  EPDTechFlow: Epd | TechFlow
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcceptInvitationInput: AcceptInvitationInput
  String: ResolverTypeWrapper<Scalars['String']['output']>
  AggregationMethod: AggregationMethod
  AggregationResult: ResolverTypeWrapper<AggregationResult>
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  AreaType: ResolverTypeWrapper<AreaType>
  Assembly: ResolverTypeWrapper<Omit<Assembly, 'products'> & { products: Array<ResolversTypes['Product']> }>
  AssemblyMetaData: ResolverTypeWrapper<AssemblyMetaData>
  AssessmentMetaData: ResolverTypeWrapper<AssessmentMetaData>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  Assessor: ResolverTypeWrapper<Assessor>
  Base64: ResolverTypeWrapper<Scalars['Base64']['output']>
  BuildingModelScope: BuildingModelScope
  BuildingType: BuildingType
  BuildingTypology: BuildingTypology
  Classification: ResolverTypeWrapper<Classification>
  Contribution: ResolverTypeWrapper<Omit<Contribution, 'project'> & { project: ResolversTypes['Project'] }>
  ContributionGraphQLGroupResponse: ResolverTypeWrapper<
    Omit<ContributionGraphQlGroupResponse, 'items'> & { items: Array<ResolversTypes['Contribution']> }
  >
  ContributionGraphQLResponse: ResolverTypeWrapper<
    Omit<ContributionGraphQlResponse, 'groups' | 'items'> & {
      groups: Array<ResolversTypes['ContributionGraphQLGroupResponse']>
      items?: Maybe<Array<ResolversTypes['Contribution']>>
    }
  >
  Conversion: ResolverTypeWrapper<Conversion>
  Cost: ResolverTypeWrapper<Cost>
  Country: Country
  CountryCodes: CountryCodes
  Date: ResolverTypeWrapper<Scalars['Date']['output']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
  EPD: ResolverTypeWrapper<Epd>
  EPDTechFlow: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['EPDTechFlow']>
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>
  Energy: ResolverTypeWrapper<Energy>
  FilterBy: FilterBy
  FilterOptions: FilterOptions
  GeneralEnergyClass: GeneralEnergyClass
  ImpactCategoryKey: ImpactCategoryKey
  ImpactCategoryResults: ResolverTypeWrapper<ImpactCategoryResults>
  InputAggregation: InputAggregation
  InputAreaType: InputAreaType
  InputAssembly: InputAssembly
  InputClassification: InputClassification
  InputContribution: InputContribution
  InputConversion: InputConversion
  InputImpactData: InputImpactData
  InputLocation: InputLocation
  InputOrganization: InputOrganization
  InputOrganizationMetaData: InputOrganizationMetaData
  InputProduct: InputProduct
  InputProject: InputProject
  InputProjectInfo: InputProjectInfo
  InputSoftwareInfo: InputSoftwareInfo
  InputSource: InputSource
  InputValueUnit: InputValueUnit
  InviteResult: ResolverTypeWrapper<InviteResult>
  InviteStatus: InviteStatus
  InviteUsersInput: InviteUsersInput
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>
  LifeCycleStage: LifeCycleStage
  Location: ResolverTypeWrapper<Location>
  Mutation: ResolverTypeWrapper<{}>
  Organization: ResolverTypeWrapper<Organization>
  OrganizationFilter: OrganizationFilter
  OrganizationMetaData: ResolverTypeWrapper<OrganizationMetaData>
  OrganizationMetaDataFilter: OrganizationMetaDataFilter
  Owner: ResolverTypeWrapper<Owner>
  Permission: Permission
  Product: ResolverTypeWrapper<Omit<Product, 'impactData'> & { impactData: ResolversTypes['EPDTechFlow'] }>
  ProductMetaData: ResolverTypeWrapper<ProductMetaData>
  Project: ResolverTypeWrapper<Omit<Project, 'assemblies'> & { assemblies: Array<ResolversTypes['Assembly']> }>
  ProjectGraphQLGroupResponse: ResolverTypeWrapper<
    Omit<ProjectGraphQlGroupResponse, 'items'> & { items: Array<ResolversTypes['Project']> }
  >
  ProjectGraphQLResponse: ResolverTypeWrapper<
    Omit<ProjectGraphQlResponse, 'groups' | 'items'> & {
      groups: Array<ResolversTypes['ProjectGraphQLGroupResponse']>
      items?: Maybe<Array<ResolversTypes['Project']>>
    }
  >
  ProjectInfo: ResolverTypeWrapper<ProjectInfo>
  ProjectMetaData: ResolverTypeWrapper<ProjectMetaData>
  ProjectPhase: ProjectPhase
  Publication: ResolverTypeWrapper<Publication>
  Query: ResolverTypeWrapper<{}>
  Results: ResolverTypeWrapper<Results>
  Role: Role
  RolePermission: ResolverTypeWrapper<RolePermission>
  RoofType: RoofType
  SoftwareInfo: ResolverTypeWrapper<SoftwareInfo>
  SortBy: SortBy
  Source: ResolverTypeWrapper<Source>
  StakeholderEnum: StakeholderEnum
  Standard: Standard
  Structural: ResolverTypeWrapper<Structural>
  SubType: SubType
  TechFlow: ResolverTypeWrapper<TechFlow>
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>
  Unit: Unit
  UpdateContribution: UpdateContribution
  UpdateUserInput: UpdateUserInput
  User: ResolverTypeWrapper<User>
  UserFilters: UserFilters
  UserSort: UserSort
  ValueUnit: ResolverTypeWrapper<ValueUnit>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcceptInvitationInput: AcceptInvitationInput
  String: Scalars['String']['output']
  AggregationResult: AggregationResult
  Float: Scalars['Float']['output']
  AreaType: AreaType
  Assembly: Omit<Assembly, 'products'> & { products: Array<ResolversParentTypes['Product']> }
  AssemblyMetaData: AssemblyMetaData
  AssessmentMetaData: AssessmentMetaData
  Boolean: Scalars['Boolean']['output']
  Int: Scalars['Int']['output']
  Assessor: Assessor
  Base64: Scalars['Base64']['output']
  Classification: Classification
  Contribution: Omit<Contribution, 'project'> & { project: ResolversParentTypes['Project'] }
  ContributionGraphQLGroupResponse: Omit<ContributionGraphQlGroupResponse, 'items'> & {
    items: Array<ResolversParentTypes['Contribution']>
  }
  ContributionGraphQLResponse: Omit<ContributionGraphQlResponse, 'groups' | 'items'> & {
    groups: Array<ResolversParentTypes['ContributionGraphQLGroupResponse']>
    items?: Maybe<Array<ResolversParentTypes['Contribution']>>
  }
  Conversion: Conversion
  Cost: Cost
  Date: Scalars['Date']['output']
  DateTime: Scalars['DateTime']['output']
  EPD: Epd
  EPDTechFlow: ResolversUnionTypes<ResolversParentTypes>['EPDTechFlow']
  EmailAddress: Scalars['EmailAddress']['output']
  Energy: Energy
  FilterBy: FilterBy
  FilterOptions: FilterOptions
  ImpactCategoryResults: ImpactCategoryResults
  InputAggregation: InputAggregation
  InputAreaType: InputAreaType
  InputAssembly: InputAssembly
  InputClassification: InputClassification
  InputContribution: InputContribution
  InputConversion: InputConversion
  InputImpactData: InputImpactData
  InputLocation: InputLocation
  InputOrganization: InputOrganization
  InputOrganizationMetaData: InputOrganizationMetaData
  InputProduct: InputProduct
  InputProject: InputProject
  InputProjectInfo: InputProjectInfo
  InputSoftwareInfo: InputSoftwareInfo
  InputSource: InputSource
  InputValueUnit: InputValueUnit
  InviteResult: InviteResult
  InviteUsersInput: InviteUsersInput
  JSON: Scalars['JSON']['output']
  Location: Location
  Mutation: {}
  Organization: Organization
  OrganizationFilter: OrganizationFilter
  OrganizationMetaData: OrganizationMetaData
  OrganizationMetaDataFilter: OrganizationMetaDataFilter
  Owner: Owner
  Product: Omit<Product, 'impactData'> & { impactData: ResolversParentTypes['EPDTechFlow'] }
  ProductMetaData: ProductMetaData
  Project: Omit<Project, 'assemblies'> & { assemblies: Array<ResolversParentTypes['Assembly']> }
  ProjectGraphQLGroupResponse: Omit<ProjectGraphQlGroupResponse, 'items'> & {
    items: Array<ResolversParentTypes['Project']>
  }
  ProjectGraphQLResponse: Omit<ProjectGraphQlResponse, 'groups' | 'items'> & {
    groups: Array<ResolversParentTypes['ProjectGraphQLGroupResponse']>
    items?: Maybe<Array<ResolversParentTypes['Project']>>
  }
  ProjectInfo: ProjectInfo
  ProjectMetaData: ProjectMetaData
  Publication: Publication
  Query: {}
  Results: Results
  RolePermission: RolePermission
  SoftwareInfo: SoftwareInfo
  SortBy: SortBy
  Source: Source
  Structural: Structural
  TechFlow: TechFlow
  UUID: Scalars['UUID']['output']
  UpdateContribution: UpdateContribution
  UpdateUserInput: UpdateUserInput
  User: User
  UserFilters: UserFilters
  UserSort: UserSort
  ValueUnit: ValueUnit
}

export type DeferDirectiveArgs = {
  if?: Scalars['Boolean']['input']
  label?: Maybe<Scalars['String']['input']>
}

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>

export type AggregationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AggregationResult'] = ResolversParentTypes['AggregationResult'],
> = {
  aggregation?: Resolver<
    Array<ResolversTypes['AggregationResult']>,
    ParentType,
    ContextType,
    RequireFields<AggregationResultAggregationArgs, 'apply'>
  >
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  method?: Resolver<ResolversTypes['AggregationMethod'], ParentType, ContextType>
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AreaTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AreaType'] = ResolversParentTypes['AreaType'],
> = {
  definition?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AssemblyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Assembly'] = ResolversParentTypes['Assembly'],
> = {
  classification?: Resolver<Maybe<Array<ResolversTypes['Classification']>>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['AssemblyMetaData']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['Results']>, ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AssemblyMetaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AssemblyMetaData'] = ResolversParentTypes['AssemblyMetaData'],
> = {
  volume?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AssessmentMetaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AssessmentMetaData'] = ResolversParentTypes['AssessmentMetaData'],
> = {
  additionalLcaReportName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ashrae240pCompliance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  assessmentMethodologyDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  assessor?: Resolver<Maybe<ResolversTypes['Assessor']>, ParentType, ContextType>
  bioSustainabilityCertification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  biogenicCarbonAccountingMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  biogenicCarbonDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  biogenicCarbonIncluded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  cutoffMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  en15978Compliance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  equipmentScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  furnishingsScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  interiorConstructionScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  interiorFinishesScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  iso21931Compliance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  lcaRequirements?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  operationalEnergyIncluded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  projectPhaseAtReporting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectPhaseAtTimeOfAssessment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectRefrigerants?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  purpose?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  quantitySource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  quantitySourceDetail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  refrigerantTypeIncluded?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  reportName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  resultsValidationDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rics2017Compliance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  rics2023Compliance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  seiPrestandardCompliance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  servicesElectricalScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  servicesMechanicalScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  servicesPlumbingScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  shellExteriorEnclosureScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  shellSuperstructureScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  siteworkScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  substructureScope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  toolReportUpload?: Resolver<Maybe<ResolversTypes['Base64']>, ParentType, ContextType>
  uncertainty?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  validityPeriod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  verifiedInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AssessorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Assessor'] = ResolversParentTypes['Assessor'],
> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  organization?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface Base64ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Base64'], any> {
  name: 'Base64'
}

export type ClassificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Classification'] = ResolversParentTypes['Classification'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  system?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Contribution'] = ResolversParentTypes['Contribution'],
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  uploadedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ContributionGraphQlGroupResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ContributionGraphQLGroupResponse'] = ResolversParentTypes['ContributionGraphQLGroupResponse'],
> = {
  aggregation?: Resolver<
    Array<ResolversTypes['AggregationResult']>,
    ParentType,
    ContextType,
    RequireFields<ContributionGraphQlGroupResponseAggregationArgs, 'apply'>
  >
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  items?: Resolver<
    Array<ResolversTypes['Contribution']>,
    ParentType,
    ContextType,
    RequireFields<ContributionGraphQlGroupResponseItemsArgs, 'limit'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ContributionGraphQlResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ContributionGraphQLResponse'] = ResolversParentTypes['ContributionGraphQLResponse'],
> = {
  aggregation?: Resolver<
    ResolversTypes['JSON'],
    ParentType,
    ContextType,
    RequireFields<ContributionGraphQlResponseAggregationArgs, 'apply'>
  >
  count?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<ContributionGraphQlResponseCountArgs, 'filterBy'>
  >
  groups?: Resolver<
    Array<ResolversTypes['ContributionGraphQLGroupResponse']>,
    ParentType,
    ContextType,
    RequireFields<ContributionGraphQlResponseGroupsArgs, 'groupBy' | 'limit'>
  >
  items?: Resolver<
    Maybe<Array<ResolversTypes['Contribution']>>,
    ParentType,
    ContextType,
    RequireFields<ContributionGraphQlResponseItemsArgs, 'filterBy' | 'offset' | 'sortBy'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ConversionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Conversion'] = ResolversParentTypes['Conversion'],
> = {
  metaData?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  to?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Cost'] = ResolversParentTypes['Cost'],
> = {
  costSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  hardCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  siteworksCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  softCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  totalCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type EpdResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EPD'] = ResolversParentTypes['EPD'],
> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Maybe<Array<ResolversTypes['Conversion']>>, ParentType, ContextType>
  declaredUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  formatVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  impacts?: Resolver<ResolversTypes['Results'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['Country'], ParentType, ContextType>
  metaData?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  publishedDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  source?: Resolver<Maybe<ResolversTypes['Source']>, ParentType, ContextType>
  standard?: Resolver<ResolversTypes['Standard'], ParentType, ContextType>
  subtype?: Resolver<ResolversTypes['SubType'], ParentType, ContextType>
  validUntil?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EpdTechFlowResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EPDTechFlow'] = ResolversParentTypes['EPDTechFlow'],
> = {
  __resolveType: TypeResolveFn<'EPD' | 'TechFlow', ParentType, ContextType>
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export type EnergyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Energy'] = ResolversParentTypes['Energy'],
> = {
  electricityCarbonFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  electricityCarbonFactorSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  electricityProvider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  electricitySource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  energyModelMethodologyReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gwpEnergySourcesYear?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  siteLocationWeatherData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  toolEnergyModeling?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  toolEnergyModelingVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ImpactCategoryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ImpactCategoryResults'] = ResolversParentTypes['ImpactCategoryResults'],
> = {
  a0?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a1a3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b6?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b7?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b8?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type InviteResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InviteResult'] = ResolversParentTypes['InviteResult'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location'],
> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>
  countryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  acceptInvitation?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAcceptInvitationArgs, 'user'>
  >
  addContributions?: Resolver<
    Array<ResolversTypes['Contribution']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddContributionsArgs, 'contributions'>
  >
  createOrganizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateOrganizationsArgs, 'organizations'>
  >
  deleteContributions?: Resolver<
    Array<ResolversTypes['UUID']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteContributionsArgs, 'contributions'>
  >
  deleteOrganizations?: Resolver<
    Array<ResolversTypes['UUID']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteOrganizationsArgs, 'ids'>
  >
  impersonate?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationImpersonateArgs, 'userId'>
  >
  inviteUsers?: Resolver<
    Array<ResolversTypes['InviteResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationInviteUsersArgs, 'input'>
  >
  makeAdmin?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationMakeAdminArgs, 'userId'>
  >
  rejectInvitation?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationRejectInvitationArgs, 'userId'>
  >
  resendInvitation?: Resolver<
    ResolversTypes['InviteResult'],
    ParentType,
    ContextType,
    RequireFields<MutationResendInvitationArgs, 'userId'>
  >
  updateContributions?: Resolver<
    Array<ResolversTypes['Contribution']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateContributionsArgs, 'contributions'>
  >
  updateOrganizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOrganizationsArgs, 'organizations'>
  >
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'userInput'>
  >
}

export type OrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization'],
> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  country?: Resolver<ResolversTypes['CountryCodes'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  metaData?: Resolver<ResolversTypes['OrganizationMetaData'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OrganizationMetaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationMetaData'] = ResolversParentTypes['OrganizationMetaData'],
> = {
  stakeholders?: Resolver<Array<ResolversTypes['StakeholderEnum']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner'],
> = {
  contact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  representative?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  web?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProductResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product'],
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  impactData?: Resolver<ResolversTypes['EPDTechFlow'], ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['ProductMetaData']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  referenceServiceLife?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['Results']>, ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProductMetaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProductMetaData'] = ResolversParentTypes['ProductMetaData'],
> = {
  brickGroutIncluded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  brickType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  concretePrecast?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  density?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  exposureClasses?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  groutType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  productClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  strength?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  timberType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  assemblies?: Resolver<Array<ResolversTypes['Assembly']>, ParentType, ContextType>
  classificationSystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  formatVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  impactCategories?: Resolver<Array<ResolversTypes['ImpactCategoryKey']>, ParentType, ContextType>
  lciaMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lifeCycleStages?: Resolver<Array<ResolversTypes['LifeCycleStage']>, ParentType, ContextType>
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['ProjectMetaData']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectInfo?: Resolver<ResolversTypes['ProjectInfo'], ParentType, ContextType>
  projectPhase?: Resolver<ResolversTypes['ProjectPhase'], ParentType, ContextType>
  referenceStudyPeriod?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['Results']>, ParentType, ContextType>
  softwareInfo?: Resolver<ResolversTypes['SoftwareInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectGraphQlGroupResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProjectGraphQLGroupResponse'] = ResolversParentTypes['ProjectGraphQLGroupResponse'],
> = {
  aggregation?: Resolver<
    Array<ResolversTypes['AggregationResult']>,
    ParentType,
    ContextType,
    RequireFields<ProjectGraphQlGroupResponseAggregationArgs, 'apply'>
  >
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  items?: Resolver<
    Array<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<ProjectGraphQlGroupResponseItemsArgs, 'limit'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectGraphQlResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectGraphQLResponse'] = ResolversParentTypes['ProjectGraphQLResponse'],
> = {
  aggregation?: Resolver<
    ResolversTypes['JSON'],
    ParentType,
    ContextType,
    RequireFields<ProjectGraphQlResponseAggregationArgs, 'apply'>
  >
  count?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType,
    RequireFields<ProjectGraphQlResponseCountArgs, 'filterBy'>
  >
  groups?: Resolver<
    Array<ResolversTypes['ProjectGraphQLGroupResponse']>,
    ParentType,
    ContextType,
    RequireFields<ProjectGraphQlResponseGroupsArgs, 'groupBy' | 'limit'>
  >
  items?: Resolver<
    Maybe<Array<ResolversTypes['Project']>>,
    ParentType,
    ContextType,
    RequireFields<ProjectGraphQlResponseItemsArgs, 'filterBy' | 'offset' | 'sortBy'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectInfo'] = ResolversParentTypes['ProjectInfo'],
> = {
  buildingCompletionYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  buildingFootprint?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  buildingHeight?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  buildingMass?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  buildingModelScope?: Resolver<Maybe<Array<ResolversTypes['BuildingModelScope']>>, ParentType, ContextType>
  buildingPermitYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  buildingType?: Resolver<ResolversTypes['BuildingType'], ParentType, ContextType>
  buildingTypology?: Resolver<Array<ResolversTypes['BuildingTypology']>, ParentType, ContextType>
  buildingUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  certifications?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  energyDemandElectricity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  energyDemandHeating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  energySupplyElectricity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  energySupplyHeating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  exportedElectricity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  floorsAboveGround?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  floorsBelowGround?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  frameType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  generalEnergyClass?: Resolver<ResolversTypes['GeneralEnergyClass'], ParentType, ContextType>
  grossFloorArea?: Resolver<Maybe<ResolversTypes['AreaType']>, ParentType, ContextType>
  heatedFloorArea?: Resolver<Maybe<ResolversTypes['AreaType']>, ParentType, ContextType>
  localEnergyClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  roofType?: Resolver<ResolversTypes['RoofType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectMetaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectMetaData'] = ResolversParentTypes['ProjectMetaData'],
> = {
  architectOfRecord?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  assessment?: Resolver<Maybe<ResolversTypes['AssessmentMetaData']>, ParentType, ContextType>
  assessmentCostCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  assessmentCutoff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  assessmentCutoffType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  bedroomCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  buildingOccupancyStart?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  buildingProjectConstructionType2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  buildingUseType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  builtFloorArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  civilEngineer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  climateZone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conditionedFloorArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  constructionStart?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  constructionYearExistingBuilding?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  cost?: Resolver<Maybe<ResolversTypes['Cost']>, ParentType, ContextType>
  demolishedArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  detachedParkingArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  detachedParkingStructureArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  enclosedParkingArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  energy?: Resolver<Maybe<ResolversTypes['Energy']>, ParentType, ContextType>
  existingArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  fullTimeEquivalent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  generalContractor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  heritageStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ibcConstructionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['Base64']>, ParentType, ContextType>
  infrastructureProjectConstructionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  infrastructureSectorType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  infrastructureUseType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  interiorDesigner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  interstitialFloors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  landscapeConsultant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaDatabase?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaDatabaseOther?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaDatabaseVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaModelType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaSoftwareVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  meanRoofHeight?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  mepEngineer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  newlyBuiltArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  occupantLoad?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  omniclassConstructionEntity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  otherProjectTeam?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>
  productClassificationSystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectExpectedLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  projectHistoric?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  projectSiteArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  projectSurroundings?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectUserStudio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectWorkArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>
  residentialUnits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  resultsValidatedAsBuilt?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  resultsValidatedAsBuiltDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  retrofittedArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  source?: Resolver<Maybe<ResolversTypes['Source']>, ParentType, ContextType>
  structural?: Resolver<Maybe<ResolversTypes['Structural']>, ParentType, ContextType>
  structuralEngineer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  surfaceParkingArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  sustainabilityConsultant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  thermalEnvelopeArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  unconditionedFloorArea?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  windowWallRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  workCompletionYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PublicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Publication'] = ResolversParentTypes['Publication'],
> = {
  authors?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  doi?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  publisher?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  contributions?: Resolver<ResolversTypes['ContributionGraphQLResponse'], ParentType, ContextType>
  organizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationsArgs, 'filters'>
  >
  projects?: Resolver<ResolversTypes['ProjectGraphQLResponse'], ParentType, ContextType>
  roles?: Resolver<Array<ResolversTypes['RolePermission']>, ParentType, ContextType>
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, 'filters' | 'sortBy'>
  >
}

export type ResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Results'] = ResolversParentTypes['Results'],
> = {
  adpe?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  adpf?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  ap?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  cru?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  eee?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  eet?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  ep?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  epFw?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  epMar?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  epTer?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  etpFw?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  fw?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  gwp?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  gwpBio?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  gwpFos?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  gwpLul?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  htpC?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  htpNc?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  hwd?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  irp?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  mer?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  mrf?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  nhwd?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  nrsf?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  odp?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  penre?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  penrm?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  penrt?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  pere?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  perm?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  pert?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  pm?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  pocp?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  rsf?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  rwd?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  sm?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  sqp?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  wdp?: Resolver<Maybe<ResolversTypes['ImpactCategoryResults']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RolePermissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolePermission'] = ResolversParentTypes['RolePermission'],
> = {
  name?: Resolver<ResolversTypes['Role'], ParentType, ContextType>
  permissions?: Resolver<Array<ResolversTypes['Permission']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SoftwareInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SoftwareInfo'] = ResolversParentTypes['SoftwareInfo'],
> = {
  calculationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  goalAndScopeDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaSoftware?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Source'] = ResolversParentTypes['Source'],
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type StructuralResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Structural'] = ResolversParentTypes['Structural'],
> = {
  allowableSoilBearingPressure?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  columnGridLong?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  earthquakeImportanceFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  foundationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  horizontalGravitySystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lateralSystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  liveLoad?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  podium?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  riskCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  secondaryHorizontalGravitySystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  secondaryVerticalGravitySystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  seismicDesignCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  snowLoad?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  verticalGravitySystem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  windSpeed?: Resolver<Maybe<ResolversTypes['ValueUnit']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TechFlowResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TechFlow'] = ResolversParentTypes['TechFlow'],
> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Maybe<Array<ResolversTypes['Conversion']>>, ParentType, ContextType>
  declaredUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  formatVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  impacts?: Resolver<ResolversTypes['Results'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['Country'], ParentType, ContextType>
  metaData?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  source?: Resolver<Maybe<ResolversTypes['Source']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  inviteStatus?: Resolver<ResolversTypes['InviteStatus'], ParentType, ContextType>
  invited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  inviterName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>
  organizationId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>
  roles?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType>
  timeJoined?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ValueUnitResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ValueUnit'] = ResolversParentTypes['ValueUnit'],
> = {
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  AggregationResult?: AggregationResultResolvers<ContextType>
  AreaType?: AreaTypeResolvers<ContextType>
  Assembly?: AssemblyResolvers<ContextType>
  AssemblyMetaData?: AssemblyMetaDataResolvers<ContextType>
  AssessmentMetaData?: AssessmentMetaDataResolvers<ContextType>
  Assessor?: AssessorResolvers<ContextType>
  Base64?: GraphQLScalarType
  Classification?: ClassificationResolvers<ContextType>
  Contribution?: ContributionResolvers<ContextType>
  ContributionGraphQLGroupResponse?: ContributionGraphQlGroupResponseResolvers<ContextType>
  ContributionGraphQLResponse?: ContributionGraphQlResponseResolvers<ContextType>
  Conversion?: ConversionResolvers<ContextType>
  Cost?: CostResolvers<ContextType>
  Date?: GraphQLScalarType
  DateTime?: GraphQLScalarType
  EPD?: EpdResolvers<ContextType>
  EPDTechFlow?: EpdTechFlowResolvers<ContextType>
  EmailAddress?: GraphQLScalarType
  Energy?: EnergyResolvers<ContextType>
  ImpactCategoryResults?: ImpactCategoryResultsResolvers<ContextType>
  InviteResult?: InviteResultResolvers<ContextType>
  JSON?: GraphQLScalarType
  Location?: LocationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Organization?: OrganizationResolvers<ContextType>
  OrganizationMetaData?: OrganizationMetaDataResolvers<ContextType>
  Owner?: OwnerResolvers<ContextType>
  Product?: ProductResolvers<ContextType>
  ProductMetaData?: ProductMetaDataResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectGraphQLGroupResponse?: ProjectGraphQlGroupResponseResolvers<ContextType>
  ProjectGraphQLResponse?: ProjectGraphQlResponseResolvers<ContextType>
  ProjectInfo?: ProjectInfoResolvers<ContextType>
  ProjectMetaData?: ProjectMetaDataResolvers<ContextType>
  Publication?: PublicationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Results?: ResultsResolvers<ContextType>
  RolePermission?: RolePermissionResolvers<ContextType>
  SoftwareInfo?: SoftwareInfoResolvers<ContextType>
  Source?: SourceResolvers<ContextType>
  Structural?: StructuralResolvers<ContextType>
  TechFlow?: TechFlowResolvers<ContextType>
  UUID?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  ValueUnit?: ValueUnitResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>
}

export type AcceptInvitationMutationVariables = Exact<{
  user: AcceptInvitationInput
}>

export type AcceptInvitationMutation = { __typename?: 'Mutation'; acceptInvitation: boolean }

export type RejectInvitationMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type RejectInvitationMutation = { __typename?: 'Mutation'; rejectInvitation: boolean }

export type InviteUsersMutationVariables = Exact<{
  input: InviteUsersInput
}>

export type InviteUsersMutation = {
  __typename?: 'Mutation'
  inviteUsers: Array<{ __typename?: 'InviteResult'; email: string; status: string; message: string }>
}

export type ResendInvitationMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type ResendInvitationMutation = {
  __typename?: 'Mutation'
  resendInvitation: { __typename?: 'InviteResult'; email: string; status: string; message: string }
}

export type GetContributionsPerMonthQueryVariables = Exact<{ [key: string]: never }>

export type GetContributionsPerMonthQuery = {
  __typename?: 'Query'
  contributions: {
    __typename?: 'ContributionGraphQLResponse'
    count: number
    items?: Array<{ __typename?: 'Contribution'; id: any; uploadedAt: any }> | null
  }
}

export type GetContributionsForHeaderQueryVariables = Exact<{ [key: string]: never }>

export type GetContributionsForHeaderQuery = {
  __typename?: 'Query'
  contributions: {
    __typename?: 'ContributionGraphQLResponse'
    count: number
    items?: Array<{ __typename?: 'Contribution'; uploadedAt: any; user: { __typename?: 'User'; id: any } }> | null
  }
}

export type GetContributionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sortBy?: InputMaybe<SortBy>
  filterBy?: InputMaybe<FilterBy>
}>

export type GetContributionsQuery = {
  __typename?: 'Query'
  contributions: {
    __typename?: 'ContributionGraphQLResponse'
    count: number
    items?: Array<{
      __typename?: 'Contribution'
      id: any
      uploadedAt: any
      public: boolean
      user: {
        __typename?: 'User'
        id: any
        firstName?: string | null
        lastName?: string | null
        organization?: { __typename?: 'Organization'; id: any; name: string } | null
      }
      project: {
        __typename?: 'Project'
        name: string
        lifeCycleStages: Array<LifeCycleStage>
        impactCategories: Array<ImpactCategoryKey>
        location: { __typename?: 'Location'; countryName: string }
        projectInfo: { __typename?: 'ProjectInfo'; buildingType: BuildingType }
      }
    }> | null
  }
}

export type GetContributionsForDetailsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  filterBy?: InputMaybe<FilterBy>
}>

export type GetContributionsForDetailsQuery = {
  __typename?: 'Query'
  contributions: {
    __typename?: 'ContributionGraphQLResponse'
    items?: Array<{ __typename?: 'Contribution'; id: any; project: { __typename?: 'Project'; name: string } }> | null
  }
}

export type AddContributionMutationVariables = Exact<{
  contributions: Array<InputContribution> | InputContribution
}>

export type AddContributionMutation = {
  __typename?: 'Mutation'
  addContributions: Array<{ __typename?: 'Contribution'; id: any }>
}

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type GetOrganizationsQuery = {
  __typename?: 'Query'
  organizations: Array<{ __typename?: 'Organization'; id: any; name: string }>
}

export type CreateOrganizationsMutationVariables = Exact<{
  organizations: Array<InputOrganization> | InputOrganization
}>

export type CreateOrganizationsMutation = {
  __typename?: 'Mutation'
  createOrganizations: Array<{
    __typename?: 'Organization'
    id: any
    name: string
    address: string
    city: string
    country: CountryCodes
    metaData: { __typename?: 'OrganizationMetaData'; stakeholders: Array<StakeholderEnum> }
  }>
}

export type UpdateOrganizationsMutationVariables = Exact<{
  organizations: Array<InputOrganization> | InputOrganization
}>

export type UpdateOrganizationsMutation = {
  __typename?: 'Mutation'
  updateOrganizations: Array<{
    __typename?: 'Organization'
    id: any
    name: string
    address: string
    city: string
    country: CountryCodes
    metaData: { __typename?: 'OrganizationMetaData'; stakeholders: Array<StakeholderEnum> }
  }>
}

export type GetUsersQueryVariables = Exact<{
  filters?: InputMaybe<UserFilters>
  sortBy?: InputMaybe<UserSort>
}>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: any
    firstName?: string | null
    lastName?: string | null
    email: string
    timeJoined: any
    invited: boolean
    inviteStatus: InviteStatus
    inviterName?: string | null
    roles?: Array<Role> | null
    organization?: { __typename?: 'Organization'; id: any; name: string } | null
  }>
}

export type GetCurrentUserQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetCurrentUserQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: any
    firstName?: string | null
    lastName?: string | null
    email: string
    roles?: Array<Role> | null
    timeJoined: any
    organization?: {
      __typename?: 'Organization'
      id: any
      name: string
      address: string
      city: string
      country: CountryCodes
      metaData: { __typename?: 'OrganizationMetaData'; stakeholders: Array<StakeholderEnum> }
    } | null
  }>
}

export type UpdateUserMutationVariables = Exact<{
  userInput: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'User'
    id: any
    firstName?: string | null
    lastName?: string | null
    email: string
    timeJoined: any
    roles?: Array<Role> | null
    organizationId?: any | null
  }
}

export type GetProjectsCountsByCountryQueryVariables = Exact<{ [key: string]: never }>

export type GetProjectsCountsByCountryQuery = {
  __typename?: 'Query'
  projects: {
    __typename?: 'ProjectGraphQLResponse'
    groups: Array<{
      __typename?: 'ProjectGraphQLGroupResponse'
      group: string
      count: number
      items: Array<{
        __typename?: 'Project'
        id: any
        location: { __typename?: 'Location'; countryName: string; longitude: number; latitude: number }
      }>
    }>
  }
}

export type GetProjectDataForBoxPlotQueryVariables = Exact<{
  aggregation: Scalars['JSON']['input']
}>

export type GetProjectDataForBoxPlotQuery = {
  __typename?: 'Query'
  projects: {
    __typename?: 'ProjectGraphQLResponse'
    aggregation: any
    groups: Array<{
      __typename?: 'ProjectGraphQLGroupResponse'
      group: string
      items: Array<{
        __typename?: 'Project'
        id: any
        location: { __typename?: 'Location'; countryName: string }
        softwareInfo: { __typename?: 'SoftwareInfo'; lcaSoftware: string }
        metaData?: { __typename?: 'ProjectMetaData'; source?: { __typename?: 'Source'; name: string } | null } | null
      }>
    }>
  }
}

export type GetProjectPortfolioQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  filters?: InputMaybe<FilterBy>
  sortBy?: InputMaybe<SortBy>
}>

export type GetProjectPortfolioQuery = {
  __typename?: 'Query'
  projects: {
    __typename?: 'ProjectGraphQLResponse'
    count: number
    items?: Array<{
      __typename?: 'Project'
      id: any
      name: string
      location: { __typename?: 'Location'; countryName: string }
      softwareInfo: { __typename?: 'SoftwareInfo'; lcaSoftware: string }
      projectInfo: {
        __typename?: 'ProjectInfo'
        buildingType: BuildingType
        buildingTypology: Array<BuildingTypology>
        buildingCompletionYear?: number | null
        buildingPermitYear?: number | null
        buildingUsers?: number | null
        floorsAboveGround: number
        floorsBelowGround?: number | null
        frameType?: string | null
        generalEnergyClass: GeneralEnergyClass
        roofType: RoofType
        grossFloorArea?: { __typename?: 'AreaType'; value: number } | null
        buildingFootprint?: { __typename?: 'ValueUnit'; value: number } | null
        buildingHeight?: { __typename?: 'ValueUnit'; value: number } | null
        buildingMass?: { __typename?: 'ValueUnit'; value: number } | null
        heatedFloorArea?: { __typename?: 'AreaType'; value: number } | null
      }
      metaData?: {
        __typename?: 'ProjectMetaData'
        source?: { __typename?: 'Source'; name: string; url?: string | null } | null
      } | null
      results?: {
        __typename?: 'Results'
        gwp?: {
          __typename?: 'ImpactCategoryResults'
          a0?: number | null
          a1a3?: number | null
          a4?: number | null
          a5?: number | null
          b1?: number | null
          b2?: number | null
          b3?: number | null
          b4?: number | null
          b5?: number | null
          b6?: number | null
          b7?: number | null
          b8?: number | null
          c1?: number | null
          c2?: number | null
          c3?: number | null
          c4?: number | null
          d?: number | null
          total?: number | null
        } | null
      } | null
    }> | null
  }
}

export type GetProjectDetailsQueryVariables = Exact<{
  id: Scalars['UUID']['input']
}>

export type GetProjectDetailsQuery = {
  __typename?: 'Query'
  contributions: {
    __typename?: 'ContributionGraphQLResponse'
    items?: Array<{
      __typename?: 'Contribution'
      project: {
        __typename?: 'Project'
        id: any
        name: string
        lifeCycleStages: Array<LifeCycleStage>
        location: { __typename?: 'Location'; countryName: string }
        projectInfo: {
          __typename?: 'ProjectInfo'
          buildingCompletionYear?: number | null
          buildingModelScope?: Array<BuildingModelScope> | null
          buildingPermitYear?: number | null
          buildingType: BuildingType
          buildingTypology: Array<BuildingTypology>
          buildingUsers?: number | null
          certifications?: Array<string> | null
          energyDemandElectricity?: number | null
          energyDemandHeating?: number | null
          energySupplyElectricity?: number | null
          energySupplyHeating?: number | null
          exportedElectricity?: number | null
          floorsAboveGround: number
          floorsBelowGround?: number | null
          frameType?: string | null
          generalEnergyClass: GeneralEnergyClass
          localEnergyClass?: string | null
          roofType: RoofType
          buildingFootprint?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          buildingHeight?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          buildingMass?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          grossFloorArea?: { __typename?: 'AreaType'; value: number; unit: Unit } | null
          heatedFloorArea?: { __typename?: 'AreaType'; value: number; unit: Unit } | null
        }
        metaData?: {
          __typename?: 'ProjectMetaData'
          productClassificationSystem?: string | null
          climateZone?: string | null
          image?: any | null
          lcaSoftwareVersion?: string | null
          lcaDatabase?: string | null
          lcaDatabaseVersion?: string | null
          lcaDatabaseOther?: string | null
          lcaModelType?: string | null
          interstitialFloors?: string | null
          buildingProjectConstructionType2?: string | null
          infrastructureProjectConstructionType?: string | null
          infrastructureSectorType?: string | null
          buildingUseType?: string | null
          infrastructureUseType?: string | null
          ibcConstructionType?: string | null
          projectSurroundings?: string | null
          projectHistoric?: boolean | null
          fullTimeEquivalent?: number | null
          occupantLoad?: number | null
          windowWallRatio?: number | null
          residentialUnits?: number | null
          bedroomCount?: number | null
          projectExpectedLife?: number | null
          resultsValidatedAsBuilt?: boolean | null
          resultsValidatedAsBuiltDescription?: string | null
          assessmentCutoffType?: string | null
          assessmentCutoff?: string | null
          assessmentCostCutoff?: string | null
          heritageStatus?: string | null
          omniclassConstructionEntity?: string | null
          architectOfRecord?: string | null
          projectUserStudio?: string | null
          generalContractor?: string | null
          mepEngineer?: string | null
          sustainabilityConsultant?: string | null
          structuralEngineer?: string | null
          civilEngineer?: string | null
          landscapeConsultant?: string | null
          interiorDesigner?: string | null
          otherProjectTeam?: string | null
          workCompletionYear?: number | null
          constructionStart?: string | null
          constructionYearExistingBuilding?: number | null
          buildingOccupancyStart?: string | null
          source?: { __typename?: 'Source'; name: string; url?: string | null } | null
          owner?: {
            __typename?: 'Owner'
            contact?: string | null
            web?: string | null
            country?: string | null
            email?: string | null
            type?: string | null
            representative?: string | null
          } | null
          assessment?: {
            __typename?: 'AssessmentMetaData'
            assessmentMethodologyDescription?: string | null
            uncertainty?: number | null
            cutoffMethod?: string | null
            year?: number | null
            date?: any | null
            quantitySource?: string | null
            quantitySourceDetail?: string | null
            purpose?: string | null
            iso21931Compliance?: boolean | null
            en15978Compliance?: boolean | null
            rics2017Compliance?: boolean | null
            rics2023Compliance?: boolean | null
            ashrae240pCompliance?: boolean | null
            seiPrestandardCompliance?: boolean | null
            verified?: boolean | null
            verifiedInfo?: string | null
            validityPeriod?: string | null
            resultsValidationDescription?: string | null
            toolReportUpload?: any | null
            reportName?: string | null
            additionalLcaReportName?: string | null
            projectPhaseAtReporting?: string | null
            projectPhaseAtTimeOfAssessment?: string | null
            operationalEnergyIncluded?: boolean | null
            biogenicCarbonIncluded?: boolean | null
            biogenicCarbonAccountingMethod?: string | null
            bioSustainabilityCertification?: string | null
            biogenicCarbonDescription?: string | null
            projectRefrigerants?: string | null
            refrigerantTypeIncluded?: string | null
            substructureScope?: string | null
            shellSuperstructureScope?: string | null
            shellExteriorEnclosureScope?: string | null
            interiorConstructionScope?: string | null
            interiorFinishesScope?: string | null
            servicesMechanicalScope?: string | null
            servicesElectricalScope?: string | null
            servicesPlumbingScope?: string | null
            siteworkScope?: string | null
            equipmentScope?: string | null
            furnishingsScope?: string | null
            lcaRequirements?: string | null
            assessor?: {
              __typename?: 'Assessor'
              name?: string | null
              email?: string | null
              organization?: string | null
            } | null
          } | null
          newlyBuiltArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          retrofittedArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          demolishedArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          existingArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          builtFloorArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          projectWorkArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          projectSiteArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          conditionedFloorArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          unconditionedFloorArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          enclosedParkingArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          detachedParkingArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          surfaceParkingArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          detachedParkingStructureArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          meanRoofHeight?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          thermalEnvelopeArea?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          energy?: {
            __typename?: 'Energy'
            toolEnergyModeling?: string | null
            toolEnergyModelingVersion?: string | null
            energyModelMethodologyReference?: string | null
            gwpEnergySourcesYear?: number | null
            siteLocationWeatherData?: string | null
            electricityProvider?: string | null
            electricitySource?: string | null
            electricityCarbonFactor?: number | null
            electricityCarbonFactorSource?: string | null
          } | null
          cost?: {
            __typename?: 'Cost'
            currency?: string | null
            totalCost?: number | null
            hardCost?: number | null
            softCost?: number | null
            siteworksCost?: number | null
            costSource?: string | null
            notes?: string | null
          } | null
          structural?: {
            __typename?: 'Structural'
            riskCategory?: string | null
            earthquakeImportanceFactor?: number | null
            seismicDesignCategory?: string | null
            horizontalGravitySystem?: string | null
            secondaryHorizontalGravitySystem?: string | null
            verticalGravitySystem?: string | null
            secondaryVerticalGravitySystem?: string | null
            lateralSystem?: string | null
            podium?: string | null
            foundationType?: string | null
            columnGridLong?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
            liveLoad?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
            snowLoad?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
            windSpeed?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
            allowableSoilBearingPressure?: { __typename?: 'ValueUnit'; value: number; unit: Unit } | null
          } | null
          publication?: {
            __typename?: 'Publication'
            authors?: string | null
            year?: number | null
            doi?: string | null
            title?: string | null
            publisher?: string | null
          } | null
        } | null
        results?: {
          __typename?: 'Results'
          gwp?: {
            __typename?: 'ImpactCategoryResults'
            a0?: number | null
            a1a3?: number | null
            a4?: number | null
            a5?: number | null
            b1?: number | null
            b2?: number | null
            b3?: number | null
            b4?: number | null
            b5?: number | null
            b6?: number | null
            b7?: number | null
            b8?: number | null
            c1?: number | null
            c2?: number | null
            c3?: number | null
            c4?: number | null
            d?: number | null
          } | null
        } | null
      }
    }> | null
  }
}

export type GetAggregatedProjectDataQueryVariables = Exact<{
  aggregation: Scalars['JSON']['input']
}>

export type GetAggregatedProjectDataQuery = {
  __typename?: 'Query'
  projects: { __typename?: 'ProjectGraphQLResponse'; aggregation: any }
}

export type DeleteContributionsMutationVariables = Exact<{
  contributions: Array<Scalars['UUID']['input']> | Scalars['UUID']['input']
}>

export type DeleteContributionsMutation = { __typename?: 'Mutation'; deleteContributions: Array<any> }

export type UpdateContributionsMutationVariables = Exact<{
  contributions: Array<UpdateContribution> | UpdateContribution
}>

export type UpdateContributionsMutation = {
  __typename?: 'Mutation'
  updateContributions: Array<{ __typename?: 'Contribution'; id: any }>
}

export type ImpersonateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type ImpersonateUserMutation = { __typename?: 'Mutation'; impersonate: boolean }

export type MakeUserAdminMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type MakeUserAdminMutation = { __typename?: 'Mutation'; makeAdmin: boolean }

export type GetRolesAndPermissionsQueryVariables = Exact<{ [key: string]: never }>

export type GetRolesAndPermissionsQuery = {
  __typename?: 'Query'
  roles: Array<{ __typename?: 'RolePermission'; name: Role; permissions: Array<Permission> }>
}

export const AcceptInvitationDocument = gql`
  mutation acceptInvitation($user: AcceptInvitationInput!) {
    acceptInvitation(user: $user)
  }
`
export type AcceptInvitationMutationFn = Apollo.MutationFunction<
  AcceptInvitationMutation,
  AcceptInvitationMutationVariables
>

/**
 * __useAcceptInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInvitationMutation, { data, loading, error }] = useAcceptInvitationMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useAcceptInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<AcceptInvitationMutation, AcceptInvitationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AcceptInvitationMutation, AcceptInvitationMutationVariables>(
    AcceptInvitationDocument,
    options,
  )
}
export type AcceptInvitationMutationHookResult = ReturnType<typeof useAcceptInvitationMutation>
export type AcceptInvitationMutationResult = Apollo.MutationResult<AcceptInvitationMutation>
export type AcceptInvitationMutationOptions = Apollo.BaseMutationOptions<
  AcceptInvitationMutation,
  AcceptInvitationMutationVariables
>
export const RejectInvitationDocument = gql`
  mutation rejectInvitation($userId: String!) {
    rejectInvitation(userId: $userId)
  }
`
export type RejectInvitationMutationFn = Apollo.MutationFunction<
  RejectInvitationMutation,
  RejectInvitationMutationVariables
>

/**
 * __useRejectInvitationMutation__
 *
 * To run a mutation, you first call `useRejectInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectInvitationMutation, { data, loading, error }] = useRejectInvitationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRejectInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<RejectInvitationMutation, RejectInvitationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RejectInvitationMutation, RejectInvitationMutationVariables>(
    RejectInvitationDocument,
    options,
  )
}
export type RejectInvitationMutationHookResult = ReturnType<typeof useRejectInvitationMutation>
export type RejectInvitationMutationResult = Apollo.MutationResult<RejectInvitationMutation>
export type RejectInvitationMutationOptions = Apollo.BaseMutationOptions<
  RejectInvitationMutation,
  RejectInvitationMutationVariables
>
export const InviteUsersDocument = gql`
  mutation inviteUsers($input: InviteUsersInput!) {
    inviteUsers(input: $input) {
      email
      status
      message
    }
  }
`
export type InviteUsersMutationFn = Apollo.MutationFunction<InviteUsersMutation, InviteUsersMutationVariables>

/**
 * __useInviteUsersMutation__
 *
 * To run a mutation, you first call `useInviteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUsersMutation, { data, loading, error }] = useInviteUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<InviteUsersMutation, InviteUsersMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<InviteUsersMutation, InviteUsersMutationVariables>(InviteUsersDocument, options)
}
export type InviteUsersMutationHookResult = ReturnType<typeof useInviteUsersMutation>
export type InviteUsersMutationResult = Apollo.MutationResult<InviteUsersMutation>
export type InviteUsersMutationOptions = Apollo.BaseMutationOptions<InviteUsersMutation, InviteUsersMutationVariables>
export const ResendInvitationDocument = gql`
  mutation resendInvitation($userId: String!) {
    resendInvitation(userId: $userId) {
      email
      status
      message
    }
  }
`
export type ResendInvitationMutationFn = Apollo.MutationFunction<
  ResendInvitationMutation,
  ResendInvitationMutationVariables
>

/**
 * __useResendInvitationMutation__
 *
 * To run a mutation, you first call `useResendInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendInvitationMutation, { data, loading, error }] = useResendInvitationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useResendInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<ResendInvitationMutation, ResendInvitationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ResendInvitationMutation, ResendInvitationMutationVariables>(
    ResendInvitationDocument,
    options,
  )
}
export type ResendInvitationMutationHookResult = ReturnType<typeof useResendInvitationMutation>
export type ResendInvitationMutationResult = Apollo.MutationResult<ResendInvitationMutation>
export type ResendInvitationMutationOptions = Apollo.BaseMutationOptions<
  ResendInvitationMutation,
  ResendInvitationMutationVariables
>
export const GetContributionsPerMonthDocument = gql`
  query getContributionsPerMonth {
    contributions {
      items(sortBy: { dsc: "uploaded_at" }, limit: null) {
        id
        uploadedAt
      }
      count
    }
  }
`

/**
 * __useGetContributionsPerMonthQuery__
 *
 * To run a query within a React component, call `useGetContributionsPerMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContributionsPerMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContributionsPerMonthQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContributionsPerMonthQuery(
  baseOptions?: Apollo.QueryHookOptions<GetContributionsPerMonthQuery, GetContributionsPerMonthQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetContributionsPerMonthQuery, GetContributionsPerMonthQueryVariables>(
    GetContributionsPerMonthDocument,
    options,
  )
}
export function useGetContributionsPerMonthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetContributionsPerMonthQuery, GetContributionsPerMonthQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetContributionsPerMonthQuery, GetContributionsPerMonthQueryVariables>(
    GetContributionsPerMonthDocument,
    options,
  )
}
export function useGetContributionsPerMonthSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetContributionsPerMonthQuery, GetContributionsPerMonthQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetContributionsPerMonthQuery, GetContributionsPerMonthQueryVariables>(
    GetContributionsPerMonthDocument,
    options,
  )
}
export type GetContributionsPerMonthQueryHookResult = ReturnType<typeof useGetContributionsPerMonthQuery>
export type GetContributionsPerMonthLazyQueryHookResult = ReturnType<typeof useGetContributionsPerMonthLazyQuery>
export type GetContributionsPerMonthSuspenseQueryHookResult = ReturnType<
  typeof useGetContributionsPerMonthSuspenseQuery
>
export type GetContributionsPerMonthQueryResult = Apollo.QueryResult<
  GetContributionsPerMonthQuery,
  GetContributionsPerMonthQueryVariables
>
export const GetContributionsForHeaderDocument = gql`
  query getContributionsForHeader {
    contributions {
      items(sortBy: { dsc: "uploaded_at" }, limit: null) {
        uploadedAt
        user {
          id
        }
      }
      count
    }
  }
`

/**
 * __useGetContributionsForHeaderQuery__
 *
 * To run a query within a React component, call `useGetContributionsForHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContributionsForHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContributionsForHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContributionsForHeaderQuery(
  baseOptions?: Apollo.QueryHookOptions<GetContributionsForHeaderQuery, GetContributionsForHeaderQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetContributionsForHeaderQuery, GetContributionsForHeaderQueryVariables>(
    GetContributionsForHeaderDocument,
    options,
  )
}
export function useGetContributionsForHeaderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetContributionsForHeaderQuery, GetContributionsForHeaderQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetContributionsForHeaderQuery, GetContributionsForHeaderQueryVariables>(
    GetContributionsForHeaderDocument,
    options,
  )
}
export function useGetContributionsForHeaderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetContributionsForHeaderQuery, GetContributionsForHeaderQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetContributionsForHeaderQuery, GetContributionsForHeaderQueryVariables>(
    GetContributionsForHeaderDocument,
    options,
  )
}
export type GetContributionsForHeaderQueryHookResult = ReturnType<typeof useGetContributionsForHeaderQuery>
export type GetContributionsForHeaderLazyQueryHookResult = ReturnType<typeof useGetContributionsForHeaderLazyQuery>
export type GetContributionsForHeaderSuspenseQueryHookResult = ReturnType<
  typeof useGetContributionsForHeaderSuspenseQuery
>
export type GetContributionsForHeaderQueryResult = Apollo.QueryResult<
  GetContributionsForHeaderQuery,
  GetContributionsForHeaderQueryVariables
>
export const GetContributionsDocument = gql`
  query getContributions($limit: Int, $offset: Int, $sortBy: SortBy, $filterBy: FilterBy) {
    contributions {
      items(limit: $limit, offset: $offset, sortBy: $sortBy, filterBy: $filterBy) {
        id
        uploadedAt
        public
        user {
          id
          firstName
          lastName
          organization {
            id
            name
          }
        }
        project {
          name
          location {
            countryName
          }
          lifeCycleStages
          impactCategories
          projectInfo {
            buildingType
          }
        }
      }
      count(filterBy: $filterBy)
    }
  }
`

/**
 * __useGetContributionsQuery__
 *
 * To run a query within a React component, call `useGetContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContributionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortBy: // value for 'sortBy'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useGetContributionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetContributionsQuery, GetContributionsQueryVariables>(GetContributionsDocument, options)
}
export function useGetContributionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetContributionsQuery, GetContributionsQueryVariables>(GetContributionsDocument, options)
}
export function useGetContributionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetContributionsQuery, GetContributionsQueryVariables>(
    GetContributionsDocument,
    options,
  )
}
export type GetContributionsQueryHookResult = ReturnType<typeof useGetContributionsQuery>
export type GetContributionsLazyQueryHookResult = ReturnType<typeof useGetContributionsLazyQuery>
export type GetContributionsSuspenseQueryHookResult = ReturnType<typeof useGetContributionsSuspenseQuery>
export type GetContributionsQueryResult = Apollo.QueryResult<GetContributionsQuery, GetContributionsQueryVariables>
export const GetContributionsForDetailsDocument = gql`
  query getContributionsForDetails($limit: Int, $filterBy: FilterBy) {
    contributions {
      items(limit: $limit, filterBy: $filterBy) {
        id
        project {
          name
        }
      }
    }
  }
`

/**
 * __useGetContributionsForDetailsQuery__
 *
 * To run a query within a React component, call `useGetContributionsForDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContributionsForDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContributionsForDetailsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useGetContributionsForDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetContributionsForDetailsQuery, GetContributionsForDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetContributionsForDetailsQuery, GetContributionsForDetailsQueryVariables>(
    GetContributionsForDetailsDocument,
    options,
  )
}
export function useGetContributionsForDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetContributionsForDetailsQuery, GetContributionsForDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetContributionsForDetailsQuery, GetContributionsForDetailsQueryVariables>(
    GetContributionsForDetailsDocument,
    options,
  )
}
export function useGetContributionsForDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetContributionsForDetailsQuery, GetContributionsForDetailsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetContributionsForDetailsQuery, GetContributionsForDetailsQueryVariables>(
    GetContributionsForDetailsDocument,
    options,
  )
}
export type GetContributionsForDetailsQueryHookResult = ReturnType<typeof useGetContributionsForDetailsQuery>
export type GetContributionsForDetailsLazyQueryHookResult = ReturnType<typeof useGetContributionsForDetailsLazyQuery>
export type GetContributionsForDetailsSuspenseQueryHookResult = ReturnType<
  typeof useGetContributionsForDetailsSuspenseQuery
>
export type GetContributionsForDetailsQueryResult = Apollo.QueryResult<
  GetContributionsForDetailsQuery,
  GetContributionsForDetailsQueryVariables
>
export const AddContributionDocument = gql`
  mutation addContribution($contributions: [InputContribution!]!) {
    addContributions(contributions: $contributions) {
      id
    }
  }
`
export type AddContributionMutationFn = Apollo.MutationFunction<
  AddContributionMutation,
  AddContributionMutationVariables
>

/**
 * __useAddContributionMutation__
 *
 * To run a mutation, you first call `useAddContributionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContributionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContributionMutation, { data, loading, error }] = useAddContributionMutation({
 *   variables: {
 *      contributions: // value for 'contributions'
 *   },
 * });
 */
export function useAddContributionMutation(
  baseOptions?: Apollo.MutationHookOptions<AddContributionMutation, AddContributionMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddContributionMutation, AddContributionMutationVariables>(AddContributionDocument, options)
}
export type AddContributionMutationHookResult = ReturnType<typeof useAddContributionMutation>
export type AddContributionMutationResult = Apollo.MutationResult<AddContributionMutation>
export type AddContributionMutationOptions = Apollo.BaseMutationOptions<
  AddContributionMutation,
  AddContributionMutationVariables
>
export const GetOrganizationsDocument = gql`
  query getOrganizations {
    organizations {
      id
      name
    }
  }
`

/**
 * __useGetOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options)
}
export function useGetOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options)
}
export function useGetOrganizationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(
    GetOrganizationsDocument,
    options,
  )
}
export type GetOrganizationsQueryHookResult = ReturnType<typeof useGetOrganizationsQuery>
export type GetOrganizationsLazyQueryHookResult = ReturnType<typeof useGetOrganizationsLazyQuery>
export type GetOrganizationsSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationsSuspenseQuery>
export type GetOrganizationsQueryResult = Apollo.QueryResult<GetOrganizationsQuery, GetOrganizationsQueryVariables>
export const CreateOrganizationsDocument = gql`
  mutation createOrganizations($organizations: [InputOrganization!]!) {
    createOrganizations(organizations: $organizations) {
      id
      name
      address
      city
      country
      metaData {
        stakeholders
      }
    }
  }
`
export type CreateOrganizationsMutationFn = Apollo.MutationFunction<
  CreateOrganizationsMutation,
  CreateOrganizationsMutationVariables
>

/**
 * __useCreateOrganizationsMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationsMutation, { data, loading, error }] = useCreateOrganizationsMutation({
 *   variables: {
 *      organizations: // value for 'organizations'
 *   },
 * });
 */
export function useCreateOrganizationsMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrganizationsMutation, CreateOrganizationsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateOrganizationsMutation, CreateOrganizationsMutationVariables>(
    CreateOrganizationsDocument,
    options,
  )
}
export type CreateOrganizationsMutationHookResult = ReturnType<typeof useCreateOrganizationsMutation>
export type CreateOrganizationsMutationResult = Apollo.MutationResult<CreateOrganizationsMutation>
export type CreateOrganizationsMutationOptions = Apollo.BaseMutationOptions<
  CreateOrganizationsMutation,
  CreateOrganizationsMutationVariables
>
export const UpdateOrganizationsDocument = gql`
  mutation updateOrganizations($organizations: [InputOrganization!]!) {
    updateOrganizations(organizations: $organizations) {
      id
      name
      address
      city
      country
      metaData {
        stakeholders
      }
    }
  }
`
export type UpdateOrganizationsMutationFn = Apollo.MutationFunction<
  UpdateOrganizationsMutation,
  UpdateOrganizationsMutationVariables
>

/**
 * __useUpdateOrganizationsMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationsMutation, { data, loading, error }] = useUpdateOrganizationsMutation({
 *   variables: {
 *      organizations: // value for 'organizations'
 *   },
 * });
 */
export function useUpdateOrganizationsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationsMutation, UpdateOrganizationsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateOrganizationsMutation, UpdateOrganizationsMutationVariables>(
    UpdateOrganizationsDocument,
    options,
  )
}
export type UpdateOrganizationsMutationHookResult = ReturnType<typeof useUpdateOrganizationsMutation>
export type UpdateOrganizationsMutationResult = Apollo.MutationResult<UpdateOrganizationsMutation>
export type UpdateOrganizationsMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrganizationsMutation,
  UpdateOrganizationsMutationVariables
>
export const GetUsersDocument = gql`
  query getUsers($filters: UserFilters, $sortBy: UserSort) {
    users(filters: $filters, sortBy: $sortBy) {
      id
      firstName
      lastName
      email
      timeJoined
      invited
      inviteStatus
      inviterName
      roles
      organization {
        id
        name
      }
    }
  }
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>
export const GetCurrentUserDocument = gql`
  query getCurrentUser($id: String!) {
    users(filters: { id: { equal: $id } }) {
      id
      firstName
      lastName
      email
      roles
      organization {
        id
        name
        address
        city
        country
        metaData {
          stakeholders
        }
      }
      timeJoined
    }
  }
`

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables> &
    ({ variables: GetCurrentUserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options)
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options)
}
export function useGetCurrentUserSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options)
}
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>
export const UpdateUserDocument = gql`
  mutation updateUser($userInput: UpdateUserInput!) {
    updateUser(userInput: $userInput) {
      id
      firstName
      lastName
      email
      timeJoined
      roles
      organizationId
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options)
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>
export const GetProjectsCountsByCountryDocument = gql`
  query getProjectsCountsByCountry {
    projects {
      groups(groupBy: "location.country") {
        group
        count
        items(limit: 1) {
          id
          location {
            countryName
            longitude
            latitude
          }
        }
      }
    }
  }
`

/**
 * __useGetProjectsCountsByCountryQuery__
 *
 * To run a query within a React component, call `useGetProjectsCountsByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsCountsByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsCountsByCountryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsCountsByCountryQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProjectsCountsByCountryQuery, GetProjectsCountsByCountryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectsCountsByCountryQuery, GetProjectsCountsByCountryQueryVariables>(
    GetProjectsCountsByCountryDocument,
    options,
  )
}
export function useGetProjectsCountsByCountryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsCountsByCountryQuery, GetProjectsCountsByCountryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectsCountsByCountryQuery, GetProjectsCountsByCountryQueryVariables>(
    GetProjectsCountsByCountryDocument,
    options,
  )
}
export function useGetProjectsCountsByCountrySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetProjectsCountsByCountryQuery, GetProjectsCountsByCountryQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetProjectsCountsByCountryQuery, GetProjectsCountsByCountryQueryVariables>(
    GetProjectsCountsByCountryDocument,
    options,
  )
}
export type GetProjectsCountsByCountryQueryHookResult = ReturnType<typeof useGetProjectsCountsByCountryQuery>
export type GetProjectsCountsByCountryLazyQueryHookResult = ReturnType<typeof useGetProjectsCountsByCountryLazyQuery>
export type GetProjectsCountsByCountrySuspenseQueryHookResult = ReturnType<
  typeof useGetProjectsCountsByCountrySuspenseQuery
>
export type GetProjectsCountsByCountryQueryResult = Apollo.QueryResult<
  GetProjectsCountsByCountryQuery,
  GetProjectsCountsByCountryQueryVariables
>
export const GetProjectDataForBoxPlotDocument = gql`
  query getProjectDataForBoxPlot($aggregation: JSON!) {
    projects {
      groups(groupBy: "location.country") {
        group
        items(limit: null) {
          id
          location {
            countryName
          }
          softwareInfo {
            lcaSoftware
          }
          metaData {
            source {
              name
            }
          }
        }
      }
      aggregation(apply: $aggregation)
    }
  }
`

/**
 * __useGetProjectDataForBoxPlotQuery__
 *
 * To run a query within a React component, call `useGetProjectDataForBoxPlotQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDataForBoxPlotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDataForBoxPlotQuery({
 *   variables: {
 *      aggregation: // value for 'aggregation'
 *   },
 * });
 */
export function useGetProjectDataForBoxPlotQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectDataForBoxPlotQuery, GetProjectDataForBoxPlotQueryVariables> &
    ({ variables: GetProjectDataForBoxPlotQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectDataForBoxPlotQuery, GetProjectDataForBoxPlotQueryVariables>(
    GetProjectDataForBoxPlotDocument,
    options,
  )
}
export function useGetProjectDataForBoxPlotLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDataForBoxPlotQuery, GetProjectDataForBoxPlotQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectDataForBoxPlotQuery, GetProjectDataForBoxPlotQueryVariables>(
    GetProjectDataForBoxPlotDocument,
    options,
  )
}
export function useGetProjectDataForBoxPlotSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetProjectDataForBoxPlotQuery, GetProjectDataForBoxPlotQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetProjectDataForBoxPlotQuery, GetProjectDataForBoxPlotQueryVariables>(
    GetProjectDataForBoxPlotDocument,
    options,
  )
}
export type GetProjectDataForBoxPlotQueryHookResult = ReturnType<typeof useGetProjectDataForBoxPlotQuery>
export type GetProjectDataForBoxPlotLazyQueryHookResult = ReturnType<typeof useGetProjectDataForBoxPlotLazyQuery>
export type GetProjectDataForBoxPlotSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectDataForBoxPlotSuspenseQuery
>
export type GetProjectDataForBoxPlotQueryResult = Apollo.QueryResult<
  GetProjectDataForBoxPlotQuery,
  GetProjectDataForBoxPlotQueryVariables
>
export const GetProjectPortfolioDocument = gql`
  query getProjectPortfolio($limit: Int, $offset: Int, $filters: FilterBy, $sortBy: SortBy) {
    projects {
      items(limit: $limit, offset: $offset, filterBy: $filters, sortBy: $sortBy) {
        id
        name
        location {
          countryName
        }
        softwareInfo {
          lcaSoftware
        }
        projectInfo {
          grossFloorArea {
            value
          }
          buildingType
          buildingTypology
          buildingCompletionYear
          buildingFootprint {
            value
          }
          buildingHeight {
            value
          }
          buildingMass {
            value
          }
          buildingPermitYear
          buildingUsers
          floorsAboveGround
          floorsBelowGround
          frameType
          generalEnergyClass
          roofType
          heatedFloorArea {
            value
          }
        }
        metaData {
          source {
            name
            url
          }
        }
        results {
          gwp {
            a0
            a1a3
            a4
            a5
            b1
            b2
            b3
            b4
            b5
            b6
            b7
            b8
            c1
            c2
            c3
            c4
            d
            total
          }
        }
      }
      count(filterBy: $filters)
    }
  }
`

/**
 * __useGetProjectPortfolioQuery__
 *
 * To run a query within a React component, call `useGetProjectPortfolioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectPortfolioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectPortfolioQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filters: // value for 'filters'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGetProjectPortfolioQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProjectPortfolioQuery, GetProjectPortfolioQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectPortfolioQuery, GetProjectPortfolioQueryVariables>(
    GetProjectPortfolioDocument,
    options,
  )
}
export function useGetProjectPortfolioLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectPortfolioQuery, GetProjectPortfolioQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectPortfolioQuery, GetProjectPortfolioQueryVariables>(
    GetProjectPortfolioDocument,
    options,
  )
}
export function useGetProjectPortfolioSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetProjectPortfolioQuery, GetProjectPortfolioQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetProjectPortfolioQuery, GetProjectPortfolioQueryVariables>(
    GetProjectPortfolioDocument,
    options,
  )
}
export type GetProjectPortfolioQueryHookResult = ReturnType<typeof useGetProjectPortfolioQuery>
export type GetProjectPortfolioLazyQueryHookResult = ReturnType<typeof useGetProjectPortfolioLazyQuery>
export type GetProjectPortfolioSuspenseQueryHookResult = ReturnType<typeof useGetProjectPortfolioSuspenseQuery>
export type GetProjectPortfolioQueryResult = Apollo.QueryResult<
  GetProjectPortfolioQuery,
  GetProjectPortfolioQueryVariables
>
export const GetProjectDetailsDocument = gql`
  query getProjectDetails($id: UUID!) {
    contributions {
      items(filterBy: { equal: { id: $id } }) {
        project {
          id
          name
          location {
            countryName
          }
          lifeCycleStages
          projectInfo {
            buildingCompletionYear
            buildingFootprint {
              value
              unit
            }
            buildingHeight {
              value
              unit
            }
            buildingMass {
              value
              unit
            }
            buildingModelScope
            buildingPermitYear
            buildingType
            buildingTypology
            buildingUsers
            certifications
            energyDemandElectricity
            energyDemandHeating
            energySupplyElectricity
            energySupplyHeating
            exportedElectricity
            floorsAboveGround
            floorsBelowGround
            frameType
            generalEnergyClass
            grossFloorArea {
              value
              unit
            }
            heatedFloorArea {
              value
              unit
            }
            localEnergyClass
            roofType
          }
          metaData {
            source {
              name
              url
            }
            productClassificationSystem
            climateZone
            image
            owner {
              contact
              web
              country
              email
              type
              representative
            }
            assessment {
              assessmentMethodologyDescription
              uncertainty
              cutoffMethod
              assessor {
                name
                email
                organization
              }
              year
              date
              quantitySource
              quantitySourceDetail
              purpose
              iso21931Compliance
              en15978Compliance
              rics2017Compliance
              rics2023Compliance
              ashrae240pCompliance
              seiPrestandardCompliance
              verified
              verifiedInfo
              validityPeriod
              resultsValidationDescription
              toolReportUpload
              reportName
              additionalLcaReportName
              projectPhaseAtReporting
              projectPhaseAtTimeOfAssessment
              operationalEnergyIncluded
              biogenicCarbonIncluded
              biogenicCarbonAccountingMethod
              bioSustainabilityCertification
              biogenicCarbonDescription
              projectRefrigerants
              refrigerantTypeIncluded
              substructureScope
              shellSuperstructureScope
              shellExteriorEnclosureScope
              interiorConstructionScope
              interiorFinishesScope
              servicesMechanicalScope
              servicesElectricalScope
              servicesPlumbingScope
              siteworkScope
              equipmentScope
              furnishingsScope
              lcaRequirements
            }
            lcaSoftwareVersion
            lcaDatabase
            lcaDatabaseVersion
            lcaDatabaseOther
            lcaModelType
            interstitialFloors
            newlyBuiltArea {
              value
              unit
            }
            retrofittedArea {
              value
              unit
            }
            demolishedArea {
              value
              unit
            }
            existingArea {
              value
              unit
            }
            builtFloorArea {
              value
              unit
            }
            buildingProjectConstructionType2
            infrastructureProjectConstructionType
            infrastructureSectorType
            buildingUseType
            infrastructureUseType
            projectWorkArea {
              value
              unit
            }
            projectSiteArea {
              value
              unit
            }
            conditionedFloorArea {
              value
              unit
            }
            unconditionedFloorArea {
              value
              unit
            }
            enclosedParkingArea {
              value
              unit
            }
            detachedParkingArea {
              value
              unit
            }
            surfaceParkingArea {
              value
              unit
            }
            detachedParkingStructureArea {
              value
              unit
            }
            ibcConstructionType
            projectSurroundings
            projectHistoric
            fullTimeEquivalent
            occupantLoad
            meanRoofHeight {
              value
              unit
            }
            windowWallRatio
            thermalEnvelopeArea {
              value
              unit
            }
            residentialUnits
            bedroomCount
            projectExpectedLife
            resultsValidatedAsBuilt
            resultsValidatedAsBuiltDescription
            assessmentCutoffType
            assessmentCutoff
            assessmentCostCutoff
            heritageStatus
            omniclassConstructionEntity
            energy {
              toolEnergyModeling
              toolEnergyModelingVersion
              energyModelMethodologyReference
              gwpEnergySourcesYear
              siteLocationWeatherData
              electricityProvider
              electricitySource
              electricityCarbonFactor
              electricityCarbonFactorSource
            }
            architectOfRecord
            projectUserStudio
            generalContractor
            mepEngineer
            sustainabilityConsultant
            structuralEngineer
            civilEngineer
            landscapeConsultant
            interiorDesigner
            otherProjectTeam
            workCompletionYear
            constructionStart
            constructionYearExistingBuilding
            buildingOccupancyStart
            cost {
              currency
              totalCost
              hardCost
              softCost
              siteworksCost
              costSource
              notes
            }
            structural {
              columnGridLong {
                value
                unit
              }
              riskCategory
              liveLoad {
                value
                unit
              }
              snowLoad {
                value
                unit
              }
              windSpeed {
                value
                unit
              }
              earthquakeImportanceFactor
              seismicDesignCategory
              horizontalGravitySystem
              secondaryHorizontalGravitySystem
              verticalGravitySystem
              secondaryVerticalGravitySystem
              lateralSystem
              podium
              allowableSoilBearingPressure {
                value
                unit
              }
              foundationType
            }
            publication {
              authors
              year
              doi
              title
              publisher
            }
          }
          results {
            gwp {
              a0
              a1a3
              a4
              a5
              b1
              b2
              b3
              b4
              b5
              b6
              b7
              b8
              c1
              c2
              c3
              c4
              d
            }
          }
        }
      }
    }
  }
`

/**
 * __useGetProjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables> &
    ({ variables: GetProjectDetailsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, options)
}
export function useGetProjectDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(
    GetProjectDetailsDocument,
    options,
  )
}
export function useGetProjectDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(
    GetProjectDetailsDocument,
    options,
  )
}
export type GetProjectDetailsQueryHookResult = ReturnType<typeof useGetProjectDetailsQuery>
export type GetProjectDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectDetailsLazyQuery>
export type GetProjectDetailsSuspenseQueryHookResult = ReturnType<typeof useGetProjectDetailsSuspenseQuery>
export type GetProjectDetailsQueryResult = Apollo.QueryResult<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>
export const GetAggregatedProjectDataDocument = gql`
  query getAggregatedProjectData($aggregation: JSON!) {
    projects {
      aggregation(apply: $aggregation)
    }
  }
`

/**
 * __useGetAggregatedProjectDataQuery__
 *
 * To run a query within a React component, call `useGetAggregatedProjectDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAggregatedProjectDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAggregatedProjectDataQuery({
 *   variables: {
 *      aggregation: // value for 'aggregation'
 *   },
 * });
 */
export function useGetAggregatedProjectDataQuery(
  baseOptions: Apollo.QueryHookOptions<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables> &
    ({ variables: GetAggregatedProjectDataQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables>(
    GetAggregatedProjectDataDocument,
    options,
  )
}
export function useGetAggregatedProjectDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables>(
    GetAggregatedProjectDataDocument,
    options,
  )
}
export function useGetAggregatedProjectDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAggregatedProjectDataQuery, GetAggregatedProjectDataQueryVariables>(
    GetAggregatedProjectDataDocument,
    options,
  )
}
export type GetAggregatedProjectDataQueryHookResult = ReturnType<typeof useGetAggregatedProjectDataQuery>
export type GetAggregatedProjectDataLazyQueryHookResult = ReturnType<typeof useGetAggregatedProjectDataLazyQuery>
export type GetAggregatedProjectDataSuspenseQueryHookResult = ReturnType<
  typeof useGetAggregatedProjectDataSuspenseQuery
>
export type GetAggregatedProjectDataQueryResult = Apollo.QueryResult<
  GetAggregatedProjectDataQuery,
  GetAggregatedProjectDataQueryVariables
>
export const DeleteContributionsDocument = gql`
  mutation deleteContributions($contributions: [UUID!]!) {
    deleteContributions(contributions: $contributions)
  }
`
export type DeleteContributionsMutationFn = Apollo.MutationFunction<
  DeleteContributionsMutation,
  DeleteContributionsMutationVariables
>

/**
 * __useDeleteContributionsMutation__
 *
 * To run a mutation, you first call `useDeleteContributionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContributionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContributionsMutation, { data, loading, error }] = useDeleteContributionsMutation({
 *   variables: {
 *      contributions: // value for 'contributions'
 *   },
 * });
 */
export function useDeleteContributionsMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteContributionsMutation, DeleteContributionsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteContributionsMutation, DeleteContributionsMutationVariables>(
    DeleteContributionsDocument,
    options,
  )
}
export type DeleteContributionsMutationHookResult = ReturnType<typeof useDeleteContributionsMutation>
export type DeleteContributionsMutationResult = Apollo.MutationResult<DeleteContributionsMutation>
export type DeleteContributionsMutationOptions = Apollo.BaseMutationOptions<
  DeleteContributionsMutation,
  DeleteContributionsMutationVariables
>
export const UpdateContributionsDocument = gql`
  mutation updateContributions($contributions: [UpdateContribution!]!) {
    updateContributions(contributions: $contributions) {
      id
    }
  }
`
export type UpdateContributionsMutationFn = Apollo.MutationFunction<
  UpdateContributionsMutation,
  UpdateContributionsMutationVariables
>

/**
 * __useUpdateContributionsMutation__
 *
 * To run a mutation, you first call `useUpdateContributionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContributionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContributionsMutation, { data, loading, error }] = useUpdateContributionsMutation({
 *   variables: {
 *      contributions: // value for 'contributions'
 *   },
 * });
 */
export function useUpdateContributionsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateContributionsMutation, UpdateContributionsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateContributionsMutation, UpdateContributionsMutationVariables>(
    UpdateContributionsDocument,
    options,
  )
}
export type UpdateContributionsMutationHookResult = ReturnType<typeof useUpdateContributionsMutation>
export type UpdateContributionsMutationResult = Apollo.MutationResult<UpdateContributionsMutation>
export type UpdateContributionsMutationOptions = Apollo.BaseMutationOptions<
  UpdateContributionsMutation,
  UpdateContributionsMutationVariables
>
export const ImpersonateUserDocument = gql`
  mutation impersonateUser($userId: String!) {
    impersonate(userId: $userId)
  }
`
export type ImpersonateUserMutationFn = Apollo.MutationFunction<
  ImpersonateUserMutation,
  ImpersonateUserMutationVariables
>

/**
 * __useImpersonateUserMutation__
 *
 * To run a mutation, you first call `useImpersonateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImpersonateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [impersonateUserMutation, { data, loading, error }] = useImpersonateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useImpersonateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<ImpersonateUserMutation, ImpersonateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ImpersonateUserMutation, ImpersonateUserMutationVariables>(ImpersonateUserDocument, options)
}
export type ImpersonateUserMutationHookResult = ReturnType<typeof useImpersonateUserMutation>
export type ImpersonateUserMutationResult = Apollo.MutationResult<ImpersonateUserMutation>
export type ImpersonateUserMutationOptions = Apollo.BaseMutationOptions<
  ImpersonateUserMutation,
  ImpersonateUserMutationVariables
>
export const MakeUserAdminDocument = gql`
  mutation makeUserAdmin($userId: String!) {
    makeAdmin(userId: $userId)
  }
`
export type MakeUserAdminMutationFn = Apollo.MutationFunction<MakeUserAdminMutation, MakeUserAdminMutationVariables>

/**
 * __useMakeUserAdminMutation__
 *
 * To run a mutation, you first call `useMakeUserAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeUserAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeUserAdminMutation, { data, loading, error }] = useMakeUserAdminMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMakeUserAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<MakeUserAdminMutation, MakeUserAdminMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<MakeUserAdminMutation, MakeUserAdminMutationVariables>(MakeUserAdminDocument, options)
}
export type MakeUserAdminMutationHookResult = ReturnType<typeof useMakeUserAdminMutation>
export type MakeUserAdminMutationResult = Apollo.MutationResult<MakeUserAdminMutation>
export type MakeUserAdminMutationOptions = Apollo.BaseMutationOptions<
  MakeUserAdminMutation,
  MakeUserAdminMutationVariables
>
export const GetRolesAndPermissionsDocument = gql`
  query getRolesAndPermissions {
    roles {
      name
      permissions
    }
  }
`

/**
 * __useGetRolesAndPermissionsQuery__
 *
 * To run a query within a React component, call `useGetRolesAndPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesAndPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesAndPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesAndPermissionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetRolesAndPermissionsQuery, GetRolesAndPermissionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRolesAndPermissionsQuery, GetRolesAndPermissionsQueryVariables>(
    GetRolesAndPermissionsDocument,
    options,
  )
}
export function useGetRolesAndPermissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRolesAndPermissionsQuery, GetRolesAndPermissionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRolesAndPermissionsQuery, GetRolesAndPermissionsQueryVariables>(
    GetRolesAndPermissionsDocument,
    options,
  )
}
export function useGetRolesAndPermissionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetRolesAndPermissionsQuery, GetRolesAndPermissionsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetRolesAndPermissionsQuery, GetRolesAndPermissionsQueryVariables>(
    GetRolesAndPermissionsDocument,
    options,
  )
}
export type GetRolesAndPermissionsQueryHookResult = ReturnType<typeof useGetRolesAndPermissionsQuery>
export type GetRolesAndPermissionsLazyQueryHookResult = ReturnType<typeof useGetRolesAndPermissionsLazyQuery>
export type GetRolesAndPermissionsSuspenseQueryHookResult = ReturnType<typeof useGetRolesAndPermissionsSuspenseQuery>
export type GetRolesAndPermissionsQueryResult = Apollo.QueryResult<
  GetRolesAndPermissionsQuery,
  GetRolesAndPermissionsQueryVariables
>
