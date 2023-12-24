import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private insuredApiUrl = environment.insuredApiUrl;
  private carrierApiUrl = environment.carrierApiUrl;


  constructor(private http: HttpClient) {}

  getInsuredClients(): Observable<any[]> {
    return this.http.get<any[]>(this.insuredApiUrl);
  }

  getInsurancesData(): Observable<any[]> {
    return this.http.get<any>(this.carrierApiUrl);
  }


  getInsuranceDataByUUID(uuid: string): Observable<any> {
    const url = `${this.carrierApiUrl}/${uuid}`; // Reemplaza 'tudata' con el endpoint correspondiente
    return this.http.get(url);
  }

  deleteInsuranceByUUID(uuid: string): Observable<any> {
    const url = `${this.carrierApiUrl}/${uuid}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getInsuredDataByUUID(uuid: string): Observable<any> {
    const url = `${this.insuredApiUrl}/${uuid}`; // Reemplaza 'tudata' con el endpoint correspondiente
    return this.http.get(url);
  }

  deleteInsuredByUUID(uuid: string): Observable<any> {
    const url = `${this.insuredApiUrl}/${uuid}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
