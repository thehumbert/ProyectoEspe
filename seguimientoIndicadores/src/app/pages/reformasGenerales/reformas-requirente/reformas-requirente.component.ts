import { ReformaService } from 'src/app/services/reforma.service';
import { Reforma } from 'src/app/models/reforma.models';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reformas-requirente',
  templateUrl: './reformas-requirente.component.html',
  styleUrls: ['./reformas-requirente.component.css']
})
export class ReformasRequirenteComponent implements OnInit {

  usuario: Usuario;
  
  formularios: Reforma[];
 
  totalRegistros: number = 0;


  

  constructor(private _usuarioService: UsuariosService, private listainforme: ReformaService
    ) {



      
     }
  ngOnInit() {

   
    this.usuario = this._usuarioService.usuario;
    this.getFormulariosHoja();
   
  }



 

  getFormulariosHoja() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getReforma(usuario._id).subscribe(
        result => { 
          this.formularios =  result 

         //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )
           console.log(this.formularios,'reformas')
       });
      }


}
