'use client'

import {EditorContent, EditorRoot} from "novel";
import {useState} from "react";
import {defaultExtensions} from "@/app/extensions";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";


export default function Home() {
  const [content, setContent] = useState<any>();
  const extensions = [...defaultExtensions];
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
Hello world
<TailwindAdvancedEditor />
    </div>
  );
}
