
export const isAuth = (currentEmail: string, currentPassword: string, newEmail: string, newPassword: string) : boolean =>{
	return (currentEmail === newEmail && currentPassword === newPassword && true );
};