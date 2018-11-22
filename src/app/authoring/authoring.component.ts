import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BuilderService } from '../builder.service';
import { GUID } from 'src/helpers';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var AWS: any;

@Component({
    selector: 'app-authoring',
    templateUrl: './authoring.component.html',
    styleUrls: ['./authoring.component.scss']
})
export class AuthoringComponent implements OnInit {
    handlerId = 'handler_' + Math.floor(Math.random() * 10e6);
    fidelityStates = [];
    activeIndex = 0;
    editing = {};
    config: any;
    configId = '5e91671d-21e1-f2ee-d00c-750421a30c01';
    constructor(
        private builderService: BuilderService,
        private appService: AppService,
        private sanitizer: DomSanitizer
    ) { }
    ngOnInit() {
        this.appService.getConfig(this.configId).subscribe((data: any) => {
            if (data && data.Item) {
                this.config = data.Item;
                const config = this.config.config;
                config.forEach(x => {
                    x.leftPage.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${x.leftPage.src}')`);
                    x.rightPage.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${x.rightPage.src}')`);
                    this.fidelityStates.push(x);
                });
                this.builderService.state.next(this.fidelityStates[this.activeIndex]);
            }
        });
    }
    onStateUpdated($event) {
        const state = this.fidelityStates.find(x => x.state === $event.state);
        if (state) {
            const stateIndex = this.fidelityStates.indexOf(state);
            this.fidelityStates[stateIndex] = $event;
        }
    }
    activateState(i) {
        if (this.activeIndex !== i) {
            this.activeIndex = i;
            this.fidelityStates[i].active = true;
            this.builderService.state.next(this.fidelityStates[this.activeIndex]);
        }
    }
    downloadConfig() {
        const saveData = (function () {
            const a: any = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            return function (data, fileName) {
                const json = JSON.stringify(data),
                    blob = new Blob([json], { type: 'octet/stream' }),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());
        saveData(this.fidelityStates, 'config.json');
    }

    saveConfig() {
        const obj = Object.assign({}, this.config, {
            config: this.fidelityStates
        });
        this.appService.saveConfig(obj).subscribe((data) => {
            console.log(data);
        });
    }

}
