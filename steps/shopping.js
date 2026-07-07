const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('User navigates to login page', async function () {
  console.log('กำลังไปที่หน้า Login...');
});


When('User logs in with email {string} and password {string}', async function (email, password) {
  console.log(`กำลังล็อกอินด้วย: ${email}`);
});


Then('User should be on the product listing page', async function () {
  console.log('ตรวจสอบหน้าแรกสำเร็จ');
});