import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    return (
        <div id='searchbar'>
            <form>
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
