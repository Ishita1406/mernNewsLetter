import React, { useState } from 'react'
import axios from 'axios'

function FlowSimulation() {

    const [logs, setLogs] = useState(["Press the button to initiate the subscription renewal flow."]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [flowId, setFlowId] = useState(null);
    const [flowState, setFlowState] = useState('INITIAL');

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        setLogs([]);
        try {
            const response = await axios.post('backend/flow/start');
            const { message, flowId } = response.data;

            setFlowId(flowId);
            setLogs((prevLogs) => [...prevLogs, `${message}`]);
            setFlowState('WAITING');
            handleFlow(flowId, 'WAITING');
        } catch (error) {
            setError(error.message);
        } 
        setLoading(false);
    }

    const handleFlow = async (flowId, state) => {
        if (state === 'WAITING') {

            await sendRenewalReminder(flowId, 'First reminder sent, waiting for renewal status check...');

            setTimeout(async () => {
                const renewalStatus = await checkRenewalStatus(flowId);

                if (renewalStatus === 'RENEWED') {
                    await handleUpdatedFlow(flowId, 'COMPLETED', renewalStatus, ['User renewed subscription. Thank you!']);
                    return;
                }
                else {
                    await sendRenewalReminder(flowId, 'Second reminder sent, waiting for renewal status check...');

                    setTimeout(async() => {
                        const secondRenewalStatus = await checkRenewalStatus(flowId);

                        if (secondRenewalStatus === 'RENEWED') {
                            await handleUpdatedFlow(flowId, 'COMPLETED', secondRenewalStatus, ['User renewed subscription after second reminder. Thank you!']);
                            return;
                        }
                        else {
                            await handleUpdatedFlow(flowId, 'COMPLETED', secondRenewalStatus, ['No renewal received after second reminder. Flow completed.']);
                        }
                    }, 2000);
                }
            }, 3000);
        }
    };

    const sendRenewalReminder = async (flowId, reminderType) => {
        const logMessage = `${reminderType}`;
        setLogs((prevLogs) => [...prevLogs, logMessage]);
        await axios.post(`backend/flow/update/${flowId}`, { flowId, state: 'WAITING_1', renewalStatus: 'PENDING', log: logMessage });
    }

    const checkRenewalStatus = async (flowId) => {
        return Math.random() > 0.5 ? 'RENEWED' : 'NOT_RENEWED';
    }

    const handleUpdatedFlow = async (flowId, state, renewalStatus, log) => {
       try {
            await axios.post(`backend/flow/update/${flowId}`, { flowId, state, renewalStatus, log });

            setLogs((prevLogs) => [...prevLogs, log]);
            setFlowState(state);

            if (state === 'COMPLETED') {
                setLoading(false);
            }
       } catch (error) {
         setError(error.message);
       }
    }

    return (
        <div className="bg-gradient-to-br from-gray-800 to-blue-800 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Newsletter Subscription Renewal Simulation</h1>
                
                <div className="flex justify-center mb-6">
                    <button 
                        onClick={handleClick}
                        disabled={loading || flowState === 'COMPLETED'} 
                        className={`px-8 py-3 rounded-xl text-white text-lg font-medium transition-all duration-300
                            ${loading || flowState === 'COMPLETED'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-800 hover:bg-blue-900 transform hover:scale-105'}`}
                    >
                        {loading ? 'Starting Flow...' : flowState === 'COMPLETED' ? 'Flow Completed' : 'Start Flow'}
                    </button>
                </div>

                <div className="bg-gray-100 rounded-xl p-6 mt-8 overflow-y-auto shadow-inner">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Logs:</h3>
                    <div className="space-y-3">
                        {logs.map((log, index) => (
                            <div key={index} className="text-md text-gray-600">{log}</div>
                        ))}
                    </div>
                    {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default FlowSimulation