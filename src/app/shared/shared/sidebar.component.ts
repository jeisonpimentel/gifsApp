import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  get historial() {
    return this.gifsService.historial;
  }

  constructor(private gifsService : GifsService) { }

  ngOnInit(): void {
  }

  buscar( query : string) {
    console.log( query);
    this.gifsService.buscarGifs(query);
  }

}
