const { test, expect } = require('@playwright/test');


test.describe('Scenario: Login verification', () => {

  test('TC_01 : Open the website https://qa-practice.razvanvancea.ro/auth_ecommerce.html and verify the homepage of the website. ', async ({ page }) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await expect(page).toHaveURL(/.*auth_ecommerce/);
    await expect(page.getByRole('link', { name: 'QA Practice' })).toBeVisible();
  });


  test('TC_02 : Successfully log in when entering the correct username and password.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('admin@admin.com');
    await page.locator('#password').fill('admin123');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#home') .first()).toBeVisible(); 
    await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();
});


  test('TC_03 : Login is unsuccessful when the correct username and wrong password are entered.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('admin@admin.com');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
  });


  test('TC_04 : Login is unsuccessful when a wrong username and the correct password are entered.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('wrong_username');
    await page.locator('#password').fill('admin123');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});


  test('TC_05 : Login is unsuccessful when both username and password are incorrect.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('wrong_username');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});


 test('TC_06 : Login is unsuccessful when the username is empty and the correct password is entered.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    // await page.locator('#email').fill('');
    await page.locator('#password').fill('admin123');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});


  test('TC_07 : Login is unsuccessful when the username is empty and a wrong password is entered.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    // await page.locator('#email').fill('');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});


test('TC_08 : Login is unsuccessful when the correct username is entered and the password is empty.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('admin@admin.com');
    // await page.locator('#password').fill('');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});


test('TC_09 : Login is unsuccessful when a wrong username is entered and the password is empty.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('wrong_username');
    // await page.locator('#password').fill('');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});


test('TC_10 : Login is unsuccessful when username and password fields are empty.' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    // await page.locator('#email').fill('');
    // await page.locator('#password').fill('');
    await page.locator('#submitLoginBtn').click();
    await expect(page.locator('#message') .first()).toContainText('Bad credentials! Please try again!');
});
});


test.describe('Scenario : Add to Card', () => {

test('TC_11 : Add to Card and Total verification' , async ({page}) => {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('admin@admin.com');
    await page.locator('#password').fill('admin123');
    await page.locator('#submitLoginBtn').click();
    await page.locator('div.shop-item:has-text("Dior J\'adore")') .getByRole('button', { name: 'ADD TO CART' }).click();
    await page.locator('div.shop-item:has-text("Gucci Bloom Eau de")') .getByRole('button', { name: 'ADD TO CART' }).click();
    
    await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('input.cart-quantity-input').fill('2');
    await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('input.cart-quantity-input').press('Tab');

    await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('input.cart-quantity-input').fill('3');
    await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('input.cart-quantity-input').press('Tab');
        
        const diorPriceText = await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('.cart-price').innerText(); 
        const diorPrice = parseFloat(diorPriceText.replace('$', '')); 
        const gucciPriceText = await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('.cart-price').innerText();
        const gucciPrice = parseFloat(gucciPriceText.replace('$', ''));

        const diorQtyText = await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('input.cart-quantity-input').inputValue();
        const diorQuantity = parseInt(diorQtyText, 10);
        const gucciQtyText = await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('input.cart-quantity-input').inputValue();
        const gucciQuantity = parseInt(gucciQtyText, 10);

        const calculatedTotal = (diorPrice * diorQuantity) + (gucciPrice * gucciQuantity);
        const formattedTotal = calculatedTotal.toFixed(2); 

        const totalRegex = new RegExp(`Total.*${formattedTotal}`);
        
        const totalPriceLocator = page.locator('.cart-total-price');
        await expect(totalPriceLocator).toHaveText(`$${formattedTotal}`, { timeout: 5000 });
});


test.describe('Scenario : Negative - Missing Required Fields', () => {

  async function goToShippingDetails(page) {
    await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    await page.locator('#email').fill('admin@admin.com');
    await page.locator('#password').fill('admin123');
    await page.locator('#submitLoginBtn').click();
    await page.locator('div.shop-item:has-text("Dior J\'adore")').getByRole('button', { name: 'ADD TO CART' }).click();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  }

  test('TC_12: Cannot submit order with missing Phone number', async ({ page }) => {
    await goToShippingDetails(page);
    await page.locator('input[name="street"]').fill('123 Bangna-Trad');
    await page.locator('input[name="city"]').fill('Bangkok');
    await page.locator('#countries_dropdown_menu').selectOption('Thailand');
    await page.locator('#submitOrderBtn').click();
    await expect(page.locator('#phone')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    await expect(page.getByText(/Congrats! Your order/)).not.toBeVisible();
  });


  test('TC_13: Cannot submit order with missing Street', async ({ page }) => {
    await goToShippingDetails(page);
    await page.locator('#phone').fill('0646128177');
    await page.locator('input[name="city"]').fill('Bangkok');
    await page.locator('#countries_dropdown_menu').selectOption('Thailand');
    await page.locator('#submitOrderBtn').click();
    await expect(page.locator('input[name="street"]')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    await expect(page.getByText(/Congrats! Your order/)).not.toBeVisible();
  });


  test('TC_14: Cannot submit order with missing City', async ({ page }) => {
    await goToShippingDetails(page);
    await page.locator('#phone').fill('0646128177');
    await page.locator('input[name="street"]').fill('123 Bangna-Trad');
    await page.locator('#countries_dropdown_menu').selectOption('Thailand');
    await page.locator('#submitOrderBtn').click();
    await expect(page.locator('input[name="city"]')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    await expect(page.getByText(/Congrats! Your order/)).not.toBeVisible();
  });



  test('TC_15: Cannot submit order with missing Country', async ({ page }) => {
  await goToShippingDetails(page);
  await page.locator('#phone').fill('0646128177');
  await page.locator('input[name="street"]').fill('123 Bangna-Trad');
  await page.locator('input[name="city"]').fill('Bangkok');
  await page.locator('#submitOrderBtn').click();
  await expect(page.locator('#countries_dropdown_menu')).toHaveText(/Select a country/);
});
});



test.describe('Scenario : Displayed when Sumit Order Successfull verification', () => {

  test('TC_16 : validate an address must be displayed correctly by concat between Street, City - Country format.', async ({ page }) => {
    test.setTimeout(60000); // เพิ่มเป็น 60 วินาที
  await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
  await page.locator('#email').fill('admin@admin.com');
  await page.locator('#password').fill('admin123');
  await page.locator('#submitLoginBtn').click();

  await page.locator('div.shop-item:has-text("Dior J\'adore")').getByRole('button', { name: 'ADD TO CART' }).click();
  await page.locator('div.shop-item:has-text("Gucci Bloom Eau de")').getByRole('button', { name: 'ADD TO CART' }).click();

  await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('input.cart-quantity-input').fill('2');
  await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('input.cart-quantity-input').press('Tab');
  await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('input.cart-quantity-input').fill('3');
  await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('input.cart-quantity-input').press('Tab');

  // ดึงราคาจริงจากหน้าเว็บ 
      const diorPriceText = await page.locator('div.cart-row:has-text("Dior J\'adore")').locator('.cart-price').innerText();
      const diorPrice = parseFloat(diorPriceText.replace('$', ''));
      const gucciPriceText = await page.locator('div.cart-row:has-text("Gucci Bloom Eau de")').locator('.cart-price').innerText();
      const gucciPrice = parseFloat(gucciPriceText.replace('$', ''));

      const diorQuantity = 2;
      const gucciQuantity = 3;
      const calculatedTotal = (diorPrice * diorQuantity) + (gucciPrice * gucciQuantity);
      const formattedTotal = calculatedTotal.toFixed(2); 

  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();

  // เก็บค่าที่กรอกไว้เป็นตัวแปร 
      const street = '123 Bangna-Trad';
      const city = 'Bangkok';
      const country = 'Thailand';

  await page.locator('#phone').fill('0646128177');
  await page.locator('input[name="street"]').fill('123 Bangna-Trad');    
  await page.locator('input[name="city"]').fill('Bangkok');    
  await page.locator('#countries_dropdown_menu').selectOption('Thailand'); 
  await page.locator('#submitOrderBtn').click();

      const expectedAddress = `${street}, ${city} - ${country}`; 
  await expect(page.getByText(new RegExp(`Congrats! Your order`))).toBeVisible();
  await expect(page.getByText(new RegExp(`\\$${formattedTotal}`))).toBeVisible();
  await expect(page.getByText(new RegExp(expectedAddress))).toBeVisible();
});
});     
})



 