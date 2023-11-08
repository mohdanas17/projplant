import jwt from "jsonwebtoken";

const generateToken = (res,userId)=>{
    const token = jwt.sign({userId},'secret_token123', {
        expiresIn: '5h'
    });

    res.cookie('jwt',token,{
        httpOnly: true,
        secure: 'development' !== 'development',
        sameSite: 'strict',
        maxAge: 5 * 60 * 60 * 1000
    })
}

export default generateToken;   