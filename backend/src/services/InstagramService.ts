import { injectable } from "inversify";

import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

@injectable()
export class InstagramService {
    public async findHashtagImage(hashtag: string): Promise<string | null> {
        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`, { waitUntil: 'networkidle0' });
            const html = await page.content();
            browser.close();
            const $ = cheerio.load(html);
            const img = $('article').find('img').get(0).attribs.src
            return img;
        } catch {
            return null
        }
    }
}