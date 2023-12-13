const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")
const lodash = require("lodash")
const DiskStorage = require("../providers/DiskStorage")

class ItemsController {
  async create(req, res) {
    const { name, img, category, price, description, ingredients } = req.body
    const db = await sqliteConnection()

    if (!ingredients) {
      throw new AppError("Por favor, adicione ao menos um ingrediente.")
    }

    const { lastID: id_items } = await db.run("INSERT INTO items (name, img, category, price, description) VALUES (?, ?, ?, ?, ?)", [
      name,
      img,
      category,
      price,
      description,
    ])

    if (ingredients) {
      const ingredientsInsert = ingredients.map((name) => {
        return {
          name,
          id_items,
        }
      })

      for (const ingredient of ingredientsInsert) {
        await db.run("INSERT INTO ingredients (name, id_items) VALUES (?, ?)", [ingredient.name, ingredient.id_items])
      }
    }

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, img, category, price, description, ingredients } = req.body
    const { id } = req.params

    const db = await sqliteConnection()
    const item = await db.get("SELECT * FROM items WHERE id = (?)", [id])
    let oldIngredients = await db.all("SELECT name FROM ingredients WHERE id_items = (?)", [id])

    oldIngredients = oldIngredients.map((names) => names.name)

    if (!item) {
      throw new AppError("Item não encontrado.")
    }

    item.name = name
    item.img = img
    item.category = category
    item.price = price
    item.description = description

    await db.run(
      `UPDATE items SET
      name = ?,
      img = ?,
      category = ?,
      price = ?,
      description = ?
      WHERE id = ?`,
      [item.name, item.img, item.category, item.price, item.description, id]
    )
    if (ingredients) {
      if (lodash.isEqual(oldIngredients, ingredients)) {
        console.log("Os ingredientes são iguais.")
      } else {
        console.log("Os ingredientes não são iguais.")

        const ingredientsInsert = ingredients.map((name) => {
          return {
            name,
          }
        })

        await db.run("DELETE FROM ingredients WHERE id_items = ?", [id])

        for (const ingredient of ingredientsInsert) {
          await db.run("INSERT INTO ingredients (name, id_items) VALUES (?, ?)", [ingredient.name, id])
        }
      }
    }

    return res.status(200).json()
  }

  async delete(req, res) {
    const { id } = req.params

    const db = await sqliteConnection()
    db.run("DELETE FROM items WHERE id = (?)", [id])
    db.run("DELETE FROM ingredients WHERE id_items = (?)", [id])

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params
    const db = await sqliteConnection()
    const item = await db.get("SELECT * FROM items WHERE id = (?)", [id])
    const ingredients = await db.all("SELECT * FROM ingredients WHERE id_items = (?)", [id])

    return res.json({ ...item, ingredients })
  }

  async index(req, res) {
    const { search } = req.query
    const db = await sqliteConnection()

    const query = `
    SELECT DISTINCT items.*
    FROM items
    LEFT JOIN ingredients ON items.id = ingredients.id_items
    WHERE items.name LIKE ? OR ingredients.name LIKE ?
  `

    const searchTerm = `%${search}%`
    const items = await db.all(query, [searchTerm, searchTerm])

    return res.json(items)
  }
}

module.exports = ItemsController
