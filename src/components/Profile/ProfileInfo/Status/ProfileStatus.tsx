import React, { ChangeEvent, useEffect, useState } from 'react';

type ProfileStatusPropsType = {
    status: string;
    updateStatus: (status: string) => void;
};

const ProfileStatus: React.FC<ProfileStatusPropsType> = (props) => {
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

    const onInputStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
