import { Component } from '@angular/core';
import { GitService } from 'src/app/servicios/git.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent {
  user : any;
  constructor(private gitService : GitService){}


  async ngOnInit() {
    try {
      this.user = await this.gitService.getUser('CortaMatias').toPromise();
      console.log(this.user);
    } catch (error) {
      console.error(error);
    }
  }
}
