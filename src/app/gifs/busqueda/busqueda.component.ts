import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
// Recogemos el valor con ViewChild
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {}

  buscar() {
// Guardamos el valor recogido en una constante
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length === 0 ) {
      return
    }
// Llamamos al método del servicio con la constante que hemos recogido del input
    this.gifsService.buscarGifs( valor );
// Vaciamos el input 
    this.txtBuscar.nativeElement.value = '';
  }
}
