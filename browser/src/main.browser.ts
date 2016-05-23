import {provide} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/components/app.component';
import {CONFIG} from './config';

bootstrap(AppComponent, [
    provide('Config', { useValue: CONFIG })
]);
