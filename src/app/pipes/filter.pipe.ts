import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultProductos = [];

    for(const producto of value){
        if (producto.producto.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultProductos.push(producto);
        }
    }
    return resultProductos;
  }

}
