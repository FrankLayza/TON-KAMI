import {createClient} from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_API = process.env.SUPABASE_API

if(!SUPABASE_URL || !SUPABASE_API){
    throw new Error('Missing the Supabase env vars')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_API)

