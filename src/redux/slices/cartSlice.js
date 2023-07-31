import { useContext } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendPost, getRequest, doPost } from "../../server";
import { SocketContext } from "../../context/socket";

const initialState = {
    carts: [],
    cart_keys: [],
    selected_cart: '',
    selected_cart_items: [],
    loading: false,
    error: null,
}

export const getCarts = createAsyncThunk(
    'cart/get',
    async () =>{
        const response = await getRequest('sales/handler-carts')
        return response.data
    }
)

export const createCart = createAsyncThunk(
    'cart/create',
    async (payload) =>{
        return 'Pending...'
    }
)

export const updateCartList = createAsyncThunk(
    'cart/update',
    async ({type, payload}) =>{
        return {type: type, data: payload}
    }
)


export const addToCart = createAsyncThunk(
    'cart/add',
    async (payload) =>{
        return payload
    }
)


export const deleteFromCart = createAsyncThunk(
    'cart/delete',
    async (payload) =>{
        return
    }
)


export const selectCart = createAsyncThunk(
    'cart/select',
    async (payload) =>{
        return payload
    }
)

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // GET CARTS
        builder.addCase(getCarts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCarts.fulfilled, (state, action) => {
            state.carts = action.payload
            state.cart_keys = action.payload.map((val) => {
                return val.uid
            })
            state.loading = false
        })
        builder.addCase(getCarts.rejected, (state, action) => {
            state.loading = false
        })

        // CREATE CART
        builder.addCase(createCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.loading = false
            // state.cart_keys = state.cart_keys.concat([action.payload])
            console.log([...state.cart_keys, action.payload])
            state.cart_keys = [...state.cart_keys, action.payload]
        })
        builder.addCase(createCart.rejected, (state, action) => {
            state.loading = false
        })

        // UPDATE CART LIST
        builder.addCase(updateCartList.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateCartList.fulfilled, (state, action) => {
            if(action.payload.type === "add"){
                state.carts = [...state.carts, action.payload.data]
                state.cart_keys = state.carts.map((val) => {
                    return val.uid
                })
            }
            state.loading = false
        })
        builder.addCase(updateCartList.rejected, (state, action) => {
            state.loading = false
        })

        // ADD TO CART
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log("Doing this......")
            const selectedCart = state.carts.filter((val) => {
                if(val.uid === action.payload.cart){
                    return val
                }
            })
            let cart_update = selectedCart[0]
            const cart_items = cart_update?.items
            const new_cart_items = cart_items.concat([action.payload])

            // new_cart_items = [...new Map(cart_items.map((m) => [m.uid, m])).values()];

            cart_update.items = new_cart_items

            state.carts = state.carts.map((val) => {
                if(val.uid === action.payload.cart){
                    return cart_update
                }else{
                    return val
                }
            })

            if(state.selected_cart === action.payload.cart){
                state.selected_cart_items = new_cart_items
            }

            state.loading = false
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false
        })

        // DELETE FROM CART
        builder.addCase(deleteFromCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteFromCart.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteFromCart.rejected, (state, action) => {
            state.loading = false
        })

        // SELECT CART
        builder.addCase(selectCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(selectCart.fulfilled, (state, action) => {
            state.selected_cart = action.payload
            const selectedCart = state.carts.filter((val) => {
                if(val.uid === action.payload){
                    return val
                }
            })
            // console.log(selectedCart[0]?.items)
            state.selected_cart_items = selectedCart[0]?.items || []
            state.loading = false
        })
        builder.addCase(selectCart.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const cartState = (state) => state.cart

export default CartSlice.reducer