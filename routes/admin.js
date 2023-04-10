import express from "express"
import {
    getAdminInfo
} from "../controllers/admin.js"

const router = express.Router()

router.get("/getAdminInfo/:id", getAdminInfo)

export default router