/// components/Editor.tsx
'use client';

import {useEffect} from 'react';
import {useLiveblocksExtension} from '@liveblocks/react-tiptap';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {Toolbar} from './Toolbar';
import {Threads} from './Threads';
import {BulletList} from "@tiptap/extension-bullet-list";
import {ListItem} from "@tiptap/extension-list-item";
import {TaskItem, TaskList} from "novel/extensions";
import {OrderedList} from "@tiptap/extension-ordered-list";
import {Dropcursor} from "@tiptap/extension-dropcursor";
import {Blockquote} from "@tiptap/extension-blockquote";
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image'

export function Editor() {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit,
      BulletList,
      ListItem,
      TaskList,
      OrderedList,
      Image,
      Dropcursor,
      Blockquote,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    content: '<p class="underline">Start typing here...</p>',
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div>
      <Toolbar editor={editor}/>
      <div className="relative border border-gray-300 rounded-lg p-4">
        <EditorContent
          editor={editor}
          className="min-h-[200px] p-4 focus:outline-none placeholder-gray-500 editor"
        />
      </div>
      <Threads editor={editor}/>
    </div>
  );
}
