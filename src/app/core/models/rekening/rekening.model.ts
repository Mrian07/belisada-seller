export class AddRekeningRequest {
    accountName: string;
    accountNumber: string;
    accountType: string;
    bankId: number;
    bankName: string;
    isDefault: boolean;
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
