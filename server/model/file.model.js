export default (sequelize, Sequelize) => {
    
    const File = sequelize.define("file", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        createdAt: {
            type: Sequelize.DATE,
        },

        updatedAt: {
            type: Sequelize.DATE,
        }
    });
    
    return File;
};