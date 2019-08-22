import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaService } from '../Services/factura.service';
import { Factura } from '../Models/factura.model';
import { FacturaDatasource } from '../Services/factura.datasource';
import { CONST_FACTURA } from './../factura.constant';
@Component({
  selector: 'app-facturas-list',
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.css']
})
export class FacturasListComponent implements OnInit {
  constants = CONST_FACTURA;
  facturas: Observable<Factura[]>;
  dataSource: FacturaDatasource;
  constructor(private facturaService: FacturaService) { }
  columns = ['codigoFactura',
             'cliente',
             'ciudad',
             'nit',
             'totalFactura',
             'subTotal',
             'iva',
             'retencion',
             'fechaCreacion',
             'estado',
             'pagada',
             'fechaPago']

  headers = [{
    id: 'id',
    codigoFactura: 'codigoFactura',   
  }];
  ngOnInit() {
    this.dataSource = new FacturaDatasource(this.facturaService);    
    // this.reloadData();
    this.loadData();
  }
  loadData(): void {
    this.dataSource.loadData();
  }
  reloadData() {
    this.facturas = this.facturaService.getFacturasList();
    debugger;
  }
  revisarFacturas(): void {
 
 this.facturaService.revisarFacturas()
  .subscribe(
    data => {
      this.loadData();
  
    },
    error => {    
      if (error.status == 500 || error.status == 0) {

      }
    }
    );
  }
}
