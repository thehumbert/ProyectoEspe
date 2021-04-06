import { Component, OnInit } from '@angular/core';
import { Indicadores } from 'src/app/models/indicadores';
import { IndicadoresService } from 'src/app/services/indicadores.service';

@Component({
  selector: 'app-indicadores-updi',
  templateUrl: './indicadores-updi.component.html',
  styleUrls: ['./indicadores-updi.component.css']
})
export class IndicadoresUpdiComponent implements OnInit {


  
  formularios: Indicadores[];
 
  totalRegistros: number = 0;


  cargando: boolean = true;

  constructor( private listainforme: IndicadoresService
    ) {



      
     }
  ngOnInit() {

   
  
    this.getFormulariosHoja();
   
  }



 

  getFormulariosHoja() {

    
      this.listainforme.getOpciones().subscribe(
        result => { 
          this.formularios =  result 
          this.cargando = false;
         //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )
           console.log(this.formularios)
       });
      }


      buscarIndicador( termino: string ) {

        if ( termino.length <= 0 ) {
          this.getFormulariosHoja();
          return;
        }
      
        this.cargando = true;
      
        this.listainforme.buscarIndicadores( termino )
                .subscribe( (indicadores: Indicadores[]) => {
      
                  this.formularios = indicadores
      
                  console.log(this.formularios,'oe')
                  this.cargando = false;
                });
      
      }


}
