import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { AuthenticateService } from "../authenticate.service";
import { appConfig } from "../config/app.config";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private authenticateService: AuthenticateService
  ) {}
  ngOnInit() {}

  @Output() eventClicked = new EventEmitter<Event>();
  filteredStatus: string = "";
  channels: string[] = appConfig.channels;

  changeHeading = (event: Event): void => {
    this.eventClicked.emit(event);
  };
  filterData(): void {
    this.authService.setFilteredStatus(this.filteredStatus);
  }
}
