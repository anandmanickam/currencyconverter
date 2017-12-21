import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

/**
 * An injectable service that fetches data from external endpoints. 
 * 
 * @export
 * @class HttpServiceProvider
 */
@Injectable()
export class HttpServiceProvider {

  /**
   * Creates an instance of HttpServiceProvider.
   * @param {Http} _http 
   */
  constructor(private _http: Http) { }

  /**
   * Hits an expternal api with a get call, fetches and maps the response to a json.
   * @param {string} _externalUrl 
   * @param {string} _baseParam 
   * @returns {Observable<any>} 
   */
  fetch (_externalUrl:string, _baseParam:string): Observable<any> {
    const _url = _externalUrl.concat(_baseParam.length > 0 ? '?' + _baseParam:'');
    return this._http.get(_url)
      .map((response: Response) => response.json());
  }
}