import React, {Component} from 'react';
import HousingService from './HousingService';

const housingService = new HousingService();

class HousingCreateUpdate extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.props.setType();

        this.state = {
            image: null,
        };
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        //console.log(this.props);
        if(params && params.pk)
        {
            housingService.getHousing(params.pk).then((c)=>{
                this.refs.address.value = c.address;
                this.refs.rent.value = c.rent;
            })
        }
    }

    handleImageChange(event){
        this.setState({
            image: event.target.files[0]
        })
    }

    handleCreate(){
        let form_data = new FormData();
        form_data.append('address',this.refs.address.value);
        form_data.append('rent', this.refs.rent.value);
        form_data.append('image', this.state.image, this.state.image.name);
        housingService.createHousing(form_data).then((result)=>{
            alert("Housing created!");
            this.props.history.push({ pathname: "/myhousing/",pk:this.props.location.pk})
        }).catch(()=>{
            alert('There was an error! Please re-check your form.');
        });
    }
    handleUpdate(pk){
        let form_data = new FormData();
        form_data.append('pk',pk);
        form_data.append('address',this.refs.address.value);
        form_data.append('rent', this.refs.rent.value);
        form_data.append('image', this.state.image, this.state.image.name);
        housingService.updateHousing(form_data).then((result)=>{
            console.log(result);
            alert("Housing updated!");
            this.props.history.push({ pathname: "/myhousing/",pk:this.props.location.pk})
        }).catch(()=>{
            alert('There was an error! Please re-check your form.');
        });
    }
    handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
            this.handleUpdate(params.pk);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        //let location = useLocation();
        //console.log(this.props.location.pk);
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Address:</label>
                    <input className="form-control" type="text" ref='address' required/>

                    <label>
                        Rent:</label>
                    <input className="form-control" type="number"  ref='rent' required/>

                    <label>
                        Image:</label>
                    <input type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
export default HousingCreateUpdate;