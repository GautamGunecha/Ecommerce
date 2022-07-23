const User = require('../../models/auth/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const sendEmail = require("./sendEmail");

const { CLIENT_URL } = process.env;

const register = asyncHandler(async (req, res) =>
{
    try
    {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ msg: "Please fill required data" });

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ msg: "User already registered" });

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        const token = generateToken({ id: user._id });

        if (user)
        {
            res.status(200).json({
                token: token,
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
            });
        } else
        {
            res.status(400);
            throw new Error("User not found");
        }
    } catch (error)
    {
        res.status(400).json({ msg: error });
    }
});

const login = asyncHandler(async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: "Please enter required fields" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not Registered" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = generateToken({ id: user._id });
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
            token: token,
        });
    } catch (error)
    {
        res.status(500).json({ msg: error });
    }
});

const updateUserProfile = asyncHandler(async (req, res) =>
{
    const user = await User.findById(req.user._id);

    if (user)
    {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;
        if (req.body.password)
        {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
            token: profileToken(updatedUser._id),
        });
    } else
    {
        res.status(404);
        throw new Error("User Not Found");
    }
});

const forgotPassword = asyncHandler(async (req, res) =>
{
    try
    {
        const { email } = req.body;
        if (!email) return res.status(400).json({ msg: "Please enter email" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Email doesn't exists" });

        const resetToken = generateResetToken({ id: user._id });
        const url = `${CLIENT_URL}/reset/${resetToken}`;

        sendEmail(email, url, "Reset your password");
        return res.status(200).json({ msg: "Please check your email." });
    } catch (error)
    {
        return res.status(500).json({ msg: error.message });
    }
});

const resetPassword = asyncHandler(async (req, res) =>
{
    try
    {
        const { password } = req.body;
        const passwordHashed = await bcrypt.hash(password, 12);
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { password: passwordHashed }
        );
        return res.json({ msg: "Password successfully changed!" });
    } catch (error)
    {
        return res.status(500).json({ msg: error });
    }
});

const deleteAccount = asyncHandler(async (req, res) =>
{
    try
    {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: "Account Deleted!" });
    } catch (error)
    {
        return res.status(500).json({ msg: error });
    }
});

// JWT Secret
const generateToken = (payload) =>
{
    return jwt.sign(payload, process.env.JWT_SECRET_CODE, { expiresIn: "7d" });
};

const generateResetToken = (payload) =>
{
    return jwt.sign(payload, process.env.JWT_SECRET_CODE, { expiresIn: "5m" });
};

const profileToken = (id) =>
{
    return jwt.sign({ id }, process.env.JWT_SECRET_CODE, {
        expiresIn: "30d",
    });
};

module.exports = {
    register,
    login,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    deleteAccount,
};
