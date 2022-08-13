import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSearchedTracks } from '../../store/search'
import './SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const tracks = await dispatch(getSearchedTracks({keyword}))
        console.log('what is this...?', tracks)
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
