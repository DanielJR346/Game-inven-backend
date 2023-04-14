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
 Get Admin Login 
 */
export const getAdminLogin = (req, res) => {
    const UserID = req.params.id;
    const q = "SELECT a.AdminID FROM db.admin a WHERE a.UserID = (?)"
    db.query(q, [UserID], (err, data) => {
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
 INPUT:
    req.body:
        Description
        PlayerStoredID
*/
export const createItem = (req, res) => {
    // Create an item
    const q = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`, `PlayerSellPrice`) VALUES (NULL, ?, ?, ?)";
    db.query(q, [req.body.Description, req.body.PlayerStoredID, req.body.PlayerSellPrice], (err, data) => {
        if (err) return res.json(err)
        console.log("item created!")
        // return res.json("item created!")
    })
    
    // Store the ID of the newly created item into @ID variable
    const getItemID = "SELECT @ID, @ID := i.ItemID FROM db.item i order by i.ItemID desc limit 1";
    db.query(getItemID, (err,data)=>{
        if(err) return res.json(err)
        console.log("new ItemID assigned to @ID")
        return res.json(data)
    })

    // @ID can be used to further continue specific item creation
}

/*
Create equippable (for weapons and armour)
REQUIRES createItem to be used first to assign a value to @ID
INPUT:
    req.body:
        Weight
*/
export const createEquippable = (req,res) => {
    // Create Equippable
    const createEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) VALUES (@ID, ?)"
    db.query(createEquippable, [req.body.Weight], (err,data)=>{
        if(err) return res.json(err)
        console.log("created new equippable")
        return res.json(data)
    })
}

/*
Create armour
REQUIRES createEquippable to be used first
INPUT:
    req.body:
        Defense
        Type
*/
export const createArmour = (req,res) => {
    // Create armour
    const createArmour = "INSERT INTO armour (`ItemID`, `Defense`, `Type`, `EquippedID`) VALUES (@ID, ?, ?, NULL)"
    db.query(createArmour, [req.body.Defense, req.body.Type], (err,data)=>{
        if(err) return res.json(err)
        console.log("created new armour")
        return res.json(data)
    })
}

/*
Create weapon
REQUIRES createEquippable to be used first
INPUT:
    req.body:
        AttackPower
*/
export const createWeapon = (req,res) => {
    // Create weapon
    const createWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (@ID, ?, NULL)"
    db.query(createWeapon, [req.body.AttackPower], (err,data)=>{
        if(err) return res.json(err)
        console.log("created new weapon")
        return res.json(data)
    })
}

/*
Create melee weapon
REQUIRES createWeapon to be used first
INPUT:
    req.body:
        AttackSpeed
*/
export const createMeleeWeapon = (req,res) => {
    // Create melee weapon
    const createMeleeWeapon = "INSERT INTO melee_weapon (`WeaponID`, `AttackSpeed`) VALUES (@ID, ?)"
    db.query(createMeleeWeapon, [req.body.AttackSpeed], (err,data)=>{
        if(err) return res.json(err)
        console.log("created new melee_weapon")
        return res.json("created new melee_weapon")
    })
}

/*
Create melee weapon
REQUIRES createWeapon to be used first
INPUT:
    req.body:
        DrawSpeed
*/
export const createRangedWeapon = (req,res) => {
    // Create melee weapon
    const createRangedWeapon = "INSERT INTO ranged_weapon (`WeaponID`, `DrawSpeed`) VALUES (@ID, ?)"
    db.query(createRangedWeapon, [req.body.DrawSpeed], (err,data)=>{
        if(err) return res.json(err)
        console.log("created new ranged_weapon")
        return res.json("created new ranged_weapon")
    })
}

/*
Create magic weapon
REQUIRES createWeapon to be used first
INPUT:
    req.body:
        DrawSpeed
*/
export const createMagicWeapon = (req,res) => {
    // Create melee weapon
    const createMagicWeapon = "INSERT INTO magic_weapon (`WeaponID`, `ManaCost`) VALUES (@ID, ?)"
    db.query(createMagicWeapon, [req.body.ManaCost], (err,data)=>{
        if(err) return res.json(err)
        console.log("created new magic_weapon")
        return res.json("created new magic weapon")
    })
}

/*
Create consumable
REQUIRES createItem to be used first
INPUT:
    req.body:
        Effect
        Quantity
        Uses
*/
export const createConsumable = (req,res) => {
    // Create consumable
    const createConsumable = "INSERT INTO consumable (`ItemID`, `Effect`, `Quantity`, `Uses`, `CurrentUsesLeft`) VALUES (@ID, ?, ?, ?, ?)"
    db.query(createConsumable, [req.body.Effect, req.body.Quantity, req.body.Uses, req.body.Uses], (err,data)=>{
        if(err) return res.json(err)
        console.log("created consumable")
        return res.json("created consumable")
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
    db.query(changeAttr, [req.body.Description,  req.body.PlayerSellPrice, req.body.ItemID], (err, data) => {
        if (err) return res.json(err)
        console.log("offer added to vendor!")
        return res.json("offer added to vendor!")
    })
}


// OUTDATED, NO LONGER WORK WITH CURRENT db.sql!!!
// /*
//  Changes Weapon Attributes 
//  */ 
// export const changeItemWeapon = (req, res) => {

//     // Deletes item from all weapon/item tables
//     // Cascades through all tables
//     const ItemID = req.body.ItemID
//     const delItem = "DELETE FROM db.item i WHERE i.ItemID = ?"
//     db.query(delItem, ItemID, (err, data) => {
//     if (err) return res.json(err)
//         console.log("item deleted")
//         //return res.json("item deleted")
//     })

//     // Adds item with the correct ItemID
//     const addItem = "INSERT INTO db.item (`ItemID`, `Description`, `PlayerStoredID`, `PlayerSellPrice`) VALUES (?)"
//     const itemValues = [
//         req.body.ItemID,
//         req.body.Description,
//         req.body.PlayerStoredID,
//         req.body.PlayerSellPrice
//     ]
//     db.query(addItem, [itemValues], (err, data) => { 
//         if (err) return res.json(err)
//         console.log("item added")
//         //return res.json("item added")
//     })

//     const addWeapon = "INSERT INTO db.weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (?)"
//     const weaponValues = [
//         req.body.ItemID,
//         req.body.AttackPower,
//         req.body.PlayerWieldID
//     ]
//     db.query(addWeapon, [weaponValues], (err, data) => {
//         if (err) return res.json(err)
//         console.log("item added")
//         return res.json("hehe xd")
//     })
// }

// /*
//  Changes Magic Weapon Attributes 
//  */ 
// export const changeMagic = (req, res) => {

//     const chMagic = "INSERT INTO db.magic_weapon (`WeaponID`, `ManaCost`) VALUES (?)"
//     const values = [
//         req.body.WeaponID,
//         req.body.ManaCost
//     ]

//     db.query(chMagic, [values], (err, data) => {
//         if (err) return res.json(err)
//         console.log("magic weapon added")
//         return res.json("magic weapon added")
//     })
// }

// /*
//  Changes Ranged Weapon Attributes 
//  */ 
// export const changeRanged = (req, res) => {

//     const chRanged = "INSERT INTO db.ranged_weapon (`WeaponID`, `DrawSpeed`) VALUES (?)"
//     const values = [
//         req.body.WeaponID,
//         req.body.DrawSpeed
//     ]

//     db.query(chRanged, [values], (err, data) => {
//         if (err) return res.json(err)
//         console.log("ranged weapon added")
//         return res.json("ranged weapon added")
//     })
// }

// /*
//  Changes Melee Weapon Attributes 
//  */ 
// export const changeMelee = (req, res) => {

//     const chMelee = "INSERT INTO db.melee_weapon (`WeaponID`, `AttackSpeed`) VALUES (?)"
//     const values = [
//         req.body.WeaponID,
//         req.body.AttackSpeed
//     ]

//     db.query(chMelee, [values], (err, data) => {
//         if (err) return res.json(err)
//         console.log("melee weapon added")
//         return res.json("melee weapon added")
//     })
// }

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

/*
Check if a playerID is valid
INPUT:
    req.body:
        UserID
*/
export const isPlayerValid = (req,res) => {
    const isValid = "SELECT * FROM db.player p WHERE p.UserID = ?"
    db.query(isValid, [req.body.UserID], (err,data)=>{
        if(err) return res.json(err)
        if(data.length == 0) return res.json("Player doesn't exist!")
        return res.json("valid player ID")
    })
}

/*
Check if a playerID is valid
INPUT:
    req.body:
        VendorID
*/
export const isVendorValid = (req,res) => {
    const isValid = "SELECT * FROM db.vendor v WHERE v.VendorID = ?"
    db.query(isValid, [req.body.VendorID], (err,data)=>{
        if(err) return res.json(err)
        if(data.length == 0) return res.json("Vendor doesn't exist!")
        return res.json("valid vendor ID")
    })
}