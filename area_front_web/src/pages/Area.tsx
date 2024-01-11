import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles/Area.css';

interface Reaction {
    id: number;
    name: string;
}

interface Actions {
    id: number;
    name: string;
}

interface Area {
    action_id: string;
    reaction_id: string;
}

export function Area()
{
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [actions, setActions] = useState<string[]>([]);
    const [reactions, setReactions] = useState<string[]>([]);
    const [area, setArea] = useState<string[]>([]);

    const [selectedAction, setSelectedAction] = useState<string>('');
    const [selectedReaction, setSelectedReaction] = useState<string>('');
    const [displaySelection, setDisplaySelection] = useState<string>('');

    const AddArea = async () => {
        const response = await axios.get(`${BASE_URL}/area/${selectedAction}-${selectedReaction}`);
        console.log('Server response:', response.data);
        loadArea();
    };

    const DeleteArea = async () => {
        const response = await axios.delete(`${BASE_URL}/area/${selectedAction}-${selectedReaction}`);
        console.log('Server response:', response.data);
        loadArea();
    };

    const loadActions = async () => {
        try {
            const response = await axios.get<{ message: Actions[] }>(`${BASE_URL}/actions`);
            console.log('Server response:', response.data);
            setActions(response.data.message.map(item => item.name));
        } catch (error) {
            console.error('Error during load of actions:', error);
        }
    };

    const loadReactions = async () => {
        try {
            const response = await axios.get<{ message: Reaction[] }>(`${BASE_URL}/reactions`);
            console.log('Server response:', response.data);
            setReactions(response.data.message.map(item => item.name));
        } catch (error) {
            console.error('Error during load of reactions:', error);
        }
    };

    const loadArea = async () => {
        const response = await axios.get<{ message: Area[] }>(`${BASE_URL}/area`);
        console.log('Server response:', response.data);
        const combinedData = response.data.message.map(item => `${item.action_id} - ${item.reaction_id}`);
        setArea(combinedData);
    };

    useEffect(() => {
        loadActions();
        loadReactions();
        loadArea();
    }, []);

    return (
        <div className="area">
            <div>
                <label>
                    Action:
                    <select value={selectedAction} onChange={e => setSelectedAction(e.target.value)}>
                        <option value="">Select</option>
                        {actions.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Reaction:
                    <select value={selectedReaction} onChange={e => setSelectedReaction(e.target.value)}>
                        <option value="">Select</option>
                        {reactions.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </label>
            </div>
            <button onClick={AddArea}>Add Area</button>
            <button onClick={DeleteArea}>Delete Area</button>
            <div className="combined-list">
                {area.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </div>
        </div>
    );
}
