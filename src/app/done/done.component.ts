import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-create',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})

//retrieves user information from session storage
export class DoneComponent implements OnInit {

  username = sessionStorage.getItem('username');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');
  role = sessionStorage.getItem('role');

  newusername = sessionStorage.getItem('newusername');
  newemail = sessionStorage.getItem('newemail');
  newrole = sessionStorage.getItem('newrole');
  newpassword = sessionStorage.getItem('newpassword');

  session = null;

  products: any;

  addId = 0;
  addPname = "";
  addDescription = "";
  addPrice = 0;
  addUnits = 0;

  
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getList().subscribe(data => {
      this.products = data;
    });
    if (sessionStorage.length == 0){
      this.session = false;
      this.router.navigateByUrl('');
    } else {
      this.session = true;
    }
  }

  deleteproduct(id) {
    this.productService.deleteProduct(id).subscribe(data => {
      if (data == true) {
        this.productService.getList().subscribe(data2 => {
          this.products = data2;
        });
      }
    });
  }

  addItem() {
    var newProduct = {
      id: this.addId,
      name: this.addPname,
      description: this.addDescription,
      price: this.addPrice,
      units: this.addUnits
    };
    console.log(newProduct);
    this.productService.addProduct(newProduct).subscribe(data => {
      if ((data = true)) {
        this.router.navigateByUrl("/create");
        
      } else {
        console.log("error");
      }
    });
  }

  

  //checks that the user is the appropriate role to access this page, if not sends them to a page with access denied message
  valid() {
    if (sessionStorage.getItem('role') == 'User') {
      
      this.router.navigateByUrl('/block');
    } else {
      this.router.navigateByUrl('/create');
    }
    
  }

//makes the details stored in session strings that can be updated
  public updateDetails() {

    sessionStorage.setItem('username', this.username.toString());
    
    sessionStorage.setItem('email', this.email.toString());
    sessionStorage.setItem('role', this.role.toString());
    
    this.router.navigateByUrl('profile');
  }
//clears the sessions details and logs out the user returning them to the login page
  logout() {
    console.log('logged out');
    this.session = false;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('');
  }


  //alerts the user that the new user's details have been accepted and displays them
  createUser() {
    alert("Successfully created user: " + this.newusername 
    + "\n Password: " + this.newpassword
    + "\n Email: " + this.newemail
    + "\n Role: " + this.newrole);
  }
}



