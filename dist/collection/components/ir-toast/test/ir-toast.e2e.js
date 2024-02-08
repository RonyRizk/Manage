import { newE2EPage } from "@stencil/core/testing";
describe('ir-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ir-toast></ir-toast>');
    const element = await page.find('ir-toast');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=ir-toast.e2e.js.map
