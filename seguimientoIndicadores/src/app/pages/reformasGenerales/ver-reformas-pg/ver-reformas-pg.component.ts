import { Component, OnInit } from '@angular/core';
import { Reforma } from 'src/app/models/reforma.models';
import { ReformaService } from 'src/app/services/reforma.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ver-reformas-pg',
  templateUrl: './ver-reformas-pg.component.html',
  styleUrls: ['./ver-reformas-pg.component.css']
})
export class VerReformasPGComponent implements OnInit {
 
  
  formularios: Reforma[];
 
  totalRegistros: number = 0;


  

  constructor( private listainforme: ReformaService) {  }
  ngOnInit() {

   
  //  this.usuario = this._usuarioService.usuario;
    this.getFormulariosHoja();
   
  }



 

  getFormulariosHoja() {

     
      this.listainforme.getOpciones().subscribe(
        result => { 
          this.formularios =  result 

         //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )
           console.log(this.formularios,'reformas')
       });
      }


}

