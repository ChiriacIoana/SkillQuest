'use client';

import { Card, CardHeader } from '@/components/common/ui/card';

export function SiteHeader() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center gap-4 p-0">
        <img
          src="/final_logo.png"    
          alt="SkillQuest Logo"
          width={64}
          height={64}
          className="ml-8 mt-2"
        />

        <h1
           className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] 
              text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-500
              uppercase select-none ml-4 sm:ml-7 lg:ml-15 "
          style={{
            transform: 'scaleX(1)', 
          }}
        >
          SkillQuest
        </h1>
      </CardHeader>
    </Card>
  );
}