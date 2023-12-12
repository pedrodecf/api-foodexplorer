const sqliteConnection = require("../../sqlite")

// Migrations
const createUsers = require("./createUsers")
const createIngredients = require("./createIngredients")
const createItems = require("./createItems")

async function migrationsRun() {
  const schemas = [createUsers, createItems, createIngredients].join(";")

  try {
    const db = await sqliteConnection()
    await db.exec(schemas)
    // console.log("Migrations executadas com sucesso.")
  } catch (error) {
    console.log(error)
  }
}

module.exports = migrationsRun
