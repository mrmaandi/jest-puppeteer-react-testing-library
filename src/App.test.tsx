import React from 'react';
import { render } from '@testing-library/react';
import puppeteer from "puppeteer";
import {Button} from "./components/Button";
import { renderToString } from 'react-dom/server'
const { toMatchImageSnapshot } = require('jest-image-snapshot');


expect.extend({ toMatchImageSnapshot });

describe('Page', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3333');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('renders page', async () => {
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  it('renders my component', async () => {
    await page.setContent(renderToString(<Button />))

    const screenshot = await page.screenshot();

    expect(screenshot).toMatchImageSnapshot();
  });
})


