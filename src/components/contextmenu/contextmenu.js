import React, { useState } from 'react';
import {
    ControlledMenu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <div onContextMenu={e => {
            e.preventDefault();
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            setOpen(true);
        }}>
            Right click to open context menu

            <ControlledMenu anchorPoint={anchorPoint} isOpen={isOpen}
                onClose={() => setOpen(false)}>
                <MenuItem>详情</MenuItem>
                <MenuItem>修改</MenuItem>
                <MenuItem>删除</MenuItem>
            </ControlledMenu>
        </div >
    );
}