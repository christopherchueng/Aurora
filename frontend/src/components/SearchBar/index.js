import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SearchBar.css'

const SearchBar = () => {
    const history = useHistory()
    const [keyword, setKeyword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        history.push(`/search?q=${keyword}`)
    }

    return (
        <div id='searchbar'>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    value={keyword}
                    placeholder='Search'
                    onChange={e => setKeyword(e.target.value)}
                    className='searchbar-input'
                />
            </form>
        </div>
    )
}

export default SearchBar
