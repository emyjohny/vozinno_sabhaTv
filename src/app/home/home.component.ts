import { EOF } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides : []; 
  live_videos;
  arrivals;
  documentries;
  series: string[] = []; originals;
  talk_show;
  details:any[];

  closeResult: string;
  title = 'appBootstrap';
 
  constructor(private dataservice:DataService,private modalService: NgbModal) { 
    this.getBanners();
    this.getHomeVideos();    
  }

  ngOnInit(): void {
  }

  getBanners() {
    this.dataservice.getBanners()
    .subscribe((res:any) => {
      // console.log(res.data)
      this.slides = res.data;
    })
  }

  getHomeVideos() {           
    this.dataservice.getHomeVideos()
    .subscribe((resp: any) => {       
      this.documentries = resp.data[0]['videos'];
      this.live_videos = resp.data[1]['videos'];
      this.arrivals = resp.data[2]['videos'];
      this.originals = resp.data[3]['videos'];
      this.talk_show = resp.data[4]['videos'];  
       

        for(var j in resp.data) {
          for(var k in resp.data[j].videos) {
            if(resp.data[j].videos[k]['type'] == 'series') {           
              this.series.push(resp.data[j].videos[k])
            }
          }
        }      
    
    })
  }
 

  getId(id){
    this.dataservice.getVideoById(id)
.subscribe((resp:any)=>{
this.details=resp.data
// console.log(this.details)
})
    
  }


open(content){

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
    this.closeResult = `Closed with: ${result}`;

  }, (reason) => {

    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  });

}

private getDismissReason(reason: any): string {

  if (reason === ModalDismissReasons.ESC) {

    return 'by pressing ESC';

  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

    return 'by clicking on a backdrop';

  } else {

    return  `with: ${reason}`;

  }

}}
