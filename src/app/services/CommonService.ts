import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
    private interact = new Subject<any>();

    sendUpdate(message: string) { 
        this.interact.next({ text: message });
    }

    getUpdate(): Observable<any> { 
        return this.interact.asObservable(); 
    }
}