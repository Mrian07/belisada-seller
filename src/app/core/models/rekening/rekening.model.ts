export class AddRekeningRequest {
    accountName: string;
    accountNumber: string;
    accountType: string;
    bankId: number;
    bankName: string;
    isDefault: boolean;
    bankAccountId: string;
}

export class RekeningRespon {
    bankId: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    userId: number;
    isDefault: boolean;
    accountType: string;
    bankAccountId: number;
}

export class RekeningUser {
    bankId: number;
    description: string;
    imageUrl: string;
    name: string;
}
