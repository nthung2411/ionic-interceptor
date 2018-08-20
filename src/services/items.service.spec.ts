import { ItemsService } from './items.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('item services', () => {

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

    it('get items should use GET and return 2 items', () => {

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