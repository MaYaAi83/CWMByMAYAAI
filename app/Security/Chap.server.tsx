"use server"
import { randomUUID } from 'crypto'
import { headers } from 'next/headers'
import { UseRedis } from './Redis'
import { CacheEveryThing } from '@/cache'


const prefix = "V2."

/**
 * 生成唯一安全校验UUID
 * @param chapid 
 * @returns 
 */
async function Pre(chapid: string) {
    const ip = headers().get("cf-connecting-ip") ?? headers().get("x-forwarded-for")
    if (ip) {
        const redis = await UseRedis()
        const uuid = randomUUID()
        const d = await redis.sendCommand(["TFCALL", "SecurityV2.count", "0", ip, uuid])
        console.log(d)
        redis.disconnect()
        return uuid
    }
}

/** 客户端上报安全接口 */
async function check(uuid: string, chapid: string) {
    const ip = headers().get("cf-connecting-ip") ?? headers().get("x-forwarded-for")
    if (ip) {
        const redis = await UseRedis()
        const d = await redis.sendCommand(["TFCALL", "SecurityV2.success", "0", ip, uuid])
        console.log(d)
        redis.disconnect()
        return ip
    }
}


/** 查询是否为黑名单IP */
async function Baned(): Promise<[true, number] | [false, undefined]> {
    const ip = headers().get("cf-connecting-ip") ?? headers().get("x-forwarded-for")
    const redis = await UseRedis()
    if (ip) {
        return CacheEveryThing(async (): Promise<[true, number] | [false, undefined]> => {
            try {
                const ban = await redis.json.get(prefix + ip, { path: ".ban" }) as number
                const now = (Date.now() / 1000) | 0
                if (ban >= now) {
                    return [true, ban]
                }
                return [false, undefined]
            } catch { return [false, undefined] }
        }, [`s_chap_baned_${ip}`], 60, (e) => !e[0])()
    }
    return [false, undefined]
}

export { Pre, check, Baned } 