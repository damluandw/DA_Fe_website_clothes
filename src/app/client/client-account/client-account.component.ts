import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css'],
})
export class ClientAccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
