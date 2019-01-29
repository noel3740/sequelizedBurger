module.exports = function (sequelize, DataTypes) {
    const Burger = sequelize.define('Burger',
        {
            burger_name: DataTypes.STRING,
            devoured: DataTypes.BOOLEAN,
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, {
            timestamps: false
        });

    return Burger;
};