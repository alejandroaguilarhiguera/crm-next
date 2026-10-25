
'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type MenuActionsProps = {
    onViewRedirect: string;
    onEditRedirect: string;
    onDelete: () => void;
};

export default function MenuActions({
    onViewRedirect,
    onEditRedirect,
    onDelete,
}: MenuActionsProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                aria-label="Product actions"
                aria-controls={open ? 'product-actions-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                size="small"
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="product-actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <Link className='flex gap-.5' href={onViewRedirect}>
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View</ListItemText>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link className='flex gap-.5' href={onEditRedirect}>

                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </Link>

                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleClose();
                        onDelete();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
