import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';
declare var AWS: any;

@Injectable()
export class BuilderService {
    state = new Subject();
    state$ = this.state.asObservable();
    constructor() { }
    getAlbums() {
        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: 'screen-diff' }
        });
        const promise = new Promise((resolve, reject) => {
            s3.listObjects({Delimiter: '/'}, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return from(promise);
    }
}
