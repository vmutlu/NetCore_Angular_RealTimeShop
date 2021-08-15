import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HappyCommunicationComponent } from './components/happy-communication/happy-communication.component';

const routes: Routes = [  
  { path: "", redirectTo: "happy-communication", pathMatch: "full" },
  { path: "happy-communication", component: HappyCommunicationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
