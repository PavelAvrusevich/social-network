import React, { useEffect, useState } from 'react';

const ProfileStatus = (props) => {
    let [status, setStatus] = useState('');
    let [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onInputStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div>
            {!editMode && (
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'Статус'}</span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={onInputStatusChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
