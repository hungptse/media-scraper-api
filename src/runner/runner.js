const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");
const { Media } = require("../models/media");
const { argv } = require("process");

const sourceUrl = argv[2];
const screen = {
  width: 640,
  height: 480,
};
console.log("Scrappering: ", sourceUrl);
let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(
    new chrome.Options()
      .addArguments(
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--remote-debugging-port=9222",
        "--disable-dev-shm-using",
        "--disable-extensions",
        "--remote-debugging-pipe",
      )
      .windowSize(screen),
  )
  .build();
const start = async () => {
  await driver.get(sourceUrl);
  setTimeout(async () => {
    const images = await scrapByXPath("//img");
    const videos = await scrapByXPath("//video");
    console.log(images);
    console.log(videos);
    await Media.bulkCreate(
      [
        ...images.map((url) => ({ type: "image", url, sourceUrl })),
        ...videos.map((url) => ({ type: "video", url, sourceUrl })),
      ],
      { ignoreDuplicates: false },
    );
  }, 10000);
};

const scrapByXPath = async (xpath) => {
  var urls = [];
  let elements = await driver.findElements(By.xpath(xpath));
  for (const element of elements) {
    var url = await element.getAttribute("src");
    console.log(url);
    if (cleanUrl(url)) {
      urls.push(cleanUrl(url));
    }
  }
  return urls;
};

const cleanUrl = (url) => {
  if (url && url.indexOf("?") != -1) {
    return url.substring(0, url.indexOf("?"));
  }
  return url;
};

start();
