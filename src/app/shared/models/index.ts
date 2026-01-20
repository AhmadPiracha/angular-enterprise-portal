export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  phone?: string;
  department?: string;
  location?: string;
}

export interface DashboardSummary {
  totalUsers: number;
  activeProjects: number;
  systemUptime: number;
  revenue: number;
  stats: {
    label: string;
    value: string | number;
    change: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface Activity {
  id: number;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  body: string;
  publishedAt: string;
  updatedAt: string;
}
