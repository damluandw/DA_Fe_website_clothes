import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'src/app/servers/lazy-load-script.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngOnInit(): void {
    this.lazyLoadService
      .loadScript('/assets/plugins/jquery/jquery.min.js')
      .subscribe((_) => {
        this.lazyLoadService
          .loadScript('/assets/plugins/bootstrap/js/bootstrap.bundle.min.js')
          .subscribe((_) => {
            this.lazyLoadService
              .loadScript('/assets/dist/js/adminlte.min.js')
              .subscribe((_) => {
                this.lazyLoadService
                  .loadScript('/assets/dist/js/demo.js')
                  .subscribe((_) => {
                    console.log('Jquery is loaded!');
                  });
              });
          });
      });
  }
}
