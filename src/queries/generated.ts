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
  /** Date (isoformat) */
  Date: { input: any; output: any }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  UUID: { input: any; output: any }
  _FieldSet: { input: any; output: any }
}

export type AreaType = {
  __typename?: 'AreaType'
  definition: Scalars['String']['output']
  unit: Unit
  value: Scalars['Float']['output']
}

export type Assembly = {
  __typename?: 'Assembly'
  category?: Maybe<Scalars['String']['output']>
  classification?: Maybe<Array<Classification>>
  comment?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  metaData: Scalars['JSON']['output']
  name: Scalars['String']['output']
  products: Array<Product>
  quantity: Scalars['Float']['output']
  results: Scalars['JSON']['output']
  unit: Unit
}

export type BuildingModelScope = {
  __typename?: 'BuildingModelScope'
  buildingServices: Scalars['Boolean']['output']
  externalWorks: Scalars['Boolean']['output']
  facilitatingWorks: Scalars['Boolean']['output']
  ffE: Scalars['Boolean']['output']
  finishes: Scalars['Boolean']['output']
  substructure: Scalars['Boolean']['output']
  superstructureEnvelope: Scalars['Boolean']['output']
  superstructureFrame: Scalars['Boolean']['output']
  superstructureInternalElements: Scalars['Boolean']['output']
}

export enum BuildingType {
  NEW = 'new',
  RENOVATION = 'renovation',
}

export enum BuildingTypology {
  AGRICULTURAL = 'agricultural',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  INFRASTRUCTURE = 'infrastructure',
  MIXEDUSE = 'mixeduse',
  OFFICE = 'office',
  OTHER = 'other',
  PUBLIC = 'public',
  RESIDENTIAL = 'residential',
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
  uploadedAt: Scalars['DateTime']['output']
  userId: Scalars['UUID']['output']
}

export type ContributionFilters = {
  id?: InputMaybe<FilterOptions>
  organizationId?: InputMaybe<FilterOptions>
  uploadAt?: InputMaybe<FilterOptions>
  userId?: InputMaybe<FilterOptions>
}

export type ContributionSort = {
  id?: InputMaybe<SortOptions>
  organizationId?: InputMaybe<SortOptions>
  uploadAt?: InputMaybe<SortOptions>
  userId?: InputMaybe<SortOptions>
}

export type Conversion = {
  __typename?: 'Conversion'
  metaData: Scalars['String']['output']
  to: Unit
  value: Scalars['Float']['output']
}

export enum Country {
  ABW = 'abw',
  AFG = 'afg',
  AGO = 'ago',
  AIA = 'aia',
  ALA = 'ala',
  ALB = 'alb',
  AND = 'and',
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
  impacts: Scalars['JSON']['output']
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

export type FilterOptions = {
  equal?: InputMaybe<Scalars['String']['input']>
  isTrue?: InputMaybe<Scalars['Boolean']['input']>
}

export enum GeneralEnergyClass {
  ADVANCED = 'advanced',
  EXISTING = 'existing',
  STANDARD = 'standard',
  UNKNOWN = 'unknown',
}

export type GraphQlInputImpactData = {
  EPD?: InputMaybe<InputEpd>
  techFlow?: InputMaybe<InputTechFlow>
}

export type GraphQlInputProjectInfo = {
  buildingInfo?: InputMaybe<InputProjectInfo>
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
  unit: Unit
}

export type InputBuildingModelScope = {
  buildingServices: Scalars['Boolean']['input']
  externalWorks: Scalars['Boolean']['input']
  facilitatingWorks: Scalars['Boolean']['input']
  ffE: Scalars['Boolean']['input']
  finishes: Scalars['Boolean']['input']
  substructure: Scalars['Boolean']['input']
  superstructureEnvelope: Scalars['Boolean']['input']
  superstructureFrame: Scalars['Boolean']['input']
  superstructureInternalElements: Scalars['Boolean']['input']
}

export type InputClassification = {
  code: Scalars['String']['input']
  name: Scalars['String']['input']
  system: Scalars['String']['input']
}

export type InputContribution = {
  project: InputProject
}

export type InputConversion = {
  metaData?: InputMaybe<Scalars['String']['input']>
  to: Unit
  value: Scalars['Float']['input']
}

export type InputEpd = {
  comment?: InputMaybe<Scalars['String']['input']>
  conversions?: InputMaybe<Array<InputConversion>>
  declaredUnit: Unit
  formatVersion: Scalars['String']['input']
  id?: InputMaybe<Scalars['UUID']['input']>
  impacts: Scalars['JSON']['input']
  location: Country
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  publishedDate: Scalars['Date']['input']
  referenceServiceLife?: InputMaybe<Scalars['Int']['input']>
  source?: InputMaybe<InputSource>
  standard: Standard
  subtype: SubType
  validUntil: Scalars['Date']['input']
  version: Scalars['String']['input']
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
  name: Scalars['String']['input']
}

export type InputProduct = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  impactData: GraphQlInputImpactData
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  quantity: Scalars['Float']['input']
  referenceServiceLife: Scalars['Int']['input']
  results?: InputMaybe<Scalars['JSON']['input']>
  transport?: InputMaybe<Scalars['JSON']['input']>
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
  projectInfo?: InputMaybe<GraphQlInputProjectInfo>
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
  buildingModelScope?: InputMaybe<InputBuildingModelScope>
  buildingPermitYear?: InputMaybe<Scalars['Int']['input']>
  buildingType?: InputMaybe<BuildingType>
  buildingTypology?: InputMaybe<BuildingTypology>
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
  heatedFloorArea: InputAreaType
  localEnergyClass?: InputMaybe<Scalars['String']['input']>
  roofType?: InputMaybe<RoofType>
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

export type InputTechFlow = {
  comment?: InputMaybe<Scalars['String']['input']>
  conversions?: InputMaybe<Array<InputConversion>>
  declaredUnit: Unit
  formatVersion: Scalars['String']['input']
  id?: InputMaybe<Scalars['UUID']['input']>
  impacts: Scalars['JSON']['input']
  location: Country
  metaData?: InputMaybe<Scalars['JSON']['input']>
  name: Scalars['String']['input']
  source?: InputMaybe<InputSource>
}

export type InputValueUnit = {
  unit: Unit
  value: Scalars['Float']['input']
}

export enum LifeCycleStage {
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
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Creates new Contributions */
  addContributions: Array<Contribution>
  /** Creates multiple organizations and associates them with the current user */
  createOrganizations: Array<Organization>
  /** Deletes a list of Organizations by their IDs and returns a list of deleted IDs */
  deleteOrganizations: Array<Scalars['UUID']['output']>
  /** Updates an existing Organization */
  updateOrganizations: Array<Organization>
  /** Update user details */
  updateUser: User
}

export type MutationAddContributionsArgs = {
  contributions: Array<InputContribution>
}

export type MutationCreateOrganizationsArgs = {
  organizations: Array<InputOrganization>
}

export type MutationDeleteOrganizationsArgs = {
  ids: Array<Scalars['UUID']['input']>
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
  name: Scalars['String']['output']
}

export type OrganizationFilter = {
  address?: InputMaybe<FilterOptions>
  city?: InputMaybe<FilterOptions>
  country?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  name?: InputMaybe<FilterOptions>
}

export type Product = {
  __typename?: 'Product'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  impactData: EpdTechFlow
  metaData: Scalars['JSON']['output']
  name: Scalars['String']['output']
  quantity: Scalars['Float']['output']
  referenceServiceLife: Scalars['Int']['output']
  results: Scalars['JSON']['output']
  unit: Unit
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
  metaData?: Maybe<Scalars['JSON']['output']>
  name: Scalars['String']['output']
  owner?: Maybe<Scalars['String']['output']>
  projectInfo: ProjectInfo
  projectPhase: ProjectPhase
  referenceStudyPeriod?: Maybe<Scalars['Int']['output']>
  results?: Maybe<Scalars['JSON']['output']>
  softwareInfo: SoftwareInfo
}

export type ProjectAggregation = {
  __typename?: 'ProjectAggregation'
  count: Scalars['Int']['output']
  location: ProjectLocation
}

export type ProjectInfo = {
  __typename?: 'ProjectInfo'
  buildingCompletionYear?: Maybe<Scalars['Int']['output']>
  buildingFootprint?: Maybe<ValueUnit>
  buildingHeight?: Maybe<ValueUnit>
  buildingMass?: Maybe<ValueUnit>
  buildingModelScope?: Maybe<BuildingModelScope>
  buildingPermitYear?: Maybe<Scalars['Int']['output']>
  buildingType: BuildingType
  buildingTypology: BuildingTypology
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

export type ProjectLocation = {
  __typename?: 'ProjectLocation'
  latitude: Scalars['Float']['output']
  longitude: Scalars['Float']['output']
}

export enum ProjectPhase {
  BUILT = 'built',
  DESIGN = 'design',
  ONGOING = 'ongoing',
  OTHER = 'other',
}

export type Query = {
  __typename?: 'Query'
  /** Returns all contributions assigned to user */
  contributions: Array<Contribution>
  /** Returns all Organizations */
  organizations: Array<Organization>
  /** Returns aggregated Projects with location and count by country */
  projectsCountsByCountry: Array<ProjectAggregation>
  /** Returns all Users */
  users: Array<User>
}

export type QueryContributionsArgs = {
  filters?: InputMaybe<ContributionFilters>
  sortBy?: InputMaybe<ContributionSort>
}

export type QueryOrganizationsArgs = {
  filters?: InputMaybe<OrganizationFilter>
}

export type QueryUsersArgs = {
  filters?: InputMaybe<UserFilters>
  sortBy?: InputMaybe<UserSort>
}

export enum RoofType {
  FLAT = 'flat',
  OTHER = 'other',
  PITCHED = 'pitched',
  PYRAMID = 'pyramid',
  SADDLE = 'saddle',
}

export type SoftwareInfo = {
  __typename?: 'SoftwareInfo'
  calculationType?: Maybe<Scalars['String']['output']>
  goalAndScopeDefinition?: Maybe<Scalars['String']['output']>
  lcaSoftware: Scalars['String']['output']
}

export enum SortOptions {
  ASC = 'ASC',
  DSC = 'DSC',
}

export type Source = {
  __typename?: 'Source'
  name: Scalars['String']['output']
  url?: Maybe<Scalars['String']['output']>
}

export enum Standard {
  EN15804A1 = 'en15804a1',
  EN15804A2 = 'en15804a2',
  UNKNOWN = 'unknown',
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
  impacts: Scalars['JSON']['output']
  location: Country
  metaData: Scalars['JSON']['output']
  name: Scalars['String']['output']
  source?: Maybe<Source>
}

export enum Unit {
  KG = 'kg',
  KM = 'km',
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

export type UpdateUserInput = {
  currentPassword?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  firstName?: InputMaybe<Scalars['String']['input']>
  id: Scalars['UUID']['input']
  lastName?: InputMaybe<Scalars['String']['input']>
  newPassword?: InputMaybe<Scalars['String']['input']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']['output']
  firstName?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  lastName?: Maybe<Scalars['String']['output']>
  organization?: Maybe<Organization>
  organizationId?: Maybe<Scalars['UUID']['output']>
  timeJoined: Scalars['DateTime']['output']
}

export type UserFilters = {
  email?: InputMaybe<FilterOptions>
  firstName?: InputMaybe<FilterOptions>
  id?: InputMaybe<FilterOptions>
  lastName?: InputMaybe<FilterOptions>
  organizationId?: InputMaybe<FilterOptions>
}

export type UserSort = {
  firstName?: InputMaybe<SortOptions>
  id?: InputMaybe<SortOptions>
  lastName?: InputMaybe<SortOptions>
  name?: InputMaybe<SortOptions>
  organizationId?: InputMaybe<SortOptions>
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
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  EPDTechFlow: Epd | TechFlow
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AreaType: ResolverTypeWrapper<AreaType>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  Assembly: ResolverTypeWrapper<Assembly>
  BuildingModelScope: ResolverTypeWrapper<BuildingModelScope>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  BuildingType: BuildingType
  BuildingTypology: BuildingTypology
  Classification: ResolverTypeWrapper<Classification>
  Contribution: ResolverTypeWrapper<Contribution>
  ContributionFilters: ContributionFilters
  ContributionSort: ContributionSort
  Conversion: ResolverTypeWrapper<Conversion>
  Country: Country
  CountryCodes: CountryCodes
  Date: ResolverTypeWrapper<Scalars['Date']['output']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
  EPD: ResolverTypeWrapper<Epd>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  EPDTechFlow: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['EPDTechFlow']>
  FilterOptions: FilterOptions
  GeneralEnergyClass: GeneralEnergyClass
  GraphQLInputImpactData: GraphQlInputImpactData
  GraphQLInputProjectInfo: GraphQlInputProjectInfo
  ImpactCategoryKey: ImpactCategoryKey
  InputAreaType: InputAreaType
  InputAssembly: InputAssembly
  InputBuildingModelScope: InputBuildingModelScope
  InputClassification: InputClassification
  InputContribution: InputContribution
  InputConversion: InputConversion
  InputEPD: InputEpd
  InputLocation: InputLocation
  InputOrganization: InputOrganization
  InputProduct: InputProduct
  InputProject: InputProject
  InputProjectInfo: InputProjectInfo
  InputSoftwareInfo: InputSoftwareInfo
  InputSource: InputSource
  InputTechFlow: InputTechFlow
  InputValueUnit: InputValueUnit
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>
  LifeCycleStage: LifeCycleStage
  Location: ResolverTypeWrapper<Location>
  Mutation: ResolverTypeWrapper<{}>
  Organization: ResolverTypeWrapper<Organization>
  OrganizationFilter: OrganizationFilter
  Product: ResolverTypeWrapper<Omit<Product, 'impactData'> & { impactData: ResolversTypes['EPDTechFlow'] }>
  Project: ResolverTypeWrapper<Project>
  ProjectAggregation: ResolverTypeWrapper<ProjectAggregation>
  ProjectInfo: ResolverTypeWrapper<ProjectInfo>
  ProjectLocation: ResolverTypeWrapper<ProjectLocation>
  ProjectPhase: ProjectPhase
  Query: ResolverTypeWrapper<{}>
  RoofType: RoofType
  SoftwareInfo: ResolverTypeWrapper<SoftwareInfo>
  SortOptions: SortOptions
  Source: ResolverTypeWrapper<Source>
  Standard: Standard
  SubType: SubType
  TechFlow: ResolverTypeWrapper<TechFlow>
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>
  Unit: Unit
  UpdateUserInput: UpdateUserInput
  User: ResolverTypeWrapper<User>
  UserFilters: UserFilters
  UserSort: UserSort
  ValueUnit: ResolverTypeWrapper<ValueUnit>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AreaType: AreaType
  String: Scalars['String']['output']
  Float: Scalars['Float']['output']
  Assembly: Assembly
  BuildingModelScope: BuildingModelScope
  Boolean: Scalars['Boolean']['output']
  Classification: Classification
  Contribution: Contribution
  ContributionFilters: ContributionFilters
  ContributionSort: ContributionSort
  Conversion: Conversion
  Date: Scalars['Date']['output']
  DateTime: Scalars['DateTime']['output']
  EPD: Epd
  Int: Scalars['Int']['output']
  EPDTechFlow: ResolversUnionTypes<ResolversParentTypes>['EPDTechFlow']
  FilterOptions: FilterOptions
  GraphQLInputImpactData: GraphQlInputImpactData
  GraphQLInputProjectInfo: GraphQlInputProjectInfo
  InputAreaType: InputAreaType
  InputAssembly: InputAssembly
  InputBuildingModelScope: InputBuildingModelScope
  InputClassification: InputClassification
  InputContribution: InputContribution
  InputConversion: InputConversion
  InputEPD: InputEpd
  InputLocation: InputLocation
  InputOrganization: InputOrganization
  InputProduct: InputProduct
  InputProject: InputProject
  InputProjectInfo: InputProjectInfo
  InputSoftwareInfo: InputSoftwareInfo
  InputSource: InputSource
  InputTechFlow: InputTechFlow
  InputValueUnit: InputValueUnit
  JSON: Scalars['JSON']['output']
  Location: Location
  Mutation: {}
  Organization: Organization
  OrganizationFilter: OrganizationFilter
  Product: Omit<Product, 'impactData'> & { impactData: ResolversParentTypes['EPDTechFlow'] }
  Project: Project
  ProjectAggregation: ProjectAggregation
  ProjectInfo: ProjectInfo
  ProjectLocation: ProjectLocation
  Query: {}
  SoftwareInfo: SoftwareInfo
  Source: Source
  TechFlow: TechFlow
  UUID: Scalars['UUID']['output']
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
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  classification?: Resolver<Maybe<Array<ResolversTypes['Classification']>>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  metaData?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  results?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type BuildingModelScopeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BuildingModelScope'] = ResolversParentTypes['BuildingModelScope'],
> = {
  buildingServices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  externalWorks?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  facilitatingWorks?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  ffE?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  finishes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  substructure?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  superstructureEnvelope?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  superstructureFrame?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  superstructureInternalElements?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
  uploadedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
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
  impacts?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
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
  deleteOrganizations?: Resolver<
    Array<ResolversTypes['UUID']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteOrganizationsArgs, 'ids'>
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
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProductResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product'],
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  impactData?: Resolver<ResolversTypes['EPDTechFlow'], ParentType, ContextType>
  metaData?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  referenceServiceLife?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  results?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
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
  metaData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectInfo?: Resolver<ResolversTypes['ProjectInfo'], ParentType, ContextType>
  projectPhase?: Resolver<ResolversTypes['ProjectPhase'], ParentType, ContextType>
  referenceStudyPeriod?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  softwareInfo?: Resolver<ResolversTypes['SoftwareInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectAggregationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectAggregation'] = ResolversParentTypes['ProjectAggregation'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['ProjectLocation'], ParentType, ContextType>
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
  buildingModelScope?: Resolver<Maybe<ResolversTypes['BuildingModelScope']>, ParentType, ContextType>
  buildingPermitYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  buildingType?: Resolver<ResolversTypes['BuildingType'], ParentType, ContextType>
  buildingTypology?: Resolver<ResolversTypes['BuildingTypology'], ParentType, ContextType>
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

export type ProjectLocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectLocation'] = ResolversParentTypes['ProjectLocation'],
> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  contributions?: Resolver<
    Array<ResolversTypes['Contribution']>,
    ParentType,
    ContextType,
    RequireFields<QueryContributionsArgs, 'filters' | 'sortBy'>
  >
  organizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationsArgs, 'filters'>
  >
  projectsCountsByCountry?: Resolver<Array<ResolversTypes['ProjectAggregation']>, ParentType, ContextType>
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, 'filters' | 'sortBy'>
  >
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

export type TechFlowResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TechFlow'] = ResolversParentTypes['TechFlow'],
> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Maybe<Array<ResolversTypes['Conversion']>>, ParentType, ContextType>
  declaredUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  formatVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  impacts?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
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
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>
  organizationId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>
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
  AreaType?: AreaTypeResolvers<ContextType>
  Assembly?: AssemblyResolvers<ContextType>
  BuildingModelScope?: BuildingModelScopeResolvers<ContextType>
  Classification?: ClassificationResolvers<ContextType>
  Contribution?: ContributionResolvers<ContextType>
  Conversion?: ConversionResolvers<ContextType>
  Date?: GraphQLScalarType
  DateTime?: GraphQLScalarType
  EPD?: EpdResolvers<ContextType>
  EPDTechFlow?: EpdTechFlowResolvers<ContextType>
  JSON?: GraphQLScalarType
  Location?: LocationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Organization?: OrganizationResolvers<ContextType>
  Product?: ProductResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectAggregation?: ProjectAggregationResolvers<ContextType>
  ProjectInfo?: ProjectInfoResolvers<ContextType>
  ProjectLocation?: ProjectLocationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  SoftwareInfo?: SoftwareInfoResolvers<ContextType>
  Source?: SourceResolvers<ContextType>
  TechFlow?: TechFlowResolvers<ContextType>
  UUID?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  ValueUnit?: ValueUnitResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>
}

export type GetContributionsQueryVariables = Exact<{ [key: string]: never }>

export type GetContributionsQuery = {
  __typename?: 'Query'
  contributions: Array<{
    __typename?: 'Contribution'
    id: any
    uploadedAt: any
    project: { __typename?: 'Project'; name: string }
  }>
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
  organizations: Array<{
    __typename?: 'Organization'
    id: any
    name: string
    address: string
    city: string
    country: CountryCodes
  }>
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
  }>
}

export type GetUsersQueryVariables = Exact<{
  filters?: InputMaybe<UserFilters>
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
    timeJoined: any
    organization?: { __typename?: 'Organization'; id: any; name: string } | null
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
  }
}

export type GetProjectsCountsByCountryQueryVariables = Exact<{ [key: string]: never }>

export type GetProjectsCountsByCountryQuery = {
  __typename?: 'Query'
  projectsCountsByCountry: Array<{
    __typename?: 'ProjectAggregation'
    count: number
    location: { __typename?: 'ProjectLocation'; latitude: number; longitude: number }
  }>
}

export const GetContributionsDocument = gql`
  query getContributions {
    contributions {
      id
      uploadedAt
      project {
        name
      }
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
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetContributionsQuery, GetContributionsQueryVariables>(
    GetContributionsDocument,
    options,
  )
}
export type GetContributionsQueryHookResult = ReturnType<typeof useGetContributionsQuery>
export type GetContributionsLazyQueryHookResult = ReturnType<typeof useGetContributionsLazyQuery>
export type GetContributionsSuspenseQueryHookResult = ReturnType<typeof useGetContributionsSuspenseQuery>
export type GetContributionsQueryResult = Apollo.QueryResult<GetContributionsQuery, GetContributionsQueryVariables>
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
      address
      city
      country
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
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
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
export const GetUsersDocument = gql`
  query getUsers($filters: UserFilters) {
    users(filters: $filters) {
      id
      firstName
      lastName
      email
      timeJoined
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
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
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
      organization {
        id
        name
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
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
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
    projectsCountsByCountry {
      location {
        latitude
        longitude
      }
      count
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
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetProjectsCountsByCountryQuery,
    GetProjectsCountsByCountryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
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
