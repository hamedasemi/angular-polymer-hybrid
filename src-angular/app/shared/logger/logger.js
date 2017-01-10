
import { Injectable } from '@angular/core';

@Injectable()

export class Logger {

    constructor() {
        this.DEBUG = (window.location.port !== ``);
    }

    debug() {
        let args = [].slice.call(arguments);
        args.unshift(`%c[DEBUG]`, `color: #4DB5AB`);
        this.DEBUG && console.log.apply(console, args);
    }

    info() {
        let args = [].slice.call(arguments);
        args.unshift(`%c[INFO]`, `color: #5AC4F4`);
        this.DEBUG && console.log.apply(console, args);
    }

    warn() {
        let args = [].slice.call(arguments);
        args.unshift(`%c[WARN]`, `color: #FEB64D`);
        this.DEBUG && console.log.apply(console, args);
    }

    error() {
        let args = [].slice.call(arguments);
        args.unshift(`%c[ERROR]`, `color: #E57373`);
        this.DEBUG && console.log.apply(console, args);
    }
}