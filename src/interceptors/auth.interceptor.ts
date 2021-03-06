import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = request.headers.set(`extra-header-1`, `1`);

        request = request.clone({ headers });

        return next.handle(request).pipe(
            catchError(err => this.handleError(err))
        );
    }

    private handleError(err: HttpResponse<any>) {
        if (err.status === 401) {
            return Observable.throw(`auth error ${err}`);
        }
        return Observable.throw(err)
    }
}