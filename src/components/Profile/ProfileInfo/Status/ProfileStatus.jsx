import React from 'react';

class ProfileStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            status: this.props.status,
        };
    }
    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    };

    onInputStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode && (
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Статус'}</span>
                    </div>
                )}
                {this.state.editMode && (
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}
                            onChange={this.onInputStatusChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileStatus;
