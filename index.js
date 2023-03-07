const HCCrawler = require('headless-chrome-crawler');

(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: (() => ({
      title: $('title').text(),
    })),
    onSuccess: (result => {
      console.log(result);
    }),
    preRequest: options => {
      options.screenshot = { path: `./pics/${options.saveAs}` };
      return true;
    },
  });
  // Queue a request
  await crawler.queue({ url: 'https://www.kagoshima-u.ac.jp/', saveAs: 'kagoshima-u.ac.jp.png' });
  await crawler.queue({ url: 'https://www.f-lab.mydns.jp/', saveAs: 'f-lab.mydns.png' });
  await crawler.onIdle();
  await crawler.close();
})();