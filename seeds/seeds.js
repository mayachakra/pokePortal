const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json'); 

const seedDB = async () => {
    await sequelize.sync({force: true});
    const users = await User.bulkCreate(userData,{
        individualHooks: true,
        returning: true,
    });
    console.log('user seeds successful!');
    console.log(`${users}`);
    process.exit(0);
};

seedDB();