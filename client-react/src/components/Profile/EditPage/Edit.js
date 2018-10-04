import React, { Component }from 'react';
import Input from './../../UI/Input/Input';
import Button from './../../UI/Button/Button';
import './Edit.css';

class EditPage extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        user: this.props.user,
        editForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter new name"
                },
                value: this.props.user.username
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your email"
                },
                value: "",
                validation : {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: "password",
                    placeholder: "Enter your password"
                },
                value: "",
                validation : {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        isFormValid: false,
        error: false
    };

    inputChangedHandler = (e, inputIdentifier) => {
        const newEditForm = { ...this.state.editForm };
        let updatedControl = { ...newEditForm[inputIdentifier] };
        updatedControl.value = e.target.value;
        newEditForm[inputIdentifier] = updatedControl;


        this.setState({
            editForm: newEditForm
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="text-center col-12 edit-header">Change your profile</div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-11 editForm-wrapper">
                        <div className="row edit-row">
                            <div className="editForm nameForm col-12 col-md-6">
                                 <Input label="Name"
                                        elementType={ this.state.editForm.username.elementType }
                                        elementConfig={ this.state.editForm.username.elementConfig}
                                        value={ this.state.editForm.username.value }
                                        changed={ (event) => this.inputChangedHandler(event, "username") }
                                 />
                                <Button btnType="primary">Submit</Button>
                            </div>
                            <div className="editForm dobForm col-12 col-md-5">
                                 <h3 className="edit-subhead">Date of birthday</h3>
                            </div>
                        </div>
                        <div className="row edit-row">
                            <div className="editForm statusForm col-12 col-md-6">
                                 <h3 className="edit-subhead">Status</h3>
                            </div>
                            <div className="editForm socialForm col-12 col-md-5">
                                <h3 className="edit-subhead">Social links</h3>
                            </div>
                        </div>
                       <div className="row edit-row">
                           <div className="editForm interestsForm col-12 col-md-6">
                               <h3 className="edit-subhead">Interests</h3>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPage;