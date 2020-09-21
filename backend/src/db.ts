import { Sequelize } from "sequelize";

export const connectToDb = async (): Promise<Sequelize> => {
    const sequelize = new Sequelize({
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT ? Number.parseInt(process.env.POSTGRES_PORT) : 5432,
        dialect: 'postgres'
    });

    return sequelize;
}