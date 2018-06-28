import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// importa la aplicación a leída desde el módulo raíz, llamado app
// por convenio.
import { AppModule } from './app/app.module';

// importa el código escrito por el usuario, empezando por la configuración
import { environment } from './environments/environment';

// condiciones para ejecutar en modo producción
if (environment.production) {
  enableProdMode();
}

// arranque de la aplicación invocando al módulo raíz
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
