import React from 'react';

import './userTuple.css';

const UserTuple = (props) => {

    const {user, deleteUser, toggleFavourite} = props;

    return (
        <div key={user.name} className="user-tuple all-transition">
            <div className="user-details">
                <span className="user-name">
                    {user.name}
                </span>
                <span className="tag-line">
                    is your friend
                </span>
            </div>
            <div className="cta-container">
                <span onClick={toggleFavourite} title="Favourite"
                      className={`cta all-transition ${user.isFavourite ? 'favourite-cta' : ''}`}>
                    <i className={`fa fa-star all-transition ${user.isFavourite ? 'favourite' : ''}`}/>
                </span>
                <span onClick={deleteUser} title="Delete" className="cta delete-cta all-transition">
                    <i className="fa fa-trash-o"/>
                </span>
            </div>
        </div>
    );
};

export default UserTuple;
