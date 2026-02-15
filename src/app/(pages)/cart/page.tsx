'use client'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '@/app/loading'
import EmptyCart from '@/components/emptyCart/EmptyCart'
import { toast } from 'sonner'
import { CartSummary } from './cartSummary'
import { CartItem } from './cartItem'
import { removeFromCartAction, updateCartAction, clearCartAction } from './_actions/cartActions'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { Loader, Trash2 } from 'lucide-react'

export default function Cart() {
    const context = useContext(CartContext)
    if (!context) {
        return null;
    }

    const { cartContent, isLoading, getCart, setCartContent } = context;
    const [removingId, setRemovingId] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [isClearing, setIsClearing] = useState(false)

    useEffect(() => {
        if (!cartContent) getCart()
    }, [cartContent, getCart])

    if (isLoading || !cartContent) return <Loading />

    if (!cartContent.data?.products?.length) return <EmptyCart />

    const updateCartItem = async (productId: string, count: number) => {
        if (count < 1) return;
        setUpdatingId(productId); 
        const data = await updateCartAction(productId, count);
        if (data.status === 'success') {
            setCartContent(data);
        }
        setUpdatingId(null); 
    };

    const removeCartItem = async (productId: string) => {
        setRemovingId(productId);
        const data = await removeFromCartAction(productId);
        if (data.status === 'success') {
            setCartContent(data);
            toast.success("Item removed");
        }
        setRemovingId(null);
    };

    async function clearCart(cartId: string) {
        setIsClearing(true); 
        try {
            const data = await clearCartAction(cartId);
            if (data.status === 'success') {
                setCartContent(data);
                toast.success("Cart cleared successfully");
            } else {
                toast.error("Failed to clear cart");
            }
        } finally {
            setIsClearing(false); 
        }
    }

    return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

        {/* background glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl"></div>

        <div className='container mx-auto py-14 px-4 relative z-10'>

            {/* HEADER */}
            <header className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-b border-border/60 pb-8">

                <div className="space-y-2">
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        Your Cart
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Review your items before checkout
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-black text-white px-5 py-2 text-xs font-semibold tracking-wide shadow-md">
                        {cartContent.data?.products?.length || 0} Items
                    </span>
                </div>
            </header>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* CART ITEMS */}
                <div className="lg:col-span-8 space-y-6">
                    {cartContent.data?.products?.map((item: any) => (
                        <div
                            key={item._id}
                            className="rounded-2xl border border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <CartItem
                                item={item}
                                updatingId={updatingId}
                                removingId={removingId}
                                onUpdate={updateCartItem}
                                onRemove={removeCartItem}
                            />
                        </div>
                    ))}
                </div>

                {/* SUMMARY */}
                <div className="lg:col-span-4 sticky top-10 space-y-4">

                    {/* clear cart */}
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={isClearing}
                            onClick={() => {
                                setIsClearing(true);
                                clearCart(cartContent.cartId || "")
                                    .finally(() => setIsClearing(false));
                            }}
                            className="group flex items-center gap-2 text-rose-500 font-semibold transition-all hover:bg-rose-50"
                        >
                            {isClearing ? (
                                <Loader className="animate-spin h-4 w-4" />
                            ) : (
                                <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                            )}
                            Clear Cart
                        </Button>
                    </div>

                    {/* summary card */}
                    <div className="rounded-3xl border border-border/50 bg-white/80 backdrop-blur-xl shadow-xl p-6">
                        <CartSummary
                            total={cartContent.data?.totalCartPrice || 0}
                            cartId={cartContent.cartId || ""}
                        />
                    </div>

                </div>
            </div>
        </div>
    </div>
)

}