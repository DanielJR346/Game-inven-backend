import { db } from "../db.js"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Admin GET requests
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Get Admin info (username)
*/
export const getAdminInfo = (req, res) => {
    const AdminID = req.params.id;
    const q = "SELECT u.Username FROM db.user u INNER JOIN db.admin a ON u.UserID = a.UserID WHERE a.AdminID = (?)"
    db.query(q, [AdminID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

/*
 Remove Item from Vendor
 */


/*
 Get Player Inventory
 */
export const allItems = (req, res) => {
    const PlayerID = req.query.playerid;
    const q = "SELECT * FROM item WHERE PlayerStoredID = (?)";
    db.query(q, [PlayerID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

/*
 Get Vendor Offers
 */
export const getVendorOffers = (req, res) => {  
    const VendorID = req.query.vendorid;
    const q = "SELECT * FROM item i JOIN vendor_sells_item v ON i.ItemID = v.ItemID AND v.VendorID = (?)";

    db.query(q, [VendorID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

/*
 Admin creates item
*/
export const createItem = (req, res) => {
    const q = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`) VALUES (?)";
    const values = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        console.log("item created!")
        return res.json("item created!")
    })
}

/*
 Create Melee Weapon
*/
export const createMeleeWeapon = (req, res) => {
    // First create the item with an autoincremented ItemID
    const q1 = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`) VALUES (?)";
    const values1 = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID
    ]

    db.query(q1, [values1], (err, data) => {
        if (err) return res.json(err)
        // return res.json("item created!")
        console.log("item created!")
        // res.json("item created")
    })

    // Now create the weapon
    const q2 = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (?)";
    const values2 = [
        req.body.WeaponID,
        req.body.AttackPower,
        req.body.PlayerWieldID
    ]

    db.query(q2, [values2], (err, data) => {
        if (err) return res.json(err)
        // return res.json("weapon created!")
        console.log("weapon created!")
        // res.json("weapon created!")

    })

    // Now create the melee weapon
    const q3 = "INSERT INTO melee_weapon (`WeaponID`, `AttackSpeed`) VALUES (?)";
    const values3 = [
        req.body.WeaponID,
        req.body.AttackSpeed
    ]

    db.query(q3, [values3], (err, data) => {
        if (err) return res.json(err)
        console.log("melee weapon created!")
        return res.json("melee weapon created!")
    })

}

/*
 Create Ranged Weapon 
 */
export const createRangedWeapon = (req, res) => {
    // First create the item with an autoincremented ItemID
    const q1 = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`) VALUES (?)";
    const values1 = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID,
    ]

    db.query(q1, [values1], (err, data) => {
        if (err) return res.json(err)
        // return res.json("item created!")
        console.log("item created!")
        // res.json("item created")
    })

    // Now create the weapon
    const q2 = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (?)";
    const values2 = [
        req.body.WeaponID,
        req.body.AttackPower,
        req.body.PlayerWieldID
    ]

    db.query(q2, [values2], (err, data) => {
        if (err) return res.json(err)
        // return res.json("weapon created!")
        console.log("weapon created!")
        // res.json("weapon created!")

    })

    // Now create the melee weapon
    const q3 = "INSERT INTO ranged_weapon (`WeaponID`, `DrawSpeed`) VALUES (?)";
    const values3 = [
        req.body.WeaponID,
        req.body.DrawSpeed
    ]

    db.query(q3, [values3], (err, data) => {
        if (err) return res.json(err)
        console.log("ranged weapon created!")
        return res.json("ranged weapon created!")
    })
}

/*
 Create Magic Weapon
 */
export const createMagicWeapon = (req, res) => {
    // First create the item with an autoincremented ItemID
    const q1 = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`, `Name`) VALUES (?)";
    const values1 = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID,
        req.body.Name
    ]

    db.query(q1, [values1], (err, data) => {
        if (err) return res.json(err)
        // return res.json("item created!")
        console.log("item created!")
        // res.json("item created")
    })

    // Now create the weapon
    const q2 = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (?)";
    const values2 = [
        req.body.WeaponID,
        req.body.AttackPower,
        req.body.PlayerWieldID
    ]

    db.query(q2, [values2], (err, data) => {
        if (err) return res.json(err)
        // return res.json("weapon created!")
        console.log("weapon created!")
        // res.json("weapon created!")

    })

    // Now create the magic weapon
    const q3 = "INSERT INTO magic_weapon (`WeaponID`, `ManaCost`) VALUES (?)";
    const values3 = [
        req.body.WeaponID,
        req.body.ManaCost
    ]

    db.query(q3, [values3], (err, data) => {
        if (err) return res.json(err)
        console.log("magic weapon created!")
        return res.json("magic weapon created!")
    })
}
