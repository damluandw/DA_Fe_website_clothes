import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadScriptService {
  loadedLibraries: { [url: string]: ReplaySubject<void> } = {};

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  loadScript(url: string): Observable<void> {
      if (this.loadedLibraries[url]) {
          return this.loadedLibraries[url].asObservable();
      }

      this.loadedLibraries[url] = new ReplaySubject();

      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => {
          this.loadedLibraries[url].next();
          this.loadedLibraries[url].complete();
      };

      this.document.body.appendChild(script);

      return this.loadedLibraries[url].asObservable();
  }
}
