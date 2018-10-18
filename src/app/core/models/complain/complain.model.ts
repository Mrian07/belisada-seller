export class Complain {
    content: Content[];
    last: true;
    totalPages: number;
    totalElements: number;
    first: true;
    numberOfElements: number;
    size: number;
    number: number;
}

export class Content {
    orderComplainIssueCode: number;
    orderComplainIssueSolutionCode: number;
    reasonOrderComplainIssueSolution: string;
    received: true;
    orderNumber: string;
    created: string;
    createdBy: number;
    updated: string;
    updatedBy: number;
    trxOrderComplainId: number;
    imageurl: string;
    orderComplainIssue: string;
    invoiceNumber: string;
    nominal: number;
    expireDate: string;
    expireTime: string;
}

export class ComplaintRequest {
    created: string;
    createdBy: number;
    expireDate: string;
    expireTime: number;
    imageurl: string;
    invoiceNumber: string;
    nominal: number;
    orderComplainIssue: string;
    orderComplainIssueCode: string;
    orderComplainIssueSolution: string;
    orderComplainIssueSolutionCode: string;
    orderNumber: string;
    reasonOrderComplainIssueSolution: string;
    received: true;
    trxOrderComplainId: number;
    updated: string;
    updatedBy: number;
}

export class ComplaintPDC {
    statusCode:	number;
    status:	string;
    statusId: number;
}

export class Accept {
    complainAcceptCode: string;
    orderNumber: string;
    productId: number;
    trxCartId: number;
    status: number;
}

export class Reject {
    orderNumber: string;
    productId: number;
    rejectReason: string;
    trxCartId: number;
    status: number;
}
