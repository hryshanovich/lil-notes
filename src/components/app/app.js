import React, { Component } from "react";
import { Container } from "reactstrap";
import Header from "../header/header";
import PostAddForm from "../postAddForm/postAddForm";
import PostList from "../postList/postList";
import PostStatusFilter from "../postStatusFilter/postStatusFilter";
import SearchPanel from "../searchPanel/searchPanel";
import './app.css'

export default class App extends Component {
    state = {
        data: [
            { label: 'Going to learn React', important: false, like: true, id: '1' },
            { label: 'That is so good', important: false, like: false, id: '2' },
            { label: 'I need a break', important: false, like: false, id: '3' }
        ],
        term: '',
        filter: 'all'
    };

    max = 4;

    deletedItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)
            const before = data.slice(0, index)
            const after = data.slice(index + 1)
            const res = [...before, ...after]

            return {
                data: res
            }
        })
    }

    onAddItem = (body) => {

        const newItem = {
            label: body,
            import: false,
            id: this.max++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem]
            console.log(newArr);
            return {
                data: newArr
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]
            const newItem = { ...old, important: !old.important }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    onToggleLiked = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]
            const newItem = { ...old, like: !old.like }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term) > -1
        })
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({ term })
    }

    onFilterSelect = (filter) => {
        this.setState({
            filter
        })
    }

    render() {

        const { data, term, filter } = this.state

        const liked = data.filter(item => item.like).length
        const allPosts = data.length

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter)

        return (
            <div className="app">
                <Container>
                    <Header liked={liked} allPosts={allPosts} />
                </Container>
                <Container>
                    <div className="search-panel d-flex">
                        <SearchPanel
                            onUpdateSearch={this.onUpdateSearch} />
                        <PostStatusFilter
                            filter={filter}
                            onFilterSelect={this.onFilterSelect}
                        />
                    </div>
                </Container >
                <Container>
                    <PostList
                        posts={visiblePosts}
                        onDelete={this.deletedItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleLiked={this.onToggleLiked}
                    />
                </Container>

                <Container>
                    <PostAddForm
                        onAdd={this.onAddItem}
                    />
                </Container>
            </div>

        )
    }
}