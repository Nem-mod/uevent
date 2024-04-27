export interface IOrganizationRegisterForm {
    name: string;
    email: string;
    phoneNumber: string;
    description: string;
    fopIdentifier: string;
}

export interface IOrganization extends IOrganizationRegisterForm {
    id: number;
}