export interface NewsCreationPayload {
	category: string;
	title: string;
	media: {
		content: string;
	};
}


export interface UserEditPayload{
	oldPassword?:string;
	newPassword?:string;
	fullName?:string;
}


export type UserRole = "admin" | "super" | "coordinator" | "back-office" | "user"

export interface CreateUserPayload {
	fullName:string;
	email:string;
	password:string;
	role:UserRole;
}

export interface EditFeePayload{
	key: string;
	value: string;
  }