import React, {useState} from 'react';

export const TeamNameChangeForm = ({teamId, onSubmit}) => {
    const [newName, setNewName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(teamId, newName);
    };

    return (
        <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            width: '300px',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid black',
            zIndex: 100
        }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newName">Nowa Nazwa Zespołu:</label>
                <input
                    type="text"
                    id="newName"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                />
                <button type="submit">Zmień Nazwę</button>
            </form>
        </div>
    );
};
