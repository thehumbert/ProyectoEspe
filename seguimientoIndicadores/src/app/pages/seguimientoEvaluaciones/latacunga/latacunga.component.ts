import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from'@angular/forms';
import { Departamento } from 'src/app/models/departamento'
import { Latacunga } from 'src/app/models/latacunga';
import { LatacungaService } from 'src/app/services/latacunga.service';

@Component ({

  selector: 'app-latacunga',
  templateUrl: './latacunga.component.html',
  styleUrls: ['./latacunga.component.css']

})


export class LatacungaComponent implements OnInit {

  num1 = 0;
  num2 = 0;
  num3 = 0;
  num4 = 0;
  num5 = 0;
  num6 = 0;
  num7 = 0;
  num8 = 0;
  num9 = 0;
  num10 = 0;
  num11 = 0;
  num12 = 0;
  num13 = 0;
  num14 = 0;

  result = 0;
  result1 = 0;
  result2 = 0;
  result3 = 0;
  result4 = 0;
  result5 = 0;
  result6 = 0;
  result7 = 0;
  result8 = 0;
  result9 = 0;


  //Crear Latacunga
  latacunga:Latacunga;
  departamentos: Departamento[];

  constructor( private latacungaService: LatacungaService, private fb: FormBuilder ) { }

  public latacungaForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.latacungaService.getDepartamentos("LATACUNGA").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const latacungaFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(latacungaFromGroup);
        }
        const resultadoFromGroup = this.fb.group({
          porcentajeCumplimiento: 0,
          categoriaEjecucion: '',
          avanceFisico: 0,
          categoriaMetas: '',
          indiceGestion: 0,
          class: ''
        });
        this.resultado.push(resultadoFromGroup);
      }, err => {
        console.error(err);
      }
    )
  }

  get campos() {
    return this.latacungaForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.latacungaForm.get('resultado') as FormArray;
  }

  calcularPorcentajeCumplimiento(numero: number, index: number){
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].porcentajeCumplimiento;
    }
    this.resultado.value[0].porcentajeCumplimiento = (total / this.campos.length) / 100;
    this.cumpleOrNotCumple(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].porcentajeCumplimiento, 0);
    this.calcularUltima();
  }

  calcularAvanceFisico(numero: number, index: number){
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].avanceFisico;
    }
    this.resultado.value[0].avanceFisico = (total / this.campos.length)/100;
    this.cumpleOrNotCumpleAvanceFisico(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].avanceFisico, 0);
    this.calcularUltima();
  }

  calcularUltima(){
    for (let i = 0; i < this.campos.length; i++) {
      this.campos.value[i].indiceGestion =
      ((this.campos.value[i].porcentajeCumplimiento + this.campos.value[i].avanceFisico ) / 2) / 100;
    }
    this.resultado.value[0].indiceGestion =
    ((this.resultado.value[0].porcentajeCumplimiento + this.resultado.value[0].avanceFisico) / 2);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].indiceGestion, 0);
  }

  cumpleOrNotCumple( numero, index ) {
    if ( numero > 0 && numero <= 69.99) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 85.4 ){
      this.campos.value[index].class = 'bg-success'
      this.campos.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    }

  }

  cumpleOrNotCumpleAvanceFisico( numero, index ) {
    if ( numero > 0 && numero <= 69.99) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaMetas  = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 85.4 ){
      this.campos.value[index].class = 'bg-success'
      this.campos.value[index].categoriaMetas  = "ALTO CUMPLIMIENTO"
    }
  }

  cumpleOrNotCumpleTotal( numero, index ) {
    if ( numero > 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion= "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 85.4 ){
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    }
  }


  createLatacunga() {
    this.latacungaService.addOpcion(this.latacungaForm.value).subscribe( res => {
      console.log(res)
    } )
  }



}
