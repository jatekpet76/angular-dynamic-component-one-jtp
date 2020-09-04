import { Component, VERSION } from '@angular/core';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  infoComponent = InfoComponent;

  itemClick(event, item) {
    console.log({event, item});
  }
}
