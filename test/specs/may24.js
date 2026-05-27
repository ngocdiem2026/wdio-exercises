//cSpell: disable
describe.only ('Chapter 7 - Button', () => {
    before(async() => {
        await browser.maximizeWindow();
        await browser.url('https://demoqa.com/buttons');
    });
    /**TC_BTN_01 — Single click thành công Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Tìm button có id #clickBtn
        Click vào button
        Verify text You have done a dynamic click xuất hiện tại #dynamicClickMessage
     */
    it ('TC01 — Single click successful', async () => {
        const eButton = await $('//button[text() = "Click Me"]');
        await eButton.click();
        const msg = await $('#dynamicClickMessage').getText();
        await expect(msg).toEqual('You have done a dynamic click');
    });

    /**TC_BTN_02 — Double click thành công Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Tìm button có id #doubleClickBtn
        Double click vào button
        Verify text You have done a double click xuất hiện tại #doubleClickMessage
     */
    it ('TC02 — Double click successful', async () => {
        const eButton = await $('#doubleClickBtn');
        await eButton.doubleClick();
        const msg = await $('#doubleClickMessage').getText();
        await expect(msg).toEqual('You have done a double click');
    });

    /**TC_BTN_03 — Right click thành công Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Tìm button có id #rightClickBtn
        Right click vào button
        Verify text You have done a right click xuất hiện tại #rightClickMessage
    */
   it ('TC03 — Right click successful', async () => {
        const eButton = await $('#rightClickBtn');
        await eButton.click({ button: 'right' });
        const msg = await $('#rightClickMessage').getText();
        await expect(msg).toEqual('You have done a right click');
    });

    /**TC_BTN_04 — Verify button hiển thị và enabled trước khi click Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Tìm lần lượt 3 button: #doubleClickBtn, #rightClickBtn, #clickBtn
        Verify từng button isDisplayed() trả về true
        Verify từng button isEnabled() trả về true
    */
   it.only ('TC04 — Verify the button is displayed and enabled before clicking.', async () => {
        const eSingleBtn = await $('//button[text() = "Click Me"]');    
        const eDoubleBtn = await $('#doubleClickBtn');
        const eRightBtn = await $('#rightClickBtn');

        const isSingleBtnDisplayed = await eSingleBtn.isDisplayed();
        const isDoubleBtnDisplayed = await eDoubleBtn.isDisplayed();
        const isRightBtnDisplayed = await eRightBtn.isDisplayed();

        const isSingleBtnEnabled = await eSingleBtn.isEnabled();
        const isDoubleBtnEnabled = await eDoubleBtn.isEnabled();
        const isRightBtnEnabled = await eRightBtn.isEnabled();
        
        await expect(isSingleBtnDisplayed).toBe(true);
        await expect(isDoubleBtnDisplayed).toBe(true);
        await expect(isRightBtnDisplayed).toBe(true);

        await expect(isSingleBtnEnabled).toBe(true);
        await expect(isDoubleBtnEnabled).toBe(true);
        await expect(isRightBtnEnabled).toBe(true);

    });

    /**TC_BTN_05 — Verify chỉ đúng message tương ứng xuất hiện sau mỗi loại click Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Single click vào #clickBtn
        Verify #dynamicClickMessage hiển thị, #doubleClickMessage và #rightClickMessage không hiển thị
        Reload trang
        Double click vào #doubleClickBtn
        Verify #doubleClickMessage hiển thị, hai message còn lại không hiển thị
        Reload trang
        Right click vào #rightClickBtn
        Verify #rightClickMessage hiển thị, hai message còn lại không hiển thị 
    */
   it ('TC05 - Verify that the correct message is displayed after each type of click.', async () => {
        const eSingleBtn = await $('//button[text() = "Click Me"]');  
        await eSingleBtn.click(); 

        let isSingleMsgDisplayed = await $('#dynamicClickMessage').isDisplayed();
        let isDoubleMsgDisplayed = await $('#doubleClickMessage').isDisplayed();
        let isRightMsgDisplayed = await $('#rightClickMessage').isDisplayed();
        
        await expect(isSingleMsgDisplayed).toBe(true);
        await expect(isDoubleMsgDisplayed).toBe(false);
        await expect(isRightMsgDisplayed).toBe(false);

        await browser.refresh();
        
        const eDoubleBtn = await $('#doubleClickBtn');  
        await eDoubleBtn.doubleClick();

        isSingleMsgDisplayed = await $('#dynamicClickMessage').isDisplayed();
        isDoubleMsgDisplayed = await $('#doubleClickMessage').isDisplayed();
        isRightMsgDisplayed = await $('#rightClickMessage').isDisplayed();

        await expect(isSingleMsgDisplayed).toBe(false);
        await expect(isDoubleMsgDisplayed).toBe(true);
        await expect(isRightMsgDisplayed).toBe(false);

        await browser.refresh();
        
        const eRightBtn = await $('#rightClickBtn');  
        await eRightBtn.click({button: 'right'});

        isSingleMsgDisplayed = await $('#dynamicClickMessage').isDisplayed();
        isDoubleMsgDisplayed = await $('#doubleClickMessage').isDisplayed();
        isRightMsgDisplayed = await $('#rightClickMessage').isDisplayed();

        await expect(isSingleMsgDisplayed).toBe(false);
        await expect(isDoubleMsgDisplayed).toBe(false);
        await expect(isRightMsgDisplayed).toBe(true);
   });

   /** TC_BTN_06 — Verify getText() của button trả về đúng label Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Lấy text của #doubleClickBtn bằng getText()
        Verify text bằng Double Click Me
        Lấy text của #rightClickBtn
        Verify text bằng Right Click Me
    */
   it ('TC06 - Verify that getText() returns the correct button label.', async () => {
        const eDoubleBtn = await $('#doubleClickBtn');  
        await expect(await eDoubleBtn.getText()).toEqual('Double Click Me');
        
        const eRightBtn = await $('#rightClickBtn');  
        await expect(await eRightBtn.getText()).toEqual('Right Click Me');
   });

    /** TC_BTN_07 — Verify scrollIntoView trước khi click button nằm cuối trang Trang: https://demoqa.com/buttons
        Mở trình duyệt, điều hướng đến trang
        Tìm button #clickBtn (nằm cuối danh sách)
        Gọi scrollIntoView() để đưa button vào viewport
        Click vào button
        Verify #dynamicClickMessage hiển thị đúng text
    */
   it ('TC07 - Verify scrollIntoView() is executed before clicking the button at the bottom of the page.', async () => {
        const eButton = await $('//button[text() = "Click Me"]');
        await eButton.scrollIntoView();
        await eButton.click();
        const msg = await $('#dynamicClickMessage').getText();
        await expect(msg).toEqual('You have done a dynamic click');
   });
});

describe ('Chapter 7 - Radio Button', () => {
    before(async() => {
        await browser.maximizeWindow();
        await browser.url('https://practice.expandtesting.com/radio-buttons');
    });
    /**TC_RAD_01 — Chọn một radio button và verify isSelected Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Tìm radio button có value="blue" trong nhóm màu sắc
        Click vào radio button
        Verify isSelected() trả về true 
    */
    it ('TC01 - Select a radio button and verify it is selected', async() => {
        const eRadioBlue = await $('input[value="blue"]');
        await eRadioBlue.click()
        const isSelected = await eRadioBlue.isSelected();
        await expect(isSelected).toBe(true);
    });

    /**TC_RAD_02 — Verify trạng thái mặc định của tất cả radio button Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Lấy tất cả radio button trong nhóm màu bằng $$('input[name="color"]')
        Verify từng radio có isSelected() trả về false (chưa có gì được chọn mặc định)
    */
    it ('TC02 - Verify the default state of all radio buttons.', async() => {
        const allRadios = await $$('input[name="color"]');
        for (const radio of allRadios){
            const isSelected = await radio.isSelected();
            if(!isSelected){
                await expect(isSelected).toBe(false);
            }
        }
    });

    /**TC_RAD_03 — Mutual exclusion: chọn radio khác thì radio cũ bị bỏ chọn Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Click vào radio value="blue"
        Verify input[value="blue"] → isSelected() = true
        Click vào radio value="red"
        Verify input[value="red"] → isSelected() = true
        Verify input[value="blue"] → isSelected() = false (đã bị bỏ chọn)* 
    */
    it ('TC03 - Mutual exclusion: Verify radio button selection behavior.', async() => {
        const radioBlue = await $('input[value="blue"]');
        await radioBlue.click();
        await expect(await radioBlue.isSelected()).toBe(true);

        const radioRed = await $('input[value="red"]');
        await radioRed.click();
        await expect(await radioRed.isSelected()).toBe(true);
        await expect(await radioBlue.isSelected()).toBe(false);
    });

    /**TC_RAD_04 — Đếm số lượng radio button trong một nhóm Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Lấy tất cả radio button nhóm màu bằng $$('input[name="color"]')
        Verify length của mảng bằng 5
        Lấy tất cả radio button nhóm thể thao bằng $$('input[name="sport"]')
        Verify length của mảng theo số lượng thực tế trên trang
    */
    it ('TC04 - Verify the number of radio buttons in a group.', async() => {
        const colorRadios = await $$('input[name="color"]');
        await expect(colorRadios.length).toEqual(5);

        const sportRadios = await $$('input[name="sport"]');
        await expect(sportRadios.length).toEqual(3);
    });

    /**TC_RAD_05 — Verify hai nhóm radio hoạt động độc lập nhau Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Click radio value="blue" trong nhóm màu
        Click radio trong nhóm thể thao (ví dụ value="cricket")
        Verify radio màu blue vẫn isSelected() = true (không bị ảnh hưởng)
        Verify radio thể thao đã chọn isSelected() = true 
    */
    it ('TC05 - Verify that two radio groups work independently.', async() => {
        const radioBlue = await $('input[value="blue"]');
        await radioBlue.click();

        const radioFootball = await $('input[value="football"]');
        await radioFootball.click();

        await expect(await radioBlue.isSelected()).toBe(true);
        await expect(await radioFootball.isSelected()).toBe(true);
    });

    /**TC_RAD_06 — Verify getAttribute trả về đúng value của radio đang chọn Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Click radio value="green" trong nhóm màu
        Lấy element radio đang checked bằng selector input[name="color"]:checked
        Gọi getAttribute('value') trên element đó
        Verify giá trị trả về bằng "green" 
    */
    it ('TC06 - Verify that getAttribute() returns the correct value of the selected radio button.', async() => {
        const radioYellow = await $('input[value="yellow"]');
        await radioYellow.click();

        const selectedRadio = await $('input[name="color"]:checked');
        const valueRadio = await selectedRadio.getAttribute('value');

        await expect(valueRadio).toEqual("yellow");
    });

    /**TC_RAD_07 — Chọn lần lượt tất cả radio trong nhóm và verify từng lần Trang: https://practice.expandtesting.com/radio-buttons
        Mở trình duyệt, điều hướng đến trang
        Lấy mảng tất cả radio nhóm màu bằng $$('input[name="color"]')
        Với từng radio trong mảng: click → verify isSelected() = true → verify tất cả radio còn lại isSelected() = false
    */
   it ('TC07 - Select each radio button in the group and verify it one by one.', async() => {
        const allRadios = await $$('input[name="color"]');
        const enabledRadios = [];

        for (const radio of allRadios) {
            if (await radio.isEnabled()) {
                enabledRadios.push(radio);
            }
        }

        for (let i = 0; i < enabledRadios.length; i++) {
            await enabledRadios[i].click();

            for (let j = 0; j < enabledRadios.length; j++) {
                const selected = await enabledRadios[j].isSelected();

                if (i === j) {
                    await expect(selected).toBe(true);
                } else {
                    await expect(selected).toBe(false);
                }
            }
        }
    });
});