import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lego'
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected')
})
