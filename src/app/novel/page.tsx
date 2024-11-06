'use client'

import React, {useState} from 'react';
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import {defaultExtensions} from "@/app/extensions";

const Novel = () => {
  const [content, setContent] = useState<any>();
  const extensions = [...defaultExtensions];
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      <TailwindAdvancedEditor/>
    </div>
  );
};

export default Novel;
