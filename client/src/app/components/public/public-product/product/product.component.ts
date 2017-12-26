import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { PublicService } from "../../../../services/public.service";
import { AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class PProductComponent implements OnInit {


  message;
  messageClass;

  product;
  currentUrl
  starRating = 3;
  vRating = 1;
  faoRating;
  movieRating = 2;
  obj;
  totalhits;
  totalHitLenght;
  sum;
  mean;
  x;


  constructor(private  _publicService:PublicService,
              private _activatedRoute:ActivatedRoute,
              private _authServce:AuthService

  ) { }

  products(id){
    this._publicService.product(id).subscribe(data=>{

      this.product = data.product;
    })
  }


  getRateProduct(id){
      this._publicService.getRateProduct(id).subscribe(data=>{

        this.totalhits = data.product.rating;

        this.totalHitLenght=this.totalhits.length;

          this.sum =data.product.rating;



        var result = this.sum.map(a => a.rate);

        console.log(result);

        function getSum(total, num) {
          return total + num;
        }
         this.x = result.reduce(getSum);



        this.mean  = this.x/this.totalhits.length

        console.log(this.mean);

      });
  }




  rateProduct(){

    this.obj ={
      _id:this.currentUrl.id,
      rate:this.faoRating
    }

    this._publicService.rateProduct(this.obj).subscribe(data=>{

      this.totalhits = data.product.rating;

      this.totalHitLenght=this.totalhits.length;

        this.sum =data.product.rating;



      var result = this.sum.map(a => a.rate);

      console.log(result);

      function getSum(total, num) {
        return total + num;
      }
       this.x = result.reduce(getSum);



      this.mean  = this.x/this.totalhits.length

      console.log(this.mean);


    })
  }




  onFaoRate(event){

    if(!this._authServce.loggedIn()){
      this.message='Please login to rate product';
      this.messageClass='alert alert-danger';

    }else {

      this.faoRating  = event;
      //  console.log(this.faoRating);
      this.rateProduct();



    }

   // *ngIf="_authService.loggedIn()


  }



  ngOnInit() {

    this.currentUrl = this._activatedRoute.snapshot.params;
    this.products(this.currentUrl.id);
    this.getRateProduct(this.currentUrl.id);
    //this.onFaoRate(event);




  }

}
