const User = require('./User');
const Blog = require('./Blog');

Blog.belongsTo(User, {
  foreignKey: 'author_id'
});

User.hasMany(Blog, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Blog };
