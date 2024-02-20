import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module'
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module'
  },
  {
    path: 'article',
    loadChildren: './article/article.module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
