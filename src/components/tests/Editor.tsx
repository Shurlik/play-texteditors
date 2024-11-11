'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { Box } from "@mui/material";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { EditorConfig } from 'lexical';

const theme = {
	// Theme styling goes here
	//...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error): void {
	console.error(error);
}

export default function Editor(): JSX.Element {
	const initialConfig: EditorConfig = {
		namespace: 'MyEditor',
		theme,
		onError,
		nodes: [
			HorizontalRuleNode,
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			LinkNode,
			CodeNode,
		],
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'silver',
				height: '50rem',
				width: '100%',
				border: '1px solid red'
			}}
		>
			<Box sx={{ position: 'relative', width: '100%', padding: '30px 10px' }}>
				<LexicalComposer initialConfig={initialConfig}>
					<RichTextPlugin
						contentEditable={<ContentEditable className={'editableContent'} />}
						placeholder={<Box sx={{ position: 'absolute', top: '20px', left: '20px' }}>Enter some text...</Box>}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<MarkdownShortcutPlugin />
				</LexicalComposer>
			</Box>
		</Box>
	);
}
