import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
//import { seguimientoEvaluacion } from 'src/app/models/iasa';

@Component({
  selector: 'app-latacunga',
  templateUrl: './latacunga.component.html',
  styleUrls: ['./latacunga.component.css']
})
export class LatacungaComponent implements OnInit {
 // seguimientoEvaluacion: seguimientoEvaluacion

  constructor() { }
  num1= 0;
    num2=0;
    num3= 0;
    num4=0;
    num5= 0;
    num6=0;
    num7= 0;
    num8=0;
    num9= 0;
    num10=0;
    num11= 0;
    num12=0;
    num13= 0;
    num14=0;
    num15= 0;
    num16=0;
    num17= 0;
    num18=0;
    num19= 0;
    num20=0;
    num21= 0;
    result=0;
    result1=0;
    result2=0;
    result3=0;
    result4=0;
    result5=0;
    result6=0;
    result7=0;
    result8=0;
    result9=0;
    result10=0;
    result11=0;
    result12=0;
    result13=0;
    result14=0;
    result15=0;
    result16=0;
    result17=0;
    result18=0;
    result19=0;
    result20=0;
    result21=0;

    calcular(){
      this.result= (this.num1+this.num2) / 2;
      this.result1= (this.num3+this.num4) / 2;
      this.result2= (this.num5+this.num6) / 2;
      this.result3= (this.num1+this.num3+this.num5) / 3;
      this.result4= (this.num2+this.num4+this.num6) / 3;
      this.result5= (this.result3+this.result4) / 2;

      //if(res == 0){
       // console.log('secondary');
     // }else if( res >= 114){
      //  console.log('primary');
    //  }else if( res >= 85 && res <= 114){
      // console.log('warning');
     // }
    }


  
     

  ngOnInit(): void {
  }

}
