import { Router } from '@angular/router';
import { SearchActions } from './../../home/reducers/search.actions';
import { getTaxonomies } from './../../product/reducers/selectors';
import { getTotalCartItems } from './../../checkout/reducers/selectors';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import { getAuthStatus } from '../../auth/reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../../auth/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  totalCartItems: Observable<number>;
  taxonomies$: Observable<any>;
  taxonList = [{
    "id": 4,
    "name": "component2",
    "pretty_name": "Categories -> component2",
    "permalink": "categories/component2",
    "parent_id": 1,
    "taxonomy_id": 1,
    "taxons": null},
  {
    "id": 3,
    "name": "component1",
    "pretty_name": "Categories -> component1",
    "permalink": "categories/component1",
    "parent_id": 1,
    "taxonomy_id": 1,
    "taxons": null
  }, {
    "id": 8,
    "name": "component3",
    "pretty_name": "Brand -> component3",
    "permalink": "brand/component3",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }, {
     "id": 9,
    "name": "component4",
    "pretty_name": "Brand -> component4",
    "permalink": "brand/component4",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }, {
    "id": 10,
    "name": "component5",
    "pretty_name": "Brand -> component5",
    "permalink": "brand/component5",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }, {
    "id": 11,
    "name": "component6",
    "pretty_name": "Brand -> component6",
    "permalink": "brand/component6",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }];
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private authActions: AuthActions,
    private searchActions: SearchActions,
    private router: Router
  ) {
    this.taxonomies$ = this.store.select(getTaxonomies);
  }

  ngOnInit() {
    this.store.dispatch(this.authActions.authorize());
    this.isAuthenticated = this.store.select(getAuthStatus);
    this.totalCartItems = this.store.select(getTotalCartItems);
  }

  selectTaxon(taxon) {
    this.router.navigateByUrl('/');
    this.store.dispatch(this.searchActions.addFilter(taxon));
  }

}
