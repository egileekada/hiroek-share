
export interface IUser {
    accountClaimed: boolean;
    bankAccountName: string;
    bankAccountNumber: string;
    bankName: string;
    charityRegNumber: string;
    city: string;
    country: string;
    createdAt: string;
    description: string;
    email: string;
    fundRaised: number;
    interests: Array<any>;
    loc: {
        type: string;
        coordinates: Array<any>
    };
    logo: string;
    name: string;
    postalCode: string;
    subcategories: Array<any>;
    totalDonations: number;
    updatedAt: string;
    userId: string;
    _id: string
}


export interface IMember {
    loc: {
        type: string;
        coordinates: Array<any>
    };
    "isActive": boolean,
    "isAdmin": boolean,
    "blocked": boolean,
    "isDeleted": boolean,
    "isAccountSetup": boolean,
    "role": "user",
    "blockedUsers": [],
    "following": Array<string>,
    "followers": Array<string>,
    "importedContacts": Array<any>,
    "fcm_tokens": string,
    "_id": string,
    "interest": Array<string>,
    "phone": string,
    "callingCode": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "birthDate": string,
    "email": string,
    "fullname": string,
    "photo": string
} 