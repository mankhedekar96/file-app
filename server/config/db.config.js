export default {
    HOST: "localhost",
    USER: "test",
    PASSWORD: "12345678",
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};