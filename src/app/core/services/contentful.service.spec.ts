import { TestBed } from '@angular/core/testing';
import { ContentfulService } from './contentful.service';

describe('ContentfulService', () => {
  let service: ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getPageBySlug method', () => {
    expect(service.getPageBySlug).toBeDefined();
  });

  it('should have getAllPages method', () => {
    expect(service.getAllPages).toBeDefined();
  });

  it('should return observable from getPageBySlug', (done) => {
    const slug = 'test-page';
    service.getPageBySlug(slug).subscribe({
      next: (result) => {
        // Expected to return result or error based on Contentful config
        done();
      },
      error: (error) => {
        // Expected when Contentful is not configured
        expect(error).toBeTruthy();
        done();
      }
    });
  });

  it('should return observable from getAllPages', (done) => {
    service.getAllPages().subscribe({
      next: (result) => {
        // Expected to return result or error based on Contentful config
        done();
      },
      error: (error) => {
        // Expected when Contentful is not configured
        expect(error).toBeTruthy();
        done();
      }
    });
  });
});
