import express from "express"
import {
    allItems,
    getEquippables,
    getEquippedItems,
    getConsumables,
    getPlayerName,
    getPlayerInfo,
    equipArmour,
    unequipArmour,
    wieldWeapon,
    unwieldWeapon,
    playerConsumes,
    buyItem,
    canPlayerAffordThis,
    canPlayerCarryThis,
    checkInvenCapacity,
    sellItem,
    changePassword,
    login,
    loginAuthorizedP,
    loginAuthorizedA,
    getAllVendors,
    getPlayerLogin,
    instanceArmour,
    instanceMeleeWeapon,
    instanceRangedWeapon,
    instanceMagicWeapon,
    instanceConsumable,
    canPlayerEquip,
    canPlayerWield,
    isConsumable,
    isArmour,
    isMelee,
    isRanged,
    isMagic
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

// Checker functions
router.put("/canPlayerAffordThis", canPlayerAffordThis)
router.put("/canPlayerCarryThis", canPlayerCarryThis)
router.put("/checkInvenCapacity", checkInvenCapacity)
router.put("/canPlayerEquip", canPlayerEquip)
router.put("/canPlayerWield", canPlayerWield)

router.put("/isConsumable", isConsumable)
router.put("/isArmour", isArmour)
router.put("/isMelee", isMelee)
router.put("/isRanged", isRanged)
router.put("/isMagic", isMagic)
router.put("/loginAuthorizedP", loginAuthorizedP)
router.put("/loginAuthorizedA", loginAuthorizedA)

router.put("/equipArmour/:id", equipArmour)
router.put("/unequipArmour/:id", unequipArmour)
router.put("/wieldWeapon", wieldWeapon)
router.put("/unwieldWeapon", unwieldWeapon)
router.put("/playerConsumes", playerConsumes)
router.put("/buyItem/:id", buyItem)
// instance functions to create instances of items bought by player
router.put("/instanceArmour", instanceArmour)
router.put("/instanceMeleeWeapon", instanceMeleeWeapon)
router.put("/instanceRangedWeapon", instanceRangedWeapon)
router.put("/instanceMagicWeapon", instanceMagicWeapon)
router.put("/instanceConsumable", instanceConsumable)
//
router.put("/sellItem/:id", sellItem)
router.put("/changePassword/:id", changePassword)
router.put("/login", login)

export default router