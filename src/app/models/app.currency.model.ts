import { Constants } from '../constants/app.constants';

/**
 * The currency model. The basic block on which the widget model is built.
 * 
 * @export
 * @class CurrencyModel
 */
export class CurrencyModel {

  /**
   * Defaults to the first value in the CURRENCY_TYPES_ARRAY
   * @type {string}
   * @memberOf CurrencyModel
   */
  currencyType: string;

  /**
   * An optional parameter that takes a number input
   * @type {string}
   * @memberOf CurrencyModel
   */
  currencyValue: string;
  
  /**
   * The Currency Rate that is only mandatory for From Currency  
   * @type {{
   *     rates: {}
   *   }}
   * @memberOf CurrencyModel
   */
  currencyRates: {
    rates: {}
  }; 

  /**
   * Creates an instance of CurrencyModel.
   * @param {string} Default [_currencyType=Constants.CURRENCY_TYPES_ARRAY[0]] 
   * @param {string} Optional [_currencyValue] 
   * @param {{rates:{}}} Optional [_currencyRates]
   * 
   * @memberOf CurrencyModel
   */
  constructor(
    _currencyType: string = Constants.CURRENCY_TYPES_ARRAY[0],
    _currencyValue?: string,
    _currencyRates?: {rates:{}}
  ){
    this.currencyType = _currencyType;
    this.currencyValue = _currencyValue;
    this.currencyRates = _currencyRates || {rates:{}};
  }

}