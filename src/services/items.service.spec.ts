import { TokenInterceptor } from './../interceptors/auth.interceptor';
import { CustomHttpInterceptor } from './../interceptors/custom-http.interceptor';
import { ItemsService } from './items.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('item services', () => {

    describe('w/o interceptor', () => {
        let injector: TestBed;
        let service: ItemsService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [ItemsService]
            });

            injector = getTestBed();
            service = injector.get(ItemsService);
            httpMock = injector.get(HttpTestingController);
        })

        afterEach(() => {
            httpMock.verify();
        });

        it('get items should use GET', () => {

            const expectedUrl = 'assets/items.mock.json';

            service.getItems().subscribe(items => {

            });

            const req = httpMock.expectOne(expectedUrl);
            expect(req.request.method).toBe("GET");
        });

        it('get items should return 2 items', () => {

            const expectedUrl = 'assets/items.mock.json';
            const dummyItems = [
                { id: 1, name: 'a' },
                { id: 2, name: 'b' }
            ];

            service.getItems().subscribe(items => {
                expect(items.length).toBe(2);
                expect(items).toEqual(dummyItems);
            });

            const req = httpMock.expectOne(expectedUrl);
            req.flush(dummyItems);
        })
    })

    describe('with interceptor', () => {
        let injector: TestBed;
        let service: ItemsService;
        let httpMock: HttpTestingController;

        beforeEach(() => {

            const interceptors = [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CustomHttpInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                }
            ]

            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [
                    ItemsService,
                    ...interceptors]
            });

            injector = getTestBed();
            service = injector.get(ItemsService);
            httpMock = injector.get(HttpTestingController);
        })

        afterEach(() => {
            httpMock.verify();
        });

        it('get items should use GET', () => {

            const expectedUrl = 'assets/items.mock.json';

            service.getItems().subscribe();

            const req = httpMock.expectOne(expectedUrl);
            expect(req.request.method).toBe("GET");
        });

        it('get items should return 2 items', () => {

            const expectedUrl = 'assets/items.mock.json';
            const dummyItems = [
                { id: 1, name: 'a' },
                { id: 2, name: 'b' }
            ];

            service.getItems().subscribe(items => {
                expect(items.length).toBe(2);
                expect(items).toEqual(dummyItems);
            });

            const req = httpMock.expectOne(expectedUrl);

            expect(req.request.headers.has('extra-header-1')).toBeTruthy();
            expect(req.request.headers.has('extra-header-2')).toBeTruthy();

            req.flush(dummyItems);
        })
    })
})