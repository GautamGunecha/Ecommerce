const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 80,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            maxlength: 100,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        avatar: {
            type: String,
            default:
                "https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
