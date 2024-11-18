import mongoose from "mongoose";

const flowStateSchema = new mongoose.Schema({
    state: {
        type: String,
        enum: ['INITIAL', 'WAITING', 'COMPLETED'],
        default: 'INITIAL',
    },
    renewalStatus: {
        type: String,
        enum: ['RENEWED', 'PENDING', 'NOT_RENEWED'],
        default: 'NOT_RENEWED',
    },
    logs: {
        type: [String],
        default: [],
    }
}, { timestamps: true });

const Flow = mongoose.model('FlowState', flowStateSchema);

export default Flow;