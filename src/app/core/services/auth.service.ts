import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = {
    id: 1,
    name: 'Ahmad Piracha',
    role: 'USER'
  };

  getUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

 hasRole(role: 'USER' | 'ADMIN'): boolean {
    return this.currentUser ? this.currentUser.role === role : false;
  }

  logout(): void {
    this.currentUser = null;
  }
}
