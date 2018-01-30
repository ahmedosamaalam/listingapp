import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Renderer, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import {CategoryService} from "../../services/category.service";
import {Router , ActivatedRoute} from '@angular/router';

import {ServiceService} from "../../services/service.service";


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],

})
export class ServiceComponent implements OnInit {

  message;
  messageClass;
  newService;
  form:FormGroup;
  username;
  categories;
  processing;
  services;
  currentUrl;




  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _serviceService: ServiceService,
              private _authService :AuthService,
              private _categoryService:CategoryService,
              private _activatedRoute:ActivatedRoute
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this._fb.group({
      name:['', Validators.compose([
        Validators.required,
      ])],
      description:['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(256)
      ])],
      location:['', Validators.compose([
        Validators.required,
      ])],
      phone:['', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(12)
      ])],
      category:['', Validators.compose([
        Validators.required,
      ])],
      image:['', Validators.compose([
        Validators.required,
      ])],

    });


  }


  addServiceFormSubmit(){



    const service = {
      name:this.form.get('name').value,
      description:this.form.get('description').value,
      location:this.form.get('location').value,
      phone:this.form.get('phone').value,
      category:this.form.get('category').value,
      createdBy:this.username


    }

    this._serviceService.addService(service).subscribe(data=>{
      if(!data.success){
        this.messageClass= 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      }else {
        this.getAllServices();
        this.messageClass='alert alert-success';
        this.message = data.message;
        this.processing = true;
      }
    })

  }



  addService(){
    console.log('work');
  }


  getAllServices(){
    this._serviceService.getAllService().subscribe(data=>{

      this.services = data.service

    });
  }

  deleteService(id){
    this._serviceService.deleteService(id).subscribe(data=>{
      if(!data.success){
        this.messageClass= 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      }else {
        this.getAllServices();
        this.messageClass='alert alert-success';
        this.message = data.message;
        this.processing = true;
      }
    })
  }


  getAllCategory(){
    this._categoryService.getAllCategory().subscribe(data =>{
      console.log(data);
      this.categories = data.category
    })
  }


  ngOnInit() {
    this.getAllServices();
    this.getAllCategory();

    this.currentUrl = this._activatedRoute.snapshot.params;

    this._authService.getProfile().subscribe(profile=>{

      this.username = profile.user.username;

    })

  }


}
