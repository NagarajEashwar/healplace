import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MomentModule } from 'ngx-moment';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicFooterComponent } from './public-layouts/footer/footer.component';
import { PublicNavbarComponent } from './public-layouts/navbar/navbar.component';
import { PublicHomeComponent } from './public-pages/home/home.component';
import { PublicAboutusComponent } from './public-pages/about-us/about-us.component';
import { PublicHowitworksComponent } from './public-pages/howitworks/howitworks.component';
import { PublicContactusComponent } from './public-pages/contact-us/contact-us.component';
import { PublicFaqComponent } from './public-pages/faq/faq.component';
import { LoginModalComponent } from './public-pages/popup-modals/login-modal/login-modal.component';
import { SignupModalComponent } from './public-pages/popup-modals/sign-up-modal/sign-up-modal.component';
import { ForgotPasswordModalComponent } from './public-pages/popup-modals/forgot-password-modal/forgot-password-modal.component';
import { AuthHomeComponent } from './auth-layouts/home/auth-home.component';
import { AuthNavbarComponent } from './auth-layouts/navbar/navbar.component';
import { AuthSidebarComponent } from './auth-layouts/sidebar/sidebar.component';
import { AuthFooterComponent } from './auth-layouts/footer/footer.component';
import { DashboardComponent } from './auth-pages/common-pages/dashboard/dashboard.component';
import { ChangePasswordComponent } from './auth-pages/common-pages/change-password/change-password.component';
import { EditProfileComponent } from './auth-pages/common-pages/edit-profile/edit-profile.component';
import { SessiononlyComponent } from './auth-pages/common-pages/sessiononly/sessiononly.component';
import { GeneralDashboardComponent } from './auth-pages/common-pages/general-dashboard/general-dashboard.component';
import { AllInterestsComponent } from './auth-pages/common-pages/all-interests/all-interests.component';

import { AdminDashboardComponent } from './auth-pages/admin-pages/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './auth-pages/customer-pages/customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './auth-pages/customer-pages/customer-profile/customer-profile.component';
import { BasicInfoComponent } from './auth-pages/customer-pages/basic-info/basic-info.component';
import { FirstPageComponent } from './auth-pages/customer-pages/basic-info/first-page/first-page.component';
import { SecondPageComponent } from './auth-pages/customer-pages/basic-info/second-page/second-page.component';
import { ThirdPageComponent } from './auth-pages/customer-pages/basic-info/third-page/third-page.component';
import { FourthPageComponent } from './auth-pages/customer-pages/basic-info/fourth-page/fourth-page.component';
import { FifthPageComponent } from './auth-pages/customer-pages/basic-info/fifth-page/fifth-page.component';
import { PractitionerDashboardComponent } from './auth-pages/practitioner-pages/practitioner-dashboard/practitioner-dashboard.component';
import { ApiService } from './services/ApiService';
import { ThirdPApiService } from './services/ThirdPApiService';
import { TokenInterceptorService } from './services/auth/TokenInterceptorService';
import { AuthGuardService } from './services/AuthGuardService';
import { CustomDateParserFormatter } from './services/datepickerAdapter';
import { AuthService } from './services/AuthService';
import { ChatService } from './services/ChatService';
import { GeneralService } from './services/GeneralService';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { PublicChangePasswordComponent } from './public-pages/change-password/change-password.component';
// Social Logins

import { MySubscriptionComponent } from './auth-pages/customer-pages/my-subscription/my-subscription.component';
import { CustomerPaymentComponent } from './auth-pages/customer-pages/customer-payment/customer-payment-component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { ChartsModule } from 'ng2-charts';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { ScoailLoginConfig } from './config/config';
import { PractitionerChatComponent } from './auth-pages/practitioner-pages/practitioner-chat/practitioner-chat.component';
import { CustomerSessionComponent } from './auth-pages/customer-pages/customer-session/customer-session.component';
import { CustomerChatComponent } from './auth-pages/customer-pages/customer-chat/customer-chat.component';
import { NotificationsComponent } from './auth-pages/practitioner-pages/notifications/notifications.component';
import { PractitionerSessionsComponent } from './auth-pages/practitioner-pages/practitioner-sessions/practitioner-sessions.component';
import { PractionerSessionComponent } from './auth-pages/practitioner-pages/practitioner-sessions/practioner-session/practioner-session.component';
import { AddSessionComponent } from './auth-pages/practitioner-pages/practitioner-sessions/add-session/add-session.component';
import { ConfirmSessionComponent } from './auth-pages/practitioner-pages/practitioner-sessions/confirm-session/confirm-session.component';
import { PaymentInfoComponent } from './auth-pages/payment-info/payment-info.component';
import { BankDetailsComponent } from './auth-pages/payment-info/bank-details/bank-details.component';
import { WithdrawHistoryComponent } from './auth-pages/payment-info/withdraw-history/withdraw-history.component';
import { ConnectAccountComponent } from './auth-pages/payment-info/connect-account/connect-account.component';
import { DocumentVerificationComponent } from './auth-pages/payment-info/document-verification/document-verification.component';
import { AddExpertiseComponent } from './auth-pages/add-expertise/add-expertise.component';
import { ProfilePictureModalComponent } from './auth-pages/popup-modals/profile-picture-modal/profile-picture-modal.component';

import { ContactUsService } from './services/contact-service';

import { PractitionerSessionService } from './services/Practitioner-session.service';
import { SubscriptionPlansService } from './services/SubscriptionPlansService';
import { PractitionerScheduleService } from './services/practitioner-schedule.service';

import { DeleteChatComponent } from './auth-pages/customer-pages/delete-chat/delete-chat.component';
import { PractitionerScheduleComponent } from './auth-pages/practitioner-pages/practitioner-schedule/practitioner-schedule.component';
import { AvailablePatientComponent } from './auth-pages/practitioner-pages/available-patient/available-patient.component';
import { WeekSelectionComponent } from './auth-pages/practitioner-pages/practitioner-schedule/week-selection/week-selection.component';
import { BarChartComponent } from './auth-pages/common-pages/charts/bar-chart/bar-chart.component';
import { EditScheduleComponent } from './auth-pages/practitioner-pages/practitioner-schedule/edit-schedule/edit-schedule.component';

import { AddNewCustomerPaymentComponent } from './auth-pages/customer-pages/add-new-customer-payment/add-new-customer-payment.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BookTimePipe } from './auth-pages/customer-pages/customer-booking/booktimepipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CustomerBookingComponent } from './auth-pages/customer-pages/customer-booking/customer-booking.component';
import { NgbdModalContent } from './auth-pages/customer-pages/customer-booking/ngbdmodalcontent.component';
import { ReportPractitionerComponent } from './auth-pages/practitioner-pages/practitioner-chat/report-practitioner/report-practitioner.component';
import { BlockCustomerComponent } from './auth-pages/customer-pages/block-customer/block-customer.component';
import { SwitchPractitionerComponent } from './auth-pages/practitioner-pages/practitioner-chat/switch-practitioner/switch-practitioner.component';
import { DataService } from './services/DataService';
import { AddPractionerComponent } from './auth-pages/add-practioner-pages/admin-add-practioner-component';
import { PractitionerSessionComponent } from './auth-pages/practioner-dashboard-pages/practitioner-session.component';
import { FollowUpFormComponent } from './auth-pages/practitioner-pages/practitioner-chat/follow-up-form/follow-up-form.component';

@NgModule({
  declarations: [
    AppComponent,
    // Public pages
    PublicHomeComponent,
    PublicAboutusComponent,
    PublicHowitworksComponent,
    PublicContactusComponent,
    PublicFaqComponent,
    PublicNavbarComponent,
    PublicFooterComponent,
    PublicChangePasswordComponent,
    // Authndication pages
    LoginModalComponent,
    SignupModalComponent,
    ForgotPasswordModalComponent,
    AuthHomeComponent,
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthFooterComponent,
    // Admin Pages
    AdminDashboardComponent,
    // Customer Pages
    CustomerDashboardComponent,
    CustomerProfileComponent,
    BasicInfoComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FourthPageComponent,
    FifthPageComponent,
    MySubscriptionComponent,
    CustomerPaymentComponent,
    // Practitioner Pages
    PractitionerDashboardComponent,
    DashboardComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    SessiononlyComponent,
    GeneralDashboardComponent,
    AllInterestsComponent,
    PractitionerChatComponent,
    CustomerSessionComponent,
    CustomerChatComponent,
    NotificationsComponent,
    PractitionerSessionsComponent,
    PractionerSessionComponent,
    AddSessionComponent,
    ConfirmSessionComponent,
    AddExpertiseComponent,
    PaymentInfoComponent,
    BankDetailsComponent,
    WithdrawHistoryComponent,
    ConnectAccountComponent,
    DocumentVerificationComponent,
    PractitionerScheduleComponent,
    ProfilePictureModalComponent,
    DeleteChatComponent,
    AvailablePatientComponent,
    WeekSelectionComponent,
    BarChartComponent,
    EditScheduleComponent,
    CustomerBookingComponent,
    NgbdModalContent,
    BookTimePipe,
    AddNewCustomerPaymentComponent,
    ReportPractitionerComponent,
    BlockCustomerComponent,
    SwitchPractitionerComponent,
    AddPractionerComponent,
    PractitionerSessionComponent,
    FollowUpFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    PerfectScrollbarModule,
    NgxIntlTelInputModule,
    SelectDropDownModule,
    SocialLoginModule,
    PopoverModule.forRoot(),
    PickerModule,
    MomentModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(), 
    TimepickerModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: ScoailLoginConfig.CREDENTIALS
      } as SocialAuthServiceConfig,
    }, AuthGuardService, AuthService, ApiService, ThirdPApiService, GeneralService, Title, ContactUsService,
    PractitionerSessionService, SubscriptionPlansService, DataService, PractitionerScheduleService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
