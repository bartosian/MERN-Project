import React, { Component }from 'react';
import Input from './../../UI/Input/Input';
import Button from './../../UI/Button/Button';
import  moment  from 'moment';
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
                    placeholder: "Enter new name",
                },
                value: this.props.user.username
            },
            dob: {
                elementType: 'input',
                elementConfig: {
                    type: "date",
                    placeholder: "Enter your date of birthday"
                },
                value: moment(this.props.user.dob).format('YYYY-MM-DD')
            },
            status: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "Single", displayValue: "Single"},
                        {value: "Married", displayValue: "Married"},
                        {value: "Have a friend", displayValue: "Have a friend"}
                    ]
                },
                value: this.props.user.status
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

    handleSubmit = () => {
        console.log(this.state.editForm.dob.value);
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
                                <Button btnType="primary" clicked={ this.handleSubmit }>Submit</Button>
                            </div>
                            <div className="editForm dobForm col-12 col-md-5">
                                <Input label="Date of birthday"
                                       elementType={ this.state.editForm.dob.elementType }
                                       elementConfig={ this.state.editForm.dob.elementConfig}
                                       value={ this.state.editForm.dob.value }
                                       changed={ (event) => this.inputChangedHandler(event, "dob") }
                                />
                                <Button btnType="primary" clicked={ this.handleSubmit }>Submit</Button>
                            </div>
                        </div>
                        <div className="row edit-row">
                            <div className="editForm statusForm col-12 col-md-6">
                                <Input label="Status"
                                       elementType={ this.state.editForm.status.elementType }
                                       elementConfig={ this.state.editForm.status.elementConfig}
                                       value={ this.state.editForm.status.value }
                                       changed={ (event) => this.inputChangedHandler(event, "status") }
                                />
                                <Button btnType="primary" clicked={ this.handleSubmit }>Submit</Button>
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