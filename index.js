import express from "express"
import cors from "cors"
import mysql from "mysql"
import playerRoutes from "./routes/player.js"

const app = express()

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Atasacir9689842!",
//     database:"db"
//     // used https://stackoverflow.com/questions/51147964/errno-1251-sqlmessage-client-does-not-support-authentication-protocol-reques
//     // for authentication problems
//     // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_mysql_password';
// })

app.use(express.json())
app.use(cors())

app.use("/player", playerRoutes)

// Lets you know the backend is connected
app.get("/", (req,res)=> {
    res.json("hello this is the backend!")
})


/*
Player buys an item from a vendor
*/
app.post("/playerBuysItem/:id", (req,res)=>{
    const PlayerID = req.params.id;

    // First add interaction to player_buys_item table
    const q = "INSERT INTO player_buys_item (`PlayerID`, `ItemID`) VALUES (?)";

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        console.log("player_buys_item updated!")
    })

    // Now set PlayerStoredID on purchased item to PlayerID

})


// Test: getting ItemID of the latest item created
app.get("/test", (req,res)=>{
    const q = "SELECT ItemID FROM db.item order by ItemID desc limit 1";

    db.query(q,(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

/*
Test feature: creating an item
Used postman thingy to check if it actually worked (it did!)
Input:
    ItemID - INT
    Description - char(255)
    PlayerStoredID - INT
Do not include ItemID in input as it will autoincrement if left NULL
Do not include PlayerStoredID in input to make it NULL
*/
app.post("/item", (req,res)=> {
    const q = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`, `Name`) VALUES (?)";
    const values = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID,
        req.body.Name
    ]
    // console.log(latestID)
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        console.log("item created!")
        return res.json("item created!")
    })
    // res.json(x)
})

/*
Create melee weapon
ItemID should be NULL as it is autoincremented
WeaponID is a foreign key of ItemID
Input:
    ItemID - INT
    Description - char(255)
    Name - char(45)
    PlayerStoredID - INT
    AttackPower - INT
    PlayerWieldID - INT
    WeaponID - INT (Should be equal to ItemID)
    AttackSpeed - INT
Do not include PlayerStoredID if no one owns the item yet (will make NULL)
NOTE: even tho ItemID is autoincremental on mysql, I can't get the autoincremented ID from the database to use for weaponID so a unique ID must be inputted manually
NOTE2: ItemID becomes NULL if I try to use it a second time, so thats why WeaponID is its own input
*/
app.post("/makeMeleeWeapon", (req,res)=>{
    // First create the item with an autoincremented ItemID
    const q1 = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`, `Name`) VALUES (?)";
    const values1 = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID,
        req.body.Name
    ]

    db.query(q1, [values1], (err,data)=>{
        if(err) return res.json(err)
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

    db.query(q2, [values2], (err,data)=>{
        if(err) return res.json(err)
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

    db.query(q3, [values3], (err,data)=>{
        if(err) return res.json(err)
        console.log("melee weapon created!")
        return res.json("melee weapon created!")
    })

})

/*
Creates a user
Input: should be NULL as the database will autoincrement UserID to ensure uniqueness
*/
app.post("/makeUser", (req,res)=> {
    const q = "INSERT INTO user (`UserID`) VALUES (?)";
    const values = [
        req.body.UserID
    ]
    
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("user has been created!")
    })
})

/*
Create player
Input:
    Money - Int
    Name - Char(45)
    CarryWeight - INT
    InvCapacity - INT
This function assumes the userID inputted already exists
*/
app.post("/makePlayer", (req,res)=>{
    const q = "INSERT INTO player (`UserID`, `Money`, `Name`, `CarryWeight`, `InvCapacity`) VALUES (?)";
    const values = [
        req.body.UserID,
        req.body.Money,
        req.body.Name,
        req.body.CarryWeight,
        req.body.InvCapacity
    ]

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("player has been created!")
    })
})

/*
Test: Get all players
*/
app.get("/getAllPlayers", (req,res)=>{
    const q = "SELECT * FROM player";

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/*
Get all users
*/
app.get("/getAllUsers", (req,res)=>{
    const q = "SELECT * FROM user";

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/*
Gets all vendors
*/
app.get("/getAllVendors", (req,res)=>{
    const q = "SELECT * FROM vendor";

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/*
Gets all items on sale by a vendor of a given VendorID
Input:
    VendorID - int
*/
app.get("/getVendorOffers/:id", (req,res)=>{
    const VendorID = req.params.id;
    const q = "SELECT * FROM item i JOIN vendor_sells_item v ON i.ItemID = v.ItemID AND v.VendorID = ?";

    db.query(q, [VendorID], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})