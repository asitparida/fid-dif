import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BunBunStates } from '../states';
import { BuilderService } from '../builder.service';
import { SampleFiles } from '../sample';
import { NgForm, FormControl, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-authoring',
    templateUrl: './authoring.component.html',
    styleUrls: ['./authoring.component.scss']
})
export class AuthoringComponent implements OnInit, AfterViewInit {
    handlerId = 'handler_' + Math.floor(Math.random() * 10e6);
    fidelityStates = [];
    activeIndex = 0;
    editing = {};
    constructor(private builderService: BuilderService) { }
    ngOnInit() {
        const temp = [];
        BunBunStates.forEach((state, i) => {
            const obj = Object.assign({}, state);
            (obj.leftPage as any).imgSrc = `url('${state.leftPage.src}')`;
            (obj.rightPage as any).imgSrc = `url('${state.rightPage.src}')`;
            this.fidelityStates.push(obj);
        });
    }
    ngAfterViewInit() {
        this.builderService.state.next(this.fidelityStates[this.activeIndex]);
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
        // Object.keys(this.form.controls).forEach((control) => {
        //     this.form.controls[control].markAsPristine();
        // });
    }

}
