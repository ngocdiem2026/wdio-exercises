async function selectCustomDdlOption( containerSelector, optionText ){
    const eContainer = await $(containerSelector);
    await eContainer.click();

    const eOptions = await $$('//div[@role="option"]');
    await eOptions[0].waitForDisplayed({ timeout: 2000});

    for (const opt of eOptions ){
        const text = await opt.getText();
        if (text.trim() === optionText){
            await opt.click();
            return;
        }
    }
    throw new Error(`Option "${optionText}" was not found.`);
};

async function getSelectedOption(containerSelector) {
    const eContainer = await $(containerSelector);
    const eSelectedOpt = await eContainer.$('div[class*="singleValue"]');

    return (await eSelectedOpt.getText()).trim();
}

describe ('Chapter 6 - Custom dropdown list', () => {
    before(async () => {
        await browser.maximizeWindow();
        await browser.url('https://demoqa.com/select-menu');
    });

    it('TC01 - Select "A root option" in dropdown 1', async() =>{
        const ddl1Selector = await $('#withOptGroup');
        await selectCustomDdlOption(ddl1Selector, "A root option");
       
        const actualOpt = await getSelectedOption(ddl1Selector);
        console.log('SELECTED OPTION:',actualOpt);
        
        await expect(actualOpt).toEqual('A root option');
    });

    it('TC02 - Select “Others” in dropdown 2', async() => {
        const ddl2Selector = await $('#selectOne');
        await selectCustomDdlOption(ddl2Selector, "Other");
       
        const actualOpt = await getSelectedOption(ddl2Selector);
        console.log('SELECTED OPTION:',actualOpt);
        
        await expect(actualOpt).toEqual('Other');
    });

    it ('TC03 - Select "Aqua" in dropdown 3', async() => {
        const ddl3Selector = await $('#oldSelectMenu');
        ddl3Selector.click();

        const selectedOpt = await $('option[value="10"]');
        const actualOpt = await selectedOpt.getText();

        console.log('SELECTED OPTION:',actualOpt);
        await expect(actualOpt).toEqual('Aqua');
    });
});