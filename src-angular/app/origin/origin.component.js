import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AppService } from 'app/app.service';

import data from 'assets/data/i18n/interface';

@Component({
    selector: `origin-component`,
    templateUrl: `app/origin/origin.template.html`,
    styleUrls: [`app/origin/origin.style.css`],
    providers: []
})

export class OriginComponent {

    static get parameters() {
        return [[Router], [AppService]];
    }

    constructor(router, appService) {
        this.title = `Origin.`;
        this.router = router;
        this.language = `sv`;
        this.interface = data.interface;
        this.business = data.business;
        this.appService = appService;
        this.originList = this.appService.originList;
    }

    goBack() {
        this.router.navigateByUrl(`/`);
    }

    goNext(e, origin) {
        this.appService.setSelectedOrigin(origin);
        this.router.navigateByUrl(`consumption`);
    }
}