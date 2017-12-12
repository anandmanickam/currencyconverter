

interface Icurrency {

  currencyType:string;
  currencyValue:number;
  currencyRates:any;
}

export class Converter {

  static instanceId:number = 0;
  instanceName:number;

  fromCurrency: Icurrency = {
    currencyValue : 1.00,
    currencyType : 'USD',
    currencyRates: {}
  };

  toCurrency: Icurrency = {
    currencyValue: 0.00,
    currencyType : 'CAD',
    currencyRates: {}
  };


  constructor(){

    this.instanceName = Converter.instanceId;
    Converter.instanceId++; 

  }

  switchCurrencies() {
    var tempCurrency: Icurrency = {
      currencyValue: 0.00,
      currencyType: 'USD',
      currencyRates: {}
    };
    this.paramsSwitch(this.toCurrency, tempCurrency);
    this.paramsSwitch(this.fromCurrency, this.toCurrency);
    this.paramsSwitch(tempCurrency, this.fromCurrency);
  }
  
  private paramsSwitch(srcCurrency:Icurrency, destCurrency:Icurrency){
    destCurrency.currencyRates =srcCurrency.currencyRates;
    destCurrency.currencyType = srcCurrency.currencyType;
  }
}