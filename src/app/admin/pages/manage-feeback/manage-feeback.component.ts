import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feeback } from 'src/app/models/feeback';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-feeback',
  templateUrl: './manage-feeback.component.html',
  styleUrls: ['./manage-feeback.component.css'],
})
export class ManageFeebackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restAPIService: RestAPIService
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.loadFeebacks();
  }

  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  fileSelect: any;
  feeback: Feeback = new Feeback();
  feebacks: any = [];
  img: any = {};
  countOrder = 0;
  pageOrder: any = [];
  filter: any = {
    id: 0,
    priceMin: 0,
    priceMax: 100,
    categoryName: 'default',
    color: 'default',
    size: 'default',
    brand: 'default',
    style: 'default',
    page: 0,
    sizePage: 10,
    mySort: {
      id: '1',
      name: 'Default Sorting',
      sortBy: 'createDate',
      sortByPro: 'createDate',
      sort: 'DESC',
    },
  };

  loadFeebacks() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/feeback/page' +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortByPro +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.feebacks = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadPage() {
    this.restAPIService.get(this.URL_USER + '/feeback/count').subscribe(
      (res) => {
        this.countOrder = res;
        if (this.countOrder < this.filter.sizePage) {
          this.pageOrder.push({
            stt: 0,
          });
        } else if (this.countOrder % this.filter.sizePage == 0) {
          for (let i = 0; i <= this.countOrder / this.filter.sizePage; i++) {
            this.pageOrder.push({
              stt: i,
            });
          }
        } else {
          for (let i = 0; i <= this.countOrder / this.filter.sizePage; i++) {
            this.pageOrder.push({
              stt: i,
            });
          }
        }
        console.log(this.pageOrder);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  readParam() {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') != null) {
        this.filter.page = params.get('page');
        this.filter.page--;
      }
      if (params.get('sizePage') != null) {
        this.filter.sizePage = params.get('sizePage');
      }
      if (params.get('sort') != null) {
        this.filter.mySort.sort = params.get('sort');
      }
      if (params.get('sortBy') != null) {
        this.filter.mySort.sortBy = params.get('sortBy');
        if (this.filter.mySort.sortBy == 'CreateDate') {
          this.filter.mySort.sortByPro = 'CreateDate';
        }
      }
      this.loadFeebacks();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/feeback'], {
      queryParams: {
        page: this.filter.page + 1,
        sizePage: this.filter.sizePage,
        sortBy: this.filter.mySort.sortBy,
        sort: this.filter.mySort.sort,
      },
    });
    this.readParam();
  }

  initPage(page: number) {
    this.filter.page = page;
    this.switchData();
  }
}
