import Pacientes from "../models/PacientesModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getPaciente = async (req, res) => {
    try {
        let response;
        if (req.role === 'admin' || req.role === 'secretary') {
            response = await Pacientes.findAll({
                attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role'] 
                }]
            });
        } else {
            response = await Pacientes.findAll({
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role'] 
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Pacientes."
        });
    }
};

export const getPacientesById = async (req, res) => {
    try {
        const paciente = await Pacientes.findOne({
            attributes: ['uuid'], // Solo recupera uuid
            where: {
                uuid: req.params.id
            }
        });
        if (!paciente) return res.status(404).json({ msg: 'Paciente no encontrado' });

        let response;
        if (req.role === 'admin' || req.role === 'secretary') {
            response = await Pacientes.findOne({
                attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                where: {
                    uuid: paciente.uuid // Usa uuid en lugar de id
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role']
                }]
            });
        } else {
            response = await Pacientes.findOne({
                attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                where: {
                    [Op.and]: [{ uuid: paciente.uuid }, { userId: req.userId }] // Usa uuid en lugar de id
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Pacientes."
        });
    }
};

export const createPaciente = async (req, res) => {
    const { name, address, phoneNumber, email, evaluationDate, age, height, unwantedGain, pathologies } = req.body;
    try {        
         await Pacientes.create({
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            evaluationDate: evaluationDate,
            age: age,
            height: height,
            unwantedGain: unwantedGain,
            pathologies: pathologies,
            userId: req.userId,
        });
        res.status(201).json({ msg: 'Paciente creado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const updatePaciente = async (req, res) => {
    try {
        const paciente = await Pacientes.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!paciente) return res.status(404).json({ msg: 'Paciente no encontrado' });

        const { name, address, phoneNumber, email, evaluationDate, age, height, unwantedGain, pathologies } = req.body;

        if (req.role === 'admin' || req.role === 'secretary') {
            await Pacientes.update({
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                evaluationDate: evaluationDate,
                age: age,
                height: height,
                unwantedGain: unwantedGain,
                pathologies: pathologies,
            }, {
                where: {
                    uuid: req.params.id // Usa uuid en lugar de id
                }
            });
        } else {
            if (req.userId !== paciente.userId) { // Corrige la lógica aquí
                return res.status(403).json({ msg: 'No tienes permiso para actualizar este paciente' });
            }
            await Pacientes.update({
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                evaluationDate: evaluationDate,
                age: age,
                height: height,
                unwantedGain: unwantedGain,
                pathologies: pathologies,
            }, {
                where: {
                    [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }] // Usa uuid en lugar de id
                }
            });
        }
        res.status(200).json({ msg: 'Paciente actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const paciente = await Pacientes.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!paciente) return res.status(404).json({ msg: 'Paciente no encontrado' });

        if (req.role === 'admin' || req.role === 'secretary') {
            await Pacientes.destroy({
                where: {
                    uuid: req.params.id // Usa uuid en lugar de id
                }
            });
        } else {
            if (req.userId !== paciente.userId) {
                return res.status(403).json({ msg: 'No tienes permiso para eliminar este paciente' });
            }
            await Pacientes.destroy({
                where: {
                    [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: 'Paciente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};