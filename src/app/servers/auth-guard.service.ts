import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private BASE_ADMIN_URL: string = 'http://localhost:1111/api/admin/login';

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (sessionStorage.getItem('admin') != null) {
      return true;
    } else {
      alert('Chưa đăng nhập ....');
      this.router.navigate(['admin/login']);
      return false;
    }
  }
  canActivateUser(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (sessionStorage.getItem('user') != null) {
      // this.router.navigate(['admin/pages/']);
      return true;
    } else {
      console.log('Chưa đăng nhập ....');
      this.router.navigate(['admin/login']);
      return false;
    }
  }
}
