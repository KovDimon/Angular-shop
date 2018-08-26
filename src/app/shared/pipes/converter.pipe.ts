import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter'
})
export class ConverterPipe implements PipeTransform {

  private currencyRub: number = 67.79;

  private currencyEur: number = 0.86;

  transform(price: number, currency: string): number {

    let convertedPrice;

    switch(currency){
      case 'EUR': convertedPrice = price * this.currencyEur; break;

      case 'RUB': convertedPrice = price * this.currencyRub; break;

      default: convertedPrice = price;
    }

    return convertedPrice;
  }

}
