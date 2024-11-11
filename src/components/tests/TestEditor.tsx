'use client'

import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FloatingToolbar } from './FloatingToolbar';
import { Box } from "@mui/material";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $getRoot, LexicalEditor } from 'lexical';
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { PreserveSelectionPlugin } from "./plugins/PreserveSelectionPlugin";
import DraggableBlockPlugin from "@/components/tests/plugins/DraggableBlockPlugin";

interface TextEditorProps {
  content?: string;
  onSave: (content: string) => void;
  onAIRequest?: (prompt: string) => Promise<string>;
}

// Компонент для инициализации контента из Markdown
const MarkdownInitializer: React.FC<{ content: string }> = ({ content }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content && editor) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        try {
          $convertFromMarkdownString(content, TRANSFORMERS);
        } catch (error) {
          console.error('Error converting markdown:', error);
        }
      });
    }
  }, [content, editor]);

  return null;
};

const TextEditor: React.FC<TextEditorProps> = ({ content = '', onSave, onAIRequest }) => {
  const [editorContent, setEditorContent] = useState<string>(content);

  const handleSave = () => {
    onSave(editorContent);
  };

  const onChange = (editorState) => {
    const newContent = editorState.toJSON();
    setEditorContent(newContent);
  };

  const initialConfig = {
    namespace: 'Pers editor',
    onError: (error: Error) => {
      console.error('Editor Error:', error);
    },
    nodes: [
      HorizontalRuleNode,
      CodeNode,
      LinkNode,
      ListNode,
      ListItemNode,
      HeadingNode,
      QuoteNode,
    ],
    theme: {
      text: {
        bold: "lexical-bold",
        italic: "lexical-italic",
        underline: "lexical-underline",
        strikethrough: "lexical-strikethrough",
      },
    },
  };

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* Компонент для инициализации контента из Markdown */}
      <MarkdownInitializer content={content} />

      <div className="relative flex flex-row justify-between h-[calc(100%-60px)] w-full flex-1 rounded-2xl">
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
          <RichTextPlugin
            contentEditable={
              <div ref={onRef}>
                <ContentEditable className="relative outline-none w-full h-full px-8 py-4" />
              </div>
            }
            placeholder={<Box sx={{ position: 'absolute', top: '0px', left: '20px', color: 'silver' }}>Enter some text...</Box>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <PreserveSelectionPlugin />
          <FloatingToolbar />
          {floatingAnchorElem && (
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
};

export default TextEditor;
