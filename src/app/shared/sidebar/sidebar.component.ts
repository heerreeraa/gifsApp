import { Component } from '@angular/core';
import { SearchGifsResponse } from 'src/app/gifs/interface/gifs.interface';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

// Cogemos el array de historial del servicio
  get historial() {
    return this.gifsService.historial;
  }

// Para acceder al servicio hace falta hacer esta injección en el constructor
  constructor( private gifsService: GifsService ) {

  }

  buscar( termino: string ) {
    this.gifsService.buscarGifs( termino )
  }

}
