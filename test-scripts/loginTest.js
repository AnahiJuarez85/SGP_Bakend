const { By, until } = require('selenium-webdriver');

module.exports = async (driver) => {
    const startTime = Date.now(); // Tiempo inicial
    try {
        // Navegar al sitio de inicio de sesión
        await driver.get('http://localhost:3000/login');

        // Interactuar con los elementos de la página
        await driver.findElement(By.name('username')).sendKeys('test_user');
        await driver.findElement(By.name('password')).sendKeys('123456');
        await driver.findElement(By.id('submit')).click();

        // Esperar a que se cargue el Dashboard
        await driver.wait(until.titleIs('Dashboard'), 5000);

        const endTime = Date.now(); // Tiempo final
        return { executionTime: (endTime - startTime) / 1000 }; // Tiempo en segundos
    } catch (error) {
        throw new Error('Prueba fallida: ' + error.message);
    }
};
