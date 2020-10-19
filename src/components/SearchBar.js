import React, {Component} from 'react'
import { 
    Form,
    FormGroup,
    Input,
    ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import {FaRegArrowAltCircleRight} from 'react-icons/fa'

class SearchBar extends Component {
    state = {
        search: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchForUsers = (search) => {
        console.log(`searching for user ${search}`)
    }

    componentDidUpdate () {
        this.searchForUsers(this.state.search)
    }

    render () {
        console.log(this.state.search)
        return (
            <div>
                <Form style={{width: '38vw', padding: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <FormGroup style={{margin: '0 auto', width: '85%'}}>
                        <Input type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        onChange={this.handleChange} />
                    </FormGroup>
                    <Link>
                        <FaRegArrowAltCircleRight size="25px" style={{color: 'grey'}} />
                    </Link>
                </Form>
            </div>
        
        )
    }
}

export default SearchBar
