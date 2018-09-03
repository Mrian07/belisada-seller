export class GetDisRequest {
    id: number;
    itemperpage: number;
    page: number;
}

export class GetDisResponse {
    content: DisContain[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
}

export class DisContain {
    message: string;
    userId: number;
    name: string;
    since: string;
    discusId: number;
    label: string;
    imageAvatarUrl: string;
    productId: number;
    childs: GetChilds[];
}

export class GetChilds {
    message: string;
    userId: number;
    name: string;
    since: string;
    discusId: number;
    label: string;
    imageAvatarUrl: string;
}

export class AllDis {
    content: ContainAllDis[];
    last: true;
    totalPages: number;
    totalElements: number;
    first: true;
    numberOfElements: number;
    size: number;
    number: number;
}

export class ContainAllDis {

}

export class AddDisResponse {
    status: number;
    message: string;
}

export class AddDisRequest {
    message: string;
    productId: number;
    discusId: number;
    discusParentId: number;
    reviewParentId: number;
    star: number;
    title: string;
}
