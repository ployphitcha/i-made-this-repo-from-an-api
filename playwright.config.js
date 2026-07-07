const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.features-gen', // บังคับให้วิ่งไปหาโฟลเดอร์ที่เราจะสร้างเอง
  reporter: 'html',
  use: {
    screenshot: 'on',
    video: 'on',
    headless: true,
    launchOptions: {
      slowMo: 2000, 
    },
  },
});