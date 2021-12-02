import {IRepository} from "./IRepository";
import {PaginationResponse} from "./pagination-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Response} from './Response';

@Injectable()
export class Repository<T> implements IRepository<T> {

    constructor(protected httpClient: HttpClient) {
    }

    getList(actionUrl: string): Observable<T[]> {
        return this.httpClient.get<T[]>(`${actionUrl}/GetList`);
    }

    delete(id: string, actionUrl: string): Observable<Response> {
        return this.httpClient.delete<Response>(`${actionUrl}/Delete?Id=${id}`);
    }

    getListPagination(pageNumber: number, pageSize: number, actionUrl: string): Observable<PaginationResponse<T>> {
        return this.httpClient.get<PaginationResponse<T>>(`${actionUrl}/GetListPagination?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }

    insert(entity: T, actionUrl: string): Observable<Response> {
        return this.httpClient.post<Response>(`${actionUrl}/Insert`, entity);
    }

    update(entity: T, actionUrl: string): Observable<Response> {
        return this.httpClient.put<Response>(`${actionUrl}/Update`, entity);
    }
}
