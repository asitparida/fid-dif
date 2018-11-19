import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    RATIO = 600 / 798;
    constructor() {}
    isIpad() {
        return navigator.userAgent.indexOf('iPad') !== -1;
    }
    isIPhone() {
        return navigator.userAgent.indexOf('iPhone') !== -1;
    }
    isMobile() {
        return navigator.userAgent.indexOf('Mobile') !== -1;
    }
    showDeviceMock() {
        let result = true;
        if (result) {
            result = !(this.isIpad() || this.isIPhone() || this.isMobile());
        }
        return result;
    }
}
