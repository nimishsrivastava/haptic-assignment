import React, {useState} from 'react';

import './userTuple.css';

const UserTuple = (props) => {
    const [isFavourite, toggleFavourite] = useState(false);

    const {userName, deleteUser} = props;

    return (
        <div key={userName} className="user-tuple all-transition">
            <div className="user-details">
                <span className="user-name">
                    {userName}
                </span>
                <span className="tag-line">
                    is your friend
                </span>
            </div>
            <div className="cta-container">
                <span onClick={() => toggleFavourite(prevFlag => !prevFlag)} title="Favourite"
                      className={`cta all-transition ${isFavourite ? 'favourite-cta' : ''}`}>
                    <i className={`fa fa-star all-transition ${isFavourite ? 'favourite' : ''}`}/>
                </span>
                <span onClick={deleteUser} title="Delete" className="cta delete-cta all-transition">
                    <i className="fa fa-trash-o"/>
                </span>
            </div>
        </div>
    );
};

export default UserTuple;
