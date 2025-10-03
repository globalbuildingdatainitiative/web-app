import { PlotDesignerPlotParameters } from 'components/datasetFilters/datasetFiltersConstants'
import { GetProjectDataForBoxPlotQuery } from 'queries/generated'

export function formatCountryName(countryCode: string): string {
  if (countryCode === 'unknown') return 'Unknown Country'
  const countryNames: { [key: string]: string } = {
    che: 'Switzerland',
    afg: 'Afghanistan',
    alb: 'Albania',
    dza: 'Algeria',
    and: 'Andorra',
    ago: 'Angola',
    atg: 'Antigua and Barbuda',
    arg: 'Argentina',
    arm: 'Armenia',
    aus: 'Australia',
    aut: 'Austria',
    aze: 'Azerbaijan',
    bhs: 'Bahamas',
    bhr: 'Bahrain',
    bgd: 'Bangladesh',
    brb: 'Barbados',
    blr: 'Belarus',
    bel: 'Belgium',
    blz: 'Belize',
    ben: 'Benin',
    btn: 'Bhutan',
    bol: 'Bolivia',
    bih: 'Bosnia and Herzegovina',
    bwa: 'Botswana',
    bra: 'Brazil',
    brn: 'Brunei',
    bgr: 'Bulgaria',
    bfa: 'Burkina Faso',
    bdi: 'Burundi',
    khm: 'Cambodia',
    cmr: 'Cameroon',
    can: 'Canada',
    cpv: 'Cape Verde',
    caf: 'Central African Republic',
    tcd: 'Chad',
    chl: 'Chile',
    chn: 'China',
    col: 'Colombia',
    com: 'Comoros',
    cog: 'Congo',
    cod: 'Democratic Republic of the Congo',
    cri: 'Costa Rica',
    civ: 'Côte d’Ivoire',
    hrv: 'Croatia',
    cub: 'Cuba',
    cyp: 'Cyprus',
    cze: 'Czechia',
    dnk: 'Denmark',
    dji: 'Djibouti',
    dma: 'Dominica',
    dom: 'Dominican Republic',
    ecu: 'Ecuador',
    egy: 'Egypt',
    slv: 'El Salvador',
    gnq: 'Equatorial Guinea',
    eri: 'Eritrea',
    est: 'Estonia',
    swz: 'Eswatini',
    eth: 'Ethiopia',
    fji: 'Fiji',
    fin: 'Finland',
    fra: 'France',
    gab: 'Gabon',
    gmb: 'Gambia',
    geo: 'Georgia',
    deu: 'Germany',
    gha: 'Ghana',
    grc: 'Greece',
    grd: 'Grenada',
    gtm: 'Guatemala',
    gin: 'Guinea',
    gnb: 'Guinea-Bissau',
    guy: 'Guyana',
    hti: 'Haiti',
    hnd: 'Honduras',
    hun: 'Hungary',
    isl: 'Iceland',
    ind: 'India',
    idn: 'Indonesia',
    irn: 'Iran',
    irq: 'Iraq',
    irl: 'Ireland',
    isr: 'Israel',
    ita: 'Italy',
    jam: 'Jamaica',
    jpn: 'Japan',
    jor: 'Jordan',
    kaz: 'Kazakhstan',
    ken: 'Kenya',
    kir: 'Kiribati',
    prk: 'North Korea',
    kor: 'South Korea',
    kwt: 'Kuwait',
    kgz: 'Kyrgyzstan',
    lao: 'Laos',
    lva: 'Latvia',
    lbn: 'Lebanon',
    lso: 'Lesotho',
    lbr: 'Liberia',
    lby: 'Libya',
    lie: 'Liechtenstein',
    ltu: 'Lithuania',
    lux: 'Luxembourg',
    mdg: 'Madagascar',
    mwi: 'Malawi',
    mys: 'Malaysia',
    mdv: 'Maldives',
    mli: 'Mali',
    mlt: 'Malta',
    mhl: 'Marshall Islands',
    mrt: 'Mauritania',
    mus: 'Mauritius',
    mex: 'Mexico',
    fsm: 'Micronesia',
    mda: 'Moldova',
    mco: 'Monaco',
    mng: 'Mongolia',
    mne: 'Montenegro',
    mar: 'Morocco',
    moz: 'Mozambique',
    mmr: 'Myanmar',
    nam: 'Namibia',
    nru: 'Nauru',
    npl: 'Nepal',
    nld: 'Netherlands',
    nzl: 'New Zealand',
    nic: 'Nicaragua',
    ner: 'Niger',
    nga: 'Nigeria',
    mkd: 'North Macedonia',
    nor: 'Norway',
    omn: 'Oman',
    pak: 'Pakistan',
    plw: 'Palau',
    pse: 'Palestine',
    pan: 'Panama',
    png: 'Papua New Guinea',
    pry: 'Paraguay',
    per: 'Peru',
    phl: 'Philippines',
    pol: 'Poland',
    prt: 'Portugal',
    qat: 'Qatar',
    rou: 'Romania',
    rus: 'Russia',
    rwa: 'Rwanda',
    kna: 'Saint Kitts and Nevis',
    lca: 'Saint Lucia',
    vct: 'Saint Vincent and the Grenadines',
    wsm: 'Samoa',
    smr: 'San Marino',
    stp: 'Sao Tome and Principe',
    sau: 'Saudi Arabia',
    sen: 'Senegal',
    srb: 'Serbia',
    syc: 'Seychelles',
    sle: 'Sierra Leone',
    sgp: 'Singapore',
    svk: 'Slovakia',
    svn: 'Slovenia',
    slb: 'Solomon Islands',
    som: 'Somalia',
    zaf: 'South Africa',
    ssd: 'South Sudan',
    esp: 'Spain',
    lka: 'Sri Lanka',
    sdn: 'Sudan',
    sur: 'Suriname',
    swe: 'Sweden',
    syr: 'Syria',
    twn: 'Taiwan',
    tjk: 'Tajikistan',
    tza: 'Tanzania',
    tha: 'Thailand',
    tls: 'Timor-Leste',
    tgo: 'Togo',
    ton: 'Tonga',
    tto: 'Trinidad and Tobago',
    tun: 'Tunisia',
    tur: 'Turkey',
    tkm: 'Turkmenistan',
    tuv: 'Tuvalu',
    uga: 'Uganda',
    ukr: 'Ukraine',
    are: 'United Arab Emirates',
    gbr: 'UK',
    usa: 'USA',
    ury: 'Uruguay',
    uzb: 'Uzbekistan',
    vut: 'Vanuatu',
    vat: 'Vatican City',
    ven: 'Venezuela',
    vnm: 'Vietnam',
    yem: 'Yemen',
    zmb: 'Zambia',
    zwe: 'Zimbabwe',
  }
  return countryNames[countryCode.toLowerCase()] || `Invalid country code ${countryCode}`
}

export function formatBuildingType(buildingType: string): string {
  const buildingTypeToDisplayName: { [key: string]: string } = {
    deconstruction_and_new_construction_works: 'Deconstruction and New Construction Works',
    new_construction_works: 'New Construction Works',
    operations: 'Operations',
    retrofit_works: 'Retrofit Works',
    other: 'Other',
  }

  return buildingTypeToDisplayName[buildingType] || `Unknown Building Type ${buildingType}`
}

type PlotDesignerAggregationGroupTitleGenerator = (groupValue: string | null) => string

export function plotParametersToAggregationGroupTitleGenerator(
  plotParameters: PlotDesignerPlotParameters,
): PlotDesignerAggregationGroupTitleGenerator {
  if (plotParameters.groupBy === 'country') {
    return (countryName: string | null) => (countryName ? formatCountryName(countryName) : `Unknown Country`)
  }
  if (plotParameters.groupBy === 'buildingType') {
    return (buildingType: string | null) => (buildingType ? formatBuildingType(buildingType) : `Unknown Building Type`)
  }

  return (groupName: string | null) => (groupName ? groupName : `Unknown`)
}

interface PlotDesignerAggregationResultRaw {
  min: number
  pct: [number, number]
  median: number
  max: number
  avg: number
  group: string
  count: number
}

export interface PlotDesignerAggregationResultPretty {
  min: number
  pct25: number
  median: number
  pct75: number
  max: number
  avg: number
  name: string
  count: number
}

function rawAggregationToPretty(
  agg: PlotDesignerAggregationResultRaw,
  titleGenerator: PlotDesignerAggregationGroupTitleGenerator,
): PlotDesignerAggregationResultPretty {
  return {
    min: agg.min,
    pct25: agg.pct[0],
    median: agg.median,
    pct75: agg.pct[1],
    max: agg.max,
    avg: agg.avg,
    name: titleGenerator(agg.group),
    count: agg.count,
  }
}

export function prettifyPlotDesignerAggregation(
  data: GetProjectDataForBoxPlotQuery,
  plotParameters: PlotDesignerPlotParameters,
): PlotDesignerAggregationResultPretty[] {
  const titleGenerator = plotParametersToAggregationGroupTitleGenerator(plotParameters)

  return data.projects.aggregation
    .map((agg: PlotDesignerAggregationResultRaw) => rawAggregationToPretty(agg, titleGenerator))
    .sort((a: PlotDesignerAggregationResultPretty, b: PlotDesignerAggregationResultPretty) => {
      const aName = a?.name ?? ''
      const bName = b?.name ?? ''
      return aName.localeCompare(bName)
    })
}

export function plotParametersToValueAxisLabel(plotParameters: PlotDesignerPlotParameters): string {
  if (plotParameters.quantity === 'gwp_per_m2') {
    return 'GWP Intensity (kgCO₂eq/m²)'
  }
  return 'GWP (kgCO₂eq)'
}
