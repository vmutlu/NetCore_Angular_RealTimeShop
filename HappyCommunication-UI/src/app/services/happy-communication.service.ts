import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { happyCommunication } from '../models/happyCommunication';

@Injectable({
  providedIn: 'root',
})
export class HappyCommunicationService {
  constructor(private httpClient: HttpClient) {}

  GetCommunications(connectionId: string): Promise<any[]> {
    return this.httpClient
      .get<happyCommunication[]>(
        environment.communicationshopUrl + `${connectionId}`
      )
      .toPromise();
  }

  GetByIdCommunications(productId: any): Promise<happyCommunication> {
    return this.httpClient
      .get<happyCommunication>(
        environment.communicationshopUrl + 'ProductDetail/' + `${productId}`
      )
      .toPromise();
  }

  Update(_url: string, _content: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.communicationshopUrl  + _url,
      _content
    );
  }
}
