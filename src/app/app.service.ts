import { Injectable } from '@angular/core';
import { from } from 'rxjs';
declare var AWS: any;

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
    getConfig(id) {
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: 'ScreenDiff',
            Key: { id: id}
        };
        const promise = new Promise((resolve, reject) => {
            docClient.get(params, (err: any, data: any) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
        return from(promise);
    }
    saveConfig(config) {
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: 'ScreenDiff',
            Key: { id: config.id },
            UpdateExpression: 'set config = :c',
            ExpressionAttributeValues: {
                ':c': config.config
            },
            ReturnValues: 'UPDATED_NEW'
        };
        console.log(JSON.stringify(config));
        const promise = new Promise((resolve, reject) => {
            docClient.update(params, (err: any, data: any) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
        return from(promise);
    }
}
