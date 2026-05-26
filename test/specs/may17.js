import { Key } from 'webdriverio';
describe ('Chapter 4 - TEXTBOX & TEXTAREA', () => {
    before(async () => {
        await browser.maximizeWindow();
        await browser.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        const eUsername = await $('input[name="username"]');
        const ePassword = await $('input[name="password"]');
        const eLoginBtn = await $('button[type="submit"]');

        await eUsername.setValue('Admin');
        await ePassword.setValue('admin123');
        await eLoginBtn.click();

        await browser.url('https://opensource-demo.orangehrmlive.com/web/index.php/leave/assignLeave');
    });

    async function clearInput(element) {
        await element.click();
        await browser.keys([Key.Ctrl, 'a']);
        await browser.keys('Delete');
    }
    
    it ('TC01 - setValue() ghi đè nội dung cũ', async () => {
        const eEmployeeName = await $('div.oxd-autocomplete-text-input>input');
        let employeeName = await eEmployeeName.setValue('Diem Nguyen');
        
        await clearInput(eEmployeeName);
        
        employeeName = await eEmployeeName.setValue('John Smith');
        const actualName = await eEmployeeName.getValue();

        await expect(actualName).toEqual('John Smith');
    });

    it ('TC02 - addValue() nối thêm vào cuối', async() => {
        //Textbox
        const eEmployeeName = await $('div.oxd-autocomplete-text-input>input');
        let employeeName = await eEmployeeName.addValue('This is ');
        employeeName = await eEmployeeName.addValue('a sentence.');
        
        const actualName = await eEmployeeName.getValue();
        await expect(actualName).toEqual('This is a sentence.');

        //TextArea
        const eComments = await $('textarea.oxd-textarea');
        let comment = await eComments.addValue('This is a comment 1 ');
        comment = await eComments.addValue('and This is a comment 2.');
        
        const actualComment = await eComments.getValue();
        await expect(actualComment).toEqual('This is a comment 1 and This is a comment 2.');

    });

    it ('TC03 - \n trong textarea tạo dòng mới thật sự', async () => {
         //Textbox
        const eEmployeeName = await $('div.oxd-autocomplete-text-input>input');
        const employeeName = await eEmployeeName.addValue('Dòng 1\nDòng 2\nDòng 3');

        const actualName = await eEmployeeName.getValue();
        const lineCountTB = actualName.split('\n').length;

        await expect(actualName).toEqual('Dòng 1Dòng 2Dòng 3');
        await expect(lineCountTB).toEqual(1);

        //TextArea
        const eComments = await $('textarea.oxd-textarea');
        const comment = await eComments.addValue('Dòng 1\nDòng 2\nDòng 3');
        
        const actualComment = await eComments.getValue();
        const lineCountTA = actualComment.split('\n').length;
       
        await expect(actualComment).toEqual('Dòng 1\nDòng 2\nDòng 3');
        await expect(lineCountTA).toEqual(3);
    });

    it ('TC04 - clearValue() xóa sạch nội dung', async () => {
         //Textbox
        const eEmployeeName = await $('div.oxd-autocomplete-text-input>input');
        await eEmployeeName.setValue('Test clearValue');
        await eEmployeeName.clearValue();

        let actualName = await eEmployeeName.getValue();

        if(actualName != ''){
            await clearInput(eEmployeeName);
            actualName = await eEmployeeName.getValue();   
        }
        await expect(actualName).toEqual('');

        //TextArea
        const eComments = await $('textarea.oxd-textarea');
        await eComments.setValue('Deleting the content when using clearValue');
        await eComments.clearValue();

        let actualComment = await eComments.getValue();

        if(actualComment != ''){
            await clearInput(eComments);
            actualComment = await eComments.getValue();  
        }
        await expect(actualComment).toEqual('');
    });

    it ('TC05 - So sánh trực tiếp input vs textarea', async () => {
        //Textbox
        const eEmployeeName = await $('div.oxd-autocomplete-text-input>input');
        let employeeName = await eEmployeeName.setValue('Diem Nguyen');
        
        await clearInput(eEmployeeName);
        
        employeeName = await eEmployeeName.setValue('John Smith');
        const actualName = await eEmployeeName.getValue();

        await expect(actualName).toEqual('John Smith');

        //TextArea
        const eComments = await $('textarea.oxd-textarea');
        let comment = await eComments.setValue('This is a comment 1.');
        
        await clearInput(eComments);
        
        comment = await eComments.setValue('This is a comment 2.');
        const actualComment = await eComments.getValue();

        await expect(actualComment).toEqual('This is a comment 2.');
    });
});

describe ('Chapter 5 - DROPDOWN', () => {
    before(async () => {
        await browser.maximizeWindow();
        await browser.url('https://the-internet.herokuapp.com/dropdown');
    });

    it (' TC01 - Kiểm tra trạng thái mặc định', async () => {
        const eSelectedOption = await $('#dropdown option:checked');
        const defaultValue = await eSelectedOption.getText();
        await expect(defaultValue).toEqual('Please select an option');
    })

    it ('TC02 - selectByVisibleText — chọn Option 1', async () => {
        const eDropdown = await $('#dropdown');
        const selectedOption = await eDropdown.selectByVisibleText('Option 1');

        const eSelectedOpt = await $('#dropdown option:checked')

        const option1 = await eSelectedOpt.getText();
        await expect(option1).toEqual('Option 1');
    });

    it ('TC03 - selectByVisibleText — chọn Option 2', async () => {
        const eDropdown = await $('#dropdown');
        const selectedOption = await eDropdown.selectByVisibleText('Option 2');

        const eSelectedOpt = await $('#dropdown option:checked')

        const option2 = await eSelectedOpt.getText();
        await expect(option2).toEqual('Option 2');
    });

    it ('TC04 - selectByIndex — chọn Option 1', async () => {
        const eDropdown = await $('#dropdown');
        const selectedOption = await eDropdown.selectByIndex(1);

        const eSelectedOpt = await $('#dropdown option:checked')

        const option1 = await eSelectedOpt.getText();
        await expect(option1).toEqual('Option 1');
    });

    it ('TC05 - selectByIndex — chọn Option 2', async () => {
        const eDropdown = await $('#dropdown');
        const selectedOption = await eDropdown.selectByIndex(2);

        const eSelectedOpt = await $('#dropdown option:checked')

        const option2 = await eSelectedOpt.getText();
        await expect(option2).toEqual('Option 2');
    });

    it ('TC06 - selectByAttribute — chọn Option 1', async () => {
        const eDropdown = await $('#dropdown');
        const selectedOption = await eDropdown.selectByAttribute('value','1');

        const eSelectedOpt = await $('#dropdown option:checked')

        const option1 = await eSelectedOpt.getText();
        await expect(option1).toEqual('Option 1');
    });


    it ('TC07 - selectByAttribute — chọn Option 2', async () => {
        const eDropdown = await $('#dropdown');
        const selectedOption = await eDropdown.selectByAttribute('value','2');

        const eSelectedOpt = await $('#dropdown option:checked')

        const option2 = await eSelectedOpt.getText();
        await expect(option2).toEqual('Option 2');
    });

    it ('TC08 - So sánh 3 methods — cùng kết quả', async () => {
        const eDropdown = await $('#dropdown');

        await eDropdown.selectByVisibleText('Option 2');
        const opt2FromText = await $('#dropdown option:checked').getText();

        await eDropdown.selectByIndex(2);
        const opt2FromIndex = await $('#dropdown option:checked').getText();

        await eDropdown.selectByAttribute('value','2');
        const opt2FromAttribute = await $('#dropdown option:checked').getText();

        await expect(opt2FromText).toEqual('Option 2');
        await expect(opt2FromIndex).toEqual('Option 2');
        await expect(opt2FromAttribute).toEqual('Option 2');

        await expect(opt2FromIndex).toEqual(opt2FromIndex);
        await expect(opt2FromText).toEqual(opt2FromAttribute);
    });

    it ('TC09 - Đếm số lượng option bằng $$', async () => {
        const eDropdown = await $$('#dropdown option');

        await expect (eDropdown.length).toEqual(3);
    });

    it ('TC10 - Chuyển đổi qua lại Option 1 ↔ Option 2', async () => {
        const eDropdown = await $('#dropdown');
        
        await eDropdown.selectByVisibleText('Option 1');
        let selectedOpt = await eDropdown.getValue(); 
        await expect(selectedOpt).toEqual('1');

        await eDropdown.selectByIndex(2);
        selectedOpt = await eDropdown.getValue();
        await expect (selectedOpt).toEqual('2');

        await eDropdown.selectByAttribute('value', 1);
        selectedOpt= await eDropdown.getValue();
        await expect(selectedOpt).toEqual('1');

    });
});