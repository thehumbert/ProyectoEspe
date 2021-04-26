import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { Iasa } from 'src/app/models/iasa';
import { IasaService } from 'src/app/services/iasa.service';
import { SantoDomingoService } from 'src/app/services/santoDomingo.service';
import { LatacungaService } from 'src/app/services/latacunga.service';
import { UnidadesRectoradoService } from 'src/app/services/unidadesRectorado.service';
import { ViceAdministrativoService } from 'src/app/services/viceAdministrativo.service';
import { ViceInvestigacionService } from 'src/app/services/viceInvestigacion.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { VagService } from 'src/app/services/vag.service';
import { ViceDocenciaService } from 'src/app/services/viceDocencia.service';

@Component({
  selector: 'app-resumen-pug-informe',
  templateUrl: './resumen-pug-informe.component.html',
  styleUrls: ['./resumen-pug-informe.component.css']
})
export class ResumenPugInformeComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,

  };
  public pieChartLabels: Label[] = 
  ['porcentajeCumplimiento', 'avanceFisico', 'indiceGestion'];
  public pieChartData: SingleDataSet = [ 0,0,0 ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [ ];
  public pieChartColors: any = [
  
  ];

  iasas: Iasa[];
  departamento: string = null;

  public iasaForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
  })

  get campos() {
    return this.iasaForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.iasaForm.get('resultado') as FormArray;
  }

  constructor(private iasaService: IasaService, private latacungaService: LatacungaService, private santoDomingoService: SantoDomingoService, private viceInvestigacionService: ViceInvestigacionService, private viceAdministrativoService: ViceAdministrativoService, private unidadesRectoradoService: UnidadesRectoradoService,  private vagService: VagService, private viceDocenciaService: ViceDocenciaService, private fb: FormBuilder
  ) { }

  ngOnInit(): void {  
  }

  getDepartamentos(): void {
    this.deletePeriod();
    this.iasaService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }

  getLatacungas(): void {
    this.deletePeriod();
    this.latacungaService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  getSantoDomingos(): void {
    this.deletePeriod();
    this.santoDomingoService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  getViceinvestigacions(): void {
    this.deletePeriod();
    this.viceInvestigacionService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  getUnidadesrectorados(): void {
    this.deletePeriod();
    this.unidadesRectoradoService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  getViceadmintrativos(): void {
    this.deletePeriod();
    this.viceAdministrativoService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  getVags(): void {
    this.deletePeriod();
    this.vagService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  getViceDocencias(): void {
    this.deletePeriod();
    this.viceDocenciaService.getOpciones().subscribe(
      data => {
        this.iasas = data;
        for (let i = 0; i < this.iasas.length; i++) {
          const iasaFromGroup = this.fb.group({
            porcentajeCumplimiento: this.iasas[i].resultado[0].porcentajeCumplimiento,
            avanceFisico: this.iasas[i].resultado[0].avanceFisico,
            indiceGestion: this.iasas[i].resultado[0].indiceGestion,
          });
          this.resultado.push(iasaFromGroup);
        }
        console.log(this.resultado.value)
      }
    );
  }
  deletePeriod() {
    this.resultado.controls.splice(0, this.resultado.length);
  }


  verGrafico(i: number) {
    this.clear();
    this.pieChartData[0] = this.iasas[i].resultado[0].porcentajeCumplimiento;
    this.pieChartData[1] = this.iasas[i].resultado[0].avanceFisico;
    this.pieChartData[2] = this.iasas[i].resultado[0].indiceGestion;

  }

  selectValue() {
    if( this.departamento == "IASA" ) {
      this.getDepartamentos();
    } else if ( this.departamento == "LATACUNGA" ) {
      this.getLatacungas();
    }else if ( this.departamento == "SANTO DOMINGO" ) {
      this.getSantoDomingos();
    } else if ( this.departamento == "VICE INVESTIGACION" ) {
      this.getViceinvestigacions();
    } else if ( this.departamento == "UNIDADES RECTORADO" ) {
      this.getUnidadesrectorados();
    }else if ( this.departamento == "VICE ADMINISTRATIVO" ) {
      this.getViceadmintrativos();
    }else if ( this.departamento == "VAG" ) {
      this.getVags();
    }else if ( this.departamento == "VICE DOCENCIA" ) {
      this.getViceDocencias();
    
  }
}

  clear(): void {
    this.pieChartData = [];
  }
}