import OSS from 'ali-oss'
declare module 'nitropack'{
    interface Nitropack {
        aliOSS:OSS
    }
}
