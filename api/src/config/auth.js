module.exports = {
    secret: process.env.SECRET_KEY || "grupo40",
    expires: process.env.AUTH_EXPIRES || "1h",
    rounds: process.env.AUTH_ROUNDS || 10
}