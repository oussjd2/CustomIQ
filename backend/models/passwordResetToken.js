import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 24*60*60*1000), // 24 hours from now
    },
});

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);
export default PasswordResetToken;
