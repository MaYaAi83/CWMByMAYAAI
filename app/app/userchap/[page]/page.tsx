import { Metadata } from 'next'
import { Suspense } from "react"
import Loading from "../loading"
import Userchap from "../userchap"

export const metadata: Metadata = {
    title: 'User Chap',
}

export default function Page({ params }: { params: { page: string } }) {
    return <Suspense fallback={<Loading page={parseInt(params.page)} />}><Userchap page={parseInt(params.page)} /></Suspense>
}