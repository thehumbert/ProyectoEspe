import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Reforma } from 'src/app/models/reforma.models';
import { Usuario } from 'src/app/models/usuarios.models';
import { DragdropService } from 'src/app/services/dragdrop.service';
import { ReformaService } from 'src/app/services/reforma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idreformas-requirente',
  templateUrl: './idreformas-requirente.component.html',
  styleUrls: ['./idreformas-requirente.component.css']
})
export class IdreformasRequirenteComponent implements OnInit {

  unidades: Reforma[];
  public formSubmitted = false;
  reformaModelo= new Reforma()
  votes: number;
  votes1: number;

  urlPDF: string;

  fileArr = [];
  imgArr = [];
  fileObj = [];

  msg: string;
  progress: number = 0;

  public registerForm = this.fb.group({

    requirente:['',[Validators.required]],
    numeroModificacion:['',[Validators.required]],
    fechapresupuestaria:['',[Validators.required]],
    tipoGasto:['',[Validators.required]],
    tipoModificacion:['',[Validators.required]],
    montoSolicitado:['',[Validators.required]],
    justificacion:['',[Validators.required]],
    resolucion:['',[Validators.required]],
    modificacionPresupuestaria:this.fb.array([]),
    reprogramacionFinaciera:this.fb.array([]),
    requisito1:['',[Validators.required]],
    requisito2:['',[Validators.required]],
    requisito3:['',[Validators.required]],
    requisito4:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    avatar: [null],
    urlPdf:['']
   })
  

  constructor( 
    private fb: FormBuilder, private _reformas: ReformaService,  private sanitizer: DomSanitizer,private route: ActivatedRoute,
    public dragdropService: DragdropService,) { 

      this.votes = this.votes || 0;
      this.votes1 = this.votes1 || 0;
    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this._reformas.getReformaId(id)
      .subscribe(resp =>{
        this.reformaModelo = resp
        console.log(this.reformaModelo,'hola')
      } );
     
    }



get modificacionPresupuestaria(){

  return this.registerForm.get('modificacionPresupuestaria') as FormArray;
}

AgregarModificacion (){

const modificacionFormgroup = this.fb.group({

//partidaOrigen:['',[Validators.required]],
//partidaDestino:['',[Validators.required]],
lineaPoa:['',[Validators.required]],
eod:['',[Validators.required]],
estructuraProgramatica:['',[Validators.required]],
actividadProyectos:['',[Validators.required]],
fuenteFinanciamiento:['',[Validators.required]],
detallePartida:['',[Validators.required]],
itemPresupuestario:['',[Validators.required]],
saldoComprometer:['',[Validators.required]],
certificado:['',[Validators.required]],
incremento:['',[Validators.required]],
reduccion:['',[Validators.required]],
nuevosaldo:['',[Validators.required]],

//partida destino
lineaPoa1:['',[Validators.required]],
eod1:['',[Validators.required]],
estructuraProgramatica1:['',[Validators.required]],
actividadProyectos1:['',[Validators.required]],
fuenteFinanciamiento1:['',[Validators.required]],
detallePartida1:['',[Validators.required]],
itemPresupuestario1:['',[Validators.required]],
saldoComprometer1:['',[Validators.required]],
certificado1:['',[Validators.required]],
incremento1:['',[Validators.required]],
reduccion1:['',[Validators.required]],
nuevosaldo1:['',[Validators.required]],

})

this.modificacionPresupuestaria.push(modificacionFormgroup)

}
QuitarModificacion(indice: number){
  this.modificacionPresupuestaria.removeAt(indice)
}


voteUp(valor : number){

  if(this.votes >= 50 && valor >= 0){
    return this.votes = 50;
  }
  //  this.votes++;
  if(this.votes <= 0 && valor < 0){
    return this.votes = 0;
  }
  
   this.votes = this.votes + valor;

  this.AgregarModificacion ();
}

voteDown(valor: number) {

   //  this.votes++;
   if(this.votes <= 0 && valor < 0){
    return this.votes = 0;
  }
  this.votes = this.votes + valor;
  this.QuitarModificacion(0)
}

get reprogramacionFinaciera(){

  return this.registerForm.get('reprogramacionFinaciera') as FormArray;
}

AgregarReprogramacioFinaciera (){

  const reprogramacionFinancieraFormgroup = this.fb.group({

    detallePartida:['',[Validators.required]],
    numeroPartida:['',[Validators.required]],
    nuevoSaldo:['',[Validators.required]],
    ejecucionPoa:['',[Validators.required]],
    enero:['',[Validators.required]],
    febrero:['',[Validators.required]],
    marzo:['',[Validators.required]],

    abril:['',[Validators.required]],
    mayo:['',[Validators.required]],
    junio:['',[Validators.required]],
    julio:['',[Validators.required]],
    agosto:['',[Validators.required]],
    septiembre:['',[Validators.required]],
    octubre:['',[Validators.required]],
    noviembre:['',[Validators.required]],
    diciembre:['',[Validators.required]],
    reprogramacionTotal:['',[Validators.required]],

    //partida destino
    detallePartida1:['',[Validators.required]],
    numeroPartida1:['',[Validators.required]],
    nuevoSaldo1:['',[Validators.required]],
    ejecucionPoa1:['',[Validators.required]],
    enero1:['',[Validators.required]],
    febrero1:['',[Validators.required]],
    marzo1:['',[Validators.required]],
    abril1:['',[Validators.required]],
    mayo1:['',[Validators.required]],
    junio1:['',[Validators.required]],
    julio1:['',[Validators.required]],
    agosto1:['',[Validators.required]],
    septiembre1:['',[Validators.required]],
    octubre1:['',[Validators.required]],
    noviembre1:['',[Validators.required]],
    diciembre1:['',[Validators.required]],
    reprogramacionTotal1:['',[Validators.required]],
  
    

  })

  this.reprogramacionFinaciera.push(reprogramacionFinancieraFormgroup)
}

QuitarReprogramacion(indice: number){
  this.reprogramacionFinaciera.removeAt(indice)
}

voteUp1(valor : number){

  if(this.votes1 >= 50 && valor >= 0){
    return this.votes1 = 50;
  }
  //  this.votes++;
  if(this.votes1 <= 0 && valor < 0){
    return this.votes1 = 0;
  }
  
   this.votes1 = this.votes1 + valor;

  this.AgregarReprogramacioFinaciera();
}

voteDown1(valor: number) {

   //  this.votes++;
   if(this.votes1 <= 0 && valor < 0){
    return this.votes1 = 0;
  }
  this.votes1 = this.votes1 + valor;
  this.QuitarReprogramacion(0)
}






  crearInidcador() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

      if ( this.registerForm.invalid ) {
       return;
       }

    // Realizar el posteo
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.urlPdf= this.urlPDF;
    this._reformas.addOpcion(this.registerForm.value).subscribe(
      resp => {
        Swal.fire("Registro  existoso", "", "success")
        console.log(resp);

      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');

      })
    }

    update(): void {
     this.reformaModelo.urlPdf = this.urlPDF;
      this._reformas.updateOpcion(this.reformaModelo)
          .subscribe(result => {
            console.log(result)
            Swal.fire("Actualización de Indicadores existoso", "", "success")
          });
    }



    //=======================subir archivos===========================//


    upload(e) {
      const fileListAsArray = Array.from(e);
      fileListAsArray.forEach((item, i) => {
        const file = (e as HTMLInputElement);
        const url = URL.createObjectURL(file[i]);
        this.imgArr.push(url);
        this.fileArr.push({ item, url: url });
      })
  
      this.fileArr.forEach((item) => {
        this.fileObj.push(item.item)
      })
  
      // Set files form control
      this.registerForm.patchValue({
        avatar: this.fileObj
      })
  
      this.registerForm.get('avatar').updateValueAndValidity()
  
      // Upload to server
      this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.dragdropService.addFiles(this.registerForm.value.avatar)


        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('Documento cargado exitosamente!', event.body);
              this.urlPDF = event.body.userCreated.avatar[0];
              console.log(this.urlPDF, 'aquie se inserto')
              setTimeout(() => {
                this.progress = 0;
                this.fileArr = [];
                this.fileObj = [];
                this.msg = "Documento cargado exitosamente!"
              }, 3000);
          }
        })
    }
  
    // Clean Url for showing image preview
    sanitize(url: string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
  
 //=======================subir archivos===========================//
    campoNoValido( campo: string ): boolean {
    
      if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
        return true;
      } else {
        return false;
      }
  
    }



    nohay(){
      Swal.fire(
    
        'NO HAY',
        'ADJUNTOS EN ESTE INFORME',
        'warning'
      );
    
    }
}
