import React, { Component }from 'react';
import './Edit.css';

class EditPage extends Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                       Summary Form
                    </div>
                    <div className="col-12 col-md-6">
                        Interests Form
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPage;