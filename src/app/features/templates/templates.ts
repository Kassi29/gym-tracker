import {Component} from '@angular/core';
import {TemplateService} from './services/template.service';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
  providers: [TemplateService]
})
export class Templates {

}
