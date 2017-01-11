import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'

import { Logger } from './shared/logger/logger.js'
import { Config } from './shared/config/config.js'

@Injectable()

export class AppService {

    static get parameters() {
        return [[Http], [Logger]]
    }

    constructor(http, logger) {
        this.http = http
        this.logger = logger
    }

    /**
     * ----------------------------------------------------------------
     * ORIGIN / USAGE
     * ----------------------------------------------------------------
     */

    /**
     * Public
     * Get origins. Returns an observable.
     */
    getOrigins() {
        return this.http.get(`${Config.API_ENDPOINT}/origins.json`)
            .map(this._originData.bind(this))
            .catch(this._originError.bind(this))
    }

    /**
     * Private
     * Parse the origin data. Returns the data as JSON.
     */
    _originData(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error(`${res.status}`)
        }
        let data = res.json()
        this.originList = data.originList
        this.usageList = data.usageList
        this.logger.info(`AppService: Origin Data ${this.originList}`)
        return res.json() || {}
    }

    /**
     * Private
     * Handle origin error. Throws an error.
     */
    _originError(error) {
        let errMsg = error.message || `Server error`
        this.logger.error(`AppService: Origin Error ${errMsg}`)
        return Observable.throw(errMsg)
    }

    /**
     * Public
     * Returns selected origin.
     */
    getSelectedOrigin() {
        return this._selectedOrigin
    }

    /**
     * Public
     * Set the selected origin.
     */
    setSelectedOrigin(origin) {
        this._selectedOrigin = origin
        this.logger.info(`Set selected origin: ${this._selectedOrigin}`)
    }

}