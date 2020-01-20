import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutService } from '../Services/layout.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  categories:any[]=[];

  constructor(private layoutservice:LayoutService) { }

  ngOnInit() {
    this.layoutCategory()
    
  }
  layoutCategory(){
    this.layoutservice.getAllcategories().subscribe(response=>{
    //response.map (d=> {
    //console.log(response)
    this.categories=response;
  
  
  
   // })
  
  
  
    })
  


  }

}
