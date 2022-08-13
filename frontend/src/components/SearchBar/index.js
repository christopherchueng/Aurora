import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSearchedTracks } from '../../store/search'
import './SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [keyword, setKeyword] = useState('')
    let query = `q=${keyword}`

    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(getSearchedTracks({keyword}))
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
