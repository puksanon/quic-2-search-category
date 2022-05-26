import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { CategoryResponse, CategoryServiceService } from './service/category-service.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterCategory' })
export class SearchFilterPipe implements PipeTransform {

  transform(list: Array<string>, searchText: string): Array<string> {
    return list ? list.filter(item => item.toLowerCase().includes(searchText.toLowerCase())) : [];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy , AfterViewInit {
  @ViewChildren('ngForRef') ngForRef!: QueryList<any>;

  private $list_subscription: Subscription = new Subscription()
  public list_catagories: Array<string> = []
  public searchText: string = ""
  public result_count : number = 0

  constructor(
    private _service: CategoryServiceService
  ) { }


  ngAfterViewInit(): void {
    this.ngForRef.changes.pipe(delay(10)).subscribe((list_catagories) => {
      this.result_count = list_catagories.length
    });
  }

  ngOnInit(): void {
    this.$list_subscription.add(
      this._service.getListCatagory().subscribe((response: CategoryResponse) => {
        this.list_catagories = response.categories
        this.result_count = response.count
      })
    )
  }

  public selectCategory(cate_name :string) {
    this.searchText = cate_name.toLowerCase()
  }

  ngOnDestroy(): void {
    this.$list_subscription.unsubscribe()
  }
}