import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { Indicadores } from 'src/app/models/indicadores';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculo-discreto-acumulado',
  templateUrl: './calculo-discreto-acumulado.component.html',
  styleUrls: ['./calculo-discreto-acumulado.component.css']
})
export class CalculoDiscretoAcumuladoComponent implements OnInit {

  indicadorModelo = new Indicadores()

  public formSubmitted = false;

  mostrar = false;

  selected: FormControl = new FormControl(null);
  opc: any;

  /* Avance Indicador */
  classCard: string = 'col-md-6';
  metas: Array<any>;
  classCardYear: string = 'bg-secondary';
  colorCardYear: string = '#868e96';

  // Role
  role: string;

  public registerForm = this.fb.group({

    indicador: ['', [Validators.required]],
    lineaBase: ['', [Validators.required]],
    comportamiento: ['', [Validators.required]],
    sentidoMedicion: ['', [Validators.required]],
    meta: ['', [Validators.required]],

    /* Avance Indicador */
    periods: this.fb.array(<any>[]),
    resultYear: this.fb.array(<any>[]),

  })

  constructor(
    private listainforme: IndicadoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.getIndicador(this.route.snapshot.paramMap.get('id'));

    this.role =  JSON.parse(localStorage.getItem('usuario'))['role'];
  }

  ngOnInit(): void {
    this.selected.valueChanges.subscribe(changes => {
      this.opcionesAvance(changes);
    });
  }

  getIndicador(id: string) {
    this.listainforme.getIndicadoresId(id)
    .subscribe((resp => {
      this.indicadorModelo = resp;
      this.deletePeriod();
      this.addPeriod(this.indicadorModelo.periods.length);
    }));
  }



  /* Avances Indicador */
  updateAvanceIndicador(title: string, message: string, estado): void {
    this.indicadorModelo.periods = this.periods.value;
    this.indicadorModelo.resultYear = this.resultYear.value;

    let enabledMainButton = [];

    for (let i = 0; i < this.periods.value.length; i++) {
      if ( this.periods.value[i]['result'] == 0 ) {
        this.periods.value[i]['enabled'] = true;
      } else {
        this.periods.value[i]['enabled'] = false;

        // ENABLED MAIN BUTTON
        enabledMainButton.push(false);
      }
    }

    // ENABLED MAIN BUTTON
    if ( enabledMainButton.length-1 == this.periods.value.length-1 ) {
      this.indicadorModelo.resultYear[0].enabled = false;
    } else {
      this.indicadorModelo.resultYear[0].enabled = true;
    }

    this.listainforme.updateOpcion(this.indicadorModelo)
      .subscribe(result => {
        this.alertUniversal(title, message, estado);
        this.getIndicador(this.route.snapshot.paramMap.get('id'));
      });
  }

  // Responder Solicitud
  responderSolicitud(title: string, message: string, estado): void {
    this.indicadorModelo.periods = this.periods.value;
    this.indicadorModelo.resultYear = this.resultYear.value;

    this.listainforme.updateOpcion(this.indicadorModelo)
      .subscribe(result => {
        this.getIndicador(this.route.snapshot.paramMap.get('id'));
        this.alertUniversal(title, message, estado);
      });
  }

  // Alert Universal
  alertUniversal(title: string, message: string, estado) {
    Swal.fire(title, message, estado)
  }

  /* Avances Indicadores */

  opcionesAvance(opc) {
    this.deletePeriod();
    this.mostrar = false;
    this.opc = opc;
    this.metas = [];
    if (opc == "MENSUAL") {
      this.classCard = "col-md-3";
      this.mostrar = true;
      this.metas.push(this.indicadorModelo.enero);
      this.metas.push(this.indicadorModelo.febrero);
      this.metas.push(this.indicadorModelo.marzo);
      this.metas.push(this.indicadorModelo.abril);
      this.metas.push(this.indicadorModelo.mayo);
      this.metas.push(this.indicadorModelo.junio);
      this.metas.push(this.indicadorModelo.julio);
      this.metas.push(this.indicadorModelo.agosto);
      this.metas.push(this.indicadorModelo.septiembre);
      this.metas.push(this.indicadorModelo.octubre);
      this.metas.push(this.indicadorModelo.noviembre);
      this.metas.push(this.indicadorModelo.diciembre);
      this.addPeriod(12);
    } else if (opc == "TRIMESTRAL") {
      this.classCard = "col-md-3";
      this.mostrar = true;
      this.metas.push(this.indicadorModelo.trimestre1);
      this.metas.push(this.indicadorModelo.trimestre2);
      this.metas.push(this.indicadorModelo.trimestre3);
      this.metas.push(this.indicadorModelo.trimestre4);
      this.addPeriod(4);
    } else if (opc == "CUATRIMESTRAL") {
      this.classCard = "col-md-4";
      this.mostrar = true;
      this.metas.push(this.indicadorModelo.cuatrimestral1);
      this.metas.push(this.indicadorModelo.cuatrimestral2);
      this.metas.push(this.indicadorModelo.cuatrimestral3);
      this.addPeriod(3);
    } else if (opc == "SEMESTRAL") {
      this.classCard = "col-md-6";
      this.metas.push(this.indicadorModelo.semestral1);
      this.metas.push(this.indicadorModelo.semestral2);
      this.addPeriod(2);
      this.mostrar = true;
    } else if (opc == "ANUAL") {
      this.mostrar = true;
    }
  }

  get periods() {
    return this.registerForm.get('periods') as FormArray;
  }

  // Add Period
  addPeriod(quantity) {
    for (let i = 0; i < quantity; i++) {
      const periodFromGroup = this.fb.group({
        goal: this.metas[i],
        result: '',
        compliance: 0,
        class: 'bg-secondary',
        color: '',
        enabled: true,
        solicitud: 'NO REALIZADA'
      });
      //Assign Results
      if (this.indicadorModelo.periods.length > 0) {
        const periodFromGroup = this.fb.group({
          goal: this.metas[i],
          result: this.indicadorModelo.periods[i].result,
          compliance: this.indicadorModelo.periods[i].compliance,
          class: this.indicadorModelo.periods[i].class,
          color: this.indicadorModelo.periods[i].color,
          enabled: this.indicadorModelo.periods[i].enabled,
          solicitud: this.indicadorModelo.periods[i].solicitud
        });

        this.periods.push(periodFromGroup);        
      } else {
        this.periods.push(periodFromGroup);
      }
    }

    //Assign Resul Year
    this.calculatYear();
  }

  deletePeriod() {
    this.periods.controls.splice(0, this.periods.length);
  }

  //Calculate Compliance
  calculatCompliance(indice: number) {
    let compliance: number;

    //Enabled Result
    if(this.periods.value[indice]['result'] == null) {
      compliance = 0;
    } else {
    //If is ASC and DES
      if ( this.indicadorModelo.sentidoMedicion == "DISCRETO" ) {
        compliance = Number(this.periods.value[indice]['result']) / Number(this.periods.value[indice]['goal']);
      } else {
        compliance = Number(this.periods.value[indice]['goal']) / Number(this.periods.value[indice]['result']);
      }
    }
    
    //convert to percentage
    this.periods.value[indice]['compliance'] = compliance;
    this.periods.value[indice]['solicitud'] = 'NO REALIZADA';    
    
    this.calculatYear();
    //Color
    this.changeColorCard( (compliance*100),
      this.periods,
      indice)
  }

  calculatYear() {
    let resulAnual: number = 0;
    let varCompliance: number = 0;

    this.resultYear.controls.splice(0, this.resultYear.length);

    for (let i = 0; i < this.periods.length; i++) {
      //Validar que no Pase de 115 el cumplimiento
      if( (this.periods.value[i]['compliance'] * 100) > 114 ) {
        //Compliance Year
        varCompliance = 1.15 + varCompliance;
      } else if ( this.periods.value[i]['compliance'] != '' ) {
        //Compliance Year
        varCompliance = (Number((this.periods.value[i]['compliance'])) + varCompliance);
      }

      //Resultado Year
      if ( this.periods.value[i]['result'] == null ) {
        this.periods.value[i]['result'] = 0;
      }
      resulAnual = (Number(this.periods.value[i]['result']) + resulAnual);
    };

    if(this.indicadorModelo.comportamiento == "DISCRETO PERIODICO"){
      //validacion de calculo periodo
      resulAnual = (resulAnual/this.periods.value.length);
    }else if(this.indicadorModelo.comportamiento == "DISCRETO ACUMULADO"){
      //validacion de calculo acumulado
      resulAnual = resulAnual;
    }
  
    const resultYearFromGroup = this.fb.group({
      result: resulAnual.toString(),
      //Complaince Year
      compliance: varCompliance / this.periods.length,
      class: 'bg-secondary',
      color: '',
      enabled: this.indicadorModelo.resultYear[0].enabled
    });

    this.resultYear.push(resultYearFromGroup);

    //Color
    this.changeColorCard(
      Number(this.resultYear.value[0].compliance * 100),
      this.resultYear,
      0)
  }

  get resultYear() {
    return this.registerForm.get('resultYear') as FormArray;
  }

  changeColorCard(variable: number, array, index: number) {
    setTimeout(() => {
      if (variable == 0) {
        array.value[index]['class'] = 'bg-secondary';
        array.value[index]['color'] = '';
      } else if (variable > 114) {
        array.value[index]['class'] = 'bg-primary';
        array.value[index]['color'] = '#4D7AD5 solid 1px';
      } else if (variable >= 85 && variable <= 114) {
        array.value[index]['class'] = 'bg-success';
        array.value[index]['color'] = '#3d7641 solid 1px';
      } else if (variable >= 70 && variable <= 84) {
        array.value[index]['class'] = 'bg-warning';
        array.value[index]['color'] = '#ffb22b solid 1px';
      } else if (variable < 70) {
        array.value[index]['class'] = 'bg-danger';
        array.value[index]['color'] = '#721c24 solid 1px';
      }
    }, 100);
  }

  //Change Enabled Meta
  updateStateMeta(i: number, enabled: boolean, solicitud: string) {
    if ( !enabled && solicitud == 'EN PROCESO') {
      Swal.fire({
        title: `Solicitud`,
        text: `Permitir la Edición de ${this.opc} ${i+1} ?`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        denyButtonText: 'No permitir',
        confirmButtonText: 'Permitir'
      }).then((result) => {
        if (result.isConfirmed) {
          this.periods.value[i].solicitud = 'CONTESTADA';
          this.periods.value[i].enabled = true;
          this.resultYear.value[0].enabled = true;
          this.responderSolicitud('Actualizado!', 'Permitido con Exito', 'success');          
        } else if (result.isDenied) {
          this.periods.value[i].solicitud = 'CONTESTADA';          
          this.responderSolicitud('Solicitud Denegada', 'No Permitido con Exito', 'warning');
        }
      })
    } else if ( enabled == false && 
      (solicitud == "FINALIZADA" || solicitud == 'NO REALIZADA' || solicitud == 'CONTESTADA' )
      ) {
      this.alertUniversal('Habilitado!', 'Abierto solo para UPDI', 'success');
    } else if ( enabled ) {
      this.alertUniversal('Habilitado!', 'Abierto para ingresar PLANIFICADOR', 'success');
    }
  }

  // SOlicitud de meta
  solicitudMeta(i: number, enabled: boolean, solicitud: string) {
    if (enabled && solicitud == 'NO REALIZADA') {
      this.alertUniversal('Habilitado!', 'Abierto para ingresar avance', 'success');
    } else if ( enabled && solicitud == 'CONTESTADA' ) {
      this.periods.value[i].solicitud = 'NO REALIZADA';
      this.responderSolicitud('Solicitud Aprobada!', 'Su solicitud de edición fue aprobada', 'info');

    } else if ( !enabled && solicitud == 'EN PROCESO' ) {
      this.alertUniversal('Solicitud en Proceso!', 'Su solicitud pronto sera contestada', 'info');
    } else if ( !enabled && solicitud == 'NO REALIZADA' )  {
      Swal.fire({
        title: `Solicitud`,
        text: `Enviar una Solicitud de Edición para el ${this.opc} ${i+1} ?`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Enviar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.periods.value[i].solicitud = 'EN PROCESO';
          this.responderSolicitud('Solicitud Enviada!', 'Su solicitud fue enviada con exito, pronto recibirá una respuesta', 'success');
        }
      })
    } else if ( solicitud == 'CONTESTADA' || solicitud == 'FINALIZADA' ) {
      this.periods.value[i].solicitud = 'FINALIZADA';
      this.responderSolicitud('Periodo Cerrado!', `Ya no puedes ingresar avances en el periodo ${this.opc} ${i+1}`, 'error');
    }
  }

}