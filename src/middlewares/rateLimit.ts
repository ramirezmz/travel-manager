import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // 100 requests
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        status: 429,
        messageEn: 'Too many requests, please try again later.',
        messagePt: 'Muitas requisições, por favor tente novamente mais tarde.',
        messageEs: 'Demasiadas solicitudes, por favor inténtelo de nuevo más tarde.'
    }
})

export default limiter