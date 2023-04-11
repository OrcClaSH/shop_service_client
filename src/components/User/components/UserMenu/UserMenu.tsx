import React from 'react';
import styles from '../../User.module.scss';
import FollowUserMenu from '../FollowUserMenu';
import Signin from '../Signin';
import Signup from '../Signup';

interface IUserMenu {
    isAuthUser: Boolean;
}

const UserMenu: React.FC<IUserMenu> = ({ isAuthUser }) => {
    const [activeSignup, setActiveSignup] = React.useState(false);

    if (activeSignup) {
        return (
            <div className={styles['user-menu']}>
                <Signup setActiveSignup={setActiveSignup}/>
            </div>
        )
    }

    return (
        <div className={styles['user-menu']}>
            {isAuthUser
                ? <FollowUserMenu />
                : <Signin setActiveSignup={setActiveSignup}
            />}

            {/* {isAuthUser && !activeSignup
                ? <FollowUserMenu />
                : activeSignup
                    ? <Signup />
                    : <Signin setActiveSignup={setActiveSignup} />
            } */}

        </div>
    )
};

export default UserMenu;
