import { Component, EventEmitter, Output } from '@angular/core'
@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


@Output() selectedFeatureEvent: EventEmitter<string> = new EventEmitter();

onSelected(selectedEvent: string) {
  this.selectedFeatureEvent.emit(selectedEvent);
}
}
