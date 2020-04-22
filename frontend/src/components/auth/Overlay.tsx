import React, {Component} from 'react';

interface Props {
    handleClickSignUpButton(event: any): void;

    handleClickSignInButton(event: any): void;
}

class Overlay extends Component<Props> {
    render() {
        const {handleClickSignUpButton, handleClickSignInButton} = this.props;
        return (
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p className="overlay-description">
                            To keep connected with us please login with your personal info<br/>
                        </p>
                        <button
                            className="ghost form-button"
                            id="signIn"
                            onClick={handleClickSignInButton}
                        >Sign In
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p className="overlay-description">
                            Enter your personal details and start journey with us<br/>
                        </p>
                        <button
                            className="ghost form-button"
                            id="signUp"
                            onClick={handleClickSignUpButton}
                        >Sign Up
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overlay;