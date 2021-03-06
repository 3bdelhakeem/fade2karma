﻿import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService, NavItem } from './navigation.service';
import { BASE_URL } from './core/globals';
import { Http } from '@angular/http';

@Component({
    selector: 'f2kNavigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
    open: boolean;
    lastScrollTop: number;
    top: number;
    giveawayExists = false;
    giveawayUrl: string;
    navItems: NavItem[] = [
        // new NavItem('Decklists', ['Hearthstone', 'Gwent']),
        new NavItem('Tier List', []),
        new NavItem('Articles', []),
        new NavItem('Giveaway', []),
        new NavItem('Team', []),
        // new NavItem('Sponsors', []),
        // new NavItem('Shop', [])
    ];

    @HostListener('window:scroll', ['$event']) scroll(event) {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > this.lastScrollTop) {
            this.resetOpenItems();
            this.element.nativeElement.style.top = -this.getHeight() + 'px';
        } else {
            this.element.nativeElement.style.top = 0;
        }
        this.lastScrollTop = st;
    }

    constructor(private service: NavigationService,
                private route: ActivatedRoute,
                private router: Router,
                private element: ElementRef,
                private http: Http) {
    }

    ngOnInit() {
        this.setFeatured();
    }

    toLink(url: string) {
        return url.replace(/ /g, '_').toLowerCase();
    }

    resetOpenItems() {
        this.open = false;
        this.navItems.forEach(navItem => navItem.open = false);
    }

    getHeight() {
        if (this.element.nativeElement.querySelector('.nav-column').offsetWidth < 728) {
            return this.element.nativeElement.querySelector('.nav-column').offsetHeight;
        }
        return this.element.nativeElement.querySelector('.nav-column').offsetHeight;
    }

    isActive(name: string) {
        let currentRoute: string | string[] = this.router.url;
        currentRoute = currentRoute.split('/');
        return currentRoute[currentRoute.length - 1] === this.toLink(name);
    }

    setFeatured(): void { // TODO move in service, handle errors in case they take place...
        this.http.get(`${BASE_URL}/api/articles/featured`).subscribe(res => {
            const articles = res.json();
            if (articles.length > 1) {
                this.giveawayUrl = `/articles/${articles[1].title.replace(/ /g, '_').toLowerCase()}_${articles[1].id}`;
                this.giveawayExists = true;
            }
        });
    }
}
