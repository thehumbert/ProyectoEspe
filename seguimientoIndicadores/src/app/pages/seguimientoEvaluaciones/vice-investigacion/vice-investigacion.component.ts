import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { ViceInvestigacion } from 'src/app/models/viceInvestigacion';
import { ViceInvestigacionService } from 'src/app/services/viceInvestigacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vice-investigacion',
  templateUrl: './vice-investigacion.component.html',
  styleUrls: ['./vice-investigacion.component.css']
})
export class ViceInvestigacionComponent implements OnInit {

 

  //Crear  vice Investigacion
  
  viceInvestigacion: ViceInvestigacion;
  departamentos: Departamento[];

  constructor( private viceInvestigacionService: ViceInvestigacionService, private fb: FormBuilder ) { }

  public viceInvestigacionForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.viceInvestigacionService.getDepartamentos("VICEINVESTIGACION").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const viceInvestigacionFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(viceInvestigacionFromGroup);
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
    return this.viceInvestigacionForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.viceInvestigacionForm.get('resultado') as FormArray;
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
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].indiceGestion*100 );
  }

  cumpleOrNotCumple( numero, index ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 85.4 && numero <= 100 ){
      this.campos.value[index].class = 'bg-success'
      this.campos.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    }else if (numero > 100 ) {

      Swal.fire(
        'Oooo!!!',
        'Verifique porfavor solo se acepta numeros del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleAvanceFisico( numero, index ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.campos.value[index].class = 'bg-danger'
      this.campos.value[index].categoriaMetas = "METAS NO CUMPLIDAS"
    }
     else  if (  numero > 69.99 && numero <= 85.4 ){
      this.campos.value[index].class = 'bg-warning'
      this.campos.value[index].categoriaMetas = "MEDIO CUMPLIMIENTO"
    }
    else  if (  numero > 85.4 && numero <= 100   ){
      this.campos.value[index].class = 'bg-success'
      this.campos.value[index].categoriaMetas = "METAS CUMPLIDAS"
    }else if (numero > 100 ) {

      Swal.fire(
        'Oooo!!!',
        'Verifique porfavor solo se acepta numeros del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleTotal( numero ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion= "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "MEDIO CUMPLIMIENTO"

    } else  if ( numero > 85.4 ){
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "ALTO CUMPLIMIENTO"

    }
  }


//funcion mostrar tablas
 mostrar(){
document.getElementById("tabla1").style.display="block";
 }
 ocultar(){
  document.getElementById("tabla1").style.display="none";
 }
 
 mostrarOcultar(){
   let tabla = document.getElementById("tabla1")
   if(tabla.style.display == "none") {
    this.mostrar();
   }
   else {
     this.ocultar();
   }
 }

  createViceInvestigacion() {

    this.viceInvestigacionService.addOpcion(this.viceInvestigacionForm.value).subscribe( res => {
      console.log(res)
    
      Swal.fire(
        'Exito',
        'Datos guardados',
        'success',
      )
  
    } )
      



  }

  

}