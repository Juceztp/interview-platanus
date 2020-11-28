const app = require('./domain/app');
(async() => {
    await app.run();
    process.exit();
})();