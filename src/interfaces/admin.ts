import { PUBLICATION_TYPES } from "utils/constants";

export type AdminPublicationsFilterDuration =
	| 'today'
	| 'yesterday'
	| 'one-week';

export interface AdminUserDetails {
	email: string;
	id: number;
	fullName: string;
	username: string;
	IsEmailVerified: boolean;
	IsBvnVerified: boolean;
	IsPhoneVerified: boolean;
	role: string;
}

export interface AuthenticationDetails {
	user: AdminUserDetails;
	token: string;
}

export interface LoginValues {
	username: string;
	password: string;
}


export interface ApproveOrRejectValues{
	approvePublication:boolean,
	publicationType:PUBLICATION_TYPES;
	rejectedReason?:string;
}