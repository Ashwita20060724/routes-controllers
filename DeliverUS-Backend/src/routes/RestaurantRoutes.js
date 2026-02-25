import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  // TODO: Include routes for restaurant described in the lab session README
  app.route('/restaurants')
    .post(RestaurantController.create)
    .get(RestaurantController.index)
  app.route('/restaurants/:restaurantId')
    .get(RestaurantController.show)
    .put(RestaurantController.update)
    .delete(RestaurantController.delete)
}
export default loadFileRoutes
