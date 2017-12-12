
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { ChatLutationComponent } from "./chat-lutation/chat-lutation.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'Chat-Lutation',
        component: ChatLutationComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);