import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PaginationResponse<T> {
    pageNumber: number;
    pageSize: number;
    firstPage: string;
    lastPage : string;
    totalPages : number;
    totalRecords: number;
    nextPage : string;
    previousPage : string;
    data : Array<T>;
}
