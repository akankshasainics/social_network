const mongoose = require("mongoose");
const {ApiError} = require("../utils/apiError");
const {createSocialGroup, findOneGroup} = require("../dataAccess/groupAccess")
const {addGroup} = require("../dataAccess/userAccess")

const createGroup = async(req, res, next) => {
   // const session = await mongoose.startSession();
    try {
    //    session.startTransaction();
        const user = req.user;
        const {name, description} = req.body;
        const group = {
            name,
            description,
            created_by: user._id,
            members: [
                {
                    member_id: user._id
                }
            ]
        }
        const duplicateExists = await findOneGroup({name: name});
        if(duplicateExists)
        {
            next(new ApiError("Group name already exists. Try some another name.", 400))
        }
        const result = await createSocialGroup(group);
        await addGroup(user._id, result._doc._id);
         res.status(201).json({
            status: 'success',
            data: "Group created successfully"
        });
     //   await session.commitTransaction();
    }catch(error)
    {
      //  await session.abortTransaction();
        next(new ApiError(error.message, 400))
    }
    finally {
       // await session.endSession();
    }
}

module.exports = {
    createGroup
}