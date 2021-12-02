import {Observable} from "rxjs";
import {PaginationResponse} from "./pagination-response";
import {Response} from "./Response";

export interface IRepository<T> {
    insert(entity: T, actionUrl: string): Observable<Response>;

    update(entity: T, actionUrl: string): Observable<Response>;

    delete(id: string, actionUrl: string): Observable<Response>;

    getList(actionUrl: string): Observable<T[]>;

    getListPagination(pageNumber: number, pageSize: number, actionUrl: string): Observable<PaginationResponse<T>>;
}
