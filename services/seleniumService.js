const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

class SeleniumService {
    static async executeTest(scriptPath) {
        const absolutePath = path.resolve(scriptPath);
        try {
            const driver = await new Builder().forBrowser('chrome').build();

            const testScript = require(absolutePath);
            const result = await testScript(driver);

            await driver.quit();

            return {
                success: true,
                executionTime: result.executionTime || 0,
                error: null,
            };
        } catch (error) {
            console.error('Error al ejecutar el script:', error);

            if (driver) await driver.quit();

            return {
                success: false,
                executionTime: 0,
                error: error.message,
            };
        }
    }
}

module.exports = SeleniumService;
