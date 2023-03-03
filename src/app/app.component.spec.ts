import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule, MatNavList } from "@angular/material/list";
import { DropdownDirective } from "./shared/dropdown.directive";
import { UserComponent } from "./user/user.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserTableComponent } from "./user/user-table/user-table.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        DropdownDirective,
        HeaderComponent,
        UserComponent,
        UserDetailComponent,
        UserTableComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatRadioModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        FormsModule,
        MatSelectModule,
        HttpClientModule,

      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'NgUserCRUDInterface'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular/Material User Form');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title')?.textContent).toContain('Angular User Portal');
  });
});
