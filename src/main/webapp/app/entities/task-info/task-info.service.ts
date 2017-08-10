import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TaskInfo } from './task-info.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TaskInfoService {

    private resourceUrl = 'api/task-infos';

    constructor(private http: Http) { }

    create(taskInfo: TaskInfo): Observable<TaskInfo> {
        const copy = this.convert(taskInfo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(taskInfo: TaskInfo): Observable<TaskInfo> {
        const copy = this.convert(taskInfo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<TaskInfo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(taskInfo: TaskInfo): TaskInfo {
        const copy: TaskInfo = Object.assign({}, taskInfo);
        return copy;
    }
}