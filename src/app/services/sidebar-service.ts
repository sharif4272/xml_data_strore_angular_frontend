import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Available app-wide
})
export class SidebarService {
  private toggleSubject = new Subject<void>();

  toggle$ = this.toggleSubject.asObservable();

  toggle() {
    this.toggleSubject.next();
  }
}
