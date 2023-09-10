"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const bodyParser = require("body-parser");
const _PORT = process.env.PORT || 80;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(_PORT, () => {
        console.log(`backend start on the port ${_PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map