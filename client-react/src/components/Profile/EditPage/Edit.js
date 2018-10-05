import React, { Component }from 'react';
import Input from './../../UI/Input/Input';
import Button from './../../UI/Button/Button';
import  moment  from 'moment';
import UserService from '../../../services/user-service';
import './Edit.css';

class EditPage extends Component {

    constructor(props) {
        super(props);
        this.service = new UserService();
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
                value: (() => {
                    let dob = new Date(this.props.user.dob);
                    dob = dob.setDate(dob.getDate() + 1);
                    return moment(dob).format('YYYY-MM-DD')
                })()
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
            },
            interests: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: "Enter your interests separated by coma"
                },
                value: this.props.user.interests.join(",")
            },
            contacts: {
                elementType: 'select',
                elementSubType: 'input',
                elementSubConfig: {
                    type: "text",
                    placeholder: "Enter new contact",
                },
                elementConfig: {
                    options: [
                        {value: "email", displayValue: "Email", userValue: (this.props.user.contacts && this.props.user.contacts.email) || "Enter your email"},
                        {value: "linkedIn", displayValue: "LinkedIn", userValue: (this.props.user.contacts && this.props.user.contacts.linkedIn) || "Enter your linkedIn"},
                        {value: "instagram", displayValue: "Instagram", userValue: (this.props.user.contacts && this.props.user.contacts.instagram) || "Enter your instagram"},
                        {value: "facebook", displayValue: "Facebook", userValue: (this.props.user.contacts && this.props.user.contacts.facebook) || "Enter your facebook"}
                    ]
                },
                value: "email"
            }
        },
        loading: false,
        isFormValid: false,
        error: false
    };

    inputChangedHandler = (e, inputIdentifier) => {

        if(inputIdentifier === "email" || inputIdentifier === "linkedIn" || inputIdentifier === "instagram" || inputIdentifier === "facebook") {
            const newEditForm = { ...this.state.editForm };
            let updatedControl = [ ...newEditForm.contacts.elementConfig.options ];
            const optionIdx = updatedControl.findIndex(opt => opt.value === inputIdentifier );
            updatedControl[optionIdx].userValue = e.target.value;
            newEditForm.contacts.elementConfig.options = updatedControl;

            this.setState({
                editForm: newEditForm
            });

            return;
        }
        const newEditForm = { ...this.state.editForm };
        let updatedControl = { ...newEditForm[inputIdentifier] };
        updatedControl.value = e.target.value;
        newEditForm[inputIdentifier] = updatedControl;


        this.setState({
            editForm: newEditForm
        });
    };

    handleSubmit = (token) => {

        const { getUser } = this.props;
        const { user } = this.props;

        this.setState({
            loading: true
        });
        switch(token) {
            case "username": {
                const username = this.state.editForm.username.value;

                this.service.changeName({ username })
                    .then(response => {

                        const newUser = {...user};
                        newUser.username = response;

                        getUser(newUser);

                        this.setState({
                            loading: false
                        });
                    }).catch(err => console.log(err));
                break;
            }

            case "status": {
                const status = this.state.editForm.status.value;

                this.service.changeStatus({ status })
                    .then(response => {

                        const newUser = {...user};
                        newUser.status = response;

                        getUser(newUser);

                        this.setState({
                            loading: false
                        });
                    }).catch(err => console.log(err));
                break;
            }

            case "dob": {
                const dob = this.state.editForm.dob.value;

                this.service.changeDob({ dob })
                    .then(response => {

                        const newUser = {...user};
                        newUser.dob = response;

                        getUser(newUser);

                        this.setState({
                            loading: false
                        });
                    }).catch(err => console.log(err));
                break;
            }

        }


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
                                <Button btnType="primary" clicked={ () => this.handleSubmit("username") }>Submit</Button>
                            </div>
                            <div className="editForm dobForm col-12 col-md-5">
                                <Input label="Date of birthday"
                                       elementType={ this.state.editForm.dob.elementType }
                                       elementConfig={ this.state.editForm.dob.elementConfig}
                                       value={ this.state.editForm.dob.value }
                                       changed={ (event) => this.inputChangedHandler(event, "dob") }
                                />
                                <Button btnType="primary" clicked={ () => this.handleSubmit("dob") }>Submit</Button>
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
                                <p className="interests-hint">Enter your family status</p>
                                <Button btnType="primary" clicked={ () => this.handleSubmit("status") }>Submit</Button>
                            </div>
                            <div className="editForm socialForm col-12 col-md-5">
                                <Input label="Contacts"
                                       elementType={ this.state.editForm.contacts.elementType }
                                       elementConfig={ this.state.editForm.contacts.elementConfig}
                                       value={ this.state.editForm.contacts.value }
                                       changed={ (event) => this.inputChangedHandler(event, "contacts") }
                                />
                                <Input label={ this.state.editForm.contacts.value }
                                       elementType={ this.state.editForm.contacts.elementSubType }
                                       elementConfig={ this.state.editForm.contacts.elementSubConfig}
                                       value={ this.state.editForm.contacts.elementConfig.options.find(o => o.value === this.state.editForm.contacts.value).userValue }
                                       changed={ (event) => this.inputChangedHandler(event, this.state.editForm.contacts.value ) }
                                />
                                <Button btnType="primary" clicked={ () => this.handleSubmit("contacts") }>Submit</Button>
                            </div>
                        </div>
                       <div className="row edit-row">
                           <div className="editForm interestsForm col-12 col-md-6">
                               <Input label="Interests"
                                      elementType={ this.state.editForm.interests.elementType }
                                      elementConfig={ this.state.editForm.interests.elementConfig}
                                      value={ this.state.editForm.interests.value }
                                      changed={ (event) => this.inputChangedHandler(event, "interests") }
                               />
                               <p className="interests-hint">Enter your interests separated by coma</p>
                               <Button btnType="primary" clicked={ () => this.handleSubmit("interests") }>Submit</Button>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPage;