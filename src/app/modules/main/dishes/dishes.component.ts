import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';
import { CartItem } from '../main.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent {
  selectedTags = [];
  filteredObservable$!: Observable<any[]>;

  @ViewChild('tagWrapper') tagDiv!: ElementRef;

  @Input() dataService!: FirestoreDataService;
  @Input() cart: CartItem[] = [];

  @Output() calc: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  scrolled() {
    if (this.tagDiv) {
      this.tagDiv.nativeElement.scrollLeft;
    }
  }

  scrollTags(move: number) {
    this.tagDiv.nativeElement.scrollLeft =
      this.tagDiv.nativeElement.scrollLeft +
      0.2 *
        move *
        (this.tagDiv.nativeElement.scrollWidth -
          this.tagDiv.nativeElement.offsetWidth);
  }

  selection(tags: []) {
    let a: boolean[] = [];
    this.selectedTags.forEach((tag) => {
      a.push(tags.includes(tag));
    });
    return a.some((v) => {
      return v;
    });
  }

  addToCart(dish: CartItem) {
    if (this.cart.includes(dish)) {
      this.cart[this.cart.indexOf(dish)].count += 1;
    } else {
      dish.count = 1;
      this.cart.push(dish);
    }
    this.calc.emit(dish);
  }
}