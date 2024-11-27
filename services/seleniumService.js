const { Builder, By } = require('selenium-webdriver');
const path = require('path');
const fs = require('fs');

class SeleniumService {
    static async executeTest(scriptPath) {
        const absolutePath = path.resolve(scriptPath);

        // Verificar que el script exista y sea válido
        if (!fs.existsSync(absolutePath)) {
            return {
                success: false,
                executionTime: 0,
                error: 'El archivo del script no existe',
            };
        }

        const testScript = require(absolutePath);
        if (typeof testScript !== 'function') {
            return {
                success: false,
                executionTime: 0,
                error: 'El script no exporta una función válida',
            };
        }

        let driver;
        try {
            console.info(`Ejecutando script desde: ${absolutePath}`);
            console.info('Iniciando Selenium WebDriver...');

            driver = await new Builder().forBrowser('chrome').build();
            const result = await testScript(driver);

            console.info('Script ejecutado exitosamente');
            await driver.quit();

            return {
                success: true,
                executionTime: result.executionTime || 0,
                error: null,
                message: result.message || 'Ejecutado correctamente',
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
