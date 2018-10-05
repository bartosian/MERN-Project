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
            occupation: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your occupation",
                },
                value: this.props.user.occupation
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your country",
                },
                value: this.props.user.country
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
                value: this.props.user.status || "Single"
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
                        {value: "email", displayValue: "Email", userValue: (this.props.user.contacts && this.props.user.contacts.email) || ""},
                        {value: "linkedIn", displayValue: "LinkedIn", userValue: (this.props.user.contacts && this.props.user.contacts.linkedIn) || ""},
                        {value: "instagram", displayValue: "Instagram", userValue: (this.props.user.contacts && this.props.user.contacts.instagram) || ""},
                        {value: "facebook", displayValue: "Facebook", userValue: (this.props.user.contacts && this.props.user.contacts.facebook) || ""}
                    ]
                },
                value: "email"
            }
        },
        loading: false
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

            case "country": {
                const country = this.state.editForm.country.value;

                this.service.changeCountry({ country })
                    .then(response => {

                        const newUser = {...user};
                        newUser.country = response;

                        getUser(newUser);

                        this.setState({
                            loading: false
                        });
                    }).catch(err => console.log(err));
                break;
            }

            case "occupation": {
                const occupation = this.state.editForm.occupation.value;

                this.service.changeOccupation({ occupation })
                    .then(response => {

                        const newUser = {...user};
                        newUser.occupation = response;

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

            case "interests": {
                const interests = this.state.editForm.interests.value;

                this.service.changeInterests({ interests })
                    .then(response => {

                        const newUser = {...user};
                        newUser.interests = response;

                        getUser(newUser);

                        this.setState({
                            loading: false
                        });
                    }).catch(err => console.log(err));
                break;
            }

            case "contacts": {
                const contactProp = this.state.editForm.contacts.value;
                const contactVal = this.state.editForm.contacts.elementConfig.options.find(opt => opt.value === contactProp).userValue;

                this.service.changeContacts({ [contactProp] : contactVal })
                    .then(response => {

                        const newUser = {...user};
                        newUser.contacts = response;

                        getUser(newUser);

                        this.setState({
                            loading: false
                        });
                    }).catch(err => console.log(err));
                break;
            }

            default: return;

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
                                <Button btnType="primary" clicked={ () => this.handleSubmit("username") } disabled={ !this.state.editForm.username.value || this.state.loading }>Submit</Button>
                            </div>
                            <div className="editForm dobForm col-12 col-md-5">
                                <Input label="Date of birthday"
                                       elementType={ this.state.editForm.dob.elementType }
                                       elementConfig={ this.state.editForm.dob.elementConfig}
                                       value={ this.state.editForm.dob.value }
                                       changed={ (event) => this.inputChangedHandler(event, "dob") }
                                />
                                <Button btnType="primary" clicked={ () => this.handleSubmit("dob") } disabled={ !this.state.editForm.dob.value || this.state.loading }>Submit</Button>
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
                                <Button btnType="primary" clicked={ () => this.handleSubmit("status") } disabled={ !this.state.editForm.status.value || this.state.loading }>Submit</Button>
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
                                <Button btnType="primary" clicked={ () => this.handleSubmit("contacts") } disabled={ !this.state.editForm.contacts.value || this.state.loading }>Submit</Button>
                            </div>
                        </div>
                       <div className="row edit-row">
                           <div className="editForm nameForm col-12 col-md-6">
                               <Input label="Country"
                                      elementType={ this.state.editForm.country.elementType }
                                      elementConfig={ this.state.editForm.country.elementConfig}
                                      value={ this.state.editForm.country.value }
                                      changed={ (event) => this.inputChangedHandler(event, "country") }
                               />
                               <Button btnType="primary" clicked={ () => this.handleSubmit("country") } disabled={ !this.state.editForm.country.value || this.state.loading }>Submit</Button>
                           </div>
                           <div className="editForm nameForm col-12 col-md-5">
                               <Input label="Occupation"
                                      elementType={ this.state.editForm.occupation.elementType }
                                      elementConfig={ this.state.editForm.occupation.elementConfig}
                                      value={ this.state.editForm.occupation.value }
                                      changed={ (event) => this.inputChangedHandler(event, "occupation") }
                               />
                               <Button btnType="primary" clicked={ () => this.handleSubmit("occupation") } disabled={ !this.state.editForm.occupation.value || this.state.loading }>Submit</Button>
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
                                <Button btnType="primary" clicked={ () => this.handleSubmit("interests") } disabled={ !this.state.editForm.interests.value || this.state.loading }>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPage;