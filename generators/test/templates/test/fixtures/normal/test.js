"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1({ page, host }) {
    await page.goto(`${host}/`, {
        waitUntil: 'networkidle2',
    });
    const text = await page.evaluate(() => document.querySelector('h1').innerHTML);
    expect(text).toEqual('hello umi plugin');
}
exports.default = default_1;
;
