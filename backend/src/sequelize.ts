import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";

export class ConfigSequelize {
    private static _instance: ConfigSequelize | null = null;
    public sequelize: Sequelize | null = null;

    constructor() {
        if (!ConfigSequelize._instance) {
            console.log("creating instance ConfigSequelize");
            ConfigSequelize._instance = this;
        } else {
            console.log("retrieve instance ConfigSequelize");
            return ConfigSequelize._instance
        }
    }

    public static getInstance() {
        return ConfigSequelize._instance;
    }

    public setupConnection() {
        if (this.sequelize) {
            return;
        }
        const host = process.env.POSTGRES_HOST || '';
        const port = Number.parseInt(process.env.POSTGRES_PORT || '5432');
        const user = process.env.POSTGRES_USER || '';
        const pass = process.env.POSTGRES_PASSWORD || '';
        const database = process.env.POSTGRES_DATABASE || '';
        // this.sequelize = new Sequelize(`postgresql://${user}:${pass}@${host}:${port}/${database}`);
        this.sequelize = new Sequelize({
            logging: console.log,
            host: host,
            port: port,
            database: database,
            dialect: 'postgres',
            username: user,
            password: pass,
            logQueryParameters: true,
        });
        initModels(this.sequelize);
        console.log("Connection to database concluded");

    }

}