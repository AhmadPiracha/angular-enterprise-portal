import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request with correct URL', () => {
    const testData = { id: 1, name: 'Test' };
    const endpoint = '/test';

    service.get(endpoint).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should make POST request with correct URL and body', () => {
    const testData = { id: 1, name: 'Test' };
    const postData = { name: 'New Item' };
    const endpoint = '/test';

    service.post(endpoint, postData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
    req.flush(testData);
  });

  it('should handle HTTP errors', () => {
    const endpoint = '/error';
    const errorMessage = 'Test error';

    service.get(endpoint).subscribe(
      () => fail('should have failed with 404 error'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}${endpoint}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
