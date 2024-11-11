// FixedToolbar.tsx
'use client';

import React, { MouseEvent } from 'react';
import { Toolbar, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list';

const FixedToolbar: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const openMenu = Boolean(anchorEl);

	const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const formatText = (formatType: string) => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
	};

	const insertList = (type: 'ordered' | 'unordered') => {
		const command = type === 'ordered' ? INSERT_ORDERED_LIST_COMMAND : INSERT_UNORDERED_LIST_COMMAND;
		editor.dispatchCommand(command);
	};

	const insertLink = () => {
		const url = prompt("Enter the URL");
		if (url) {
			editor.dispatchCommand('TOGGLE_LINK', url);
		}
	};

	return (
		<Toolbar variant="dense">
			<IconButton onClick={() => formatText('bold')}><FormatBoldIcon /></IconButton>
			<IconButton onClick={() => formatText('italic')}><FormatItalicIcon /></IconButton>
			<IconButton onClick={() => formatText('underline')}><FormatUnderlinedIcon /></IconButton>
			<Divider orientation="vertical" flexItem />
			<IconButton onClick={() => insertList('unordered')}><FormatListBulletedIcon /></IconButton>
			<IconButton onClick={() => insertList('ordered')}><FormatListNumberedIcon /></IconButton>
			<Divider orientation="vertical" flexItem />
			<IconButton onClick={insertLink}><LinkIcon /></IconButton>
			<IconButton onClick={handleMenuClick}><TitleIcon /></IconButton>

			<Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
				<MenuItem onClick={() => { editor.dispatchCommand('heading', 'h1'); handleMenuClose(); }}>Heading 1</MenuItem>
				<MenuItem onClick={() => { editor.dispatchCommand('heading', 'h2'); handleMenuClose(); }}>Heading 2</MenuItem>
				<MenuItem onClick={() => { editor.dispatchCommand('heading', 'h3'); handleMenuClose(); }}>Heading 3</MenuItem>
			</Menu>
		</Toolbar>
	);
};

export default FixedToolbar;
