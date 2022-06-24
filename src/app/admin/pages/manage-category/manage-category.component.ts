import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
})
export class ManageCategoryComponent implements OnInit {
  constructor(private restAPIService: RestAPIService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  category: any = {
    id: '',
    name: '',
    parentId: '',
    showCategory: false,
    description: '',
    Status: false,
  };
  reset: any = {
    id: '',
    name: '',
    parentId: '--- Chọn danh mục ---',
    showCategory: false,
    description: '',
    Status: false,
  };
  categories: any[] = [
    {
      id: 0,
      name: '',
      parentId: '',
      showCategory: false,
      description: '',
      Status: false,
    },
  ];

  initReset() {
    this.category = this.reset;
  }
  initUpdate(item: any) {
    this.category = item;
  }
  loadCategories() {
    this.restAPIService.get(this.URL_USER + '/category').subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.restAPIService
      .edit(this.URL_USER + '/category', this.category)
      .subscribe((res) => {
        this.loadCategories();
      });
    this.initReset();
  }
  add() {
    this.restAPIService
      .add(this.URL_USER + '/category/', this.category)
      .subscribe((res) => {
        this.loadCategories();
      });
    this.initReset();
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_USER + '/category', item.id)
      .subscribe((res) => {
        this.loadCategories();
      });
  }
}
