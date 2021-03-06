﻿import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Author } from '../../articles/article/author/author';

@Component({
    selector: 'f2kMemberTile',
    templateUrl: './player-tile.component.html',
    styleUrls: ['./player-tile.component.css']
})
export class PlayerInstanceComponent {
    @Input() user: Author;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    navigateLink(URL: string) {
        window.open(URL, '_blank');
    }

    navigate(player = '') {
        this.router.navigate([player.toLowerCase()]);
        return false;
    }
}
