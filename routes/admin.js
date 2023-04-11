import express from "express"
import {
    allItems,
    createItem,
    createMagicWeapon,
    createMeleeWeapon,
    createRangedWeapon,
    getAdminInfo,
    getVendorOffers
} from "../controllers/admin.js"

const router = express.Router()

router.get("/getAdminInfo/:id", getAdminInfo)
router.post("/createMeleeWeapon/", createMeleeWeapon)
router.post("/createRangedWeapon/", createRangedWeapon)
router.post("/createMagicWeapon/", createMagicWeapon)
router.post("/createItem/", createItem)
router.get("/allItems/", allItems)
router.get("/getVendorOffers", getVendorOffers)

export default router