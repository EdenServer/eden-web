import puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

describe('App', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('opens the webpage and renders root React component', async () => {
    await page.goto('http://localhost:8081');

    const mainElement = await page.$('.gm_main');
    expect(mainElement).not.toBeNull();
  });

  afterAll(async () => {
    await browser.close();
  });
});
