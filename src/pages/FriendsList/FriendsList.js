import React, {useState, useEffect} from 'react';

import UserTuple from "./friendsListFrames/UserTuple/UserTuple";
import TextInput from "../../library/common/components/TextInput/TextInput";

import './friendsList.css';
import {Pagination} from "../../library/common/components/Pagination/Pagination";

const FriendsList = () => {
    const [friendsList, updateFriendsList] = useState([]);
    const [filteredFriendsList, updateFilteredList] = useState([]);
    const [addFriendName, onChangeNewFriendName] = useState('');
    const [addFriendError, updateAddFriendError] = useState('');
    const [searchText, updateSearchText] = useState('');
    const [currentPage, updateCurrentPage] = useState(1);

    useEffect(() => {
        updateFilteredList(friendsList);
        updateSearchText('');
        updateCurrentPage(1);
    }, [friendsList.length]);

    const addNewFriend = (e) => {
        if (e.key === 'Enter') {
            if (friendsList.indexOf(e.target.value) === -1) {
                const list = [e.target.value, ...friendsList];
                updateFriendsList(list);
            } else {
                updateAddFriendError(e.target.value + ' is already added.')
            }

            onChangeNewFriendName('');
        }
    };

    const deleteUser = (user) => {
        const list = [...friendsList];
        list.splice(list.indexOf(user), 1);
        updateFriendsList(list);
    };

    const searchFriend = (searchText) => {
        updateSearchText(searchText);
        let filteredList = [...friendsList];
        if (searchText) {
            filteredList = friendsList.filter(friend => friend.toLowerCase().includes(searchText.toLowerCase()));
        }
        updateFilteredList(filteredList)
    };

    const onChangePage = (pageNumber) => {
        updateCurrentPage(pageNumber);
    };

    return (
        <div className="friends-list-container">
            <div>
                <div className="friends-list-header">
                    Friends List
                </div>
                <TextInput
                    value={addFriendName}
                    onChange={(e) => {
                        updateAddFriendError('');
                        onChangeNewFriendName(e.target.value)
                    }}
                    errorText={addFriendError}
                    placeholder="Enter your friend's name"
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
                    <UserTuple key={user} deleteUser={() => deleteUser(user)} userName={user}/>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredFriendsList.length / 4) || 1}
                onClickPageNumber={onChangePage}
            />
        </div>
    );
};

export default FriendsList;
