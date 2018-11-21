import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BuilderService {
    state  = new Subject();
    state$ = this.state.asObservable();
    constructor() {}
}
