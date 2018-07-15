import { NombreModule } from './nombre.module';

describe('NombreModule', () => {
  let nombreModule: NombreModule;

  beforeEach(() => {
    nombreModule = new NombreModule();
  });

  it('should create an instance', () => {
    expect(nombreModule).toBeTruthy();
  });
});
