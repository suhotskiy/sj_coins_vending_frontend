import {
  Component,
  OnInit,
  HostListener
} from "@angular/core";
import {TransactionService} from "../shared/services/transaction.service";
import {TransactionPage} from "./transaction-page";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import {Condition} from "./condition";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {Pageable} from "./pageable";
import {TransactionPageRequest} from "./transaction-page-request";
import {Sort} from "./sort";
import {Transaction} from "../shared/entity/transaction";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  page: TransactionPage;
  pageForm: FormGroup;
  filterForm: FormArray;
  fields: string[];
  sorts: Sort[];

  hideFilter: boolean = true;

  pageSize: number = 10;
  pageItems: number = 5;
  pageDirectionLinks: boolean = true;
  pageItemsSize: string = '';

  constructor(private transactionService: TransactionService,
              private parser: NgbDateParserFormatter) {
  }

  ngOnInit() {
    this.buildPageSizeForm();
    this.buildFilterForm();
    this.fetch(1, this.pageSize);
    this.fields = new Array<string>();
    // just for getting field names
    let transaction = new Transaction(1,'','',1,'',1,'','');
    for (let field in transaction) {
      if (field != "id" && field != "remain") {
        this.fields.push(field);
      }
    }
    this.addFilter();
  }

  private buildPageSizeForm(): void {
    this.pageForm = new FormGroup({
      pageSize: new FormControl('10')
    });
    if (window.innerWidth < 767) {
      this.pageItems = 3;
      this.pageItemsSize = 'sm';
      this.pageDirectionLinks = false;
    }
    this.pageForm.get('pageSize').valueChanges.subscribe(change => {
      this.pageSize = change;
      this.fetch(1, this.pageSize);
    });
  }

  private buildFilterForm(): void {
    this.filterForm = new FormArray([]);
  }

  addFilter(): void {
    this.filterForm.push(new FormGroup({
      field: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      comparison: new FormControl('', Validators.required)
    }));
    this.filterForm.controls[this.filterForm.controls.length - 1].get('field').patchValue(this.fields[0]);
    this.filterForm.controls[this.filterForm.controls.length - 1].get('comparison').patchValue("eq");
  }


  onSubmit(): void {
    this.fetch(1, this.pageSize);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 767) {
      this.pageItems = 5;
      this.pageItemsSize = '';
      this.pageDirectionLinks = true;
    }
  }

  showFilter(): void {
    this.hideFilter = !this.hideFilter;
  }

  changePage(number: number): void {
    this.fetch(number, this.pageSize);
  }

  setSortClass(column: string): string {
    if (!this.sorts) {
      this.sorts = new Array<Sort>();
    }
    let sort = this.sorts.filter(sort => sort.property == column);
    if (sort.length > 0) {
      return sort[0].direction == "ASC" ? "fa fa-sort-asc" : "fa fa-sort-desc";
    } else {
      return "fa fa-sort";
    }
  }

  setSorting(column: string): void {
    if (!this.sorts) {
      this.sorts = new Array<Sort>();
    }
    let sort = this.sorts.filter(sort => sort.property == column);
    if (sort.length < 1) {
      this.sorts.push(new Sort("ASC", column));
    } else {
      sort[0].direction = sort[0].direction == "ASC" ? "DESC" : "ASC";
    }
  }

  toTransactionFilter(formArray: FormArray): TransactionPageRequest {
    let conditions = new Array<Condition>();
    let values = formArray.value;
    for (let value of values) {
      if (value["value"] != "") {
        if (this.transactionService.getType(value["field"]) == "date") {
          conditions.push(new Condition(value["field"], new Date(this.parser.format(value["value"])).toISOString(), value["comparison"]));
        } else {
          conditions.push(new Condition(value["field"], value["value"], value["comparison"]));
        }
      }
    }
    let pageable = new Pageable(this.sorts);
    return new TransactionPageRequest(conditions, pageable);
  }

  fetch(page: number, size: number): void {
    let filter = this.toTransactionFilter(this.filterForm);
    filter.pageable.page = page - 1;
    filter.pageable.size = size;
    this.transactionService.get(filter).subscribe((response: TransactionPage) => {
      this.page = response;
    }, error => {
      console.error(error);
    })
  }

}