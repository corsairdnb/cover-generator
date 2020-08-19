/* eslint jest/expect-expect: off, jest/no-test-callback: off */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//import { ClientFunction, Selector } from 'testcafe';
//
//const getPageUrl = ClientFunction(() => window.location.href);
//const getPageTitle = ClientFunction(() => document.title);
//const counterSelector = Selector('[data-tid="counter"]');
//const buttonsSelector = Selector('[data-tclass="btn"]');
//const clickToCounterLink = (t) => t.click(Selector('a').withExactText('to Counter'));
//const incrementButton = buttonsSelector.nth(0);
//const decrementButton = buttonsSelector.nth(1);
//const oddButton = buttonsSelector.nth(2);
//const asyncButton = buttonsSelector.nth(3);
//const getCounterText = () => counterSelector().innerText;
//const assertNoConsoleErrors = async (t) => {
//  const { error } = await t.getBrowserConsoleMessages();
//  await t.expect(error).eql([]);
//};
//
//fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

//it('e2e', async (t) => {
//  await t.expect(getPageTitle()).eql('Hello Electron React!');
//});
//
//it('should open window and contain expected page title', async (t) => {
//  await t.expect(getPageTitle()).eql('Hello Electron React!');
//});
//
//it('should not have any logs in console of main window', assertNoConsoleErrors);
//
//it('should navigate to Counter with click on the "to Counter" link', async (t) => {
//  await t.click('[data-tid=container] > a').expect(getCounterText()).eql('0');
//});
//
//it('should navigate to /counter', async (t) => {
//  await t.click('a').expect(getPageUrl()).contains('/counter');
//});
//
//fixture`Counter Tests`
//  .page('../../app/app.html')
//  .beforeEach(clickToCounterLink)
//  .afterEach(assertNoConsoleErrors);
//
//it('should display updated count after the increment button click', async (t) => {
//  await t.click(incrementButton).expect(getCounterText()).eql('1');
//});
//
//it('should display updated count after the descrement button click', async (t) => {
//  await t.click(decrementButton).expect(getCounterText()).eql('-1');
//});
//
//it('should not change even counter if odd button clicked', async (t) => {
//  await t.click(oddButton).expect(getCounterText()).eql('0');
//});
//
//it('should change odd counter if odd button clicked', async (t) => {
//  await t.click(incrementButton).click(oddButton).expect(getCounterText()).eql('2');
//});
//
//it('should change if async button clicked and a second later', async (t) => {
//  await t.click(asyncButton).expect(getCounterText()).eql('0').expect(getCounterText()).eql('1');
//});
//
//it('should back to home if back button clicked', async (t) => {
//  await t
//    .click('[data-tid="backButton"] > a')
//    .expect(Selector('[data-tid="container"]').visible)
//    .ok();
//});
