const User = require('./User');
const Config = require('./Config');

User.hasOne(Config, { onDelete: 'cascade' });
Config.belongsTo(User);
// cascade delete


// buat hook ketika user di create otomatis bikin config dan set config ke user
User.afterCreate(async (user, options) => {
    const newConfig = await Config.create();
    await user.setConfig(newConfig);
});
