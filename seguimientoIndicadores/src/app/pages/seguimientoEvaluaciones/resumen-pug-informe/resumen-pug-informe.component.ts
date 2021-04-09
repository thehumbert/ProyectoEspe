import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { Iasa } from 'src/app/models/iasa';
import { IasaService } from 'src/app/services/iasa.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';

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
    {
      backgroundColor: [
        'rgba(200,200,0,0.9)',
        'rgba(0,210,0,0.9)',
        'rgba(255,0,0,0.9)',
        'rgba(136,136,136,0.9)'
      ]
    }
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

  constructor(private iasaService: IasaService, private fb: FormBuilder
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

  getLatacunga(): void {
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
  getSantoDomingo(): void {
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
    } else if( this.departamento == "LATACUNGA" ) {
      this.getLatacunga();
    } else if( this.departamento == "SANTODOMINGO" ) {
      this.getSantoDomingo();
    } 
    
  }

  clear(): void {
    this.pieChartData = [];
  }
}
