import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        default: "no-email-provided",
    },
});

export default mongoose.model("user", userSchema);
