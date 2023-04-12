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
    getAdminLogin
} from "../controllers/admin.js"

const router = express.Router()

router.get("/getAdminInfo/:id", getAdminInfo)
router.get("/getAdminLogin/:id", getAdminLogin)
router.get("/allItems/", allItems)
router.get("/getVendorOffers", getVendorOffers)

router.put("/removeOffer", removeOffer)
router.put("/removePlayerItem", removePlayerItem)
router.put("/addItem", addItem)
router.put("/addOffer", addOffer)
router.put("/changeAttributes", changeAttributes)
router.put("/login", login)

router.post("/createMeleeWeapon/", createMeleeWeapon)
router.post("/createRangedWeapon/", createRangedWeapon)
router.post("/createMagicWeapon/", createMagicWeapon)
router.post("/createItem/", createItem)
export default router