import lightRoutes from './light_routes'
module.exports = function(app, db) {
  lightRoutes(app, db);
  // Other route groups could go here, in the future
};
