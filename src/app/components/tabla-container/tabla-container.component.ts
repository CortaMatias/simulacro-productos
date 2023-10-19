import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Container } from 'src/app/models/container-interface';
import { ContainerService } from 'src/app/servicios/container.service';

@Component({
  selector: 'app-tabla-container',
  templateUrl: './tabla-container.component.html',
  styleUrls: ['./tabla-container.component.scss']
})
export class TablaContainerComponent {
  @Input() containers: Container[] = [];
  @Output() containerSelected = new EventEmitter<Container>();

  constructor(private containerService: ContainerService) {}

  ngOnInit() {
    this.getContainers();
  }

  async getContainers() {
    this.containerService.getContainers().subscribe((containers) => {
      this.containers = containers;
    });
  }

  seleccionarContainer(container: Container) {
    this.containerSelected.emit(container);
  }
}
