import { db } from "../db.js"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Admin GET requests
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Get Admin info (username)
*/
export const getAdminInfo = (req, res) => {
    const AdminID = req.params.id;
    const q = "SELECT u.Name FROM db.user u INNER JOIN db.admin a ON u.UserID = a.UserID WHERE a.AdminID = (?)"
    db.query(q, [AdminID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

/*
Admin creates item
*/
export const createItem = (req, res) => {
    const q = "INSERT INTO item (`ItemID`, `Description`, `PlayerStoredID`, `Name`) VALUES (?)";
    const values = [
        req.body.ItemID,
        req.body.Description,
        req.body.PlayerStoredID,
        req.body.Name
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        console.log("item created!")
        return res.json("item created!")
    })
}


