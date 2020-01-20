import { Component, OnInit } from '@angular/core';
import { ProductListingService } from '../Services/product-listing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  products:any[]=[];

  constructor(private productlisting:ProductListingService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
    this.getproducts(params['params'].category)})
}

 getproducts(str:any){
 this.productlisting.getCategoryToUrl(str).subscribe(response=>{
 this.products=response;
 // console.log(response)



 })
}

 sendToCheckout(prod :Object){
 
 this.productlisting.sendProduct(prod);
 
 

 }





}
