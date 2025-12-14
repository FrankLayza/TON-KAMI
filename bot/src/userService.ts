import { supabase } from "./supabase"

interface UserData {
    telegram_id: number;
    username?: string;
    first_name?: string;
  }

export const getUserByTelegramId = async (userId: UserData) => {
    const { data, error } = await supabase.from('users').insert(userId).select('*').eq('telegram_id', userId.telegram_id).single()
    if(error) {
        throw error
    }
    return data
}

export const createtUser = async(userId: UserData) => {
    const {data: newUser, error} = await supabase.from('users').insert([
        {
            telegram_id: userId.telegram_id,
            username: userId.username,
            first_name: userId.first_name,
        }
    ]).select().single()

    if(error) {
        console.error('Error creating user', error)
        return null
    }
    return newUser
}
