import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
  ) { }
  
  public navIsOpen: boolean = false;

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    return localStorage.getItem(key);
  }

  public remove(key: string): void {
  }

  public clear(): void {
  }
  
}
