const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class ImgController {
  async update(req, res) {
    const { id } = req.params
    const imgFilename = req.file.filename
    const diskStorage = new DiskStorage()

    const db = await sqliteConnection()
    const item = await db.get("SELECT * FROM items WHERE id = ?", [id])

    if (!item) {
      throw new AppError("Item não encontrado.")
    }

    if (item.img) {
      await diskStorage.deleteFile(item.img)
    }

    const filename = await diskStorage.saveFile(imgFilename)
    item.img = filename

    db.run("UPDATE items SET img = ? WHERE id = ?", [item.img, id])

    return res.json(item)
  }

  async create(req, res) {
    const imgFilename = req.file.filename
    const diskStorage = new DiskStorage()
    const db = await sqliteConnection()

    const result = await db.get(
      "SELECT seq FROM sqlite_sequence WHERE name = 'items'"
    )

    if (!result) {
      throw new AppError("Erro ao obter o último ID.")
    }

    const lastItemId = result.seq

    const item = await db.get("SELECT * FROM items WHERE id = ?", [lastItemId])

    if (!item) {
      throw new AppError("Item não encontrado.")
    }

    const filename = await diskStorage.saveFile(imgFilename)
    item.img = filename

    db.run("UPDATE items SET img = ? WHERE id = ?", [item.img, lastItemId])

    return res.json(item)
  }
}

module.exports = ImgController
