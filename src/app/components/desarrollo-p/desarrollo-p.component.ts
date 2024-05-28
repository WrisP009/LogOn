import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desarrollo-p',
  templateUrl: './desarrollo-p.component.html',
  styleUrls: ['./desarrollo-p.component.css']
})
export class DesarrolloPComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listaTarjetas: any[] =[
    {titular: 'Juan Perez', numeroTarjeta:'12233', fechaExpiracion:'11/23', cvv:'123'}
  ];

}
