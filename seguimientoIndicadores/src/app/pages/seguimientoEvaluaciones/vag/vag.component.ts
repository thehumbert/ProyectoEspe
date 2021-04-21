import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { Vag } from 'src/app/models/vag';
import { VagService } from 'src/app/services/vag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vag',
  templateUrl: './vag.component.html',
  styleUrls: ['./vag.component.css']
})
export class VagComponent implements OnInit {



  //Crear Vag
  vag:Vag;
  departamentos: Departamento[];

  constructor( private vagService: VagService, private fb: FormBuilder,  ) { }

  public vagForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
    campos1: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.vagService.getDepartamentos("VAG").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const vagFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(vagFromGroup);

          const campos1FromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
         this.campos1.push(campos1FromGroup);
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
    );

  }

  get campos() {
    return this.vagForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.vagForm.get('resultado') as FormArray;
  }

  get campos1() {
    return this.vagForm.get('campos1') as FormArray;
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
    for (let i = 0; i < this.campos.length ; i++) {
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
        'Oooops!!!',
        'Verifique por favor solo se acepta números del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleAvanceFisico( numero, index ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.campos1.value[index].class = 'bg-danger'
      this.campos1.value[index].categoriaMetas = "METAS NO CUMPLIDAS"
    }
     else  if (  numero > 69.99 && numero <= 85.4 ){
      this.campos1.value[index].class = 'bg-warning'
      this.campos1.value[index].categoriaMetas = "MEDIO CUMPLIMIENTO"
    }
    else  if (  numero > 85.4 && numero <= 100   ){
      this.campos1.value[index].class = 'bg-success'
      this.campos1.value[index].categoriaMetas = "METAS CUMPLIDAS"
    }else if (numero > 100 ) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se acepta números del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleTotal( numero ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS NO CUMPLIDAS"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion= "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS PARCIALMENTE CUMPLIDAS"

    } else  if ( numero > 85.4 ){
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS CUMPLIDAS"

    }
  }



 mostrar(){
document.getElementById("tabla").style.display="block";
 }
 ocultar(){
  document.getElementById("tabla").style.display="none";
 }
 
 mostrarOcultar(){
   let tabla = document.getElementById("tabla")
   if(tabla.style.display == "none") {
    this.mostrar();
   }
   else {
     this.ocultar();
   }
 }

  createVag() {

    this.vagService.addOpcion(this.vagForm.value).subscribe( res => {
      console.log(res)
    
      Swal.fire(
        'Exito',
        'Datos guardados',
        'success',
      )
  
    } )
      



  }

  

}