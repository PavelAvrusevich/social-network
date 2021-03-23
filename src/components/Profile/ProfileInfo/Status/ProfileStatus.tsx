import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../../redux/profile-reducer';

type ProfileStatusPropsType = {
    status: string;
};

const ProfileStatus: React.FC<ProfileStatusPropsType> = (props) => {
    const dispatch = useDispatch();
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
        dispatch(updateStatus(status));
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
