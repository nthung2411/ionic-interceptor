import { ItemsService } from './../../services/items.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: { id: number, name: string }[] = []

  constructor(public navCtrl: NavController,
    private itemsService: ItemsService) { }

  ionViewWillEnter() {
    this.itemsService.getItems().subscribe(
      items => this.items = items,
      err => console.error(err)
    );
  }

}
