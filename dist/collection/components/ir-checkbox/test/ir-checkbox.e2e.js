import { newE2EPage } from "@stencil/core/testing";
describe('ir-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ir-checkbox></ir-checkbox>');
    const element = await page.find('ir-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=ir-checkbox.e2e.js.map
