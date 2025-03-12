import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "¡Por favor, inicie sesión en su cuenta!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

export const adminOrSecretaryOnly = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.session.userId,
            },
        });
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
        if (user.role !== "admin" && user.role !== "secretary") {
            return res.status(403).json({ msg: "Acceso prohibido" });
        }
        next();
    } catch (error) {
        console.error("Error en adminOrSecretaryOnly:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};