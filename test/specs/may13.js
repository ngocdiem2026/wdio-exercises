describe('Web Browser and Web Element', () => {
    it('TC1 - Verify home page title', async () => {
        await browser.maximizeWindow();
        await browser.url('https://the-internet.herokuapp.com');
        const actualTitle = await browser.getTitle();
        await expect(actualTitle).toEqual('The Internet');
    });
    
    it ('TC2 - Login successful', async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        
        const eUsername = await $('#username');
        const ePassword = await $('#password');
        const eLoginBtn = await $('button[type="submit"]');
        const eSuccessMsg = await $('div.flash.success');

        await eUsername.setValue('tomsmith');
        await ePassword.setValue('SuperSecretPassword!');
        await eLoginBtn.click();

        await eSuccessMsg.waitForDisplayed({ timeout: 1000 });
        const actualMsg = await eSuccessMsg.getText();
        await expect(actualMsg).toContain('You logged into a secure area!');
    });

    it ('TC3 - Login unsuccessful', async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        
        const eUsername = await $('#username');
        const ePassword = await $('#password');
        const eLoginBtn = await $('button[type="submit"]');
        const eErrorMsg = await $('div.flash.error');

        await eUsername.setValue('wrong_user');
        await ePassword.setValue('SuperSecretPassword!');
        await eLoginBtn.click();
        
        await eErrorMsg.waitForDisplayed({ timeout: 1000 });
        const ErrorMsg = await eErrorMsg.getText();
        await expect(ErrorMsg).toContain('Your username is invalid!');
    });

    it ('TC4 - Count and Click Checkbox', async () => {
        await browser.url('https://the-internet.herokuapp.com/checkboxes');
        
        const eCheckboxes = await $$('input[type="checkbox"]');
        await expect(eCheckboxes.length).toEqual(2);
        await browser.pause(2000);
        await eCheckboxes[0].click();
        const type = await eCheckboxes[0].getAttribute('type');
        await expect(type).toEqual('checkbox');
    });

    it.only ('TC5 - Select an option in the dropdown', async () => {
        await browser.url('https://the-internet.herokuapp.com/dropdown');
        
        const eDropdown = await $('#dropdown');
        await eDropdown.selectByAttribute('value','2');

        // await browser.pause(2000)
        const eSelectedOption = await $('//option[@selected="selected"]');
        const optionName = await eSelectedOption.getText();
        await expect(optionName).toEqual('Option 2');
    });

    it ('TC6 - Add and remove an element', async () => {
        await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
        
        const eAddElementBtn = await $('//button[text()= "Add Element"]');
        for (let clickCount = 1; clickCount <= 3; clickCount++) {
            await eAddElementBtn.click();
            await browser.pause(1000);
        }
        const eDeleteBtn = await $$('//button[text()="Delete"]');
        await expect(eDeleteBtn.length).toEqual(3);
        await eDeleteBtn[0].click();
        await browser.pause(1000);

        const eDeleteBtnsAfterDelete = await $$("//button[text()='Delete']");
        await expect(eDeleteBtnsAfterDelete.length).toEqual(2);
    });

    it ('TC7 - setValue vs addValue on Input', async () => {
        await browser.url('https://the-internet.herokuapp.com/inputs');
        
        const eInputNumber = await $('input[type="number"]');
        await eInputNumber.setValue('123');
        await eInputNumber.addValue('456');
        const actualValue = await eInputNumber.getValue('value');
        await expect(actualValue).toEqual('123456');
        

    });

    it ('TC8 - Handle JavaScript Alerts with execute', async () => {
        await browser.url('https://the-internet.herokuapp.com/javascript_alerts');
        
        await browser.execute(() => {
            window.alert = () => true
        });
        const eJSAlertBtn = await $('button[onclick="jsAlert()"]');
        await eJSAlertBtn.click();

        const eResult = await $('#result');
        await eResult.waitForDisplayed({ timeout: 2000 });

        const resultMsg = await eResult.getText();
        await expect(resultMsg).toEqual('You successfully clicked an alert');
    });

    it ('TC9 - Check redirect using execute', async () => {
        await browser.url('https://the-internet.herokuapp.com/redirector');
        
        const eRedirectLink = await $('#redirect');
        await eRedirectLink.click();
    
        await browser.pause(2000);

        const currentUrl = await browser.execute(() => window.location.href);
        await expect(currentUrl).toContain('/status_codes');
    });

    it ('TC10 - Check the data in the table', async () => {
        await browser.url('https://the-internet.herokuapp.com/tables');
        
        const firstHeader = await $('//span[text()="Last Name"]').getText();
        const firstCell = await $('tbody tr:first-child').getText();
        const editLink = await $('//a[text()="edit"]').getAttribute('href');
        await expect(editLink).toContain('edit');
    });
})
