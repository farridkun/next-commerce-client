export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_test_E074CA62DA6E18C9'

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_51GyEiNCn6aAS7x8HftwDlwc2C4KDNvdAhVT5tKhn7qgj3TkTPRvmor9VTN5iIQaCvPMdG1HbpC0kO2mFLyV5atE300Fh3Ap3Kx'

/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image 
 */
export const fromImageToUrl = (image) => {
    if (!image) {
        return '/vercel.svg'
    }

    if (image.url.indexOf('/') === 0) {
        return `${API_URL}${image.url}`
    }

    return image.url
}