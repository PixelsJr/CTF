const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--disable-web-security'] });
  const page = await browser.newPage();

  const cookies = [
    {
      name: 'token',
      value: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJhZG1pbiI6ZmFsc2UsImV4cCI6MTc0MDA2NTE3NH0.cAWnyvvAgRIINVXHpqZ7dKRMCztEDXX5MvwbNuwVBlD5iqrGc8Ol7LDEOcf3lFERNVuZG2dO6hDUB1VTdeY1RRp1cmmw1xUhqFGdndi58r_sZ2E3xtLtTolc4eoLS6pb_xiPSOXWRlecfFC_8hca-Rkqqug-f6zZbZPpnu2HWeVoc3Og3qoEnsDZTf9tzIvAlWk7IqOWYU34BXm1ZmWzWqzHuGEgVpk5aBukhLHqMIhdGEBpFAeWf3NxXVFmg81JZtWy5ykDaaY9895gCZNtXPkmgRkxWYNeplOxEmRHjKzaT4o-reVQNvnIQAGwEUeAZbY-d0dwTSPEiIDEsRhWUg',  // CHANGE THIS
      domain: '127.0.0.1',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
    {
      name: 'user_id',
      value: '2',  // CHANGE THIS
      domain: '127.0.0.1',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
    {
      name: 'flag',
      value: 'ASIKARIKAS{STORED_XSS}',
      domain: '127.0.0.1',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
  ];

  await page.setCookie(...cookies);
  await page.goto('http://127.0.0.1:80/', { waitUntil: 'networkidle0' });

  await page.waitForSelector('.offerList span');
  const offerElements = await page.$$('.offerList span');
  for (let offerElement of offerElements) {
    const isShowcaseOpen = await page.$('.Showcase');
    if (isShowcaseOpen) {
        await page.click('.Showcase .close-button');
        await page.waitForSelector('.Showcase', { hidden: true });
    }
    await offerElement.click();
    await page.waitForSelector('.Showcase');

    await page.evaluate(() => {
      const scripts = document.querySelectorAll('.Showcase script');
      scripts.forEach(script => {
        if (script.src) {
          const newScript = document.createElement('script');
          newScript.src = script.src;
          document.body.appendChild(newScript);
        } else {
          try {
            eval(script.innerHTML);
          } catch (error) {
            console.error('Error executing script:', error);
          }
        }
      });
    });

    const htmlContent = await page.$eval('.Showcase', el => el.innerHTML);
    console.log(htmlContent);
  }

  await browser.close();
})();
