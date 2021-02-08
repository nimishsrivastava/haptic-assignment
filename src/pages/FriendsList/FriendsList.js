import React, {useState, useEffect} from 'react';

import UserTuple from "./friendsListFrames/UserTuple/UserTuple";
import TextInput from "../../library/common/components/TextInput/TextInput";
import {Pagination} from "../../library/common/components/Pagination/Pagination";

import './friendsList.css';

const FriendsList = () => {

    const [friendsList, updateFriendsList] = useState([]);
    const [filteredFriendsList, updateFilteredList] = useState([]);
    const [addFriendName, onChangeNewFriendName] = useState('');
    const [addFriendError, updateAddFriendError] = useState('');
    const [searchText, updateSearchText] = useState('');
    const [currentPage, updateCurrentPage] = useState(1);
    const [isSortedByFavourite, sortFavourite] = useState(false);

    useEffect(() => {
        updateFilteredList(friendsList);
        updateSearchText('');
        updateCurrentPage(1);
    }, [friendsList.length]);

    useEffect(() => {
        sortByFavourite()
    }, [filteredFriendsList.length, isSortedByFavourite]);

    const sortByFavourite = () => {
        if (isSortedByFavourite) {
            const list = [...filteredFriendsList];
            const favourites = [];
            const nonFavourites = [];
            list.forEach(friend => {
                friend.isFavourite ? favourites.push(friend) : nonFavourites.push(friend)
            });
            updateFilteredList([...favourites, ...nonFavourites])
        } else {
            searchFriend(searchText);
        }
    };

    const addNewFriend = (e) => {
        if (e.key === 'Enter') {
            if (friendsList.findIndex(friend => friend.name === e.target.value) === -1) {
                const list = [{name: e.target.value, isFavourite: false}, ...friendsList];
                updateFriendsList(list);
            } else {
                updateAddFriendError(e.target.value + ' is already added.')
            }

            onChangeNewFriendName('');
        }
    };

    const deleteFriend = (user) => {
        const list = [...friendsList];
        list.splice(list.findIndex(friend => friend.name === user.name), 1);
        updateFriendsList(list);
    };

    const searchFriend = (searchText) => {
        updateSearchText(searchText);
        let filteredList = [...friendsList];
        if (searchText) {
            filteredList = friendsList.filter(friend => friend.name.toLowerCase().includes(searchText.toLowerCase()));
        }
        updateFilteredList(filteredList)
    };

    const onChangePage = (pageNumber) => {
        updateCurrentPage(pageNumber);
    };

    const markAsFavourite = (user) => {
        const list = [...friendsList];
        list.forEach(friend => {
            if (friend.name === user.name)
                friend.isFavourite = !friend.isFavourite
        });
        updateFriendsList(list);
    };

    const toggleFavouriteFlag = () => {
        sortFavourite(prevFlag => !prevFlag)
    };

    return (
        <div className="friends-list-container">
            <div>
                <div className="friends-list-header">
                    <span>Friends List</span>
                    <span>
                        <span
                            onClick={toggleFavouriteFlag}
                            title="Favourite"
                            className={`cta all-transition ${isSortedByFavourite ? 'favourite-cta' : ''}`}
                        >
                            <i className={`fa fa-star all-transition ${isSortedByFavourite ? 'favourite' : ''}`}/>
                        </span>
                        <i className={`fa ${isSortedByFavourite ? 'fa-caret-up' : 'fa-caret-down'}`}/>
                    </span>
                </div>
                <TextInput
                    value={addFriendName}
                    onChange={(e) => {
                        updateAddFriendError('');
                        onChangeNewFriendName(e.target.value)
                    }}
                    errorText={addFriendError}
                    placeholder="Enter your friend's name to add"
                    iconClass="fa-user-plus"
                    onKeyDown={addNewFriend}
                    onClickIcon={(value) => addNewFriend({key: 'Enter', target: {value}})}
                />
                {!!friendsList.length && <TextInput
                    value={searchText}
                    onChange={(e) => searchFriend(e.target.value)}
                    placeholder="Search friends"
                    iconClass="fa-search"
                />}
                {filteredFriendsList.slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4).map((user) => (
                    <UserTuple
                        key={user}
                        deleteUser={() => deleteFriend(user)}
                        toggleFavourite={() => markAsFavourite(user)}
                        user={user}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredFriendsList.length / 4) || 1}
                onPageChange={onChangePage}
            />
        </div>
    );
};

export default FriendsList;
