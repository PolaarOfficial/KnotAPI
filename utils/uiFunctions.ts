import { Locator, Page } from "@playwright/test";

export async function clickIfVisible(locator:Locator){
    await locator.isVisible();
    await locator.click();
}

export async function fillIfVisible(locator:Locator, inputValue: string){
    await locator.isVisible();
    await locator.fill(inputValue);
}


export async function reloadPageUntilVisible(page:Page, locator:Locator):Promise<boolean> {
    let maxRetries = 2;

    for (let attempt = 0;attempt<=maxRetries;attempt++){
        try {
            await locator.waitFor({state:'visible', timeout:5000})
            return true
        } catch(err){
            if(attempt==maxRetries){
                throw new Error("Locator was not visible after reloading");
            }
            await page.reload();
        }
    }
    return false;

}