import { Metadata } from 'next'
import { Suspense } from "react"
import Userchap from "../archive"
import Loading from "../loading"

export const metadata: Metadata = {
    title: 'User Chap Archive',
}

export default function Page({ params }: { params: { page: string } }) {
    return <Suspense fallback={<Loading page={parseInt(params.page)} />}><Userchap page={parseInt(params.page)} /></Suspense>
}