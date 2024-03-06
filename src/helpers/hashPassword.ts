import bcrypt from "bcrypt"

export const hashPassword  = async(password: string)=>{
const slatRounds = await bcrypt.genSalt(parseInt(process.env.slatRound) || 0);
 let hashedPassword = await bcrypt.hash(password,slatRounds)
 return hashedPassword
}

export const comparePassword = async(password: string, hashedPassword: string)=>{
   let compare = await bcrypt.compare(password, hashedPassword)
    return compare; 
}