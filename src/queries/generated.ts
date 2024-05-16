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
  New = 'new',
  Renovation = 'renovation',
}

export enum BuildingTypology {
  Agricultural = 'agricultural',
  Commercial = 'commercial',
  Industrial = 'industrial',
  Infrastructure = 'infrastructure',
  Mixeduse = 'mixeduse',
  Office = 'office',
  Other = 'other',
  Public = 'public',
  Residential = 'residential',
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
  Abw = 'abw',
  Afg = 'afg',
  Ago = 'ago',
  Aia = 'aia',
  Ala = 'ala',
  Alb = 'alb',
  And = 'and',
  Are = 'are',
  Arg = 'arg',
  Arm = 'arm',
  Asm = 'asm',
  Ata = 'ata',
  Atf = 'atf',
  Atg = 'atg',
  Aus = 'aus',
  Aut = 'aut',
  Aze = 'aze',
  Bdi = 'bdi',
  Bel = 'bel',
  Ben = 'ben',
  Bes = 'bes',
  Bfa = 'bfa',
  Bgd = 'bgd',
  Bgr = 'bgr',
  Bhr = 'bhr',
  Bhs = 'bhs',
  Bih = 'bih',
  Blm = 'blm',
  Blr = 'blr',
  Blz = 'blz',
  Bmu = 'bmu',
  Bol = 'bol',
  Bra = 'bra',
  Brb = 'brb',
  Brn = 'brn',
  Btn = 'btn',
  Bvt = 'bvt',
  Bwa = 'bwa',
  Caf = 'caf',
  Can = 'can',
  Cck = 'cck',
  Che = 'che',
  Chl = 'chl',
  Chn = 'chn',
  Civ = 'civ',
  Cmr = 'cmr',
  Cod = 'cod',
  Cog = 'cog',
  Cok = 'cok',
  Col = 'col',
  Com = 'com',
  Cpv = 'cpv',
  Cri = 'cri',
  Cub = 'cub',
  Cuw = 'cuw',
  Cxr = 'cxr',
  Cym = 'cym',
  Cyp = 'cyp',
  Cze = 'cze',
  Deu = 'deu',
  Dji = 'dji',
  Dma = 'dma',
  Dnk = 'dnk',
  Dom = 'dom',
  Dza = 'dza',
  Ecu = 'ecu',
  Egy = 'egy',
  Eri = 'eri',
  Esh = 'esh',
  Esp = 'esp',
  Est = 'est',
  Eth = 'eth',
  Fin = 'fin',
  Fji = 'fji',
  Flk = 'flk',
  Fra = 'fra',
  Fro = 'fro',
  Fsm = 'fsm',
  Gab = 'gab',
  Gbr = 'gbr',
  Geo = 'geo',
  Ggy = 'ggy',
  Gha = 'gha',
  Gib = 'gib',
  Gin = 'gin',
  Glp = 'glp',
  Gmb = 'gmb',
  Gnb = 'gnb',
  Gnq = 'gnq',
  Grc = 'grc',
  Grd = 'grd',
  Grl = 'grl',
  Gtm = 'gtm',
  Guf = 'guf',
  Gum = 'gum',
  Guy = 'guy',
  Hkg = 'hkg',
  Hmd = 'hmd',
  Hnd = 'hnd',
  Hrv = 'hrv',
  Hti = 'hti',
  Hun = 'hun',
  Idn = 'idn',
  Imn = 'imn',
  Ind = 'ind',
  Iot = 'iot',
  Irl = 'irl',
  Irn = 'irn',
  Irq = 'irq',
  Isl = 'isl',
  Isr = 'isr',
  Ita = 'ita',
  Jam = 'jam',
  Jey = 'jey',
  Jor = 'jor',
  Jpn = 'jpn',
  Kaz = 'kaz',
  Ken = 'ken',
  Kgz = 'kgz',
  Khm = 'khm',
  Kir = 'kir',
  Kna = 'kna',
  Kor = 'kor',
  Kwt = 'kwt',
  Lao = 'lao',
  Lbn = 'lbn',
  Lbr = 'lbr',
  Lby = 'lby',
  Lca = 'lca',
  Lie = 'lie',
  Lka = 'lka',
  Lso = 'lso',
  Ltu = 'ltu',
  Lux = 'lux',
  Lva = 'lva',
  Mac = 'mac',
  Maf = 'maf',
  Mar = 'mar',
  Mco = 'mco',
  Mda = 'mda',
  Mdg = 'mdg',
  Mdv = 'mdv',
  Mex = 'mex',
  Mhl = 'mhl',
  Mkd = 'mkd',
  Mli = 'mli',
  Mlt = 'mlt',
  Mmr = 'mmr',
  Mne = 'mne',
  Mng = 'mng',
  Mnp = 'mnp',
  Moz = 'moz',
  Mrt = 'mrt',
  Msr = 'msr',
  Mtq = 'mtq',
  Mus = 'mus',
  Mwi = 'mwi',
  Mys = 'mys',
  Myt = 'myt',
  Nam = 'nam',
  Ncl = 'ncl',
  Ner = 'ner',
  Nfk = 'nfk',
  Nga = 'nga',
  Nic = 'nic',
  Niu = 'niu',
  Nld = 'nld',
  Nor = 'nor',
  Npl = 'npl',
  Nru = 'nru',
  Nzl = 'nzl',
  Omn = 'omn',
  Pak = 'pak',
  Pan = 'pan',
  Pcn = 'pcn',
  Per = 'per',
  Phl = 'phl',
  Plw = 'plw',
  Png = 'png',
  Pol = 'pol',
  Pri = 'pri',
  Prk = 'prk',
  Prt = 'prt',
  Pry = 'pry',
  Pse = 'pse',
  Pyf = 'pyf',
  Qat = 'qat',
  Reu = 'reu',
  Rou = 'rou',
  Rus = 'rus',
  Rwa = 'rwa',
  Sau = 'sau',
  Sdn = 'sdn',
  Sen = 'sen',
  Sgp = 'sgp',
  Sgs = 'sgs',
  Shn = 'shn',
  Sjm = 'sjm',
  Slb = 'slb',
  Sle = 'sle',
  Slv = 'slv',
  Smr = 'smr',
  Som = 'som',
  Spm = 'spm',
  Srb = 'srb',
  Ssd = 'ssd',
  Stp = 'stp',
  Sur = 'sur',
  Svk = 'svk',
  Svn = 'svn',
  Swe = 'swe',
  Swz = 'swz',
  Sxm = 'sxm',
  Syc = 'syc',
  Syr = 'syr',
  Tca = 'tca',
  Tcd = 'tcd',
  Tgo = 'tgo',
  Tha = 'tha',
  Tjk = 'tjk',
  Tkl = 'tkl',
  Tkm = 'tkm',
  Tls = 'tls',
  Ton = 'ton',
  Tto = 'tto',
  Tun = 'tun',
  Tur = 'tur',
  Tuv = 'tuv',
  Twn = 'twn',
  Tza = 'tza',
  Uga = 'uga',
  Ukr = 'ukr',
  Umi = 'umi',
  Unknown = 'unknown',
  Ury = 'ury',
  Usa = 'usa',
  Uzb = 'uzb',
  Vat = 'vat',
  Vct = 'vct',
  Ven = 'ven',
  Vgb = 'vgb',
  Vir = 'vir',
  Vnm = 'vnm',
  Vut = 'vut',
  Wlf = 'wlf',
  Wsm = 'wsm',
  Yem = 'yem',
  Zaf = 'zaf',
  Zmb = 'zmb',
  Zwe = 'zwe',
}

export enum CountryCodes {
  Abw = 'ABW',
  Afg = 'AFG',
  Ago = 'AGO',
  Aia = 'AIA',
  Ala = 'ALA',
  Alb = 'ALB',
  And = 'AND',
  Are = 'ARE',
  Arg = 'ARG',
  Arm = 'ARM',
  Asm = 'ASM',
  Ata = 'ATA',
  Atf = 'ATF',
  Atg = 'ATG',
  Aus = 'AUS',
  Aut = 'AUT',
  Aze = 'AZE',
  Bdi = 'BDI',
  Bel = 'BEL',
  Ben = 'BEN',
  Bes = 'BES',
  Bfa = 'BFA',
  Bgd = 'BGD',
  Bgr = 'BGR',
  Bhr = 'BHR',
  Bhs = 'BHS',
  Bih = 'BIH',
  Blr = 'BLR',
  Blz = 'BLZ',
  Bmu = 'BMU',
  Bol = 'BOL',
  Bra = 'BRA',
  Brb = 'BRB',
  Brn = 'BRN',
  Btn = 'BTN',
  Bvt = 'BVT',
  Bwa = 'BWA',
  Caf = 'CAF',
  Can = 'CAN',
  Cck = 'CCK',
  Che = 'CHE',
  Chl = 'CHL',
  Chn = 'CHN',
  Civ = 'CIV',
  Cmr = 'CMR',
  Cod = 'COD',
  Cog = 'COG',
  Cok = 'COK',
  Col = 'COL',
  Com = 'COM',
  Cpv = 'CPV',
  Cri = 'CRI',
  Cub = 'CUB',
  Cuw = 'CUW',
  Cxr = 'CXR',
  Cym = 'CYM',
  Cyp = 'CYP',
  Cze = 'CZE',
  Deu = 'DEU',
  Dji = 'DJI',
  Dma = 'DMA',
  Dnk = 'DNK',
  Dom = 'DOM',
  Dza = 'DZA',
  Ecu = 'ECU',
  Egy = 'EGY',
  Eri = 'ERI',
  Esh = 'ESH',
  Esp = 'ESP',
  Est = 'EST',
  Eth = 'ETH',
  Fin = 'FIN',
  Fji = 'FJI',
  Flk = 'FLK',
  Fra = 'FRA',
  Fro = 'FRO',
  Fsm = 'FSM',
  Gab = 'GAB',
  Gbr = 'GBR',
  Geo = 'GEO',
  Ggy = 'GGY',
  Gha = 'GHA',
  Gib = 'GIB',
  Gin = 'GIN',
  Glp = 'GLP',
  Gmb = 'GMB',
  Gnb = 'GNB',
  Gnq = 'GNQ',
  Grc = 'GRC',
  Grd = 'GRD',
  Grl = 'GRL',
  Gtm = 'GTM',
  Guf = 'GUF',
  Gum = 'GUM',
  Guy = 'GUY',
  Hkg = 'HKG',
  Hmd = 'HMD',
  Hnd = 'HND',
  Hrv = 'HRV',
  Hti = 'HTI',
  Hun = 'HUN',
  Idn = 'IDN',
  Ind = 'IND',
  Iot = 'IOT',
  Irl = 'IRL',
  Irn = 'IRN',
  Irq = 'IRQ',
  Isl = 'ISL',
  Isr = 'ISR',
  Ita = 'ITA',
  Jam = 'JAM',
  Jey = 'JEY',
  Jor = 'JOR',
  Jpn = 'JPN',
  Kaz = 'KAZ',
  Ken = 'KEN',
  Kgz = 'KGZ',
  Khm = 'KHM',
  Kir = 'KIR',
  Kna = 'KNA',
  Kor = 'KOR',
  Kwt = 'KWT',
  Lao = 'LAO',
  Lbn = 'LBN',
  Lbr = 'LBR',
  Lby = 'LBY',
  Lca = 'LCA',
  Lie = 'LIE',
  Lka = 'LKA',
  Lso = 'LSO',
  Ltu = 'LTU',
  Lux = 'LUX',
  Lva = 'LVA',
  Mac = 'MAC',
  Maf = 'MAF',
  Mar = 'MAR',
  Mco = 'MCO',
  Mda = 'MDA',
  Mdg = 'MDG',
  Mdv = 'MDV',
  Mex = 'MEX',
  Mhl = 'MHL',
  Mli = 'MLI',
  Mlt = 'MLT',
  Mmr = 'MMR',
  Mne = 'MNE',
  Mng = 'MNG',
  Mnp = 'MNP',
  Moz = 'MOZ',
  Mrt = 'MRT',
  Msr = 'MSR',
  Mtq = 'MTQ',
  Mus = 'MUS',
  Mwi = 'MWI',
  Mys = 'MYS',
  Myt = 'MYT',
  Nam = 'NAM',
  Ncl = 'NCL',
  Ner = 'NER',
  Nfk = 'NFK',
  Nga = 'NGA',
  Nic = 'NIC',
  Niu = 'NIU',
  Nld = 'NLD',
  Nor = 'NOR',
  Npl = 'NPL',
  Nru = 'NRU',
  Nzl = 'NZL',
  Omn = 'OMN',
  Pak = 'PAK',
  Pan = 'PAN',
  Pcn = 'PCN',
  Per = 'PER',
  Phl = 'PHL',
  Plw = 'PLW',
  Png = 'PNG',
  Pol = 'POL',
  Pri = 'PRI',
  Prk = 'PRK',
  Prt = 'PRT',
  Pry = 'PRY',
  Pse = 'PSE',
  Pyf = 'PYF',
  Qat = 'QAT',
  Reu = 'REU',
  Rou = 'ROU',
  Rus = 'RUS',
  Rwa = 'RWA',
  Ryu = 'RYU',
  Sau = 'SAU',
  Sbh = 'SBH',
  Sdn = 'SDN',
  Sen = 'SEN',
  Sgp = 'SGP',
  Sgs = 'SGS',
  Shn = 'SHN',
  Sjm = 'SJM',
  Slb = 'SLB',
  Sle = 'SLE',
  Slv = 'SLV',
  Smr = 'SMR',
  Som = 'SOM',
  Spm = 'SPM',
  Srb = 'SRB',
  Ssd = 'SSD',
  Stp = 'STP',
  Sur = 'SUR',
  Svk = 'SVK',
  Svn = 'SVN',
  Swe = 'SWE',
  Swz = 'SWZ',
  Sxm = 'SXM',
  Syc = 'SYC',
  Syr = 'SYR',
  Tca = 'TCA',
  Tcd = 'TCD',
  Tgo = 'TGO',
  Tha = 'THA',
  Tjk = 'TJK',
  Tkl = 'TKL',
  Tkm = 'TKM',
  Tls = 'TLS',
  Ton = 'TON',
  Tto = 'TTO',
  Tun = 'TUN',
  Tur = 'TUR',
  Tuv = 'TUV',
  Twn = 'TWN',
  Tza = 'TZA',
  Uga = 'UGA',
  Ukr = 'UKR',
  Umi = 'UMI',
  Ury = 'URY',
  Usa = 'USA',
  Uzb = 'UZB',
  Vat = 'VAT',
  Vct = 'VCT',
  Ven = 'VEN',
  Vgb = 'VGB',
  Vir = 'VIR',
  Vnm = 'VNM',
  Vut = 'VUT',
  Wlf = 'WLF',
  Wsm = 'WSM',
  Yem = 'YEM',
  Zaf = 'ZAF',
  Zmb = 'ZMB',
  Zwe = 'ZWE',
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
  Advanced = 'advanced',
  Existing = 'existing',
  Standard = 'standard',
  Unknown = 'unknown',
}

export type GraphQlInputImpactData = {
  EPD?: InputMaybe<InputEpd>
  techFlow?: InputMaybe<InputTechFlow>
}

export type GraphQlInputProjectInfo = {
  buildingInfo?: InputMaybe<InputProjectInfo>
}

export enum ImpactCategoryKey {
  Adpe = 'adpe',
  Adpf = 'adpf',
  Ap = 'ap',
  Cru = 'cru',
  Eee = 'eee',
  Eet = 'eet',
  Ep = 'ep',
  EpFw = 'ep_fw',
  EpMar = 'ep_mar',
  EpTer = 'ep_ter',
  EtpFw = 'etp_fw',
  Fw = 'fw',
  Gwp = 'gwp',
  GwpBio = 'gwp_bio',
  GwpFos = 'gwp_fos',
  GwpLul = 'gwp_lul',
  HtpC = 'htp_c',
  HtpNc = 'htp_nc',
  Hwd = 'hwd',
  Irp = 'irp',
  Mer = 'mer',
  Mrf = 'mrf',
  Nhwd = 'nhwd',
  Nrsf = 'nrsf',
  Odp = 'odp',
  Penre = 'penre',
  Penrm = 'penrm',
  Penrt = 'penrt',
  Pere = 'pere',
  Perm = 'perm',
  Pert = 'pert',
  Pm = 'pm',
  Pocp = 'pocp',
  Rsf = 'rsf',
  Rwd = 'rwd',
  Sm = 'sm',
  Sqp = 'sqp',
  Wdp = 'wdp',
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
  A1a3 = 'a1a3',
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

export enum ProjectPhase {
  Built = 'built',
  Design = 'design',
  Ongoing = 'ongoing',
  Other = 'other',
}

export type Query = {
  __typename?: 'Query'
  /** Returns all contributions assigned to user */
  contributions: Array<Contribution>
  /** Returns all Organizations */
  organizations: Array<Organization>
  /** Returns all Projects */
  projects: Array<Project>
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
  Flat = 'flat',
  Other = 'other',
  Pitched = 'pitched',
  Pyramid = 'pyramid',
  Saddle = 'saddle',
}

export type SoftwareInfo = {
  __typename?: 'SoftwareInfo'
  calculationType?: Maybe<Scalars['String']['output']>
  goalAndScopeDefinition?: Maybe<Scalars['String']['output']>
  lcaSoftware: Scalars['String']['output']
}

export enum SortOptions {
  Asc = 'ASC',
  Dsc = 'DSC',
}

export type Source = {
  __typename?: 'Source'
  name: Scalars['String']['output']
  url?: Maybe<Scalars['String']['output']>
}

export enum Standard {
  En15804a1 = 'en15804a1',
  En15804a2 = 'en15804a2',
  Unknown = 'unknown',
}

export enum SubType {
  Generic = 'generic',
  Industry = 'industry',
  Representative = 'representative',
  Specific = 'specific',
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
  Kg = 'kg',
  Km = 'km',
  L = 'l',
  M = 'm',
  M2 = 'm2',
  M2r1 = 'm2r1',
  M3 = 'm3',
  Pcs = 'pcs',
  Tones = 'tones',
  TonesKm = 'tones_km',
  Unknown = 'unknown',
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']['output']
  firstName?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  lastName?: Maybe<Scalars['String']['output']>
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
  ProjectInfo: ResolverTypeWrapper<ProjectInfo>
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
  ProjectInfo: ProjectInfo
  Query: {}
  SoftwareInfo: SoftwareInfo
  Source: Source
  TechFlow: TechFlow
  UUID: Scalars['UUID']['output']
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
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
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
  ProjectInfo?: ProjectInfoResolvers<ContextType>
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
