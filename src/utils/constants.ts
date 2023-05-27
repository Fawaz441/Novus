import {
	ChangeOfNamePublicationFields,
	LossOfDocumentPublicationFields,
} from 'interfaces/publications';

export enum MODALS {
	CHECK_PUBLICATIONS = 'check_publications',
	EDIT_PUBLICATION = 'edit_publication',
	DOWNLOAD_PUBLICATION = 'download_publication',
	AGENT_DETAILS = 'agent_details',
}

export const routes = {
	home: '/',
	change_of_name_publications: '/publications/change-of-name',
	lost_document_publications: '/publications/loss-of-document',
	publication_detail: '/publications/:publicationRef/detail',
	getPubDetailRoute: (ref: string) => `/publications/${ref}/detail`,
	pub_forms: {
		change_of_name: '/publications/change-of-name/create',
		change_of_name_preview: '/publications/change-of-name/create/preview',
		payment: '/publications/change-of-name/create/payment',
		loss_of_document_payment: '/publications/loss-of-document/create/payment',
		loss_of_document: '/publications/loss-of-document/create',
		loss_of_document_preview: '/publications/loss-of-document/create/preview',
		mobile_check_or_create: '/publications/tabs',
	},
	agents: {
		login: '/agents/login',
		registration: '/agents/registration',
		dashboard: '/agents/dashboard',
		settings: '/agents/settings',
		commission: '/agents/commission',
		withdraw_commission: '/agents/commission/withdraw',
		publications: '/agents/publications-list',
		agent_publication_detail: '/agents/publications/:publicationRef/detail',
		getAgentPubDetailRoute: (ref: string) =>
			`/agents/publications/${ref}/detail`,
		enlist: '/agents/enlist',
		check_publications: '/agents/publications/search',
		new_publication: '/agents/publications/new',
	},
};

export enum STORAGE_KEYS {
	NEW_CON_PUBLICATION = 'newCONPublication',
	NEW_LOD_PUBLICATION = 'newLODPublication',
	SHOW_NOVUS_PUBLICATION_LINKS = 'novus.show_pub_links',
	SHOW_NOVUS_AGENT_LINKS = 'novus.show_agent_links',
	NOVUS_AGENT_SCROLLBAR_POS = 'novus.agent_scrollbar_pos',
}

export enum APP_TERMS {
	LOSS_OF_DOCUMENT = 'loss-of-document',
	CHANGE_OF_NAME = 'change-of-name',
}

export const countries = [{ label: 'Nigeria', value: 'Nigeria' }];

export const emptyLossOfDocumentValues: LossOfDocumentPublicationFields = {
	firstName: '',
	middleName: '',
	lastName: '',
	gender: 'male',
	email: '',
	phone: '',
	houseAddress: '',
	countrySelect: countries[0],
	stateSelect: { value: null, label: null },
	externalSelect: { value: null, label: null },
	itemLost: '',
	supportIdName: '',
	dateLost: '',
	issuer: '',
	idNumber: '',
	isExternal: false,
	physicalDesc: '',
	reward: '',
	concernParties: '',
};

export const emptyChangeOfNameValues: ChangeOfNamePublicationFields = {
	oldFirstName: '',
	newFirstName: '',
	oldMiddleName: '',
	newMiddleName: '',
	oldLastName: '',
	newLastName: '',
	email: '',
	phone: '',
	houseAddress: '',
	gender: 'male',
	concernParties: '',
	reasonSelect: { value: null, label: null },
	isExternal: false,
	externalSelect: { value: null, label: null },
};

export const nigerianStates = [
	'Abia',
	'Adamawa',
	'Akwa Ibom',
	'Anambra',
	'Bauchi',
	'Bayelsa',
	'Benue',
	'Borno',
	'Cross River',
	'Delta',
	'Ebonyi',
	'Edo',
	'Ekiti',
	'Enugu',
	'FCT - Abuja',
	'Gombe',
	'Imo',
	'Jigawa',
	'Kaduna',
	'Kano',
	'Katsina',
	'Kebbi',
	'Kogi',
	'Kwara',
	'Lagos',
	'Nasarawa',
	'Niger',
	'Ogun',
	'Ondo',
	'Osun',
	'Oyo',
	'Plateau',
	'Rivers',
	'Sokoto',
	'Taraba',
	'Yobe',
	'Zamfara',
];

export const nigerianBanks = [
	{
		name: 'Access Bank',
		slug: 'access-bank',
		code: '044',
		ussd: '*901#',
	},
	{
		name: 'Access Bank (Diamond)',
		slug: 'access-bank-diamond',
		code: '063',
		ussd: '*426#',
	},
	{
		name: 'ALAT by WEMA',
		slug: 'alat-by-wema',
		code: '035A',
		ussd: '*945*100#',
	},
	{
		name: 'ASO Savings and Loans',
		slug: 'asosavings',
		code: '401',
		ussd: '',
	},
	{
		name: 'Bowen Microfinance Bank',
		slug: 'bowen-microfinance-bank',
		code: '50931',
		ussd: '',
	},
	{
		name: 'CEMCS Microfinance Bank',
		slug: 'cemcs-microfinance-bank',
		code: '50823',
		ussd: '',
	},
	{
		name: 'Citibank Nigeria',
		slug: 'citibank-nigeria',
		code: '023',
		ussd: '',
	},
	{
		name: 'Ecobank Nigeria',
		slug: 'ecobank-nigeria',
		code: '050',
		ussd: '*326#',
	},
	{
		name: 'Ekondo Microfinance Bank',
		slug: 'ekondo-microfinance-bank',
		code: '562',
		ussd: '*540*178#',
	},
	{
		name: 'Fidelity Bank',
		slug: 'fidelity-bank',
		code: '070',
		ussd: '*770#',
	},
	{
		name: 'First Bank of Nigeria',
		slug: 'first-bank-of-nigeria',
		code: '011',
		ussd: '*894#',
	},
	{
		name: 'First City Monument Bank',
		slug: 'first-city-monument-bank',
		code: '214',
		ussd: '*329#',
	},
	{
		name: 'Globus Bank',
		slug: 'globus-bank',
		code: '00103',
		ussd: '*989#',
	},
	{
		name: 'Guaranty Trust Bank',
		slug: 'guaranty-trust-bank',
		code: '058',
		ussd: '*737#',
	},
	{
		name: 'Hasal Microfinance Bank',
		slug: 'hasal-microfinance-bank',
		code: '50383',
		ussd: '*322*127#',
	},
	{
		name: 'Heritage Bank',
		slug: 'heritage-bank',
		code: '030',
		ussd: '*322#',
	},
	{
		name: 'Jaiz Bank',
		slug: 'jaiz-bank',
		code: '301',
		ussd: '*389*301#',
	},
	{
		name: 'Keystone Bank',
		slug: 'keystone-bank',
		code: '082',
		ussd: '*7111#',
	},
	{
		name: 'Kuda Bank',
		slug: 'kuda-bank',
		code: '50211',
		ussd: '',
	},
	{
		name: 'One Finance',
		slug: 'one-finance',
		code: '565',
		ussd: '*1303#',
	},
	{
		name: 'Paga',
		slug: 'paga',
		code: '327',
		ussd: '',
	},
	{
		name: 'Parallex Bank',
		slug: 'parallex-bank',
		code: '526',
		ussd: '*322*318*0#',
	},
	{
		name: 'PayCom',
		slug: 'paycom',
		code: '100004',
		ussd: '*955#',
	},
	{
		name: 'Polaris Bank',
		slug: 'polaris-bank',
		code: '076',
		ussd: '*833#',
	},
	{
		name: 'Providus Bank',
		slug: 'providus-bank',
		code: '101',
		ussd: '',
	},
	{
		name: 'Rubies MFB',
		slug: 'rubies-mfb',
		code: '125',
		ussd: '*7797#',
	},
	{
		name: 'Sparkle Microfinance Bank',
		slug: 'sparkle-microfinance-bank',
		code: '51310',
		ussd: '',
	},
	{
		name: 'Stanbic IBTC Bank',
		slug: 'stanbic-ibtc-bank',
		code: '221',
		ussd: '*909#',
	},
	{
		name: 'Standard Chartered Bank',
		slug: 'standard-chartered-bank',
		code: '068',
		ussd: '',
	},
	{
		name: 'Sterling Bank',
		slug: 'sterling-bank',
		code: '232',
		ussd: '*822#',
	},
	{
		name: 'Suntrust Bank',
		slug: 'suntrust-bank',
		code: '100',
		ussd: '*5230#',
	},
	{
		name: 'TAJ Bank',
		slug: 'taj-bank',
		code: '302',
		ussd: '*898#',
	},
	{
		name: 'TCF MFB',
		slug: 'tcf-mfb',
		code: '51211',
		ussd: '*908#',
	},
	{
		name: 'Titan Trust Bank',
		slug: 'titan-trust-bank',
		code: '102',
		ussd: '*922#',
	},
	{
		name: 'Union Bank of Nigeria',
		slug: 'union-bank-of-nigeria',
		code: '032',
		ussd: '*826#',
	},
	{
		name: 'United Bank For Africa',
		slug: 'united-bank-for-africa',
		code: '033',
		ussd: '*919#',
	},
	{
		name: 'Unity Bank',
		slug: 'unity-bank',
		code: '215',
		ussd: '*7799#',
	},
	{
		name: 'VFD',
		slug: 'vfd',
		code: '566',
		ussd: '',
	},
	{
		name: 'Wema Bank',
		slug: 'wema-bank',
		code: '035',
		ussd: '*945#',
	},
	{
		name: 'Zenith Bank',
		slug: 'zenith-bank',
		code: '057',
		ussd: '*966#',
	},
];

export const MOBILE_AGENT_SIDENAV = '#mobile-agent-sidenav';
export const MOBILE_SIDENAV = '#mobile-sidenav';
export const MOBILE_WIDTH = 550;

export enum PUBLICATION_TYPES {
	CHANGE_OF_NAME = 'change-of-name',
	LOSS_OF_DOCUMENT = 'loss-of-document',
	AGE_DECLARATION = 'age-declaration',
	OBITUARY = 'obituary',
	AFFIDAVIT = 'affidavit',
}

export enum PUBLICATION_TYPES_ACRONYMS {
	CHANGE_OF_NAME = 'CON',
	LOSS_OF_DOCUMENT = 'LOD',
	OBITUARY = 'OB',
	AFFIDAVIT = 'AFF',
	PUBLIC_NOTICE = 'PN',
}

export const BASE_URL = 'https://www.theepitomenews.com';
