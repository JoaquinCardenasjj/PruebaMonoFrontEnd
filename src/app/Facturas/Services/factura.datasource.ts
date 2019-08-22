import { DataSource } from '@angular/cdk/table';
import { Factura } from '../Models/factura.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { FacturaService } from '../Services/factura.service';
import { CONST_FACTURA } from './../factura.constant';
import { log } from 'util';
export class FacturaDatasource implements DataSource<Factura> {
    constants = CONST_FACTURA;
    private FacturaSubject = new BehaviorSubject<Factura[]>([]);
    public totalelementsSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<boolean>(false);
    private errorMessageSubject = new BehaviorSubject<string>('');
  
    public totalElements$ = this.totalelementsSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();
    public error$ = this.errorSubject.asObservable();
    public errorMessage$ = this.errorMessageSubject.asObservable();
    public petitionList = null;
    public FacturaData: any;
  


    constructor(private servicio: FacturaService) { }
  
    connect(collectionViewer: CollectionViewer): Observable<Factura[]> {
      return this.FacturaSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.FacturaSubject.complete();
      this.loadingSubject.complete();
      this.totalelementsSubject.complete();
      this.errorSubject.complete();
      this.errorMessageSubject.complete();
    }
  
    loadData(): void {         
        this.petitionList = this.servicio.getFacturasList()
        .subscribe(async (data: any) => {
            debugger;
       
          Promise.all(data)
            .then((completed) => {
                debugger;
              data.content = completed;
              this.FacturaData = completed;
              this.FacturaSubject.next(data.content);
              this.totalelementsSubject.next(data.totalElements);
              this.errorSubject.next(false);
              this.errorMessageSubject.next('');
              this.loadingSubject.next(false);
            });
  
        },
          error => {
            this.FacturaSubject.next([]);
            this.totalelementsSubject.next(0);
            this.errorSubject.next(true);
            this.errorMessageSubject.next(this.constants.noResultados);
            this.loadingSubject.next(false);
          }
        ); 
    }
  
  }
  