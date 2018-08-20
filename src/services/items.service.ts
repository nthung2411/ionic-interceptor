import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemsService {
    private url: string;

    constructor(private httpClient: HttpClient) {
        this.url = `assets/items.mock.json`;
    }

    public getItems(): Observable<{ id: number, name: string }[]> {
        return this.httpClient.get(this.url)
            .map((response: { id: number, name: string }[]) => response)
    }
}
