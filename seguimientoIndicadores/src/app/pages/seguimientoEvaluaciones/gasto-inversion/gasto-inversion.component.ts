import { ExcelService } from '../../../services/excel.service';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as XLSX from 'xlsx';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
declare var $: any;
declare var chart: any;
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-gasto-inversion',
  templateUrl: './gasto-inversion.component.html',
  styleUrls: ['./gasto-inversion.component.css']
})
export class GastoInversionComponent implements OnInit {
  @Input() 
  asignado = [];
  organismos = [];
  cont = 0;
  valores = [];
  sumatoria = 0;
  sumatoriadatos = 0;
 
 
  constructor( private exportService: ExcelService, private zone: NgZone ) {
  
   }


  ngOnInit(): void {
  }
// subir archivo Ecxel
  onFileChange(evt: any) {
    var fileName = evt.target.files[0].name;
      $('.custom-file-label').html(fileName);

    const target : DataTransfer =  <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      
      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      wb.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        this.asignado=rowObject;
        
      })
      console.log(this.asignado);
 
    };
    reader.readAsBinaryString(target.files[0]);
    
  }
    }
