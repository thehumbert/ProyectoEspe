import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Departamento } from 'src/app/models/departamento';
import { UnidadesRectorado } from 'src/app/models/unidadesRectorado';
import { UnidadesRectoradoService } from 'src/app/services/unidadesRectorado.service';


@Component({
  selector: 'app-unidades-rectorado',
  templateUrl: './unidades-rectorado.component.html',
  styleUrls: ['./unidades-rectorado.component.css']
})
export class UnidadesRectoradoComponent implements OnInit {


  //Crear Unidades Rectorado
  unidadesRectorado: UnidadesRectorado;
  departamentos: Departamento[];

  constructor( private unidadesRectoradoService: UnidadesRectoradoService, private fb: FormBuilder ) { }

  public unidadesRectoradoForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.unidadesRectoradoService.getDepartamentos("UNIDADESRECTORADO").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const unidadesRectoradoFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(unidadesRectoradoFromGroup);
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
    return this.unidadesRectoradoForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.unidadesRectoradoForm.get('resultado') as FormArray;
  }

  calcularPorcentajeCumplimiento(numero: number, index: number){
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].porcentajeCumplimiento;
    }
    this.resultado.value[0].porcentajeCumplimiento = (total / this.campos.length) / 100;
    this.cumpleOrNotCumple(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].porcentajeCumplimiento*100);
    this.calcularUltima();
  }

  calcularAvanceFisico(numero: number, index: number){
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].avanceFisico;
    }
    this.resultado.value[0].avanceFisico = (total / this.campos.length)/100;
    this.cumpleOrNotCumpleAvanceFisico(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].avanceFisico*100);
    this.calcularUltima();
  }

  calcularUltima(){
    for (let i = 0; i < this.campos.length; i++) {
      this.campos.value[i].indiceGestion = 
      ((this.campos.value[i].porcentajeCumplimiento + this.campos.value[i].avanceFisico ) / 2) / 100; 
    }
    this.resultado.value[0].indiceGestion = 
    ((this.resultado.value[0].porcentajeCumplimiento + this.resultado.value[0].avanceFisico) / 2); 
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].indiceGestion*100);
  }

  cumpleOrNotCumple( numero, index ) {
    if ( numero > 0 && numero <= 69.99) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 70.00 && numero <= 85.49){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 85.50 ){
      this.campos.value[index].class = 'bg-success'
      this.campos.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    }
  }

  cumpleOrNotCumpleAvanceFisico( numero, index ) {
    if ( numero > 0 && numero <= 69.99) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaMetas = "METAS NO CUMPLIDAS"
    } else  if ( numero > 70.00 && numero <= 85.49){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaMetas = "METAS PARCIALMENTE CUMPLIDAS"
    } else  if ( numero > 85.50 ){
      this.campos.value[index].class = 'bg-success'
      this.campos.value[index].categoriaMetas = "METAS CUMPLIDAS"
    }
  }

  cumpleOrNotCumpleTotal( numero ) {
    if ( numero > 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS NO CUMPLIDAS"
    } else  if ( numero > 70.00 && numero <= 85.49){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS PARCIALMENTE CUMPLIDAS"
    } else  if ( numero > 85.50 ){
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS CUMPLIDAS"
    }
  }



  createUnidadesRectorado() {
    this.unidadesRectoradoService.addOpcion(this.unidadesRectoradoForm.value).subscribe( res => {
      console.log(res)
    } )
    Swal.fire('Enviado', 'campos completos!', 'success')
  }



}

