import { db } from "../db.js"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player GET requests
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Get all items stored within a players inventory
*/
export const allItems = (req,res) => {
    const PlayerID = req.params.id;
    const q = "SELECT * FROM item WHERE PlayerStoredID = (?)";
    db.query(q,[PlayerID],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

/*
Get all equippable items stored in a players inventory
*/
export const getEquippables = (req,res) => {
    const PlayerID = req.params.id;
    const q = "SELECT * FROM db.item i INNER JOIN db.equippable e ON i.ItemID = e.ItemID  WHERE i.PlayerStoredID = (?)"
    db.query(q,[PlayerID],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

/*
Get all armours that a player is wearing
*/
export const getEquippedItems = (req,res) => {
    const PlayerID = req.params.id;
    const q = "SELECT * FROM db.armour a INNER JOIN db.Equippable e ON a.ItemID = e.ItemID INNER JOIN db.item i ON e.ItemID = i.ItemID WHERE a.EquippedID = (?)"
    db.query(q,[PlayerID],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

/*
Get all consumables in a players inventory
*/
export const getConsumables = (req,res) => {
    const PlayerID = req.params.id;
    const q = "SELECT * FROM db.consumable c INNER JOIN db.item i ON c.ItemID = i.ItemID WHERE i.PlayerStoredID = (?)"
    db.query(q,[PlayerID],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

/*
Get player name (also in getPlayerInfo)
*/
export const getPlayerName = (req,res) => {
    const PlayerID = req.params.id;
    // Was this query when Name was in the user table not the player table
    // const q = "SELECT u.Name FROM db.user u INNER JOIN db.player p ON u.UserID = p.UserID WHERE p.UserID = (?)"
    const q = "SELECT u.Name FROM db.player u WHERE u.UserID = (?)"
    db.query(q,[PlayerID],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

/*
Get player info (UserID, Money, Name, CarryWeight, Invcapacity)
*/
export const getPlayerInfo = (req,res) => {
    const PlayerID = req.params.id;
    const q = "SELECT * FROM db.player WHERE db.player.UserID = (?)"
    db.query(q,[PlayerID],(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player POST and PUT requests
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Player wants to equip a piece of armor
NOTE: NOT FINISHED!!!! doesnt check if player is already equipping an armor piece of that type
*/
export const equipArmour = (req,res) => {
    const PlayerID = req.params.id;
    const q ="UPDATE armour SET `EquippedID` = ? WHERE `ItemID` = ?";
    const values = [
        req.body.ItemID
    ];
    db.query(q, [...PlayerID, values], (err,data)=>{
        if(err) return res.json(err)
        console.log("Armor Equipped!")
        return res.json("Armor Equipped!")
    })
}