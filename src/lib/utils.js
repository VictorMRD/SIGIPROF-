import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const countries = [
  { iso_code: 'ZA', country: 'Sudáfrica' },
  { iso_code: 'AT', country: 'Austria' },
  { iso_code: 'IN', country: 'India' },
  { iso_code: 'AF', country: 'Afganistán' },
  { iso_code: 'AL', country: 'Albania' },
  { iso_code: 'DE', country: 'Alemania' },
  { iso_code: 'AD', country: 'Andorra' },
  { iso_code: 'AO', country: 'Angola' },
  { iso_code: 'AI', country: 'Anguila' },
  { iso_code: 'AQ', country: 'Antártida' },
  { iso_code: 'AG', country: 'Antigua y Barbuda' },
  { iso_code: 'AN', country: 'Antillas Neerlandesas' },
  { iso_code: 'SA', country: 'Arabia Saudita' },
  { iso_code: 'DZ', country: 'Argelia' },
  { iso_code: 'AR', country: 'Argentina' },
  { iso_code: 'AM', country: 'Armenia' },
  { iso_code: 'AW', country: 'Aruba' },
  { iso_code: 'AU', country: 'Australia' },
  { iso_code: 'AZ', country: 'Azerbaiyán' },
  { iso_code: 'BE', country: 'Bélgica' },
  { iso_code: 'BA', country: 'Bosnia y Herzegovina' },
  { iso_code: 'BS', country: 'Bahamas' },
  { iso_code: 'BD', country: 'Bangladés' },
  { iso_code: 'BH', country: 'Baréin' },
  { iso_code: 'BB', country: 'Barbados' },
  { iso_code: 'BZ', country: 'Belice' },
  { iso_code: 'BJ', country: 'Benín' },
  { iso_code: 'BM', country: 'Bermudas' },
  { iso_code: 'BY', country: 'Bielorrusia' },
  { iso_code: 'MM', country: 'Birmania' },
  { iso_code: 'BO', country: 'Bolivia' },
  { iso_code: 'BW', country: 'Botsuana' },
  { iso_code: 'BR', country: 'Brasil' },
  { iso_code: 'BN', country: 'Brunéi' },
  { iso_code: 'BG', country: 'Bulgaria' },
  { iso_code: 'BI', country: 'Burundi' },
  { iso_code: 'BF', country: 'Burkina Faso' },
  { iso_code: 'BT', country: 'Bután' },
  { iso_code: 'CV', country: 'Cabo Verde' },
  { iso_code: 'CM', country: 'Camerún' },
  { iso_code: 'KH', country: 'Camboya' },
  { iso_code: 'CA', country: 'Canadá' },
  { iso_code: 'QA', country: 'Catar' },
  { iso_code: 'KZ', country: 'Kazajistán' },
  { iso_code: 'TD', country: 'Chad' },
  { iso_code: 'CL', country: 'Chile' },
  { iso_code: 'CN', country: 'China' },
  { iso_code: 'CY', country: 'Chipre' },
  { iso_code: 'CO', country: 'Colombia' },
  { iso_code: 'KM', country: 'Comoras' },
  { iso_code: 'CG', country: 'Congo-Brazzaville' },
  { iso_code: 'CD', country: 'Congo-Kinshasa' },
  { iso_code: 'KP', country: 'Corea del Norte' },
  { iso_code: 'KR', country: 'Corea del Sur' },
  { iso_code: 'CR', country: 'Costa Rica' },
  { iso_code: 'CI', country: 'Costa de Marfil' },
  { iso_code: 'HR', country: 'Croacia' },
  { iso_code: 'CU', country: 'Cuba' },
  { iso_code: 'DK', country: 'Dinamarca' },
  { iso_code: 'DM', country: 'Dominica' },
  { iso_code: 'EG', country: 'Egipto' },
  { iso_code: 'AE', country: 'Emiratos Árabes Unidos' },
  { iso_code: 'EC', country: 'Ecuador' },
  { iso_code: 'ER', country: 'Eritrea' },
  { iso_code: 'SK', country: 'Eslovaquia' },
  { iso_code: 'SI', country: 'Eslovenia' },
  { iso_code: 'ES', country: 'España' },
  { iso_code: 'EE', country: 'Estonia' },
  { iso_code: 'US', country: 'Estados Unidos' },
  { iso_code: 'ET', country: 'Etiopía' },
  { iso_code: 'FO', country: 'Islas Feroe' },
  { iso_code: 'FJ', country: 'Fiyi' },
  { iso_code: 'PH', country: 'Filipinas' },
  { iso_code: 'FI', country: 'Finlandia' },
  { iso_code: 'FR', country: 'Francia' },
  { iso_code: 'GM', country: 'Gambia' },
  { iso_code: 'GA', country: 'Gabón' },
  { iso_code: 'GH', country: 'Ghana' },
  { iso_code: 'GE', country: 'Georgia' },
  { iso_code: 'GS', country: 'Georgia del Sur y las Islas Sandwich del Sur' },
  { iso_code: 'GI', country: 'Gibraltar' },
  { iso_code: 'GR', country: 'Grecia' },
  { iso_code: 'GD', country: 'Granada' },
  { iso_code: 'GL', country: 'Groenlandia' },
  { iso_code: 'GP', country: 'Guadalupe' },
  { iso_code: 'GU', country: 'Guam' },
  { iso_code: 'GT', country: 'Guatemala' },
  { iso_code: 'GY', country: 'Guyana' },
  { iso_code: 'GF', country: 'Guayana Francesa' },
  { iso_code: 'GN', country: 'Guinea' },
  { iso_code: 'GQ', country: 'Guinea Ecuatorial' },
  { iso_code: 'GW', country: 'Guinea-Bisáu' },
  { iso_code: 'HT', country: 'Haití' },
  { iso_code: 'HN', country: 'Honduras' },
  { iso_code: 'HK', country: 'Hong Kong' },
  { iso_code: 'HU', country: 'Hungría' },
  { iso_code: 'YE', country: 'Yemen' },
  { iso_code: 'BV', country: 'Isla Bouvet' },
  { iso_code: 'NF', country: 'Isla Norfolk' },
  { iso_code: 'CX', country: 'Isla Christmas' },
  { iso_code: 'KY', country: 'Islas Caimán' },
  { iso_code: 'CK', country: 'Islas Cook' },
  { iso_code: 'FK', country: 'Islas Malvinas' },
  { iso_code: 'HM', country: 'Islas Heard y McDonald' },
  { iso_code: 'MH', country: 'Islas Marshall' },
  { iso_code: 'UM', country: 'Islas menores alejadas de los Estados Unidos' },
  { iso_code: 'SB', country: 'Islas Salomón' },
  { iso_code: 'TC', country: 'Islas Turcas y Caicos' },
  { iso_code: 'VI', country: 'Islas Vírgenes de EE. UU.' },
  { iso_code: 'VG', country: 'Islas Vírgenes Británicas' },
  { iso_code: 'CC', country: 'Islas Cocos' },
  { iso_code: 'ID', country: 'Indonesia' },
  { iso_code: 'IR', country: 'Irán' },
  { iso_code: 'IQ', country: 'Irak' },
  { iso_code: 'IE', country: 'Irlanda' },
  { iso_code: 'IS', country: 'Islandia' },
  { iso_code: 'IL', country: 'Israel' },
  { iso_code: 'IT', country: 'Italia' },
  { iso_code: 'JM', country: 'Jamaica' },
  { iso_code: 'JP', country: 'Japón' },
  { iso_code: 'DJ', country: 'Yibuti' },
  { iso_code: 'JO', country: 'Jordania' },
  { iso_code: 'YU', country: 'Yugoslavia' },
  { iso_code: 'KW', country: 'Kuwait' },
  { iso_code: 'LB', country: 'Líbano' },
  { iso_code: 'LY', country: 'Libia' },
  { iso_code: 'LA', country: 'Laos' },
  { iso_code: 'LS', country: 'Lesoto' },
  { iso_code: 'LV', country: 'Letonia' },
  { iso_code: 'LR', country: 'Liberia' },
  { iso_code: 'LI', country: 'Liechtenstein' },
  { iso_code: 'LT', country: 'Lituania' },
  { iso_code: 'LU', country: 'Luxemburgo' },
  { iso_code: 'MX', country: 'México' },
  { iso_code: 'MC', country: 'Mónaco' },
  { iso_code: 'MO', country: 'Macao' },
  { iso_code: 'MK', country: 'Macedonia' },
  { iso_code: 'MG', country: 'Madagascar' },
  { iso_code: 'MY', country: 'Malasia' },
  { iso_code: 'MW', country: 'Malawi' },
  { iso_code: 'MV', country: 'Maldivas' },
  { iso_code: 'ML', country: 'Malí' },
  { iso_code: 'MT', country: 'Malta' },
  { iso_code: 'MP', country: 'Islas Marianas del Norte' },
  { iso_code: 'MA', country: 'Marruecos' },
  { iso_code: 'MQ', country: 'Martinica' },
  { iso_code: 'MU', country: 'Mauricio' },
  { iso_code: 'MR', country: 'Mauritania' },
  { iso_code: 'YT', country: 'Mayotte' },
  { iso_code: 'FM', country: 'Micronesia' },
  { iso_code: 'MZ', country: 'Mozambique' },
  { iso_code: 'MD', country: 'Moldavia' },
  { iso_code: 'MN', country: 'Mongolia' },
  { iso_code: 'MS', country: 'Montserrat' },
  { iso_code: 'NE', country: 'Níger' },
  { iso_code: 'NA', country: 'Namibia' },
  { iso_code: 'NR', country: 'Nauru' },
  { iso_code: 'NP', country: 'Nepal' },
  { iso_code: 'NI', country: 'Nicaragua' },
  { iso_code: 'NG', country: 'Nigeria' },
  { iso_code: 'NU', country: 'Niue' },
  { iso_code: 'NO', country: 'Noruega' },
  { iso_code: 'NC', country: 'Nueva Caledonia' },
  { iso_code: 'NZ', country: 'Nueva Zelanda' },
  { iso_code: 'OM', country: 'Omán' },
  { iso_code: 'NL', country: 'Países Bajos' },
  { iso_code: 'PW', country: 'Palaos' },
  { iso_code: 'PA', country: 'Panamá' },
  { iso_code: 'PG', country: 'Papúa Nueva Guinea' },
  { iso_code: 'PK', country: 'Pakistán' },
  { iso_code: 'PY', country: 'Paraguay' },
  { iso_code: 'PE', country: 'Perú' },
  { iso_code: 'PN', country: 'Pitcairn' },
  { iso_code: 'PL', country: 'Polonia' },
  { iso_code: 'PF', country: 'Polinesia Francesa' },
  { iso_code: 'PR', country: 'Puerto Rico' },
  { iso_code: 'PT', country: 'Portugal' },
  { iso_code: 'KE', country: 'Kenia' },
  { iso_code: 'KG', country: 'Kirguistán' },
  { iso_code: 'KI', country: 'Kiribati' },
  { iso_code: 'RU', country: 'Rusia' },
  { iso_code: 'GB', country: 'Reino Unido' },
  { iso_code: 'CF', country: 'República Centroafricana' },
  { iso_code: 'CZ', country: 'República Checa' },
  { iso_code: 'DO', country: 'República Dominicana' },
  { iso_code: 'RE', country: 'Reunión' },
  { iso_code: 'RO', country: 'Rumania' },
  { iso_code: 'RW', country: 'Ruanda' },
  { iso_code: 'KN', country: 'San Cristóbal y Nieves' },
  { iso_code: 'SM', country: 'San Marino' },
  { iso_code: 'PM', country: 'San Pedro y Miquelón' },
  { iso_code: 'ST', country: 'Santo Tomé y Príncipe' },
  { iso_code: 'VC', country: 'San Vicente y las Granadinas' },
  { iso_code: 'SY', country: 'Siria' },
  { iso_code: 'SV', country: 'El Salvador' },
  { iso_code: 'WS', country: 'Samoa' },
  { iso_code: 'AS', country: 'Samoa Americana' },
  { iso_code: 'SH', country: 'Santa Elena' },
  { iso_code: 'LC', country: 'Santa Lucía' },
  { iso_code: 'EH', country: 'Sahara Occidental' },
  { iso_code: 'SC', country: 'Seychelles' },
  { iso_code: 'SN', country: 'Senegal' },
  { iso_code: 'SL', country: 'Sierra Leona' },
  { iso_code: 'SG', country: 'Singapur' },
  { iso_code: 'SO', country: 'Somalia' },
  { iso_code: 'LK', country: 'Sri Lanka' },
  { iso_code: 'SE', country: 'Suecia' },
  { iso_code: 'CH', country: 'Suiza' },
  { iso_code: 'SZ', country: 'Suazilandia' },
  { iso_code: 'SD', country: 'Sudán' },
  { iso_code: 'SR', country: 'Surinam' },
  { iso_code: 'SJ', country: 'Svalbard y Jan Mayen' },
  { iso_code: 'TH', country: 'Tailandia' },
  { iso_code: 'TW', country: 'Taiwán' },
  { iso_code: 'TJ', country: 'Tayikistán' },
  { iso_code: 'TZ', country: 'Tanzania' },
  { iso_code: 'IO', country: 'Territorio Británico del Océano Índico' },
  { iso_code: 'TF', country: 'Territorios Australes Franceses' },
  { iso_code: 'TL', country: 'Timor-Leste' },
  { iso_code: 'TG', country: 'Togo' },
  { iso_code: 'TK', country: 'Tokelau' },
  { iso_code: 'TO', country: 'Tonga' },
  { iso_code: 'TT', country: 'Trinidad y Tobago' },
  { iso_code: 'TN', country: 'Túnez' },
  { iso_code: 'TM', country: 'Turkmenistán' },
  { iso_code: 'TR', country: 'Turquía' },
  { iso_code: 'TV', country: 'Tuvalu' },
  { iso_code: 'UA', country: 'Ucrania' },
  { iso_code: 'UG', country: 'Uganda' },
  { iso_code: 'UY', country: 'Uruguay' },
  { iso_code: 'UZ', country: 'Uzbekistán' },
  { iso_code: 'VU', country: 'Vanuatu' },
  { iso_code: 'VA', country: 'Vaticano' },
  { iso_code: 'VE', country: 'Venezuela' },
  { iso_code: 'VN', country: 'Vietnam' },
  { iso_code: 'WF', country: 'Wallis y Futuna' },
  { iso_code: 'ZM', country: 'Zambia' },
  { iso_code: 'ZW', country: 'Zimbabue' }
]

export const languages = [
  {
    code: 'aa',
    name: 'Afar',
    native: 'Afar'
  },
  {
    code: 'ab',
    name: 'Abkhazian',
    native: 'Аҧсуа'
  },
  {
    code: 'af',
    name: 'Afrikaans',
    native: 'Afrikaans'
  },
  {
    code: 'ak',
    name: 'Akan',
    native: 'Akana'
  },
  {
    code: 'am',
    name: 'Amharic',
    native: 'አማርኛ'
  },
  {
    code: 'an',
    name: 'Aragonese',
    native: 'Aragonés'
  },
  {
    code: 'ar',
    name: 'Arabic',
    native: 'العربية',
    rtl: 1
  },
  {
    code: 'as',
    name: 'Assamese',
    native: 'অসমীয়া'
  },
  {
    code: 'av',
    name: 'Avar',
    native: 'Авар'
  },
  {
    code: 'ay',
    name: 'Aymara',
    native: 'Aymar'
  },
  {
    code: 'az',
    name: 'Azerbaijani',
    native: 'Azərbaycanca'
  },
  {
    code: 'ba',
    name: 'Bashkir',
    native: 'Башҡорт'
  },
  {
    code: 'be',
    name: 'Belarusian',
    native: 'Беларуская'
  },
  {
    code: 'bg',
    name: 'Bulgarian',
    native: 'Български'
  },
  {
    code: 'bh',
    name: 'Bihari',
    native: 'भोजपुरी'
  },
  {
    code: 'bi',
    name: 'Bislama',
    native: 'Bislama'
  },
  {
    code: 'bm',
    name: 'Bambara',
    native: 'Bamanankan'
  },
  {
    code: 'bn',
    name: 'Bengali',
    native: 'বাংলা'
  },
  {
    code: 'bo',
    name: 'Tibetan',
    native: 'བོད་ཡིག / Bod skad'
  },
  {
    code: 'br',
    name: 'Breton',
    native: 'Brezhoneg'
  },
  {
    code: 'bs',
    name: 'Bosnian',
    native: 'Bosanski'
  },
  {
    code: 'ca',
    name: 'Catalan',
    native: 'Català'
  },
  {
    code: 'ce',
    name: 'Chechen',
    native: 'Нохчийн'
  },
  {
    code: 'ch',
    name: 'Chamorro',
    native: 'Chamoru'
  },
  {
    code: 'co',
    name: 'Corsican',
    native: 'Corsu'
  },
  {
    code: 'cr',
    name: 'Cree',
    native: 'Nehiyaw'
  },
  {
    code: 'cs',
    name: 'Czech',
    native: 'Česky'
  },
  {
    code: 'cu',
    name: 'Old Church Slavonic / Old Bulgarian',
    native: 'словѣньскъ / slověnĭskŭ'
  },
  {
    code: 'cv',
    name: 'Chuvash',
    native: 'Чăваш'
  },
  {
    code: 'cy',
    name: 'Welsh',
    native: 'Cymraeg'
  },
  {
    code: 'da',
    name: 'Danish',
    native: 'Dansk'
  },
  {
    code: 'de',
    name: 'German',
    native: 'Deutsch'
  },
  {
    code: 'dv',
    name: 'Divehi',
    native: 'ދިވެހިބަސް',
    rtl: 1
  },
  {
    code: 'dz',
    name: 'Dzongkha',
    native: 'ཇོང་ཁ'
  },
  {
    code: 'ee',
    name: 'Ewe',
    native: 'Ɛʋɛ'
  },
  {
    code: 'el',
    name: 'Greek',
    native: 'Ελληνικά'
  },
  {
    code: 'en',
    name: 'English',
    native: 'English'
  },
  {
    code: 'eo',
    name: 'Esperanto',
    native: 'Esperanto'
  },
  {
    code: 'es',
    name: 'Spanish',
    native: 'Español'
  },
  {
    code: 'et',
    name: 'Estonian',
    native: 'Eesti'
  },
  {
    code: 'eu',
    name: 'Basque',
    native: 'Euskara'
  },
  {
    code: 'fa',
    name: 'Persian',
    native: 'فارسی',
    rtl: 1
  },
  {
    code: 'ff',
    name: 'Peul',
    native: 'Fulfulde'
  },
  {
    code: 'fi',
    name: 'Finnish',
    native: 'Suomi'
  },
  {
    code: 'fj',
    name: 'Fijian',
    native: 'Na Vosa Vakaviti'
  },
  {
    code: 'fo',
    name: 'Faroese',
    native: 'Føroyskt'
  },
  {
    code: 'fr',
    name: 'French',
    native: 'Français'
  },
  {
    code: 'fy',
    name: 'West Frisian',
    native: 'Frysk'
  },
  {
    code: 'ga',
    name: 'Irish',
    native: 'Gaeilge'
  },
  {
    code: 'gd',
    name: 'Scottish Gaelic',
    native: 'Gàidhlig'
  },
  {
    code: 'gl',
    name: 'Galician',
    native: 'Galego'
  },
  {
    code: 'gn',
    name: 'Guarani',
    native: "Avañe'ẽ"
  },
  {
    code: 'gu',
    name: 'Gujarati',
    native: 'ગુજરાતી'
  },
  {
    code: 'gv',
    name: 'Manx',
    native: 'Gaelg'
  },
  {
    code: 'ha',
    name: 'Hausa',
    native: 'هَوُسَ',
    rtl: 1
  },
  {
    code: 'he',
    name: 'Hebrew',
    native: 'עברית',
    rtl: 1
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी'
  },
  {
    code: 'ho',
    name: 'Hiri Motu',
    native: 'Hiri Motu'
  },
  {
    code: 'hr',
    name: 'Croatian',
    native: 'Hrvatski'
  },
  {
    code: 'ht',
    name: 'Haitian',
    native: 'Krèyol ayisyen'
  },
  {
    code: 'hu',
    name: 'Hungarian',
    native: 'Magyar'
  },
  {
    code: 'hy',
    name: 'Armenian',
    native: 'Հայերեն'
  },
  {
    code: 'hz',
    name: 'Herero',
    native: 'Otsiherero'
  },
  {
    code: 'ia',
    name: 'Interlingua',
    native: 'Interlingua'
  },
  {
    code: 'id',
    name: 'Indonesian',
    native: 'Bahasa Indonesia'
  },
  {
    code: 'ie',
    name: 'Interlingue',
    native: 'Interlingue'
  },
  {
    code: 'ig',
    name: 'Igbo',
    native: 'Igbo'
  },
  {
    code: 'ii',
    name: 'Sichuan Yi',
    native: 'ꆇꉙ / 四川彝语'
  },
  {
    code: 'ik',
    name: 'Inupiak',
    native: 'Iñupiak'
  },
  {
    code: 'io',
    name: 'Ido',
    native: 'Ido'
  },
  {
    code: 'is',
    name: 'Icelandic',
    native: 'Íslenska'
  },
  {
    code: 'it',
    name: 'Italian',
    native: 'Italiano'
  },
  {
    code: 'iu',
    name: 'Inuktitut',
    native: 'ᐃᓄᒃᑎᑐᑦ'
  },
  {
    code: 'ja',
    name: 'Japanese',
    native: '日本語'
  },
  {
    code: 'jv',
    name: 'Javanese',
    native: 'Basa Jawa'
  },
  {
    code: 'ka',
    name: 'Georgian',
    native: 'ქართული'
  },
  {
    code: 'kg',
    name: 'Kongo',
    native: 'KiKongo'
  },
  {
    code: 'ki',
    name: 'Kikuyu',
    native: 'Gĩkũyũ'
  },
  {
    code: 'kj',
    name: 'Kuanyama',
    native: 'Kuanyama'
  },
  {
    code: 'kk',
    name: 'Kazakh',
    native: 'Қазақша'
  },
  {
    code: 'kl',
    name: 'Greenlandic',
    native: 'Kalaallisut'
  },
  {
    code: 'km',
    name: 'Cambodian',
    native: 'ភាសាខ្មែរ'
  },
  {
    code: 'kn',
    name: 'Kannada',
    native: 'ಕನ್ನಡ'
  },
  {
    code: 'ko',
    name: 'Korean',
    native: '한국어'
  },
  {
    code: 'kr',
    name: 'Kanuri',
    native: 'Kanuri'
  },
  {
    code: 'ks',
    name: 'Kashmiri',
    native: 'कश्मीरी / كشميري',
    rtl: 1
  },
  {
    code: 'ku',
    name: 'Kurdish',
    native: 'Kurdî / كوردی',
    rtl: 1
  },
  {
    code: 'kv',
    name: 'Komi',
    native: 'Коми'
  },
  {
    code: 'kw',
    name: 'Cornish',
    native: 'Kernewek'
  },
  {
    code: 'ky',
    name: 'Kirghiz',
    native: 'Kırgızca / Кыргызча'
  },
  {
    code: 'la',
    name: 'Latin',
    native: 'Latina'
  },
  {
    code: 'lb',
    name: 'Luxembourgish',
    native: 'Lëtzebuergesch'
  },
  {
    code: 'lg',
    name: 'Ganda',
    native: 'Luganda'
  },
  {
    code: 'li',
    name: 'Limburgian',
    native: 'Limburgs'
  },
  {
    code: 'ln',
    name: 'Lingala',
    native: 'Lingála'
  },
  {
    code: 'lo',
    name: 'Laotian',
    native: 'ລາວ / Pha xa lao'
  },
  {
    code: 'lt',
    name: 'Lithuanian',
    native: 'Lietuvių'
  },
  {
    code: 'lu',
    name: 'Luba-Katanga',
    native: 'Tshiluba'
  },
  {
    code: 'lv',
    name: 'Latvian',
    native: 'Latviešu'
  },
  {
    code: 'mg',
    name: 'Malagasy',
    native: 'Malagasy'
  },
  {
    code: 'mh',
    name: 'Marshallese',
    native: 'Kajin Majel / Ebon'
  },
  {
    code: 'mi',
    name: 'Maori',
    native: 'Māori'
  },
  {
    code: 'mk',
    name: 'Macedonian',
    native: 'Македонски'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    native: 'മലയാളം'
  },
  {
    code: 'mn',
    name: 'Mongolian',
    native: 'Монгол'
  },
  {
    code: 'mo',
    name: 'Moldovan',
    native: 'Moldovenească'
  },
  {
    code: 'mr',
    name: 'Marathi',
    native: 'मराठी'
  },
  {
    code: 'ms',
    name: 'Malay',
    native: 'Bahasa Melayu'
  },
  {
    code: 'mt',
    name: 'Maltese',
    native: 'bil-Malti'
  },
  {
    code: 'my',
    name: 'Burmese',
    native: 'မြန်မာစာ'
  },
  {
    code: 'na',
    name: 'Nauruan',
    native: 'Dorerin Naoero'
  },
  {
    code: 'nb',
    name: 'Norwegian Bokmål',
    native: 'Norsk bokmål'
  },
  {
    code: 'nd',
    name: 'North Ndebele',
    native: 'Sindebele'
  },
  {
    code: 'ne',
    name: 'Nepali',
    native: 'नेपाली'
  },
  {
    code: 'ng',
    name: 'Ndonga',
    native: 'Oshiwambo'
  },
  {
    code: 'nl',
    name: 'Dutch',
    native: 'Nederlands'
  },
  {
    code: 'nn',
    name: 'Norwegian Nynorsk',
    native: 'Norsk nynorsk'
  },
  {
    code: 'no',
    name: 'Norwegian',
    native: 'Norsk'
  },
  {
    code: 'nr',
    name: 'South Ndebele',
    native: 'isiNdebele'
  },
  {
    code: 'nv',
    name: 'Navajo',
    native: 'Diné bizaad'
  },
  {
    code: 'ny',
    name: 'Chichewa',
    native: 'Chi-Chewa'
  },
  {
    code: 'oc',
    name: 'Occitan',
    native: 'Occitan'
  },
  {
    code: 'oj',
    name: 'Ojibwa',
    native: 'ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin'
  },
  {
    code: 'om',
    name: 'Oromo',
    native: 'Oromoo'
  },
  {
    code: 'or',
    name: 'Oriya',
    native: 'ଓଡ଼ିଆ'
  },
  {
    code: 'os',
    name: 'Ossetian / Ossetic',
    native: 'Иронау'
  },
  {
    code: 'pa',
    name: 'Panjabi / Punjabi',
    native: 'ਪੰਜਾਬੀ / पंजाबी / پنجابي'
  },
  {
    code: 'pi',
    name: 'Pali',
    native: 'Pāli / पाऴि'
  },
  {
    code: 'pl',
    name: 'Polish',
    native: 'Polski'
  },
  {
    code: 'ps',
    name: 'Pashto',
    native: 'پښتو',
    rtl: 1
  },
  {
    code: 'pt',
    name: 'Portuguese',
    native: 'Português'
  },
  {
    code: 'qu',
    name: 'Quechua',
    native: 'Runa Simi'
  },
  {
    code: 'rm',
    name: 'Raeto Romance',
    native: 'Rumantsch'
  },
  {
    code: 'rn',
    name: 'Kirundi',
    native: 'Kirundi'
  },
  {
    code: 'ro',
    name: 'Romanian',
    native: 'Română'
  },
  {
    code: 'ru',
    name: 'Russian',
    native: 'Русский'
  },
  {
    code: 'rw',
    name: 'Rwandi',
    native: 'Kinyarwandi'
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    native: 'संस्कृतम्'
  },
  {
    code: 'sc',
    name: 'Sardinian',
    native: 'Sardu'
  },
  {
    code: 'sd',
    name: 'Sindhi',
    native: 'सिनधि'
  },
  {
    code: 'se',
    name: 'Northern Sami',
    native: 'Sámegiella'
  },
  {
    code: 'sg',
    name: 'Sango',
    native: 'Sängö'
  },
  {
    code: 'sh',
    name: 'Serbo-Croatian',
    native: 'Srpskohrvatski / Српскохрватски'
  },
  {
    code: 'si',
    name: 'Sinhalese',
    native: 'සිංහල'
  },
  {
    code: 'sk',
    name: 'Slovak',
    native: 'Slovenčina'
  },
  {
    code: 'sl',
    name: 'Slovenian',
    native: 'Slovenščina'
  },
  {
    code: 'sm',
    name: 'Samoan',
    native: 'Gagana Samoa'
  },
  {
    code: 'sn',
    name: 'Shona',
    native: 'chiShona'
  },
  {
    code: 'so',
    name: 'Somalia',
    native: 'Soomaaliga'
  },
  {
    code: 'sq',
    name: 'Albanian',
    native: 'Shqip'
  },
  {
    code: 'sr',
    name: 'Serbian',
    native: 'Српски'
  },
  {
    code: 'ss',
    name: 'Swati',
    native: 'SiSwati'
  },
  {
    code: 'st',
    name: 'Southern Sotho',
    native: 'Sesotho'
  },
  {
    code: 'su',
    name: 'Sundanese',
    native: 'Basa Sunda'
  },
  {
    code: 'sv',
    name: 'Swedish',
    native: 'Svenska'
  },
  {
    code: 'sw',
    name: 'Swahili',
    native: 'Kiswahili'
  },
  {
    code: 'ta',
    name: 'Tamil',
    native: 'தமிழ்'
  },
  {
    code: 'te',
    name: 'Telugu',
    native: 'తెలుగు'
  },
  {
    code: 'tg',
    name: 'Tajik',
    native: 'Тоҷикӣ'
  },
  {
    code: 'th',
    name: 'Thai',
    native: 'ไทย / Phasa Thai'
  },
  {
    code: 'ti',
    name: 'Tigrinya',
    native: 'ትግርኛ'
  },
  {
    code: 'tk',
    name: 'Turkmen',
    native: 'Туркмен / تركمن'
  },
  {
    code: 'tl',
    name: 'Tagalog / Filipino',
    native: 'Tagalog'
  },
  {
    code: 'tn',
    name: 'Tswana',
    native: 'Setswana'
  },
  {
    code: 'to',
    name: 'Tonga',
    native: 'Lea Faka-Tonga'
  },
  {
    code: 'tr',
    name: 'Turkish',
    native: 'Türkçe'
  },
  {
    code: 'ts',
    name: 'Tsonga',
    native: 'Xitsonga'
  },
  {
    code: 'tt',
    name: 'Tatar',
    native: 'Tatarça'
  },
  {
    code: 'tw',
    name: 'Twi',
    native: 'Twi'
  },
  {
    code: 'ty',
    name: 'Tahitian',
    native: 'Reo Mā`ohi'
  },
  {
    code: 'ug',
    name: 'Uyghur',
    native: 'Uyƣurqə / ئۇيغۇرچە'
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    native: 'Українська'
  },
  {
    code: 'ur',
    name: 'Urdu',
    native: 'اردو',
    rtl: 1
  },
  {
    code: 'uz',
    name: 'Uzbek',
    native: 'Ўзбек'
  },
  {
    code: 've',
    name: 'Venda',
    native: 'Tshivenḓa'
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    native: 'Tiếng Việt'
  },
  {
    code: 'vo',
    name: 'Volapük',
    native: 'Volapük'
  },
  {
    code: 'wa',
    name: 'Walloon',
    native: 'Walon'
  },
  {
    code: 'wo',
    name: 'Wolof',
    native: 'Wollof'
  },
  {
    code: 'xh',
    name: 'Xhosa',
    native: 'isiXhosa'
  },
  {
    code: 'yi',
    name: 'Yiddish',
    native: 'ייִדיש',
    rtl: 1
  },
  {
    code: 'yo',
    name: 'Yoruba',
    native: 'Yorùbá'
  },
  {
    code: 'za',
    name: 'Zhuang',
    native: 'Cuengh / Tôô / 壮语'
  },
  {
    code: 'zh',
    name: 'Chinese',
    native: '中文'
  },
  {
    code: 'zu',
    name: 'Zulu',
    native: 'isiZulu'
  }
]
