import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutService } from '../Services/layout.service';
import { Router } from '@angular/router';
import { categories } from './layout';
import { debug } from 'util';
import { NzMessageService } from 'ng-zorro-antd';




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  categories: any[] = [];
  CollapsedNav = true;
  isVisible: boolean;
  isOkLoading: boolean;

  categoriesobj: categories = new categories();

  constructor(private layoutservice: LayoutService, private router: Router, private message: NzMessageService) { }

  ngOnInit() {
    this.layoutCategory()

  }
  layoutCategory() {
    this.layoutservice.getAllcategories().subscribe(response => {
      //response.map (d=> {
      //console.log(response)
      this.categories = response;



      // })

    })



  }

  requestProduct() {
    this.layoutservice.requestProduct(this.categoriesobj).subscribe(response => {
      //console.log(response);
      this.layoutCategory = response;
      this.message.success('Requested Product Successfully Saved',
        {
          nzDuration: 3000
        });

      this.categoriesobj.requestproductname = null;


    })
  }

  addCategoryToUrl(urlFliter: string) {

    this.router.navigate(["categories/" + urlFliter]);

  }
  showModal(): void {
    this.isVisible = true;

  }

  handleOk(): void {
    this.isOkLoading = true;
    this.isVisible = true;
    setTimeout(() => {

      this.isVisible = true;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  disableButton() {

    if (this.categoriesobj.requestproductname) {
      return false;
    }
    else {
      return true;
    }
  }
}
