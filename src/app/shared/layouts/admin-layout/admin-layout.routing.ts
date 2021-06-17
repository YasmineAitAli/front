import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { AccountSummaryComponent } from "src/app/components/account-summary/account-summary.component";
import { VirementsTabComponent } from "src/app/components/virements-tab/virements-tab.component";
import { VirementMultipleComponent } from "src/app/components/virement-multiple/virement-multiple.component";
import { AppointmentComponent } from "src/app/components/appointment/appointment.component";
import { VirementMultipleTableComponent } from "src/app/components/virement-multiple-table/virement-multiple-table.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'overview', component: AccountSummaryComponent},
  { path: 'compte/:id/virements', component: VirementsTabComponent},
  { path: 'vm', component: VirementMultipleComponent},
  { path: 'vmTable', component: VirementMultipleTableComponent},
  { path: 'appointment', component: AppointmentComponent},
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
