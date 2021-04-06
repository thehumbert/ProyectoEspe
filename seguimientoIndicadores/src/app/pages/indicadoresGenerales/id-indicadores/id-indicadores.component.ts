import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { Indicadores } from 'src/app/models/indicadores';
import { Macro } from 'src/app/models/macroProceso.Model';
import { Responder } from 'src/app/models/responder.Models';
import { Unidad } from 'src/app/models/unidad.Models';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { MacroProcesoService } from 'src/app/services/macro-proceso.service';
import { ResponderService } from 'src/app/services/responder.service';
import { UnidadDireccionService } from 'src/app/services/unidad-direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-id-indicadores',
  templateUrl: './id-indicadores.component.html',
  styleUrls: ['./id-indicadores.component.css']
})
export class IdIndicadoresComponent implements OnInit {


  indicadorModelo = new Indicadores()

  
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

    unidad: ['', [Validators.required]],
    responde: ['', [Validators.required]],
    evaluacion: ['', [Validators.required]],
    macroProceso: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    indicador: ['', [Validators.required]],
    formula: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    responsable: ['', [Validators.required]],
    nombreResponsable: ['', [Validators.required]],
    fechaMedicion: ['', [Validators.required]],
    lineaBase: ['', [Validators.required]],
    comportamiento: ['', [Validators.required]],
    unidadMedida: ['', [Validators.required]],
    sentidoMedicion: ['', [Validators.required]],
    meta: ['', [Validators.required]],

    enero: ['0', [Validators.required]],
    febrero: ['0', [Validators.required]],
    marzo: ['0', [Validators.required]],
    abril: ['0', [Validators.required]],
    mayo: ['0', [Validators.required]],
    junio: ['0', [Validators.required]],
    julio: ['0', [Validators.required]],
    agosto: ['0', [Validators.required]],
    septiembre: ['0', [Validators.required]],
    octubre: ['0', [Validators.required]],
    noviembre: ['0', [Validators.required]],
    diciembre: ['0', [Validators.required]],
    trimestre1: ['0', [Validators.required]],
    trimestre2: ['0', [Validators.required]],
    trimestre3: ['0', [Validators.required]],
    trimestre4: ['0', [Validators.required]],
    cuatrimestral1: ['0', [Validators.required]],
    cuatrimestral2: ['0', [Validators.required]],
    cuatrimestral3: ['0', [Validators.required]],
    semestral1: ['0', [Validators.required]],
    semestral2: ['0', [Validators.required]],
    anual: ['0', [Validators.required]],
    observaciones: ['', [Validators.required]],

    solicitaUpd:[''],
    autorizacion:['']

  })

  constructor(private listainforme: IndicadoresService, private route: ActivatedRoute, private _unidad: UnidadDireccionService, private _responder: ResponderService, private _macro: MacroProcesoService,
    private fb: FormBuilder) { }

  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');
    this.listainforme.getIndicadoresId(id)
      .subscribe(resp => this.indicadorModelo = resp);



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
    // console.log(opc);
    this.opc;
    if (opc == "MENSUAL") {
      console.log("MENSUAL");
      this.opc = opc;
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
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = true;
      this.mostrar4 = false;
      this.mostrar5 = false;
    } else if (opc == "SEMESTRAL") {
      console.log("SEMESTRAL");
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = true;
      this.mostrar5 = false;
    } else if (opc == "ANUAL") {
      console.log("ANUAL");
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = true;
    }
  }


  campoNoValido( campo: string ): boolean {
    
    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  update(): void {
    //this.submitted = true;
    this.listainforme.updateOpcion(this.indicadorModelo )
        .subscribe(result => {
          console.log(result)
          Swal.fire("Actualización de Indicadores existoso", "", "success")
        });
  }

}
