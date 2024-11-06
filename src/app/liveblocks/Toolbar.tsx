// components/Toolbar.tsx
import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

export function Toolbar({ editor }: { editor: Editor | null }) {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  const buttonClass = (isActive: boolean) =>
    `px-3 py-1 rounded-lg text-sm font-medium ${
      isActive ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-white' : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-black'
    }`;

  return (
    <div className="toolbar p-2 border-b border-gray-300 flex gap-2 flex-wrap">
      <button onClick={() => {
        editor?.chain().focus().addPendingComment().run();
      }} className={buttonClass(editor.isActive('lb-comment'))}>
        💬 New Comment
      </button>
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClass(editor.isActive('heading', { level: 1 }))}>
        H1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))}>
        H2
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(editor.isActive('heading', { level: 3 }))}>
        H3
      </button>
      <button onClick={setLink} className={buttonClass(editor.isActive('link'))}>
        Set Link
      </button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} className={buttonClass(editor.isActive('link'))}>
        Unset Link
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))}>
        Bullet List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))}>
        Ordered List
      </button>
      <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={buttonClass(editor.isActive('taskList'))}>
        Task List
      </button>
      <button onClick={() => editor.chain().focus().splitListItem('taskItem').run()} className={buttonClass(false)}>
        Split Task Item
      </button>
      <button onClick={() => editor.chain().focus().sinkListItem('taskItem').run()} className={buttonClass(false)}>
        Sink Task Item
      </button>
      <button onClick={() => editor.chain().focus().liftListItem('taskItem').run()} className={buttonClass(false)}>
        Lift Task Item
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}>
        Blockquote
      </button>
      <button onClick={addImage} className={buttonClass(false)}>
        Add Image
      </button>
    </div>
  );
}
