import express from "express"
import {
    allItems,
    createItem,
    createMagicWeapon,
    createMeleeWeapon,
    createRangedWeapon,
    getAdminInfo,
    getVendorOffers,
    removeOffer,
    removePlayerItem,
    addItem,
    addOffer,
    changeAttributes,
    login,
    getAdminLogin,
    changeItemWeapon,
    changeMagic,
    changeMelee,
    changeRanged,
    createEquippable,
    createArmour,
    createWeapon,
    createConsumable,
    isPlayerValid,
    isVendorValid
} from "../controllers/admin.js"

const router = express.Router()

router.get("/getAdminInfo/:id", getAdminInfo)
router.get("/getAdminLogin/:id", getAdminLogin)
router.get("/allItems/", allItems)
router.get("/getVendorOffers", getVendorOffers)
router.get("/isPlayerValid", isPlayerValid)
router.get("/isVendorValid", isVendorValid)

router.put("/removeOffer", removeOffer)
router.put("/removePlayerItem", removePlayerItem)
router.put("/addItem", addItem)
router.put("/addOffer", addOffer)
router.put("/changeAttributes", changeAttributes)
router.put("/login", login)
router.put("/changeItemWeapon", changeItemWeapon)

router.post("/createItem/", createItem)
router.post("/createEquippable", createEquippable) // Requires createItem
router.post("/createArmour", createArmour) // Requires createEquippable
router.post("/createWeapon", createWeapon) // Requires createEquippable
router.post("/createMeleeWeapon/", createMeleeWeapon) // Requires createWeapo
router.post("/createRangedWeapon/", createRangedWeapon) // Requires createWeapo
router.post("/createMagicWeapon/", createMagicWeapon) // Requires createWeapon
router.post("/createConsumable", createConsumable) // Requires createItem
router.post("/changeMagic", changeMagic)
router.post("/changeMelee", changeMelee)
router.post("/changeRanged", changeRanged)
export default router