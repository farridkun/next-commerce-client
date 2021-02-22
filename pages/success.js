import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import { API_URL } from "../utils/urls";

const useOrder = (session_id) => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${API_URL}/orders/confirm`, {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({checkout_session: session_id})
                })
                const data = await res.json()
                setOrder(data)
            } catch (err) {
                setOrder(null)
            }
            setLoading(false)
        }
        fetchOrder()
    }, [session_id])

    return {order, loading}
}

export default function Success() {
    
    const router = useRouter()
    const {session_id} = router.query

    const {order, loading} = useOrder(session_id)

    return (
        <div>
            <Head>
                <title>Terima kasih telah membeli!</title>
                <meta name="description" content="Terima kasih telah membeli"/>
            </Head>

            <h2>Pembayaran Berhasil!</h2>
            {loading && <p>Sedang memuat...</p>}
            {order && <p>Pesaanan anda sudah di konfirmasi, dengan nomor pesanan {order.id}</p>}
        </div>
    )
}