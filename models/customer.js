module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('Customer',
        {
            customer_name: DataTypes.STRING,
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

    Customer.associate = function (models) {
        // Associating Customer with Burger
        // When a Customer is deleted, also delete any associated Burger
        Customer.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };

    return Customer;
};