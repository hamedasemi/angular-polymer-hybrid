import { Component, Injectable } from '@angular/core';

import { Router } from '@angular/router';

import data from 'assets/data/i18n/interface';

@Component({
    selector: `error-component`,
    templateUrl: `app/error/error.template.html`,
    styleUrls: [`app/error/error.style.css`]
})

@Injectable()

export class ErrorComponent {
    static get parameters() {
        return [[Router]];
    }
    constructor(router) {
        this.title = `Error.`;
        this.router = router;
        this.language = `sv`;
        this.interface = data.interface;
        this.business = data.business;
    }

    goBack() {
        this.router.navigateByUrl(`/`);
    }

    goNext () {
        this.router.navigateByUrl(`consumption`);
    }
}