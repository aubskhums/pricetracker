import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBuyBox } from 'app/shared/model/buy-box.model';

@Component({
  selector: 'jhi-buy-box-detail',
  templateUrl: './buy-box-detail.component.html'
})
export class BuyBoxDetailComponent implements OnInit {
  buyBox: IBuyBox;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ buyBox }) => {
      this.buyBox = buyBox;
    });
  }

  previousState() {
    window.history.back();
  }
}
