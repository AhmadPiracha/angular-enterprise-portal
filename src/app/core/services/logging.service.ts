import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from '../../../environments/environment';

export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
  Critical = 5
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private appInsights: ApplicationInsights;
  private isInitialized: boolean = false;
  private logBuffer: LogEntry[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!environment.appInsights || !environment.appInsights.instrumentationKey || 
        environment.appInsights.instrumentationKey === 'YOUR_APP_INSIGHTS_KEY') {
      console.warn('Application Insights not configured. Logging to console only.');
      return;
    }

    try {
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: environment.appInsights.instrumentationKey,
          enableAutoRouteTracking: true,
          enableCorsCorrelation: true,
          enableRequestHeaderTracking: true,
          enableResponseHeaderTracking: true,
          disableFetchTracking: false,
          disableAjaxTracking: false
        }
      });

      this.appInsights.loadAppInsights();
      this.appInsights.trackPageView();
      this.isInitialized = true;

      // Flush buffered logs
      this.flushBuffer();
    } catch (error) {
      console.error('Failed to initialize Application Insights:', error);
    }
  }

  private flushBuffer() {
    while (this.logBuffer.length > 0) {
      const entry = this.logBuffer.shift();
      this.sendToAppInsights(entry);
    }
  }

  private sendToAppInsights(entry: LogEntry) {
    if (!this.isInitialized || !this.appInsights) {
      return;
    }

    const properties = {
      timestamp: entry.timestamp.toISOString(),
      data: entry.data ? JSON.stringify(entry.data) : undefined
    };

    switch (entry.level) {
      case LogLevel.Trace:
      case LogLevel.Debug:
      case LogLevel.Info:
        this.appInsights.trackTrace({
          message: entry.message,
          severityLevel: entry.level
        }, properties);
        break;
      case LogLevel.Warning:
        this.appInsights.trackTrace({
          message: entry.message,
          severityLevel: 2
        }, properties);
        break;
      case LogLevel.Error:
      case LogLevel.Critical:
        this.appInsights.trackException({
          exception: new Error(entry.message),
          severityLevel: entry.level >= LogLevel.Critical ? 4 : 3
        }, properties);
        break;
    }
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date()
    };

    // Console logging
    const consoleMessage = `[${LogLevel[level]}] ${message}`;
    switch (level) {
      case LogLevel.Trace:
      case LogLevel.Debug:
        console.debug(consoleMessage, data);
        break;
      case LogLevel.Info:
        console.info(consoleMessage, data);
        break;
      case LogLevel.Warning:
        console.warn(consoleMessage, data);
        break;
      case LogLevel.Error:
      case LogLevel.Critical:
        console.error(consoleMessage, data);
        break;
    }

    // App Insights logging
    if (this.isInitialized) {
      this.sendToAppInsights(entry);
    } else {
      this.logBuffer.push(entry);
    }
  }

  trace(message: string, data?: any) {
    this.log(LogLevel.Trace, message, data);
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.Debug, message, data);
  }

  info(message: string, data?: any) {
    this.log(LogLevel.Info, message, data);
  }

  warning(message: string, data?: any) {
    this.log(LogLevel.Warning, message, data);
  }

  error(message: string, error?: any) {
    this.log(LogLevel.Error, message, error);
  }

  critical(message: string, error?: any) {
    this.log(LogLevel.Critical, message, error);
  }

  // Track custom events
  trackEvent(name: string, properties?: { [key: string]: any }) {
    console.log(`[Event] ${name}`, properties);
    
    if (this.isInitialized && this.appInsights) {
      this.appInsights.trackEvent({ name }, properties);
    }
  }

  // Track metrics
  trackMetric(name: string, value: number, properties?: { [key: string]: any }) {
    console.log(`[Metric] ${name}: ${value}`, properties);
    
    if (this.isInitialized && this.appInsights) {
      this.appInsights.trackMetric({ name, average: value }, properties);
    }
  }

  // Track page views manually
  trackPageView(name?: string, uri?: string) {
    if (this.isInitialized && this.appInsights) {
      this.appInsights.trackPageView({ name, uri });
    }
  }

  // Set authenticated user context
  setUser(userId: string, accountId?: string) {
    if (this.isInitialized && this.appInsights) {
      this.appInsights.setAuthenticatedUserContext(userId, accountId);
    }
  }

  // Clear user context
  clearUser() {
    if (this.isInitialized && this.appInsights) {
      this.appInsights.clearAuthenticatedUserContext();
    }
  }
}
