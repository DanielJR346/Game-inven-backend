import express from "express"
import {
    allItems,
    getEquippables,
    getEquippedItems,
    getConsumables,
    getPlayerName,
    getPlayerInfo,
    equipArmour,
    playerConsumes,
    buyItem,
    sellItem,
    changePassword,
    login,
    getAllVendors,
    getPlayerLogin,
    instanceArmour
} from "../controllers/player.js"

const router = express.Router()

router.get("/allItems/:id", allItems)
router.get("/getEquippables/:id", getEquippables)
router.get("/getEquippedItems/:id", getEquippedItems)
router.get("/getConsumables/:id", getConsumables)
router.get("/getPlayerName/:id", getPlayerName)
router.get("/getPlayerInfo/:id", getPlayerInfo)
router.get("/getAllVendors/", getAllVendors)
router.get("/getPlayerLogin/:id", getPlayerLogin)

router.put("/equipArmour/:id", equipArmour)
router.put("/playerConsumes", playerConsumes)
router.put("/buyItem/:id", buyItem)
// instance functions to create instances of items bought by player
router.put("/instanceArmour", instanceArmour)
//
router.put("/sellItem/:id", sellItem)
router.put("/changePassword/:id", changePassword)
router.put("/login", login)

export default router