import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        for(let x in req.query){
            params.set(x, req.query[x]);
        }


        options.params = params;
    }
    return options;
};
