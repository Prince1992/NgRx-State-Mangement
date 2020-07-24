import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/models/app-state.model";
import { Observable } from "rxjs";
import { v4 as uuid } from "uuid";
import { ShoppingItem } from "./store/models/shopping-item.model";
import {
  AddItemAction,
  ShoppingActionTypes,
  DeleteItemAction,
  LoadShoppingAction
} from "./store/actions/shopping.actions";
import { BoundTextAst } from "@angular/compiler";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  shoppingItems: Observable<Array<ShoppingItem>>;
  loadning$: Observable<Boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = { id: "", name: "" };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems = this.store.select(store => store.shopping.list);
    this.loadning$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);

    this.store.dispatch(new LoadShoppingAction());
  }

  addItem() {
    this.newShoppingItem.id = uuid();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = { id: "", name: "" };
  }

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
}
