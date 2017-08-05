﻿import {Component} from '@angular/core';

@Component({
    selector: 'f2kApp',
    template: `
        <f2kNavigation></f2kNavigation>
        <router-outlet></router-outlet>
        <div class="F2K-column">
            <f2kFooter></f2kFooter>
        </div>
    `,
})
export class AppComponent {

}
