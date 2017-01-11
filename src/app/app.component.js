import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { StartComponent } from 'app/start/start.component';
import { ErrorComponent } from 'app/error/error.component';
import { OriginComponent } from 'app/origin/origin.component';
import { StyleGuideComponent } from 'app/style-guide/style-guide.component';

import { AppService } from 'app/app.service';
import { Logger } from './shared/logger/logger.js';
import { Config } from './shared/config/config.js';
import data from 'assets/data/i18n/interface';

@Component({
    selector: `app-component`,
    templateUrl: `app/app.template.html`,
    styleUrls: [`app/app.style.css`, `./shared/layout/layout.css`],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        AppService,
        Logger,
        Config
    ]
})

@Routes([
    {
        path: `/`,
        name: `Start`,
        component: StartComponent,
        useAsDefault: true
    },
    {
        path: `/origin`,
        name: `Origin`,
        component: OriginComponent
    },
    {
        path: `/style-guide`,
        name: `StyleGuide`,
        component: StyleGuideComponent
    },
    {
        path: `*`,
        name: `Error`,
        component: ErrorComponent
    }
])

export class AppComponent {

    static get parameters() {
        return [[AppService], [Logger]];
    }

    constructor(appService, logger) {
        this.language = `sv`;
        this.interface = data.interface;
        this.business = data.business;
        this.appService = appService;
        this.logger = logger;
        this.getOrigins();
    }

    getOrigins() {
        this.appService.getOrigins()
            .subscribe(this.originData.bind(this), this.originError.bind(this));
    }

    originData(data) {
        this.origins = data;
    }

    originError(error) {
        this.logger.error(`Could not get origins: ${error}`);
    }

}