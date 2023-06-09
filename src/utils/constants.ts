import { UserRole } from 'interfaces/misc';
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

export enum PUBLICATION_TYPES {
	CHANGE_OF_NAME = 'change-of-name',
	LOSS_OF_DOCUMENT = 'loss-of-document',
	AGE_DECLARATION = 'age-declaration',
	OBITUARY = 'obituary',
	AFFIDAVIT = 'affidavit',
	PUBLIC_NOTICE = 'public-notice',
}

export enum PUBLICATION_TYPES_ACRONYMS {
	CHANGE_OF_NAME = 'CON',
	LOSS_OF_DOCUMENT = 'LOD',
	OBITUARY = 'OB',
	AFFIDAVIT = 'AFF',
	PUBLIC_NOTICE = 'PN',
	AGE_DECLARATION = 'AGDEC',
}

export const routes = {
	home: '/',
	change_of_name_publications: '/publications/change-of-name',
	lost_document_publications: '/publications/loss-of-document',
	public_notice_publications: '/publications/public-notice',
	obituary_publications: '/publications/obituary',
	affidavit_publications: '/publications/affidavit',
	publication_detail: '/publications/:publicationRef/detail',
	getPubDetailRoute: (publicationType: PUBLICATION_TYPES, ref: string) => {
		const acronym =
			publicationType === PUBLICATION_TYPES.CHANGE_OF_NAME
				? PUBLICATION_TYPES_ACRONYMS.CHANGE_OF_NAME
				: publicationType === PUBLICATION_TYPES.LOSS_OF_DOCUMENT
				? PUBLICATION_TYPES_ACRONYMS.LOSS_OF_DOCUMENT
				: publicationType === PUBLICATION_TYPES.OBITUARY
				? PUBLICATION_TYPES_ACRONYMS.OBITUARY
				: publicationType === PUBLICATION_TYPES.AFFIDAVIT
				? PUBLICATION_TYPES_ACRONYMS.AFFIDAVIT
				: publicationType === PUBLICATION_TYPES.AGE_DECLARATION
				? PUBLICATION_TYPES_ACRONYMS.AGE_DECLARATION
				: publicationType === PUBLICATION_TYPES.PUBLIC_NOTICE
				? PUBLICATION_TYPES_ACRONYMS.PUBLIC_NOTICE
				: '';
		return `/publications/${acronym}-${ref}/detail`;
	},
	pub_forms: {
		obituary: '/publications/obituary/create',
		affidavit: '/publications/affidavit/create',
		public_notice: '/publications/public-notice/create',
		public_notice_preview: '/publications/public-notice/create/preview',
		change_of_name: '/publications/change-of-name/create',
		change_of_name_preview: '/publications/change-of-name/create/preview',
		payment: '/publications/change-of-name/create/payment',
		loss_of_document_payment: '/publications/loss-of-document/create/payment',
		obituary_payment: '/publications/obituary/create/payment',
		public_notice_payment: '/publications/public-notice/create/payment',
		loss_of_document: '/publications/loss-of-document/create',
		loss_of_document_preview: '/publications/loss-of-document/create/preview',
		obituary_preview: '/publications/obituary/create/preview',
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
	admin: {
		login: '/management',
		dashboard: '/management/dashboard',
		settings: {
			index: '/management/settings',
			roles: '',
			edit_role: 'edit-role',
			nis_settings:'nis-settings',
			newspaper:'newspaper',
			security:'security'
		},
		commission:{
			index:'/management/commissions',
			manage:'/management/commissions/manage',
			list:''
		},
		agents:{
			index:'/management/agents',
			list:''
		},
		coordinators:{
			index:"/management/coordinators",
			list:""
		}
	},
};

export enum STORAGE_KEYS {
	NEW_CON_PUBLICATION = 'novus.NCP',
	NEW_LOD_PUBLICATION = 'novus.NLP',
	NEW_OBITUARY_PUBLICATION = 'novus.NOP',
	NEW_PUBLIC_NOTICE_PUBLICATION = 'novus.PNP',
	NEW_AFFIDAVIT_PUBLICATION = 'novus.AP',
	SHOW_NOVUS_PUBLICATION_LINKS = 'novus.show_pub_links',
	SHOW_NOVUS_AGENT_LINKS = 'novus.show_agent_links',
	NOVUS_AGENT_SCROLLBAR_POS = 'novus.agent_scrollbar_pos',
	NOVUS_ADMIN_SCROLLBAR_POS = 'novus.admin_scrollbar_pos',
	ADMIN_KEY = 'novus.k',
	IS_ADMIN = 'novus.is_',
	ADMIN_DETAILS = 'novus.ad_d',
}

export enum APP_TERMS {
	LOSS_OF_DOCUMENT = 'loss-of-document',
	CHANGE_OF_NAME = 'change-of-name',
	PUBLIC_NOTICE = 'public-notice',
	OBITUARY = 'obituary',
	AFFIDAVIT = 'affidavit',
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
	stateSelect: { value: '', label: '' },
	externalSelect: { value: '', label: '' },
	itemLost: '',
	supportIdName: '',
	dateLost: new Date()?.toISOString(),
	issuer: '',
	idNumber: '',
	isExternal: false,
	physicalDesc: '',
	reward: '',
	concernParties: '',
	file: '',
	image: '',
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
	reasonSelect: { value: '', label: '' },
	isExternal: false,
	externalSelect: { value: '', label: '' },
	file: '',
	image: '',
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

export const MOBILE_ADMIN_SIDENAV = '#mobile-admin-sidenav';
export const MOBILE_AGENT_SIDENAV = '#mobile-agent-sidenav';
export const MOBILE_SIDENAV = '#mobile-sidenav';
export const MOBILE_WIDTH = 550;

export const BASE_URL = 'https://www.theepitomenews.com';

export const roleList: { label: string; value: UserRole }[] = [
	{ label: 'Admin', value: 'admin' },
	{ label: 'Coordinator', value: 'coordinator' },
	{ label: 'Back-Office', value: 'back-office' },
];