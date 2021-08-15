import { Component, OnInit } from '@angular/core';
import { happyCommunication } from 'src/app/models/happyCommunication';
import { HappyCommunicationService } from 'src/app/services/happy-communication.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-happy-communication',
  templateUrl: './happy-communication.component.html',
  styleUrls: ['./happy-communication.component.css'],
})
export class HappyCommunicationComponent implements OnInit {
  title = 'Happy Communication Market';
  modelCommunications: Array<happyCommunication>;
  communications: happyCommunication = new happyCommunication();
  updateForm: boolean = false;

    Id: number = 0;
    ProductName: any;
    Price: number = 0;
    ImagePath: any;

  _hubConnection: HubConnection | undefined;
  _connectionId: string | undefined;
  signalRServiceIp: string = 'http://localhost:11417/happyCommunicationHub';

  public constructor(private service: HappyCommunicationService,
    private formBuilder: FormBuilder) {
    this.modelCommunications = new Array<happyCommunication>();
  }

    happyForm: FormGroup = this.formBuilder.group({
    Id: [0],
    ProductName: ['', Validators.maxLength(15)],
    Price: [0],
    ImagePath: [''],
  });

  updateClick(id: any) {
    this.updateForm = !this.updateForm;

    this.service.GetByIdCommunications(id).then((response) => {
      this.communications = response;
    });
  }

  Update(){
      var formDto = this.getPostDto();
      this.service
        .Update("UpdateProduct", formDto)
        .subscribe((res) => {
        console.log(res);
        }, error => {
          console.log(error);
        });
  }

  getPostDto(): any {
    var data = {
      Id: 0,
      ProductName: '',
      Price: 0,
      ImagePath: '',
    };

    if (this.Id > 0) {
      data.Id = this.Id;
    }
    if (this.ProductName != null) {
      data.ProductName = this.ProductName;
    }
    if (this.Price > 0) {
      data.Price = this.Price;
    }
    if (this.ImagePath != null) {
      data.ImagePath = this.ImagePath;
    }

    return data;
  }

  public ngOnInit(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.signalRServiceIp}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('Hub Baglantısı Başlatıltı.'))
      .catch((err) => console.log(err));

    this._hubConnection.on('GetConnectionId', (connectionId: string) => {
      this._connectionId = connectionId;
      console.log('ConnectionID :' + connectionId);
      this.service.GetCommunications(connectionId).then((response) => {
        console.log(response);
        this.modelCommunications = response;
      });
    });

    this._hubConnection.on(
      'ChangeProduct',
      (happyCommunication: happyCommunication) => {
        var item = this.modelCommunications.find(
          (rd) => rd.Name == happyCommunication.Name
        );
        this.modelCommunications = this.modelCommunications.filter(
          (gam) => gam != item
        );
        this.modelCommunications.push(happyCommunication);
      }
    );
  }
}
