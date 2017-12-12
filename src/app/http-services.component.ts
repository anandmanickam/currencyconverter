import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  private _externalurl = 'https://api.fixer.io/latest?base=';
  constructor(private _http: Http) { }

  getLatestCurrencyRates(baseCurrency:String): Observable<any> {
    return this._http.get(this._externalurl + baseCurrency)
      .map((response: Response) => response.json());
  }
}