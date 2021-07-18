import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicAboutusComponent } from './public-pages/about-us/about-us.component';
import { PublicContactusComponent } from './public-pages/contact-us/contact-us.component';
import { PublicFaqComponent } from './public-pages/faq/faq.component';
import { PublicHomeComponent } from './public-pages/home/home.component';
import { PublicHowitworksComponent } from './public-pages/howitworks/howitworks.component';
import { PublicChangePasswordComponent } from './public-pages/change-password/change-password.component';

import { AuthGuardService as AuthGuard } from "./services/AuthGuardService";
import { AuthHomeComponent } from './auth-layouts/home/auth-home.component';
import { ChangePasswordComponent } from './auth-pages/common-pages/change-password/change-password.component';
import { DashboardComponent } from './auth-pages/dashboard/dashboard.component';
import { EditProfileComponent } from './auth-pages/common-pages/edit-profile/edit-profile.component';
import { SessiononlyComponent } from './auth-pages/common-pages/sessiononly/sessiononly.component';
import { GeneralDashboardComponent } from './auth-pages/common-pages/general-dashboard/general-dashboard.component';
import { AllInterestsComponent } from './auth-pages/common-pages/all-interests/all-interests.component';
import { AdminDashboardComponent } from './auth-pages/admin-pages/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './auth-pages/customer-pages/customer-dashboard/customer-dashboard.component';
import { PractitionerDashboardComponent } from './auth-pages/practitioner-pages/practitioner-dashboard/practitioner-dashboard.component';
import { PractitionerChatComponent } from './auth-pages/practitioner-pages/practitioner-chat/practitioner-chat.component';
import { CustomerChatComponent } from './auth-pages/customer-pages/customer-chat/customer-chat.component';
import { CustomerSessionComponent } from './auth-pages/customer-pages/customer-session/customer-session.component';
import { NotificationsComponent } from './auth-pages/practitioner-pages/notifications/notifications.component';
import { BasicInfoComponent } from './auth-pages/customer-pages/basic-info/basic-info.component';
import { AddExpertiseComponent } from './auth-pages/add-expertise/add-expertise.component';

import { MySubscriptionComponent } from './auth-pages/customer-pages/my-subscription/my-subscription.component';
import { CustomerPaymentComponent } from './auth-pages/customer-pages/customer-payment/customer-payment-component';

import { PractitionerSessionsComponent } from './auth-pages/practitioner-pages/practitioner-sessions/practitioner-sessions.component';
import { PractitionerScheduleComponent } from './auth-pages/practitioner-pages/practitioner-schedule/practitioner-schedule.component';
import { EditScheduleComponent } from './auth-pages/practitioner-pages/practitioner-schedule/edit-schedule/edit-schedule.component';

import {  AddPractionerComponent} from './auth-pages/add-practioner-pages/admin-add-practioner-component';
import { PractitionerSessionComponent } from './auth-pages/practioner-dashboard-pages/practitioner-session.component';

import { PaymentInfoComponent } from './auth-pages/payment-info/payment-info.component';
import { BankDetailsComponent } from './auth-pages/payment-info/bank-details/bank-details.component';
import { WithdrawHistoryComponent } from './auth-pages/payment-info/withdraw-history/withdraw-history.component';
import { ConnectAccountComponent } from './auth-pages/payment-info/connect-account/connect-account.component';
import { DocumentVerificationComponent } from './auth-pages/payment-info/document-verification/document-verification.component';
import { CustomerProfileComponent } from './auth-pages/customer-pages/customer-profile/customer-profile.component';
import { CustomerBookingComponent } from './auth-pages/customer-pages/customer-booking/customer-booking.component';


let userData = JSON.parse(localStorage.getItem("user_data"));
let isGroup = userData?.groups[0];
let userRoute;
switch (isGroup) {
  case "Admin":
    userRoute = "welcome-admin";
    break;
  case "Customer":
    userRoute = "welcome-customer";
    break;
  case "Practitioner":
    userRoute = "welcome-practitioner";
    break;
  default:
    userRoute = "";
}

const routes: Routes = [
  {
    path: '',
    component: AuthHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: userRoute, pathMatch: 'full' },
      { path: 'password-change', component: ChangePasswordComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'add-expertise', component: AddExpertiseComponent },
      { path: 'welcome-admin', component: AdminDashboardComponent },
      { path: 'welcome-customer', component: CustomerDashboardComponent },
      { path: 'customer-basic-info', component: BasicInfoComponent },
      { path: 'customer-profile', component: CustomerProfileComponent },
      { path: 'welcome-practitioner', component: DashboardComponent },
      { path: 'practitionersessions', component: PractitionerSessionComponent },
      { path: 'addpractitioner', component: AddPractionerComponent },
      { path: 'mysubscription', component: MySubscriptionComponent},
      { path: 'customerpayment', component: CustomerPaymentComponent },
      { path: 'cutomer/notifications', component: NotificationsComponent, data: { title: "Manage Notifications"} },

      { path: 'practitioner/schedule', component: PractitionerScheduleComponent, data: { title: "My Shedule"} },
      { path: 'practitioner/sessions', component: PractitionerSessionsComponent, data: { title: "My Sessions"} },
      { path: 'payment-info', component: PaymentInfoComponent, data: { title: "Payment Info"} },
      { path: 'bank-details', component: BankDetailsComponent, data: { title: "Bank Account"} },
      { path: 'withdraw-history', component: WithdrawHistoryComponent, data: { title: "Withdraw History"} },
      { path: 'connect-account', component: ConnectAccountComponent, data: { title: "Connect Account"} },
      { path: 'document-verification', component: DocumentVerificationComponent, data: { title: "Document Verification"} },
      { path: 'practitioner/notifications', component: NotificationsComponent, data: { title: "Manage Notifications"} },
      { path: 'practitioner/edit-schedule', component: EditScheduleComponent, data: { title: "My Shedule" } },

      { path: 'sessiononly', component: SessiononlyComponent },
      { path: 'customer/general-dashboard', component: GeneralDashboardComponent },
      { path: 'customer/all-interests', component: AllInterestsComponent },
      { path: 'chat', component: CustomerChatComponent },
      { path: 'customer/session', component: CustomerSessionComponent },
      { path: 'practitioner/chat', component: PractitionerChatComponent },
      { path: 'practitioner/session', component: PractitionerSessionComponent },
      { path: 'customer-booking', component: CustomerBookingComponent },
      
    ]
  },
  { path: 'homepage/home', component: PublicHomeComponent },
  { path: 'homepage/about-us', component: PublicAboutusComponent },
  { path: 'homepage/howitworks', component: PublicHowitworksComponent },
  { path: 'homepage/contact-us', component: PublicContactusComponent },
  { path: 'homepage/faq', component: PublicFaqComponent },
  { path: 'reset-password', component: PublicChangePasswordComponent },

  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
