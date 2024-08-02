import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Para la configuración de rutas
import { AppComponent } from './app.component';
import { routes } from './app.routes';  // Importa las rutas

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    provideHttpClient() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
