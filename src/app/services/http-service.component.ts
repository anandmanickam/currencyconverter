import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpServiceProvider {

  constructor(private _http: Http) { }

  fetch (_externalUrl:string, _baseParam:string): Observable<any> {
    const _url = _externalUrl.concat(_baseParam.length > 0 ? '?' + _baseParam:'');
    console.log('_url->', _url);
    return this._http.get(_url)
      .map((response: Response) => response.json())
      .do((response: Response) => console.log('response-> ', response));
  }
}