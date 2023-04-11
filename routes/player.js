import express from "express"
import {
    allItems,
    getEquippables,
    getEquippedItems,
    getConsumables,
    getPlayerName,
    getPlayerInfo,
    equipArmour,
    buyItem,
    sellItem,
    changePassword,
    login
} from "../controllers/player.js"

const router = express.Router()

router.get("/allItems/:id", allItems)
router.get("/getEquippables/:id", getEquippables)
router.get("/getEquippedItems/:id", getEquippedItems)
router.get("/getConsumables/:id", getConsumables)
router.get("/getPlayerName/:id", getPlayerName)
router.get("/getPlayerInfo/:id", getPlayerInfo)

router.put("/equipArmour/:id", equipArmour)
router.put("/buyItem/:id", buyItem)
router.put("/sellItem/:id", sellItem)
router.put("/changePassword/:id", changePassword)
router.put("/login", login)

export default router