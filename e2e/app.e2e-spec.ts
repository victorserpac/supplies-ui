import { SuppliesUiPage } from './app.po';

describe('supplies-ui App', function() {
  let page: SuppliesUiPage;

  beforeEach(() => {
    page = new SuppliesUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
