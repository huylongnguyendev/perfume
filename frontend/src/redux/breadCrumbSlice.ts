import type { CrumbType } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'

interface CrumbState {
    crumbs: Array<CrumbType>
}

const initialState = {
    crumbs: []
} satisfies CrumbState as CrumbState


const breadCrumbSlice = createSlice({
    name: "breadCrumb",
    initialState,
    reducers: {
        setAddCrumb: (state, action) => {
            state.crumbs = [...state.crumbs, action.payload]
        },
        setCrumbs: (state, action) => {
            state.crumbs = action.payload
        },
        setResetBreadCrumb: () => initialState
    }
})

const breadCrumbReducer = breadCrumbSlice.reducer
export default breadCrumbReducer
export const { setAddCrumb, setCrumbs, setResetBreadCrumb } = breadCrumbSlice.actions