import type { Metadata } from 'next'
import { Heads } from './Head'
import { Suspense } from "react";
import Loading from './loading';
import Snackbar from './Snackbar';
import Sync from './Sync';
import { Security } from '@/Security/Layout.Client';
import { Music } from '@/Music/Client';
import { Root } from './Drawer';
import { cookies } from 'next/headers';
import { AnnouncementProvider } from '@/components/Announcement';

export const metadata: Metadata = {
  title: 'Koroneko Corp',
  description: '黑猫科技',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="zh">
      <head>
        <Heads />
      </head>
      <body style={{ margin: "auto" }}>
        <Root darkmode={cookies().get("dark")?.value == "true"}>
          <Snackbar>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </Snackbar>
        </Root>
        <Music />
        <Sync />
        <Security />
        <AnnouncementProvider endpoint='https://ann.koroneko.co' />
      </body>
    </html>
  )
}
