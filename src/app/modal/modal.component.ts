import { Component, OnInit,Input ,ViewEncapsulation, SimpleChanges} from '@angular/core';
import { DataService } from '../services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  details:[];
  cast:[];
  
  @Input() id1:string;
  @Input() content:any;
  constructor(private dataservice:DataService ,private modalService: NgbModal) {
  
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.id1){
      console.log(this.id1)
    this.dataservice.getVideoById(this.id1)
    .subscribe((resp:any)=>{
    this.details=resp.data;
    this.cast=resp.data['castCrew']
    
    })}
    if(this.content){
      console.log(this.content)
      this.modalService.open(this.content, { size: 'xl' ,
      backdropClass: 'black-backdrop',
      windowClass: 'myCustomModalClass'});
    
    }
  
   }
   

}

