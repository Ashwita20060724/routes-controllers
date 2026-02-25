import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  try {
    const restaurant = await Restaurant.create(req.body)
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

/* La funcion show se encarga de buscar un restaurante por su id,
 */
const show = async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId,
      {
        attributes: { exclude: ['userId'] },
        include: [{
          model: Product,
          as: 'products',
          include: {
            model: ProductCategory,
            as: 'productCategory'
          }
        },
        {
          model: RestaurantCategory,
          as: 'restaurantCategory'
        }],
        order: [[{ model: Product, as: 'products' },
          'order', 'ASC']]
      })
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  try {
    // 1. Actualizamos el restaurante
    await Restaurant.update(req.body, {
      where: { id: req.params.restaurantId }
    })

    // 2. Buscamos de nuevo el restaurante actualizado
    const updatedRestaurant = await Restaurant.findByPk(
      req.params.restaurantId
    )

    // 3. Devolvemos el restaurante actualizado
    res.json(updatedRestaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    // destroy solo devuelve cuantas filas han sido eliminadas, no el objeto eliminado
    const deletedRows = await Restaurant.destroy({
      where: { id: req.params.restaurantId }
    })

    // Si no se ha eliminado ninguna fila, es porque el restaurante no existe
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }

    // Si se ha eliminado el restaurante, devolvemos un mensaje de información
    res.json({ message: 'Restaurant deleted successfully' })
  } catch (err) {
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
