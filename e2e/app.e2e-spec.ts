import { CnsmoWebPage } from './app.po';

describe('cnsmo-web App', () => {
  let page: CnsmoWebPage;

  beforeEach(() => {
    page = new CnsmoWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
