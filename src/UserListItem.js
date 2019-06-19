import React, { Component } from 'react'
import axios from 'axios';

export default class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            searchTerm: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const url = 'https://randomuser.me/api/?results=25'
        this.setState({ isLoading: true })
        axios.get(url).then((response) => {
            console.log(response.data.results)
            this.setState({
                users: response.data.results,
                isLoading: false
            })
        })
        .catch((error) => {
            this.setState({ isLoading: false })
        })
    }

    handleDelete(value) {
        let array = this.state.users.filter(user => user !== value)
        this.setState({ users: array })
    }

    render() {
        return (
            <ul>
                {this.state.users.map((user) => {
                    let gender = ''
                    if(user.gender=='male'){
                        gender = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Creative-Tail-People-man-2.svg'}
                    else {
                        gender = 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Creative-Tail-People-police-women.svg'
                    }
                    
                    return( 
                        <li key={user.email}>
                            <img src={gender} style={{ maxWidth: 50 }} alt={user.gender} /><br />
                            Name: {user.name.first && (user.name.first)} {user.name.last && (user.name.last)}<br />
                            {user.picture.thumbnail && (<img src={user.picture.thumbnail} alt={user.name.first+ ' '+user.name.last} />)}<br />
                            Country: {user.nat && (user.nat)}<br />
                            {user.nat=='US' && (<figure><img src="https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392_960_720.png" style={{ maxWidth: 200 }} alt='Flag of USA' /></figure>)}
                            City: {user.location.city && (user.location.city)}<br />
                            State: {user.location.state && (user.location.state)}<br />
                            Email: {user.email && (user.email)}<br />
                            <button onClick={()=>{this.handleDelete(user)}}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
