import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BuilderService } from '../builder.service';
import { GUID } from 'src/helpers';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SampleConfig } from '../states';
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
    configId = null;
    folderOptions = [];
    showPhotoChooser = false;
    showPublishResult = false;
    editingState = '';
    editingType = '';
    previewConfigId = null;
    constructor(
        private builderService: BuilderService,
        private appService: AppService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) { }
    ngOnInit() {
        this.activatedRouter.params.subscribe((params) => {
            if (params && params['id']) {
                this.configId = params['id'];
            }
            if (this.configId) {
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
            } else {
                setTimeout(() => {
                    this.config = SampleConfig.config;
                    const config = SampleConfig.config;
                    config.forEach((x: any) => {
                        x.leftPage.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${x.leftPage.src}')`);
                        x.rightPage.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${x.rightPage.src}')`);
                        this.fidelityStates.push(x);
                    });
                    this.builderService.state.next(this.fidelityStates[this.activeIndex]);
                });
            }
        });
        this.builderService.getFolders().subscribe((data: any) => {
            this.folderOptions = data.map(x => {
                return {
                    folderName: x,
                    files: [],
                    active: false
                };
            });
            if (this.folderOptions.length > 0) {
                this.folderOptions.forEach(folder => {
                    this.builderService.getFiles(folder.folderName).subscribe(files => {
                        folder.files = files;
                    });
                });
            }
            setTimeout(() => {
                this.folderOptions.forEach((x, i) => {
                    x.active = i === 0;
                });
            }, 1000);
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
        const obj = Object.assign({}, this.config, {
            config: this.fidelityStates
        });
        saveData(obj, 'config.json');
    }

    saveConfig() {
        const obj = Object.assign({}, this.config, {
            config: this.fidelityStates,
            id: GUID(),
            preview: true
        });
        if (obj && obj.config && obj.config.leftPage) {
            delete obj.config.leftPage.url;
            delete obj.config.leftPage.imgSrc;
        }
        if (obj && obj.config && obj.config.rightPage) {
            delete obj.config.rightPage.url;
            delete obj.config.rightPage.imgSrc;
        }
        this.appService.saveConfig(obj).subscribe((data) => {
        });
    }

    acivateFolderOption(option) {
        this.folderOptions.forEach(x => {
            x.active = x.folderName === option.folderName;
        });
    }

    seePreview() {
        this.router.navigate([`/preview/${this.previewConfigId}`]);
    }

    choosePhoto(file) {
        const state = this.fidelityStates.find(x => x.state === this.editingState);
        if (state) {
            if (this.editingType === 'left') {
                (state as any).leftPage.src = file.Url;
                (state as any).leftPage.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${file.Url}')`);
                (state as any).leftPage.url = this.sanitizer.bypassSecurityTrustStyle(`url('${file.Url}')`);
            } else if (this.editingType === 'right') {
                (state as any).rightPage.src = file.Url;
                (state as any).rightPage.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url('${file.Url}')`);
                (state as any).rightPage.url = this.sanitizer.bypassSecurityTrustStyle(`url('${file.Url}')`);
            }
        }
        this.editingState = null;
        this.editingType = null;
        this.showPhotoChooser = false;
    }

    closePhotoChooser() {
        this.editingType = null;
        this.editingState = null;
        this.showPhotoChooser = false;
    }

    onImageAction(type, actionType, state) {
        if (actionType === 'edit') {
            this.editingType = type;
            this.editingState = state.state;
            this.showPhotoChooser = true;
        }
        if (actionType === 'delete') {
            if (type === 'left') {
                state.leftPage.src = null;
                state.leftPage.imgSrc = null;
                state.leftPage.url = null;
            } else if (type === 'right') {
                state.rightPage.src = null;
                state.rightPage.imgSrc = null;
                state.rightPage.url = null;
            }
        }
    }

    publishPrototype() {
        const obj = Object.assign({}, this.config, {
            config: this.fidelityStates,
            id: GUID(),
            preview: true
        });
        if (obj && obj.config && obj.config.leftPage) {
            delete obj.config.leftPage.url;
            delete obj.config.leftPage.imgSrc;
        }
        if (obj && obj.config && obj.config.rightPage) {
            delete obj.config.rightPage.url;
            delete obj.config.rightPage.imgSrc;
        }
        this.appService.saveConfig(obj).subscribe((data) => {
            this.previewConfigId = obj.id;
            this.showPublishResult = true;
        });
        // this.router.navigate([`/preview/${this.configId}`]);
    }

    deleteState(state) {
        this.fidelityStates.forEach(fs => {
            fs.leftPage.markers.filter(m => m.targetState === state.state).forEach(m => {
                m.targetState = null;
            });
            fs.rightPage.markers.filter(m => m.targetState === state.state).forEach(m => {
                m.targetState = null;
            });
        });
        this.fidelityStates = this.fidelityStates.filter(m => m.state !== state.state);
    }

    addState() {
        const state = {
            state: `STATE_${Math.floor(Math.random() * 10e6)}`,
            title: null,
            leftPage: {
                id: `STATE_LEFT_PAGE_${Math.floor(Math.random() * 10e6)}`,
                src: null,
                markers: []
            },
            rightPage: {
                id: `STATE_LEFT_PAGE_${Math.floor(Math.random() * 10e6)}`,
                src: null,
                markers: []
            }
        };
        this.fidelityStates.push(state);
    }

    addMarker(state, type) {
        if (type === 'left') {
            state.leftPage.markers.push({
                height: 25,
                id: `STATE_LEFT_PAGE_${Math.floor(Math.random() * 10e6)}`,
                left: 20,
                targetState: null,
                top: 50,
                uid: `STATE_LEFT_PAGE_MARKER_${Math.floor(Math.random() * 10e6)}`,
                width: 25,
            });
        }
        if (type === 'right') {
            state.rightPage.markers.push({
                height: 25,
                id: `STATE_LEFT_PAGE_${Math.floor(Math.random() * 10e6)}`,
                right: 20,
                targetState: null,
                top: 50,
                uid: `STATE_LEFT_PAGE_MARKER_${Math.floor(Math.random() * 10e6)}`,
                width: 25,
            });
        }
    }

    removeState(state, type , uid) {
        if (type === 'left') {
            state.leftPage.markers = state.leftPage.markers.filter(x => x.uid !== uid);
        }
        if (type === 'right') {
            state.rightPage.markers = state.rightPage.markers.filter(x => x.uid !== uid);
        }
    }

}
