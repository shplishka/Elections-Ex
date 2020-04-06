import React, {Component} from 'react';
import './SignInUpWindow.css';
import SignUp from './SignUp';
import Login from './Login';
import Overlay from './Overlay';

interface State {
    rightPanelActive: boolean,
}

class SignInUpWindow extends Component<{}, State> {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            rightPanelActive: false,
        }
    }

    handleClickSignUpButton = () => this.setState({
        rightPanelActive: true,
    });

    handleClickSignInButton = () => this.setState({
        rightPanelActive: false,
    });

    render() {
        const {handleClickSignUpButton, handleClickSignInButton} = this;
        const {rightPanelActive} = this.state;
        return (
            <div className="App">
                <div
                    className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
                    id="container"
                >
                    <SignUp/>
                    <Login/>
                    <Overlay
                        handleClickSignInButton={handleClickSignInButton}
                        handleClickSignUpButton={handleClickSignUpButton}
                    />
                </div>
            </div>
        );
    }
}

export default SignInUpWindow;
