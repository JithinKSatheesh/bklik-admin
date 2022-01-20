import React from 'react';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { ReactComponent as Logo } from '../assets/Logo2.svg' 

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// ** hooks
import initUser from 'auth/initUser'


export const Navbar = (props) => {

    const { logOutUser} = initUser()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="w-full py-1 px-4 bg-green bg-texture shadow-xl fixed">
            <div className="flex justify-between items-center">
                <div>
                    <Logo width={50} />
                </div>
                <div>
                    <Avatar onClick={handleClick} className='cursor-pointer'  >
                        <PersonIcon />
                    </Avatar>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to='/dashboard/users'>
                                Users
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to='/dashboard/orders'>
                                Orders
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to='/dashboard/delivery'>
                                delivery
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={() => logOutUser()}>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>

        </div>
    );
};
