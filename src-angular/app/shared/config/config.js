
import { Injectable } from '@angular/core';

@Injectable()

export class Config {

    static get API_ENDPOINT() {
        // return `/services/api/`;
        if(location.port === ``) {
            return `/assets/data/api`;
        } else {
            return `/assets/data/api`;
        }
    }
}