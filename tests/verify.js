const fs = require('fs');
const cheerio = require('cheerio');

const FILE_PATH = '../amazon_teapots.html';
const TARGET_PRODUCT = 'ParaCity Glass Teapot';

const html = fs.readFileSync(FILE_PATH, 'utf-8');
const $ = cheerio.load(html);

let found = false;

$("div[data-component-type='s-search-result']").each((_, element) => {
  const title = $(element).find('h2 span').text().trim();
  const priceWhole = $(element).find('.a-price-whole').first().text();
  const priceFraction = $(element).find('.a-price-fraction').first().text();

  if (title.toLowerCase().includes(TARGET_PRODUCT.toLowerCase())) {
    const price = priceWhole && priceFraction
      ? `${priceWhole}${priceFraction}`
      : 'Price not found';

    console.log('Product Found:', title);
    console.log('Price:', price);
    found = true;
    return false; // break loop
  }
});

if (!found) {
  console.log('Product NOT found.');
}
