
export interface ICommunity {
    admin: {
        _id: string
    };
    adminType: string;
    createdAt: string;
    description: string;
    interests: any
    invitees: Array<any>;
    members: Array<any>;
    moderators: Array<any>;
    name: string;
    photo: string;
    privacy: string;
    updatedAt: string;
    _id: string
}