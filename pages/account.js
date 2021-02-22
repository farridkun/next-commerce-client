import Head from 'next/head'
import { useContext, useState, useEffect } from "react";
import Link from 'next/link'

import AuthContext from '../context/AuthContext'
import { API_URL } from '../utils/urls'
import { Rp } from '../utils/format'

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    setLoading(true)
                    const token = await getToken()
                    const order_res = await fetch(`${API_URL}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const data = await order_res.json()
                    setOrders(data)
                } catch (err) {
                    setOrders([])
                }
                setLoading(false)
            }
        }

        fetchOrders()
    }, [user])

    return {orders, loading}
}

export default function Account() {

    const { user, logoutUser, getToken } = useContext(AuthContext)

    const {orders, loading} = useOrders(user, getToken)

    if (!user) {
        return (
            <div>
                <p>Silahkan login atau daftar</p>
                <Link href="/"><a>Go Back</a></Link>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Halaman Akun</title>
                <meta name="description" content="Ini adalah halaman akun, lihat ordermu sekarang"/>
            </Head>

            <h2>Halaman Akun</h2>

            <h3>Pesanan Anda</h3>
            {loading && <p>Memuat data pesananmu...</p>}
            {orders.map(order => (
                <div key={order.id}>
                   {new Date(order.created_at).toLocaleDateString('id-ID')} {order.product.name} {Rp(order.total)} {order.status == 'paid' ? 'Sudah Bayar' : 'Belum Bayar'}
                </div>
            ))}

            <hr/>
            <p>Logged in as: {user.email}</p>
            <a href="#" onClick={ logoutUser }>Logout</a>
        </div>
    )
}