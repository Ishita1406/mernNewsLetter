import FlowState from '../models/FlowState.js';
import { errorHandeler } from '../utils/error.js';

export const startFlow = async (req, res, next) => {
    const newFlow = new FlowState({
        logs: ['Flow started'],
    });
    try {
        await newFlow.save();
        res.status(201).json({
            message: `First renewal reminder sent for flow ID: (${newFlow._id}).`,
            flowId: newFlow._id,
        });
    } catch (error) {
        next(error);
    }
}

export const updateFlowState = async (req, res, next) => {
    const { state, renewalStatus, logs } = req.body;
    try {
        const updatedFlow = await FlowState.findByIdAndUpdate(req.params.flowId, {
            $set: {
                state, renewalStatus
            },
            $push: {
                logs: logs
            }
        } , { new: true });
        res.status(201).json(updatedFlow);
    } catch (error) {
        next(error);
    }
}