import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/models/product-dto';
import { Products } from 'src/app/models/products';
import { LazyLoadScriptService } from 'src/app/servers/lazy-load-script.service';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private restAPIService: RestAPIService,
    private lazyLoadService: LazyLoadScriptService
  ) {}

  ngOnInit(): void {
    this.loadData();
    // this.lazyLoadService
    // .loadScript('/assets/js/jquery-3.3.1.min.js')
    // .subscribe((_) => {
    //   this.lazyLoadService
    //     .loadScript('/assets/js/bootstrap.min.js')
    //     .subscribe((_) => {
    //       this.lazyLoadService
    //         .loadScript('/assets/js/jquery-ui.min.js')
    //         .subscribe((_) => {
    //           this.lazyLoadService
    //             .loadScript('/assets/js/jquery.countdown.min.js')
    //             .subscribe((_) => {
    //               this.lazyLoadService
    //                 .loadScript('/assets/js/jquery.nice-select.min.js')
    //                 .subscribe((_) => {
    //                   this.lazyLoadService
    //                     .loadScript('/assets/js/jquery.zoom.min.js')
    //                     .subscribe((_) => {
    //                       this.lazyLoadService
    //                         .loadScript('/assets/js/jquery.dd.min.js')
    //                         .subscribe((_) => {
    //                           this.lazyLoadService
    //                             .loadScript('/assets/js/jquery.slicknav.js')
    //                             .subscribe((_) => {
    //                               this.lazyLoadService
    //                                 .loadScript(
    //                                   '/assets/js/owl.carousel.min.js'
    //                                 )
    //                                 .subscribe((_) => {
    //                                   this.lazyLoadService
    //                                     .loadScript('/assets/js/main.js')
    //                                     .subscribe((_) => {
    //                                       console.log('Jquery is loaded!');
    //                                     });
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
    this.loadScript('/assets/js/jquery-3.3.1.min.js');
    this.loadScript('/assets/js/bootstrap.min.js');
    this.loadScript('/assets/js/jquery-ui.min.js');
    this.loadScript('/assets/js/jquery.countdown.min.js');
    this.loadScript('/assets/js/jquery.nice-select.min.js');
    this.loadScript('/assets/js/jquery.zoom.min.js');
    this.loadScript('/assets/js/jquery.dd.min.js');
    this.loadScript('/assets/js/jquery.slicknav.js');
    this.loadScript('/assets/js/owl.carousel.min.js');
    this.loadScript('/assets/js/main.js');
  }

  URL_USER: String = 'http://localhost:1111/api/user';
  dataProCate: any = {
    id: 0,
    product: {
      id: 0,
      name: '',
      priceIn: 0,
      priceOut: 0,
      discount: 0,
      image: '',
      images: '',
      description: '',
      createDate: '',
      updateDate: '',
      coutView: 0,
      coutBuy: 0,
      showHome: false,
      status: false,
    },
    category: {
      id: 0,
      name: '',
      parentId: 0,
      showCategory: false,
      description: '',
      Status: false,
    },
  };
  dataCategory: any = {};
  dataProWomen: Array<Products> = [];
  dataProMen: Array<Products> = [];
  dataSlider: any = {
    id: 0,
    img: '',
    title: '',
    description: '',
    sale: 0,
    createDate: Date,
    displayNo: 0,
    status: false,
  };

  loadData() {
    this.restAPIService.get(this.URL_USER + '/category').subscribe(
      (res) => {
        this.dataCategory = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.restAPIService.get(this.URL_USER + '/product/home/men').subscribe(
      (res) => {
        this.dataProMen = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.restAPIService.get(this.URL_USER + '/product/home/women').subscribe(
      (res) => {
        this.dataProWomen = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  refresh(): void {
    window.location.reload();
  }

  switchShopDetail(id: number, name: String) {
    this.router.navigate(['/shop/details/', id, name]);
  }
  switchShop(name: String) {
    this.router.navigate(['/shop/'], {
      queryParams: {
        category: name,
      },
    });
  }
  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
