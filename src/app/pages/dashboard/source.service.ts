import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Source } from './source.model';
import { map, filter, debounce, tap, catchError, retry } from 'rxjs/operators';

@Injectable()

export class SourceService {
    private url: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    public getSources(): Observable<Source[]> {
        return this.httpClient.get<Source[]>(this.url + 'sources').pipe(
            map(res => {
                return res['data'];
            }),
        );
    }
    
    public deleteSource(id: number): Observable<any> {
        return this.httpClient.delete(this.url + 'sources/' + id);
    }

    public storeSource(params: {}): Observable<any> {
        return this.httpClient.post(this.url + 'sources', params);
    } 
}
