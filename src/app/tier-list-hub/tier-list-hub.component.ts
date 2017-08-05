import { Component, OnInit } from '@angular/core';
import { TierListHubService } from './tier-list-hub.service';
import { DeckHs } from './../decks/deck';

@Component({
  selector: 'f2kTierListHub',
  templateUrl: './tier-list-hub.component.html',
  styleUrls: ['./tier-list-hub.component.css', 'grid.css']
})
export class TierListHubComponent implements OnInit {

  //REMOVE this variable. This is for dummy data
  decks: any[] = [];

  decksList: any[] = [];
  showFloatingSocialMediaLinks = true;

  constructor(private tierListHubService: TierListHubService) { }

  ngOnInit() {
    //getting the real data from the service
    this.getDecks(1, 'Tier 1 - Top Decks to Beat');
    this.getDecks(2, 'Tier 2 - Top Decks to Beat');
    this.getDecks(3, 'Tier 3 - Top Decks to Beat');

    //REMOVE. Dummy data
    this.decks = [
      {
        title: 'Title',
        images: [
          '', ''
        ],
        type: 'type',
        author: 'name',
        date: 123,
        contentType: 'content',
        description: 'desc',
        dust: 123,
        gameMode: null,
        hero: null,
        tier: 123,
        scrapDust: 'scrap'
      },
      {
        title: 'Title',
        images: [
          '', ''
        ],
        type: 'type',
        author: 'name',
        date: 123,
        contentType: 'content',
        description: 'desc',
        dust: 123,
        gameMode: null,
        hero: null,
        tier: 123,
        scrapDust: 'scrap'
      },
      {
        title: 'Title',
        images: [
          '', ''
        ],
        type: 'type',
        author: 'name',
        date: 123,
        contentType: 'content',
        description: 'desc',
        dust: 123,
        gameMode: null,
        hero: null,
        tier: 123,
        scrapDust: 'scrap'
      },
    ];
    this.showFloatingSocialMediaLinks  = window.matchMedia("screen and (min-width:1300px)").matches;
  }

  getDecks(tier: number, title: string) {
    this.tierListHubService
        .getDecks(tier)
        .then(deckList => {
          const deck = {
            title: title,
            list: deckList
          };
          this.decksList.push(deck);
        });
  }

  onResize() {
    this.showFloatingSocialMediaLinks  = window.matchMedia("screen and (min-width:1300px)").matches;
  }

  isMd() {
    return (window.innerWidth > 991);
  }

  isLg() {
    return (window.innerWidth > 1199);
  }

}