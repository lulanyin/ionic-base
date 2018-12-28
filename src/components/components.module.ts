import { NgModule } from '@angular/core';
import { MoneyComponent } from './money/money';
import {IonicModule} from "ionic-angular";
import { StrFormatComponent } from './str-format/str-format';
import { CountDownComponent } from './count-down/count-down';
import { StarComponent } from './star/star';

@NgModule({
  declarations: [
    MoneyComponent,
    StrFormatComponent,
    CountDownComponent,
    StarComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    MoneyComponent,
    StrFormatComponent,
    CountDownComponent,
    StarComponent
  ]
})
export class ComponentsModule {}
