import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';
import { AWSBucketName } from 'src/AWSConfigUpdate';
declare var AWS: any;

@Injectable()
export class BuilderService {
    state = new Subject();
    state$ = this.state.asObservable();
    s3Bucket = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: AWSBucketName }
    });
    constructor() { }
    getFolders() {
        const promise = new Promise((resolve, reject) => {
            this.s3Bucket.listObjects({Delimiter: '/'}, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (data && data.CommonPrefixes && data.CommonPrefixes.length > 0) {
                        let folderNames = data.CommonPrefixes.map(x => x.Prefix);
                        folderNames = folderNames.map(x => decodeURIComponent((x as string).replace('/', '')));
                        resolve(folderNames);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
        return from(promise);
    }
    getFiles(folder) {
        const promise = new Promise((resolve, reject) => {
            this.s3Bucket.listObjects({Prefix: `${encodeURIComponent(folder)}/`}, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    const href = this.request.httpRequest.endpoint.href;
                    const bucketUrl =  `${href + AWSBucketName}/`;
                    if (data && data.Contents && data.Contents.length > 0) {
                        const collection = data.Contents.filter(x => x.Size > 0).map(photo => {
                            return {
                                LastModified: photo.LastModified,
                                Size: photo.Size,
                                Key: photo.Key,
                                Url: bucketUrl + encodeURIComponent(photo.Key),
                                imgUrl: `url(${bucketUrl + encodeURIComponent(photo.Key)})`
                            };
                        });
                        resolve(collection);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
        return from(promise);
    }
}
