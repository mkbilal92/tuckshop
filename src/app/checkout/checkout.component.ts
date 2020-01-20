import { Component, OnInit } from '@angular/core';
import { ProductListingService } from '../Services/product-listing.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutProductsArray=[];
  productQuantity =0;
  total=0;
  productsArray=[];
  cols=[];

  constructor(private productlisting:ProductListingService, private modalService: NzModalService) { }

  ngOnInit() {
    this.populateCols()

    this.productlisting.productListing$.subscribe(message => {
    //console.log (message);

   let found=this.checkoutProductsArray.findIndex(p=>p.productTitle == message['productTitle']);
  // console.log(found)
  if (found > -1 ){
    this.checkoutProductsArray[found].productPrice =this.checkoutProductsArray[found].productPrice+message['productPrice'];
    this.total=this.total+message['productPrice']
    this.checkoutProductsArray[found].productQuantity=this.checkoutProductsArray[found].productQuantity+1;
  }
  else
  {
   this.checkoutProductsArray.push({
   id:message['id'],
   productTitle:message['productTitle'],
   productPrice:message['productPrice'],
   image:message['image'],
   productQuantity:this.productQuantity=1,
   printProductPrice:message['productPrice']
});


this.productsArray.push({
  id:message['id'],
  productTitle:message['productTitle'],
  productPrice:message['productPrice'],
  image:message['image'],
  productQuantity:this.productQuantity=1
});
this.total+=message['productPrice'];
   
}
});



}

removeProductFromCheckout(checkout:Object){
   //debugger;

  let index=this.checkoutProductsArray.findIndex(p=>p.id == checkout['id'] );
  this.total=this.total-this.checkoutProductsArray[index].productPrice;
  this.checkoutProductsArray.splice(index, 1) 
  this.productsArray.splice(index, 1)
  
 }

 

 isVisible = false;
 isOkLoading = false;

 showModal(): void {
  this.isVisible = true;
}

handleOk(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </head>
        <body onload="window.print(); window.close()">${printContents}</body>
    </html>`
    
  );
  this.checkoutProductsArray = [];
  this.total=0;
  popupWin.window.Print();
  popupWin.document.close();
  
}

handleCancel(): void {
  this.isVisible = false;
  
}

 plusProducts(plusprod :Object){
 
  let index=this.checkoutProductsArray.findIndex(p=>p.id == plusprod['id'] );
  //let  productPrice = this.productsArray[index].productPrice;

 //changes: 
  
  let productPrice = this.checkoutProductsArray[index].productPrice /this.checkoutProductsArray[index].productQuantity;
   
  this.checkoutProductsArray[index].productPrice+=productPrice;
  this.total=this.total+productPrice;
  this.checkoutProductsArray[index].productQuantity=this.checkoutProductsArray[index].productQuantity+1;
   
  }


  minusProducts(minusprod: Object)

  {

  let index = this.checkoutProductsArray.findIndex(p=>p.id == minusprod ['id']);
  let productPrice = this.productsArray [index].productPrice;

  this.total=this.total-productPrice;
  this.checkoutProductsArray[index].productPrice=this.checkoutProductsArray[index].productPrice-productPrice;  
   
  if (this.checkoutProductsArray[index] ['productQuantity'] <=1 ) {


    this.checkoutProductsArray.splice(index, 1) 
    this.productsArray.splice(index, 1)
    
  } else {
    

    this.checkoutProductsArray[index].productQuantity=this.checkoutProductsArray[index]['productQuantity']-1;
  }

  }

populateCols(){

this.cols=[

{header:"Product Name"},
{header:"Product Price"},
{header:"Product Quantity"},
{header:"Price"}
];
}
}
