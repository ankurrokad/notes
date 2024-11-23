"use client"
import { useParams } from "next/navigation"

export default function NotePage() {
    const { id } = useParams()
    return <div>
        {id}
    </div>
}