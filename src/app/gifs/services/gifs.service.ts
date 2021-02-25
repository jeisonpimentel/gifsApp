import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apiKey     : string = 'zNXEV8cICVPG2xCZgUk8xk2fiI9m235a';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  // TODO: asignar el tipo de datos
  public resultados : Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) { 
    //this._historial = JSON.parse(localStorage.getItem('historial') !) || [];
    if( localStorage.getItem('historial') || localStorage.getItem('resultados')) {
      this._historial = JSON.parse(localStorage.getItem('historial') !);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  buscarGifs( query : string) {

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this.historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params: params })
    .subscribe( response => {
      console.log(response.data);
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

    console.log( this._historial );
  }
}
