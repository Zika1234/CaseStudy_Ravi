import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgForm} from'@angular/forms'


import {ProductService} from './product.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'casestudy1';
  showAdd: boolean = true;
  showEdit:boolean = true;
constructor(private product:ProductService){}

CompleteArr;
newArr;
paginationNum=0;
paginationArr = new Array(this.paginationNum);


ngOnInit(){

  this.product.readData().subscribe(data=>{
    console.log(data.length);
    data.sort(function(a,b){return a.Id -b.Id})

    this.CompleteArr = data;

    this.newArr = this.CompleteArr.slice(0,5);
    
    
   let quotient = this.CompleteArr.length/5;
    let remainder = this.CompleteArr.length % 5;
    this.paginationNum = Math.floor(quotient);
    if(remainder != 0){
      this.paginationNum = this.paginationNum +1;
    }else{}

    for(let i=0; i< this.paginationNum; i++){
      this.paginationArr.push(i)
    }
    console.log(this.paginationArr)
  })
}

/******** PAGINATION ********* */


pageref(x){
  let a = (5*x)-5;
  let b = (5*x);

  if( a<0 || b> this.CompleteArr.length){
    b= this.CompleteArr.length
    this.newArr = this.CompleteArr.slice(a,b);
  }
  else{
  this.newArr = this.CompleteArr.slice(a,b);
  }
}

/*************DELETE *********** */

handleDelete(i){
  console.log(i)
  this.product.dataDelete(i).subscribe();

  location.reload(true);
}

/************** ADD PRODUCT************* */

Addprod(){
  this.showAdd =! this.showAdd;
}


addnewId: number;
addnewName: string;
addnewDescription: string;
addnewPrice: number;

handleAdd(AddForm: NgForm){
  this.addnewId = AddForm.controls['Pid'].value;
  this.addnewName = AddForm.controls['Pname'].value;
  this.addnewDescription = AddForm.controls['Pdescp'].value;
  this.addnewPrice = AddForm.controls['Pprice'].value;
  this.showAdd = true;
  if(this.addnewId <= 9999){
    this.product.dataInsert(this.addnewId, this.addnewName, this.addnewDescription, this.addnewPrice).subscribe()
  location.reload(true);}
    else{alert("Id should me max of 4 digits")}
  
}

CancelAdd(AddForm: NgForm){
// this.showAdd= true;
AddForm.reset();
}

/************* EDIT PRODUCT******* */
editItem={
  prodId:0,
  prodName:'',
  prodDescp:'',
  prodPrice:0,
  _id:''
};

EditProd(item){
  this.showEdit =! this.showEdit;
  this.editItem.prodId = item.Id;
  this.editItem.prodName = item.name;
  this.editItem.prodDescp = item.description;
  this.editItem.prodPrice = item.price;
  this.editItem._id= item._id;
}

handleEdit(EditForm){
  this.editItem.prodId = EditForm.controls['EPid'].value;
  this.editItem.prodName = EditForm.controls['EPname'].value;
  this.editItem.prodDescp = EditForm.controls['EPdescp'].value;
  this.editItem.prodPrice = EditForm.controls['EPprice'].value;
  if( this.editItem.prodId <=9999){
    this.product.dataUpdate(this.editItem.prodId, this.editItem.prodName, this.editItem.prodDescp, this.editItem.prodPrice, this.editItem._id )
  .subscribe()
  location.reload(true);
  }else{alert("Id should me max of 4 digits")}
  

  console.log(this.editItem)
  
}

CancelEdit(){
  this.showEdit= true;
}


/*********************** Delete All***************** */

DeleteAll(){
  this.product.deleteAll().subscribe();
  location.reload(true);
}

}