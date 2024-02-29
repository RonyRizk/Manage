import { newE2EPage } from "@stencil/core/testing";
describe('ir-booking-listing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ir-booking-listing></ir-booking-listing>');
    const element = await page.find('ir-booking-listing');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=ir-booking-listing.e2e.js.map
