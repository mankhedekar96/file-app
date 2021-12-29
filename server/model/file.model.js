export default (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        name: {
            type: Sequelize.STRING
        },
    });
    
    return File;
};