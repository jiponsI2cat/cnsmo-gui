import { SbAdminCliUpdatePage } from './app.po';

describe('cnsmo_web App', () => {
  let page: SbAdminCliUpdatePage;

  beforeEach(() => {
    page = new SbAdminCliUpdatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
