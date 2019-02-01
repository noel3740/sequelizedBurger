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

    Burger.associate = function (models) {
        // A buger can belong to a customer but doesn't have to be associated with a customer. 
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Burger;
};