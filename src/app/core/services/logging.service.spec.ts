import { TestBed } from '@angular/core/testing';
import { LoggingService, LogLevel } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
    spyOn(console, 'debug');
    spyOn(console, 'info');
    spyOn(console, 'warn');
    spyOn(console, 'error');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log trace messages', () => {
    service.trace('Trace message', { detail: 'test' });
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log debug messages', () => {
    service.debug('Debug message', { detail: 'test' });
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log info messages', () => {
    service.info('Info message', { detail: 'test' });
    expect(console.info).toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    service.warning('Warning message', { detail: 'test' });
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    service.error('Error message', new Error('test error'));
    expect(console.error).toHaveBeenCalled();
  });

  it('should log critical messages', () => {
    service.critical('Critical message', new Error('critical error'));
    expect(console.error).toHaveBeenCalled();
  });

  it('should track custom events', () => {
    service.trackEvent('TestEvent', { property: 'value' });
    expect(console.log).toHaveBeenCalledWith('[Event] TestEvent', { property: 'value' });
  });

  it('should track metrics', () => {
    service.trackMetric('TestMetric', 42, { unit: 'ms' });
    expect(console.log).toHaveBeenCalledWith('[Metric] TestMetric: 42', { unit: 'ms' });
  });
});
