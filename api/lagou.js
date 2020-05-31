const Job = require('./mongodb')

const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

let currentPage = 1 //从第一页开始
let maxPage //最大页码数

(async function start() {
    let driver = await new Builder().forBrowser('chrome').build();
    //自动打开拉钩网，搜索前端
    await driver.get('https://www.lagou.com');
    //先点击城市
    await (await driver.findElement(By.css('#changeCityBox ul.clearfix > li:nth-of-type(8)'))).click()
    //找到元素，向里面发送一个关键字并且按回车
    await driver.findElement(By.id('search_input')).sendKeys('前端', Key.RETURN);
    //开始爬数据之前获取总页数
    maxPage = await (await driver.findElement(By.className('totalNum'))).getText()
    getData(driver)
})();

async function getData(driver) {
    console.log('------当前正在获取第' + currentPage + '页数据,共' + maxPage + '页数据------');
    while (true) {
        let notError = true
        try {
            //以下是获取数据的代码
            //找到发布信息的盒子
            let items = await driver.findElements(By.css('.item_con_list .con_list_item'))
            let results = []
            for (let i = 0; i < items.length; i++) {
                let item = items[i]
                // console.log(await item.getText());
                //职位对应的唯一ID
                let positionID = await item.getAttribute('data-positionid')
                //职位名称
                let title = await (await item.findElement(By.css('.position h3'))).getText()
                //公司地址
                let address = await (await item.findElement(By.css('.position .add em'))).getText()
                //发布时间
                let time = await (await item.findElement(By.css('.position .format-time'))).getText()
                //职位具体链接
                let jdLink = await (await item.findElement(By.css('.position .position_link'))).getAttribute('href')
                //薪资
                let money = await (await item.findElement(By.css('.position .money'))).getText()
                let moneys = money.split('-')
                let money_min = moneys[0]
                let money_max = moneys[1]
                //招聘要求
                let background = await (await item.findElement(By.css('.position .li_b_l'))).getText()
                background = background.replace(money, '')
                //公司名称
                let companyName = await (await item.findElement(By.css('.company .company_name'))).getText()
                //公司具体链接
                let companyLink = await (await item.findElement(By.css('.company .company_name a'))).getAttribute('href')
                //公司信息
                let industry = await (await item.findElement(By.css('.company .industry'))).getText()
                //标签
                let tag = await (await item.findElement(By.css('.list_item_bot .li_b_l'))).getText()
                //待遇
                let welfare = await (await item.findElement(By.css('.list_item_bot .li_b_r'))).getText()

                results.push({
                    positionID,
                    title,
                    address,
                    time,
                    jdLink,
                    money_min,
                    money_max,
                    background,
                    companyName,
                    companyLink,
                    industry,
                    tag,
                    welfare
                })
                Job.create({
                    'positionID': results[i].positionID,
                    'title': results[i].title,
                    'address': results[i].address,
                    'time': results[i].time,
                    'jdLink': results[i].jdLink,
                    'money_min': results[i].money_min,
                    'money_max': results[i].money_max,
                    'background': results[i].background,
                    'companyName': results[i].companyName,
                    'companyLink': results[i].companyLink,
                    'industry': results[i].industry,
                    'tag': results[i].tag,
                    'welfare': results[i].welfare
                })
            }
            // 爬取到了一页数据
            console.log(results);

            currentPage++
            if (currentPage <= maxPage) {
                //找到下一页按钮并点击
                await driver.findElement(By.className('pager_next')).click()
                //递归获取数据
                getData(driver)
            }

        } catch (e) {
            // console.log(e.message);
            if (e) notError = false
        } finally {
            if (notError) break;
        }
    }

}