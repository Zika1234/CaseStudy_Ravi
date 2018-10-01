import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  readData():Observable<any>{
    return this.http.get('http://localhost:1221/rest/api/read')
  }

  dataDelete(id:string):Observable<any>{
    return this.http.post('http://localhost:1221/rest/api/delete',{
      "_id": id
    })
  }

  dataInsert(pid:number, pname:string, pdescription: string, pprice:number ):Observable<any>{
    return this.http.post('http://localhost:1221/rest/api/insert',{
      Id: pid,
      name: pname,
      description:pdescription,
      price: pprice
    })
  }

  dataUpdate(epid:number, epname:string, epdescription:string, epprice:number, ep_id:string):Observable<any>{
    return this.http.post('http://localhost:1221/rest/api/update',{
      ref: { _id: ep_id },
      value: {
        Id: epid,
      name: epname,
      description: epdescription,
      price: epprice
      }
    })
  }

  deleteAll():Observable<any>{
    return this.http.get('http://localhost:1221/rest/api/deleteAll')
  }
}
