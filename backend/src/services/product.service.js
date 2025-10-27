import Product from '../models/product.model.js'

export const productSerivce = async (data) => {
    const { name,
        brand,
        description,
        gender,
        category,
        images,
        scents,
        volumes
    } = data

    const prices = volumes.map(vol => {
        const finalPrice = vol.discount
            ? Math.round(vol.priceOrig * (1 - vol.discount / 100))
            : vol.priceOrig

        return {
            ...vol,
            price: finalPrice
        }
    })


    const resData = await Product.create({
        name,
        brand,
        description,
        gender,
        category,
        images,
        scents,
        volumes: prices
    })

    return resData
}