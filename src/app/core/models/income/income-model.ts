export class GetDataContentIncome {
    content: ContentData[];
    last: boolean;
    total: number;
    totalElements: number;
    first: number;
    numberOfElements: number;
    data: any;
}

export class ContentData {
    invoiceNumber: string;
    status: string;
    statusCode: string;
    statusWithdraw: string;
    statusWithdrawCode: string;
    grandTotal: number;
    createdTime: string;
    expiredProcessDate: string;
    expiredProcessTime: string;
    datestart: any;
    selected: boolean;
    dateend: any;
}

export class Selected {
    selected: boolean = false;
}


