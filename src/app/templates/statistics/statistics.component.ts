import { element } from 'protractor';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/core/services/queries/queries.service';
import { PaymentInterface } from 'src/app/core/interfaces/interface';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit,OnDestroy {

  // periodo
  public form: FormGroup

  private $suscrip: Subscription[]=[];
  dataPayments: Array<PaymentInterface>=[];

  // table 
  public dataTable: MatTableDataSource<PaymentInterface>;
  public displayedColumns: string[] = ['number', 'date', 'payForm'];

  constructor(private qs: QueriesService, private ps: PaymentsService, private _form: FormBuilder) { 
    this.form = _form.group({
      formMonth:[''],
      formYear:['']
    })
  }
  ngOnDestroy(): void {
    this.$suscrip.forEach((res)=>{res.unsubscribe();});
  }

  // get all payments
  async getPayments(my:string){
    this.$suscrip.push(this.ps.getPayment()
      .subscribe(async (res) => {
        res.forEach(element => {
          if (element.monthYear == my) {
            this.dataPayments.push(element);
          };
        }
        
        );this.dataTable = new MatTableDataSource(this.dataPayments);;       
      }));
  }

  // get periodo
  searchPeriodo(){
    this.dataPayments=[];
    let m = this.form.controls.formMonth.value;
    let y = this.form.controls.formYear.value;
    let string = m.concat(y);
    this.getPayments(string);
  }


  ngOnInit(): void {
    
    
  }

}
