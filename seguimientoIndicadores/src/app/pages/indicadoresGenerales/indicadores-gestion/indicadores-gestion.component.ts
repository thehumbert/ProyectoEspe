import { IndicadoresService } from '../../../services/indicadores.service';
import { MacroProcesoService } from '../../../services/macro-proceso.service';
import { ResponderService } from '../../../services/responder.service';
import { Responder } from '../../../models/responder.Models';
import { UnidadDireccionService } from '../../../services/unidad-direccion.service';
import { Component, OnInit } from '@angular/core';
import { Unidad } from 'src/app/models/unidad.Models';
import { Macro } from 'src/app/models/macroProceso.Model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuarios.models';

@Component({
  selector: 'app-indicadores-gestion',
  templateUrl: './indicadores-gestion.component.html',
  styleUrls: ['./indicadores-gestion.component.css']
})
export class IndicadoresGestionComponent implements OnInit {


  unidades: Unidad[];
  public formSubmitted = false;
  responder: Responder[];

  macro: Macro[]
  mostrar = false;
  mostrar2 = false;
  mostrar3 = false;
  mostrar4 = false;
  mostrar5 = false;
  selected: FormControl = new FormControl(null);
  opc: any;

  public registerForm = this.fb.group({

    unidad:['',[Validators.required]],
    responde:['',[Validators.required]],
    evaluacion:['',[Validators.required]],
    macroProceso:['',[Validators.required]],
    producto:['',[Validators.required]],
    indicador:['',[Validators.required]],
    formula:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    responsable:['',[Validators.required]],
    nombreResponsable:['',[Validators.required]],
    fechaMedicion: ['', [Validators.required]],
    lineaBase:['',[Validators.required]],
    comportamiento:['',[Validators.required]],
    unidadMedida:['',[Validators.required]],
    sentidoMedicion:['',[Validators.required]],
    meta:['',[Validators.required]],
   
    enero:['0',[Validators.required]],
    febrero:['0',[Validators.required]],
    marzo:['0',[Validators.required]],
    abril:['0',[Validators.required]],
    mayo:['0',[Validators.required]],
    junio:['0',[Validators.required]],
    julio:['0',[Validators.required]],
    agosto:['0',[Validators.required]],
    septiembre:['0',[Validators.required]],
    octubre:['0',[Validators.required]],
    noviembre:['0',[Validators.required]],
    diciembre:['0',[Validators.required]],
    trimestre1:['0',[Validators.required]],
    trimestre2:['0',[Validators.required]],
    trimestre3:['0',[Validators.required]],
    trimestre4:['0',[Validators.required]],
    cuatrimestral1:['0',[Validators.required]],
    cuatrimestral2:['0',[Validators.required]],
    cuatrimestral3:['0',[Validators.required]],
    semestral1:['0',[Validators.required]],
    semestral2:['0',[Validators.required]],
    anual:['0',[Validators.required]],

    /* Avance Indicador */
    periods: this.fb.array(<any>[]),
    resultYear: this.fb.array(<any>[{
      result: '',
      compliance: '',
      class: 'bg-secondary',
      color: ''
    }]),

    observaciones:['',[Validators.required]],
    periodicidad:['']

   })
  

  constructor(private _unidad: UnidadDireccionService, private _responder: ResponderService, private _macro: MacroProcesoService,
    private fb: FormBuilder, private _indicadores: IndicadoresService) { }

  ngOnInit(): void {

    this.selected.valueChanges.subscribe(changes => {
      this.Opciones(changes);
    });

    this.getUnidades()

    this.getResponde()
    this.getMacro()
  }


  getUnidades() {

    return this._unidad.getUnidades().subscribe(resp => {
      this.unidades = resp
    })
  }

  getResponde() {
    return this._responder.getResponder()
      .subscribe(
        result => {
          this.responder = result
        });

  }

  getMacro() {
    return this._macro.getMacro()
      .subscribe(
        result => {
          this.macro = result


        });

  }



  Opciones(opc) {
    
    this.opc;
    if (opc == "MENSUAL") {
     
      this.opc = opc;
      console.log(this.opc,'OEE');
      this.mostrar = !this.mostrar
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == "TRIMESTRAL") {
      console.log("TRIMESTRAL");
      this.opc = opc;
      this.mostrar = false;
      this.mostrar2 = true;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == "CUATRIMESTRAL") {
      console.log("CUATRIMESTRAL");
      this.opc = opc;
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = true;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == "SEMESTRAL") {
      console.log("SEMESTRAL");
      this.opc = opc;
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = true;
      this.mostrar5 = false;
    } else if (opc == "ANUAL") {
      this.opc = opc;
      console.log("ANUAL");
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = true;
    }
  }




  crearInidcador() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

      if ( this.registerForm.invalid ) {
       return;
       }

    // Realizar el posteo
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.periodicidad = this.opc;
    
    /* Avance Indicadores*/
    this.registerForm.value.periods = [];
    this.registerForm.value.resultYear[0]['class'] = '';
    this.registerForm.value.resultYear[0]['color'] = '';
    this.registerForm.value.resultYear[0]['compliance'] = '';
    this.registerForm.value.resultYear[0]['result'] = '';
    this.registerForm.value.resultYear[0]['enabled'] = true;

    this._indicadores.addOpcion(this.registerForm.value).subscribe(
      resp => {
        Swal.fire("Registro  existoso", "", "success")
        console.log(resp);

      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');

      })
    }


    campoNoValido( campo: string ): boolean {
    
      if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
        return true;
      } else {
        return false;
      }
  
    }

}
