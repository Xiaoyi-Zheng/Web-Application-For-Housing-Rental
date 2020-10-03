import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        this.props.onSearchSubmitted(this.refs.query.value, this.refs.field.value);
        event.preventDefault();
    }

    render() {
        return (
            <div  className="mx-3 ">
                <div className="form-group">
                    <form onSubmit={this.handleSubmit}>
                        <select className="form-control" ref='field'>
                            <option>All</option>
                            <option>Name</option>
                            <option>Phone</option>
                            <option>Email</option>
                            <option>Address</option>
                            <option>Description</option>
                        </select>
                        {/*add mx here to set margin for bar and btn*/}
                         <input className="form-control" type="text" ref='query' placeholder="Search..."/>
                         <input className="btn btn-outline-primary" type="submit" value="Search" />
                    </form>
                </div>
            </div>
        );
    }
}

export  default  SearchBar;