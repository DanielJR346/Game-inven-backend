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
    const q = "SELECT u.Username FROM db.user u INNER JOIN db.player p ON u.UserID = p.UserID WHERE p.UserID = (?)"
    // const q = "SELECT u.Username FROM db.player u WHERE u.UserID = (?)"
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

/*
 Get all available vendors
 */ 
export const getAllVendors = (req, res) => {
    const q = "SELECT * FROM db.vendor"
    db.query(q, req, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

/*
 Get Player ID 
 */
export const getPlayerLogin = (req, res) => {
    const PlayerID = req.params.id;
    const q = "SELECT p.UserID FROM db.player p WHERE p.UserID = ?"
    db.query(q, [PlayerID], (err, data) => {
        if (err) return res.json(err)
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

/*
Player consumes a consumable (lowers the quantity of consumables by 1)
Removes any consumables with 0 quantity (doesnt erase items, simply removes any ownership of the item)
Does not utilize #ofUses
INPUT:
    req.body:
        PlayerID
        ConsumableID
*/
export const playerConsumes = (req,res) => {
    // Player first consumes the potion
    const consume = "INSERT INTO db.player_consumes_consumable (`ConsumableID`, `PlayerConsumedID`) VALUES (?)"
    const values = [req.body.ConsumableID, req.body.PlayerID]
    db.query(consume, [values], (err,data)=>{
        if(err) return res.json(err)
        console.log("consumable consumed")
        // return res.json("consumable consumed!")
    })

    // Decrement the quantity of that potion
    const decrementQuant = "UPDATE db.consumable c SET c.Quantity = c.Quantity -1 WHERE c.ItemID = ?"
    db.query(decrementQuant, [req.body.ConsumableID], (err,data)=>{
        if(err) return res.json(err)
        console.log("quantity decreased")
        // return res.json("quantity decremented!")
    })

    // Remove any potions from players inventory that have 0 quantity left
    const checkQuant = "UPDATE db.item i INNER JOIN db.consumable c ON i.ItemID = c.ItemID SET i.PlayerStoredID = NULL WHERE c.Quantity = 0"
    db.query(checkQuant, (err,data)=>{
        if(err) return res.json(err)
        console.log("removed empty consumables!")
        return res.json("removed empty consumables!")
    })
}

/*
Player buys an item
INPUT:
    req.params:
        PlayerID
    req.body:
        ItemID
        VendorID
*/
export const buyItem = (req,res) => {
    const PlayerID = req.params.id;

    // Should check that the player has enough money to make the purcahse,
    // Get Price of item
    const getPrice = "SELECT @price, @price := v.Price FROM vendor_sells_item v WHERE v.ItemID = ? AND v.VendorID = ?"
    db.query(getPrice, [req.body.ItemID,req.body.VendorID], (err,data)=>{
        if(err) return res.json(err)
        console.log("got price")
        console.log(data)
        // return res.json(data)
    })

    // Get Money of player
    const getMoney = "SELECT @money, @money := p.Money FROM player p WHERE p.UserID =" + req.params.id
    db.query(getMoney, [PlayerID], (err,data)=>{
        if(err) return res.json(err)
        console.log("got money")
        console.log(data)
        // return res.json(data)
    })

    // Sanity check if @price and @money are correct
    const q = "SELECT @price, @money"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // !!!!!!!!!!!!!!!!!!!!! put this after instance of item is bought and use @newItemID
    // // Only add purchase to player_buys_item if they have enough money
    // // const purchase = "INSERT INTO db.player_buys_item (`PlayerID`, `ItemID`) VALUES (?,?) WHERE @price < @money"
    // const purchase = "INSERT INTO db.player_buys_item (`PlayerID`, `ItemID`) SELECT ?,? FROM DUAL WHERE @price <= @money;"
    // const purchaseVal = [
    //     req.body.ItemID
    // ]
    // db.query(purchase, [PlayerID,purchaseVal], (err,data)=>{
    //     if(err) return res.json(err)
    //     console.log(data)
    //     if (data.length == 0) return res.json("You don't have enough money!")
    //     // return res.json(data)
    // })

    // Causes a server crash :(
    // // Check if the player has enough money
    // const moneyCheck = "SELECT * FROM db.player WHERE @price <= @money"
    // db.query(moneyCheck, (err,data)=>{
    //     if(err) return res.json(err)
    //     console.log(data)
    //     // if (data.length == 0) return res.json("You don't have enough money!")
    // })

    // Complete the transaction
    // Now that the purchase is complete, decrement the price from the players money
    const decrementMoney = "UPDATE db.player p SET p.Money = p.Money - @price WHERE p.UserID = " + req.params.id
    // const decrementMoney = "UPDATE db.player p SET p.Money - @price WHERE p.UserID = ?"
    db.query(decrementMoney, [PlayerID], (err,data)=>{
        if(err) return res.json(err)
        console.log("money taken from player balance")
        // return res.json(data)
    })

    // Increment price into the vendor money
    const incrementVendorMoney = "UPDATE db.vendor v SET v.Money = v.Money + @price WHERE v.VendorID = ?"
    db.query(incrementVendorMoney, [req.body.VendorID], (err,data)=>{
        if(err) return res.json(err)
        console.log("money added to vendor balance")
        // return res.json(data)
    })
    
    // At this point the transaction is complete, now run one of the create instance functions to create an instance of the item (input ItemID of purchased item)
    // First create the instance of the item:
    // Get info of the item to use to make item instance
    const getItemInfo = "SELECT @Description,@PlayerSellPrice, @Description := i.Description, @PlayerSellPrice := i.PlayerSellPrice FROM db.item i WHERE i.ItemID = ?"
    db.query(getItemInfo, [req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("got item info")
        // return res.json(data)
    })

    // Create an instance of the item which will be owned by the inputted PlayerID
    const instanceItem = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`, `PlayerSellPrice`) VALUES (NULL, @Description, ? ,@PlayerSellPrice)"
    db.query(instanceItem, [PlayerID], (err,data)=>{
        if(err) return res.json(err)
        console.log("instanced item created!")
        // return res.json(data)
    })

    // Get new ItemId assigned to instanced item to be used to make instance of armour or weapons
    // Get unique ItemID from database (should be the highest ItemID since it is the newest)
    const getItemID = "SELECT @newItemID, @newItemID := i.ItemID FROM db.item i order by i.ItemID desc limit 1";
    db.query(getItemID, (err,data)=>{
        if(err) return res.json(err)
        console.log("new ItemID assigned to @newItemID")
        // return res.json(data)
        // return res.json("Transaction completed")
    })

    // Add transaction to player_buys_item table
    const transaction = "INSERT INTO db.player_buys_item (`PlayerID`, `ItemID`) VALUES (?, @newItemID)"
    db.query(transaction, [PlayerID], (err,data)=>{
        if(err) return res.json(err)
        console.log("transaction recorded in player_buys_item")
        // return res.json(data)
        return res.json("Transaction completed")
    })

    // IMPORTANT: Now create the matching item type (ex. armour, weapons, melee weapons, etc.) to complete the fully created instance of the purchased item!
}


// Create instace functions (the appropriate one should be run for the type of item bought (ex. armour, melee weapon, etc.))

/*
Create an instance of armour
INPUT:
    req.body:
        ItemID
        PlayerID
*/
export const instanceArmour = (req,res) => {
    // Get info of item, equippable, and armour to use to make instance
    // const getItemInfo = "SELECT @Description,@PlayerSellPrice, @Description := i.Description, @PlayerSellPrice := i.PlayerSellPrice FROM db.item i WHERE i.ItemID = ?"
    // const getItemInfo = "SELECT @Description,@PlayerSellPrice,@Defense,@Type,@Weight, @Description := i.Description, @PlayerSellPrice := i.PlayerSellPrice, @Defense := a.Defense, @Type := a.Type, @Weight := e.Weight FROM db.item i, db.armour a, db.equippable e WHERE i.ItemID = ? AND a.ItemID = ? AND e.ItemID = ?"
    const getItemInfo = "SELECT @Defense,@Type,@Weight, @Defense := a.Defense, @Type := a.Type, @Weight := e.Weight FROM db.armour a, db.equippable e WHERE a.ItemID = ? AND e.ItemID = ?"
    db.query(getItemInfo, [req.body.ItemID,req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("Got item info")
        // return res.json(data)
    })

    // NOTE: if @newItemID is null and causes an error, you must run /buyItem/? first to set @newItemID
    //       Running instanceArmour multiple times before buying an item will create a duplicate ItemID causing an error as well
    // Create the instance of an equippable
    const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) VALUES (@newItemID, @Weight)"
    db.query(instanceEquippable, (err,data)=>{
        if(err) return res.json(err)
        console.log("equippable created!")
        // return res.json(data)
    })

    // Create the instance of the armour
    const instanceArmour = "INSERT INTO armour (`ItemID`, `Defense`, `Type`, `EquippedID`) VALUES (@newItemID, @Defense, @Type, NULL)"
    db.query(instanceArmour, (err,data)=>{
        if(err) return res.json(err)
        console.log("armour created!")
        return res.json("instance of armour created!")
    })

}

/*
Player sells an item to a vendor, the vendor can now sell that item (maybe for more than they bought it)
Input:
    req.params:
        PlayerID
    req.body:
        VendorID
        ItemID
*/
export const sellItem = (req,res) => {
    const PlayerID = req.params.id

    const value = [
        req.body.VendorID
    ]

    // Check if the vendor can afford to buy the item from the player
    // Get vendor money
    const vendorMoney = "SELECT @vendorMoney, @vendorMoney := v.Money FROM db.vendor v WHERE v.VendorID = ?"
    db.query(vendorMoney, [value], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // Get PlayerSellPrice of item
    const PSellPrice = "SELECT @sellPrice, @sellPrice := i.PlayerSellPrice FROM db.item i WHERE i.ItemID = ?"
    db.query(PSellPrice, [req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // // Sanity check if @sellPrice and @vendorMoney are right
    // const x = "SELECT @sellPrice, @vendorMoney"
    // db.query(x, (err,data)=>{
    //     if(err) return res.json(err)
    //     console.log(data)
    //     return res.json(data)
    // })

    // Sell the item to the vendor
    const sell = "INSERT INTO db.vendor_buys_item (`VendorID`, `ItemID`) SELECT ?,? FROM DUAL WHERE @sellPrice <= @vendorMoney"
    db.query(sell, [req.body.VendorID ,req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        //TODO: STOP TRANSACTION IF THE VENDOR DOES NOT HAVE ENOUGH MONEY!
        // return res.json(data)
    })

    // Complete transaction
    // Add money to player money
    const payPlayer = "UPDATE db.player p SET p.Money = p.Money + @sellPrice WHERE p.UserID = ?"
    db.query(payPlayer, [PlayerID], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // Take money from vendor money
    const vendorPay = "UPDATE db.vendor v SET v.Money = v.Money - @sellPrice WHERE v.VendorID = ?"
    db.query(vendorPay, [req.body.VendorID], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // // Switch item ownership
    // // Add item to the vendors offers
    // const vendorNewOffer = "INSERT INTO db.vendor_sells_item (`VendorID`, `ItemID`, `Price`) VALUES (?, ?, @sellPrice * 1.1)"
    // db.query(vendorNewOffer, [req.body.VendorID, req.body.ItemID], (err,data)=>{
    //     if(err) return res.json(err)
    //     console.log(data)
    //     // return res.json(data)
    // })

    // Remove players ownership over item
    const removePlayerOwn = "UPDATE db.item i SET i.PlayerStoredID = NULL WHERE i.ItemID = ?"
    db.query(removePlayerOwn, [req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        return res.json(data)
    })
}

/*
Player changes password
NOTE: doesnt ask for old password
Input:
    req.params.id
    req.body.Password
*/
export const changePassword = (req,res) => {
    const PlayerID = req.params.id
    const changePass = "UPDATE db.user u SET u.Password = ? WHERE u.UserID = ?"
    db.query(changePass, [req.body.Password, req.params.id], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        return res.json(data)
    })
}

/*
Authorize login by player user with inputted name and password
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
