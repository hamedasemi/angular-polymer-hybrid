import { Component } from '@angular/core';

import { Router } from '@angular/router';

import data from 'assets/data/i18n/interface';

@Component({
    selector: `start-component`,
    templateUrl: `app/start/start.template.html`,
    styleUrls: [`app/start/start.style.css`]
})

export class StartComponent {
    static get parameters() {
        return [[Router]];
    }
    constructor(router) {
        this.title = `Fortm. Start.`;
        this.router = router;
        this.language = `sv`;
        this.interface = data.interface;
        this.business = data.business;
    }

    goNext () {
        this.router.navigateByUrl(`origin`);
    }
}