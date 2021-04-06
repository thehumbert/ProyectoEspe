import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { Iasa } from 'src/app/models/iasa';
import { IasaService } from 'src/app/services/iasa.service';


@Component({
  selector: 'app-iasa',
  templateUrl: './iasa.component.html',
  styleUrls: ['./iasa.component.css']
})
export class IasaComponent implements OnInit {

  num1= 0;
  num2=0;
  num3= 0;
  num4=0;
  num5= 0;
  num6=0;
  result=0;
  result1=0;
  result2=0;
  result3=0;
  result4=0;
  result5=0;

  //Crear Iasa
  iasa: Iasa;
  departamentos: Departamento[];

  constructor( private iasaService: IasaService, private fb: FormBuilder ) { }

  public iasaForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.iasaService.getDepartamentos("IASA").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const iasaFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(iasaFromGroup);
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
    return this.iasaForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.iasaForm.get('resultado') as FormArray;
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
    if ( numero > 0 && numero <= 30) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 30 && numero <= 70){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 70 ){
      this.campos.value[index].class = 'bg-primary'
      this.campos.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    }
  }

  cumpleOrNotCumpleAvanceFisico( numero, index ) {
    if ( numero > 0 && numero <= 30) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 30 && numero <= 70){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaMetas = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 70 ){
      this.campos.value[index].class = 'bg-primary'
      this.campos.value[index].categoriaMetas = "ALTO CUMPLIMIENTO"
    }
  }

  cumpleOrNotCumpleTotal( numero, index ) {
    if ( numero > 0 && numero <= 30) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 30 && numero <= 70){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 70 ){
      this.resultado.value[0].class = 'bg-primary'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    }
  }



  createIasa() {
    this.iasaService.addOpcion(this.iasaForm.value).subscribe( res => {
      console.log(res)
    } )
  }

  

}
