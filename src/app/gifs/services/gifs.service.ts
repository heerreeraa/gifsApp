import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'iJB9aFAMWEKKar3Fthy4y3UJdxyOHrGR';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 

    // this._historial = localStorage.getItem('historial');
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    // if( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

   }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase()

    // No deja que añadamos dos busquedas iguales
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      // No deja que haya más de 10 líneas en el historial
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', query );

    this.http.get<SearchGifsResponse>( `${ this.servicioUrl }/search`, { params } )
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      })

  }
}
