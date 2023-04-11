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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Admin POST and PUT requests
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 Remove Item from Vendor
 INPUT:
    req.body:
        VendorID
        ItemID
 */
export const removeOffer = (req,res) => {
    const removeOffer = "DELETE FROM db.vendor_sells_item v WHERE v.VendorID = ? AND v.ItemID = ?"
    db.query(removeOffer, [req.body.VendorID, req.body.ItemID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

/*
Remove ownership of item from player
INPUT:
    req.body:
        ItemID
*/
export const removePlayerItem = (req,res) => {
    const removeItem = "UPDATE db.item i SET i.PlayerStoredID = NULL WHERE i.ItemID = ?"
    db.query(removeItem, [req.body.ItemID], (err, data) => {
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

/*
Adds an EXISTING item to a players inventory
INPUT:
    req.body:
        ItemID
        PlayerID
*/
export const addItem = (req,res) => {
    const addItem = "UPDATE db.item i SET i.PlayerStoredID = ? WHERE i.ItemID = ?"
    db.query(addItem, [req.body.PlayerID, req.body.ItemID], (err, data) => {
        if (err) return res.json(err)
        console.log("item added to inventory")
        return res.json("item added to inventory")
    })
}

/*
Adds an EXISTING item to a vendors offers for a inputted price
INPUT:
    req.body:
        ItemID
        VendorID
        Price
*/
export const addOffer = (req,res) => {
    const addOffer = "INSERT INTO db.vendor_sells_item (`VendorID`, `ItemID`, `Price`) VALUES (?, ?, ?)"
    db.query(addOffer, [req.body.VendorID, req.body.ItemID, req.body.Price], (err, data) => {
        if (err) return res.json(err)
        console.log("offer added to vendor!")
        return res.json("offer added to vendor!")
    })
}

/*
Change item attributes of a basic item (name, description, PlayerSellPrice)
Won't be able to change ownership of item (another function) or ItemID
Input:
    req.body:
        ItemID
        Description
        PlayerSellPrice
*/
export const changeAttributes = (req,res) => {
    const changeAttr = "UPDATE db.item i SET i.Description = ?, i.PlayerSellPrice = ? WHERE i.ItemID = ?"
    db.query(changeAttr, [req.body.Description, req.body.PlayerSellPrice, req.body.ItemID], (err, data) => {
        if (err) return res.json(err)
        console.log("offer added to vendor!")
        return res.json("offer added to vendor!")
    })
}

/*
Authorize admin login
INPUT:
    req.body.Username
    req.body.Password
*/
export const login = (req,res) => {

    // NOT WORKING, causes a crash when a non-existant username is inputted for some reason, im not sure why
    // // Check if the username (user.Name) exists
    // const doIExist = "SELECT * FROM user WHERE user.Name = ?"
    // db.query(doIExist, [req.body.Name], (err,data)=>{
    //     if(err) return res.json(err)
    //     if(data.length == 0) res.json("user not found!")
    //     // return res.json(data)
    // })

    // Check if the inputted password is correct
    const passCheck = "SELECT * FROM user WHERE user.Username = ? AND user.Password = ?"
    db.query(passCheck, [req.body.Username, req.body.Password], (err,data)=>{
        if(err) return res.json(err)
        if(data.length == 0) return res.status(404).json("Password is incorrect or user does not exist!")
        return res.json("User authenticated!")
    })
}