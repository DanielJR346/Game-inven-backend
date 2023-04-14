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
Get the weapon a player is wielding if they are wielding a weapon
*/
export const getWieldedWeapon = (req,res) => {
    const getWeapon = "SELECT * FROM db.weapon w WHERE w.PlayerWieldID = ?"
    db.query(getWeapon,[req.params.id],(err,data)=> {
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
    db.query(q, (err, data) => {
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
Player unequips a piece of armour
INPUT:
    req.params:
        UserID
    req.body:
        ItemID
*/
export const unequipArmour = (req,res) => {
    const unequip = "UPDATE db.armour SET `EquippedID` = NULL WHERE `ItemID` = ? AND `EquippedID` = ?"
    db.query(unequip, [req.body.ItemID, req.params.id], (err,data)=>{
        if(err) return res.json(err)
        console.log("Armour unequipped")
        return res.json("Armour unequipped")
    })
}

/*
Player wields a weapon
INPUT:
    req.body:
        ItemID
        UserID
*/
export const wieldWeapon = (req,res) => {
    const wieldWeapon = "UPDATE db.weapon SET `PlayerWieldID` = ? WHERE `ItemID` = ?"
    db.query(wieldWeapon, [req.body.UserID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("weapon wielded!")
        return res.json("weapon wielded!")
    })
}

/*
Player unwields a weapon
INPUT:
    req.body:
        ItemID
        UserID
*/
export const unwieldWeapon = (req,res) =>{
    const unwieldWeapon = "UPDATE db.weapon SET `PlayerWieldID` = NULL WHERE `ItemID` = ? AND `PlayerWieldID` = ?"
    db.query(unwieldWeapon, [req.body.ItemID, req.body.UserID], (err,data)=>{
        if(err) return res.json(err)
        console.log("weapon unwielded!")
        return res.json("weapon unwielded!")
    })
}

/*
Player consumes a consumable (lowers the quantity of consumables by 1)
Removes any consumables with 0 quantity (doesnt erase items, simply removes any ownership of the item)
Does not utilize #ofUses
INPUT:
    req.body:
        PlayerID
        ItemID
*/
export const playerConsumes = (req,res) => {

    // Player first consumes the potion
    const consume = "INSERT INTO db.player_consumes_consumable (`ItemID`, `PlayerConsumedID`) VALUES (?)"
    const values = [req.body.ItemID, req.body.PlayerID]
    db.query(consume, [values], (err,data)=>{
        if(err) return res.json(err)
        console.log("consumable consumed")
        // return res.json("consumable consumed!")
    })

    // Decrement CurrentUsesLeft by 1
    const decrementUses = "UPDATE db.consumable c SET c.CurrentUsesLeft = c.CurrentUsesLeft -1 WHERE c.ItemID = ?"
    db.query(decrementUses, [req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("current uses left decreased")
        // return res.json("current uses left decremented!")
    })

    // Decrement Quantity by 1 if CurrentUsesLeft == 0, then reset 
    const decrementQuantity = "UPDATE db.consumable c SET c.Quantity = c.Quantity -1, c.CurrentUsesLeft = c.Uses WHERE c.ItemID = ? AND c.CurrentUsesLeft = 0"
    db.query(decrementQuantity, [req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("decremented quantity")
        // return res.json("decremented quantity")
    })

    // Remove any potions from players inventory that have 0 quantity and currentUsesLeft == Uses
    const checkQuant = "UPDATE db.item i INNER JOIN db.consumable c ON i.ItemID = c.ItemID SET i.PlayerStoredID = NULL WHERE c.Quantity = 0 AND c.CurrentUsesLeft = c.Uses"
    db.query(checkQuant, (err,data)=>{
        if(err) return res.json(err)
        console.log("removed empty consumables!")
        return res.json("consumable consumed!")
    })

}

/*
Checks if a player can afford to purchase an item
INPUT:
    req.body:
        ItemID
        VendorID
        UserID
*/
export const canPlayerAffordThis = (req,res) => {
    // Should check that the player has enough money to make the purcahse,
    // Get Price of item
    const getPrice = "SELECT @price, @price := v.Price FROM vendor_sells_item v WHERE v.ItemID = ? AND v.VendorID = ?"
    db.query(getPrice, [req.body.ItemID,req.body.VendorID], (err,data)=>{
        if(err) return res.json(err)
        console.log("got price")
        // console.log(data)
        // return res.json(data)
    })

    // Get Money of player
    const getMoney = "SELECT @money, @price, @money := p.Money FROM player p WHERE p.UserID = ?"
    db.query(getMoney, [req.body.UserID], (err,data)=>{
        if(err) return res.json(err)
        console.log("got money")
        // console.log(data)
        // return res.json(data)
    })

    // Check if the player can afford the item
    // If (data.length == 0) player cant afford the item
    // Else player can afford it
    const moneyCheck = "SELECT * FROM db.player WHERE @price <= @money"
    db.query(moneyCheck, (err,data)=>{
        if (err) return res.json(err)
        if (data.length == 0) res.json("You can't afford this item!")
        else res.json("You can buy this item")
    })
}

/*
Check if the player can carry the item in their inventory after purchasing
Only needed for equippable items
INPUT:
    req.body:
        ItemID
        VendorID
        UserID
*/
export const canPlayerCarryThis =(req,res) => {
    // Get weight of the item
    const itemWeight = "SELECT @itemWeight, @itemWeight := e.Weight FROM db.item i, db.equippable e WHERE i.ItemID = e.ItemID AND i.ItemID = ?"
    db.query(itemWeight, [req.body.ItemID], (err,data)=> {
        if (err) return res.json(err)
        // return res.json(data)
    })

    // Get weight that the player is carrying IF they are holding the item
    const getPlayerCarry = "SELECT @itemWeight,@playerWeight, @playerWeight := SUM(e.Weight) + @itemWeight FROM db.item i, db.equippable e WHERE i.PlayerStoredID = ? AND i.ItemID = e.ItemID"
    db.query(getPlayerCarry, [req.body.UserID], (err,data)=> {
        if (err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // Check if @itemWeight + @weight < players carryWeight
    // const weightCheck = "SELECT * FROM db.player p WHERE @itemWeight + @weight <= p.carryWeight AND p.UserID = ?"
    const weightCheck = "SELECT * FROM db.player p WHERE p.UserID = ? AND @playerWeight <= p.carryWeight"
    db.query(weightCheck, [req.body.UserID], (err,data)=> {
        if (err) return res.json(err)
        if (data.length == 0) return res.json("Player can't carry this")
        else return res.json("Player can carry this!")
    })

}

/*
Check if a player has enough inventory space to hold a purchased item
INPUT:
    req.body:
        ItemID
        VendorID
        UserID
*/
export const checkInvenCapacity = (req,res) => {
    // Get current item count in players inventory
    const itemCount = "SELECT @count, @count := COUNT(i.ItemID) FROM db.item i WHERE i.PlayerStoredID = ?"
    db.query(itemCount, [req.body.UserID], (err,data)=> {
        if (err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // Check if player can hold another item in their inventory
    const itemCheck = "SELECT * FROM db.player p WHERE p.UserID = ? AND @count + 1 <= p.InvCapacity"
    db.query(itemCheck, [req.body.UserID], (err,data)=> {
        if (err) return res.json(err)
        // console.log(data)
        if (data.length == 0) return res.json("inventory full!")
        return res.json("sufficient inventory space!")
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
        // return res.json("Transaction completed")
    })

    // Return itemID of new instance item
    db.query(getItemID, (err,data)=>{
        if(err) return res.json(err)
        console.log("got ItemID of instanced item!")
        return res.json(data)
        // return res.json("Transaction completed")
    })

    // IMPORTANT: Now create the matching item type (ex. armour, weapons, melee weapons, etc.) to complete the fully created instance of the purchased item!
}


// Create instace functions (the appropriate one should be run for the type of item bought (ex. armour, melee weapon, etc.))
// NOTE: for these to not crash, @newItemID variable must be set from /buyItem/ function above!
/*
Inputs for all instance functions:
     req.body:
         ItemID
         NewItemID
         PlayerID
*/

/*
Create an instance of armour
*/
export const instanceArmour = (req,res) => {

    // Create the instance of an equippable
    // const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) VALUES (@newItemID, @Weight)"
    const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) SELECT ?, e.Weight FROM db.equippable e WHERE e.ItemID = ?"
    db.query(instanceEquippable, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("equippable created!")
        // return res.json(data)
    })

    // Create the instance of the armour
    // const instanceArmour = "INSERT INTO armour (`ItemID`, `Defense`, `Type`, `EquippedID`) VALUES (@newItemID, @Defense, @Type, NULL)"
    const instanceArmour = "INSERT INTO armour (`ItemID`, `Defense`, `Type`, `EquippedID`) SELECT ?, a.Defense, a.Type, NULL FROM db.armour a WHERE a.ItemID = ?"
    db.query(instanceArmour,[req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("armour created!")
        return res.json("instance of armour created!")
    })

}

/*
Create an instance of MELEE weapon
*/
export const instanceMeleeWeapon = (req,res) => {

    // Create the instance of an equippable
    // const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) VALUES (@newItemID, @Weight)"
    const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) SELECT ?, e.Weight FROM db.equippable e WHERE e.ItemID = ?"
    db.query(instanceEquippable, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("equippable created!")
        // return res.json(data)
    })

    // Create instance of weapon
    // const instanceWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (@newItemID, @AttackPower, NULL)"
    const instanceWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) SELECT ?, w.AttackPower, NULL FROM db.weapon w WHERE w.ItemID = ?"
    db.query(instanceWeapon, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created weapon instance")
        // return res.json(data)
    })

    // Create instance of melee weapon
    // const instanceMeleeWeapon = "INSERT INTO melee_weapon (`WeaponID`, `AttackSpeed`) VALUES (@newItemID, @AttackSpeed)"
    const instanceMeleeWeapon = "INSERT INTO melee_weapon (`WeaponID`, `AttackSpeed`) SELECT ?, m.AttackSpeed FROM db.melee_weapon m WHERE m.WeaponID = ?"
    db.query(instanceMeleeWeapon, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created melee_weapon instance")
        return res.json("Melee weapon created!")
    })
}

/*
Create an instance of RANGED weapon
*/
export const instanceRangedWeapon = (req,res) => {

    // Create the instance of an equippable
    // const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) VALUES (@newItemID, @Weight)"
    const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) SELECT ?, e.Weight FROM db.equippable e WHERE e.ItemID = ?"
    db.query(instanceEquippable, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("equippable created!")
        // return res.json(data)
    })

    // Create instance of weapon
    // const instanceWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (@newItemID, @AttackPower, NULL)"
    const instanceWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) SELECT ?, w.AttackPower, NULL FROM db.weapon w WHERE w.ItemID = ?"
    db.query(instanceWeapon, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created weapon instance")
        // return res.json(data)
    })

    // Create instance of ranged weapon
    // const instanceMeleeWeapon = "INSERT INTO ranged_weapon (`WeaponID`, `DrawSpeed`) VALUES (@newItemID, @DrawSpeed)"
    const instanceRangedWeapon = "INSERT INTO ranged_weapon (`WeaponID`, `DrawSpeed`) SELECT ?, r.DrawSpeed FROM db.ranged_weapon r WHERE r.WeaponID = ?"
    db.query(instanceRangedWeapon, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created ranged_weapon instance")
        return res.json("ranged weapon created!")
    })
}

/*
Create an instance of Magic weapon
*/
export const instanceMagicWeapon = (req,res) => {

    // Create the instance of an equippable
    // const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) VALUES (@newItemID, @Weight)"
    const instanceEquippable = "INSERT INTO equippable (`ItemID`, `Weight`) SELECT ?, e.Weight FROM db.equippable e WHERE e.ItemID = ?"
    db.query(instanceEquippable, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("equippable created!")
        // return res.json(data)
    })

    // Create instance of weapon
    // const instanceWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) VALUES (@newItemID, @AttackPower, NULL)"
    const instanceWeapon = "INSERT INTO weapon (`ItemID`, `AttackPower`, `PlayerWieldID`) SELECT ?, w.AttackPower, NULL FROM db.weapon w WHERE w.ItemID = ?"
    db.query(instanceWeapon, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created weapon instance")
        // return res.json(data)
    })

    // Create instance of ranged weapon
    // const instanceMeleeWeapon = "INSERT INTO ranged_weapon (`WeaponID`, `DrawSpeed`) VALUES (@newItemID, @DrawSpeed)"
    const instanceMagicWeapon = "INSERT INTO magic_weapon (`WeaponID`, `ManaCost`) SELECT ?, r.ManaCost FROM db.magic_weapon r WHERE r.WeaponID = ?"
    db.query(instanceMagicWeapon, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created magic_weapon instance")
        return res.json("magic weapon created!")
    })
}

/*
Create instance of consumable
*/
export const instanceConsumable = (req,res) => {

    // Create instance of consumable
    // const instanceConsumable = "INSERT INTO consumable (`ItemID`, `Effect`, `Quantity`, `Uses`, `CurrentUsesLeft`) VALUES (@newItemID, @Effect, @Quantity, @Uses, @Uses)"
    const instanceConsumable = "INSERT INTO consumable (`ItemID`, `Effect`, `Quantity`, `Uses`, `CurrentUsesLeft`) " +
                                "SELECT ?, c.Effect, c.Quantity, c.Uses, c.Uses FROM db.consumable c WHERE c.ItemID = ?"
    db.query(instanceConsumable, [req.body.NewItemID, req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log("created consumable instance")
        return res.json("consumable created!")
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

/*
Returns the ID of the player or user that has been authorized with correct login information
Player version and Admin version
INPUT:
    req.body:
        Username
        Password
*/
export const loginAuthorizedP = (req,res) => {
    // Get ID of player
    const player = "SELECT p.UserID FROM db.user u, db.player p WHERE u.UserID = p.UserID AND u.Username = ? AND u.Password = ?"
    db.query(player, [req.body.Username, req.body.Password], (err,data)=>{
        if(err) return res.json(err)
        // if(data.length == 0) return res.status(404).json("Password is incorrect or user does not exist!")
        return res.json(data)
    })
}
export const loginAuthorizedA = (req,res) => {
    // Get ID of admin
    const admin = "SELECT a.AdminID FROM db.user u, db.admin a WHERE u.UserID = a.UserID AND u.Username = ? AND u.Password = ?"
    db.query(admin, [req.body.Username, req.body.Password], (err,data)=>{
        if(err) return res.json(err)
        // if(data.length == 0) return res.status(404).json("Password is incorrect or user does not exist!")
        return res.json(data)
    })
}

/*
Checks if a player can equip a piece of armor (checks if they are already wearing something of that armour type)
INPUT:
    req.body:
        ItemID
        UserID
*/
export const canPlayerEquip = (req,res) => {
    // Get armour of item they want to equip
    const getType = "SELECT @type, @type := a.Type FROM db.armour a WHERE a.ItemID = ?"
    db.query(getType, [req.body.ItemID], (err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        // return res.json(data)
    })

    // Check if the player is already wearing an armour piece of that type
    const armourCheck = "SELECT * FROM db.armour a WHERE a.EquippedID = ? AND a.Type = @type"
    db.query(armourCheck, [req.body.UserID], (err,data)=>{
        if(err) return res.json(err)
        if (data.length == 0) return res.json("Player is not wearing this armour type!")
        else return res.json("Player is already wearing that armour type!")
        // return res.json(data)
    })
}

/*
Checks if a player is already wielding a weapon (prevents wielding multiple weapons)
INPUT:
    req.body:
        UserID
*/
export const canPlayerWield = (req,res) => {
    // Check if player is already wielding a weapon
    const weaponCheck = "SELECT * FROM db.weapon w WHERE w.PlayerWieldID = ?"
    db.query(weaponCheck, [req.body.UserID], (err,data)=>{
        if(err) return res.json(err)
        if (data.length == 0) return res.json("Player is not wielding a weapon")
        else return res.json("Player is already wielding a weapon")
    })

}

/*
Functions that check if an item is a weapon, armour, or consumable
INPUT:
    req.body:
        ItemID
*/
export const isConsumable = (req,res) => {
    const check = "SELECT * FROM db.consumable x WHERE x.ItemID = ?"
    db.query(check, [req.body.ItemID], (err,data)=> {
        if (err) return res.json(err)
        if (data.length == 0) return res.json("not consumable")
        else return res.json(data)
    })
}
export const isArmour = (req,res) => {
    const check = "SELECT * FROM db.armour x WHERE x.ItemID = ?"
    db.query(check, [req.body.ItemID], (err,data)=> {
        if (err) return res.json(err)
        if (data.length == 0) return res.json("not armour")
        else return res.json(data)
    })
}
export const isMelee = (req,res) => {
    const check = "SELECT * FROM db.melee_weapon x WHERE x.WeaponID = ?"
    db.query(check, [req.body.ItemID], (err,data)=> {
        if (err) return res.json(err)
        if (data.length == 0) return res.json("not melee weapon")
        else return res.json(data)
    })
}
export const isRanged = (req, res) => {
    const check = "SELECT * FROM db.ranged_weapon x WHERE x.WeaponID = ?"
    db.query(check, [req.body.ItemID], (err, data) => {
        if (err) return res.json(err)
        if (data.length == 0) return res.json("not ranged weapon")
        else return res.json(data)
    })
}
export const isMagic = (req, res) => {
    const check = "SELECT * FROM db.magic_weapon x WHERE x.WeaponID = ?"
    db.query(check, [req.body.ItemID], (err, data) => {
        if (err) return res.json(err)
        if (data.length == 0) return res.json("not magic weapon")
        else return res.json(data)
    })
}
