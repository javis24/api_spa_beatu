import TratamientosEsteticos from '../models/TratamientosEsteticosModel.js';
import Pacientes from '../models/PacientesModel.js';
import Users from '../models/UserModel.js';
import { Op } from "sequelize";

// Obtener todos los tratamientos estéticos (admin/secretary)
export const getTratamientosEsteticos = async (req, res) => {
    try {
        let response;
        if (req.role === 'admin' || req.role === 'secretary') {
            response = await TratamientosEsteticos.findAll({
                include: [{
                    model: Pacientes,
                    attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                    include: [{
                        model: Users,
                        attributes: ['uuid', 'name', 'email', 'role']
                    }]
                }]
            });
        } else {
            response = await TratamientosEsteticos.findAll({
                include: [{
                    model: Pacientes,
                    attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                    where: {
                        userId: req.userId
                    },
                    include: [{
                        model: Users,
                        attributes: ['uuid', 'name', 'email', 'role']
                    }]
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Obtener tratamientos estéticos por ID (admin/secretary/cliente)
export const getTratamientosEsteticosById = async (req, res) => {
    try {
        const tratamiento = await TratamientosEsteticos.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Pacientes,
                attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name', 'email', 'role']
                }]
            }]
        });
        if (!tratamiento) return res.status(404).json({ msg: 'Tratamiento estético no encontrado' });
        let response;
        if (req.role === 'admin' || req.role === 'secretary') {
            response = tratamiento;
        } else {
            response = await TratamientosEsteticos.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Pacientes,
                    attributes: ['uuid', 'name', 'address', 'phoneNumber', 'email', 'evaluationDate', 'age', 'height', 'unwantedGain', 'pathologies'],
                    where: {
                        [Op.and]: [{ userId: req.userId }]
                    },
                    include: [{
                        model: Users,
                        attributes: ['uuid', 'name', 'email', 'role']
                    }]
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Crear nuevos tratamientos estéticos (admin/secretary/cliente)
export const createTratamientosEsteticos = async (req, res) => {
    try {
        const { pacienteId, cavitation, radioFrequency, lipoLaser, vacuum, gluteCups, woodTherapy, lymphaticDrainage, detox, mesotherapy, passiveGym } = req.body;
        const tratamiento = await TratamientosEsteticos.create({
            pacienteId,
            cavitation,
            radioFrequency,
            lipoLaser,
            vacuum,
            gluteCups,
            woodTherapy,
            lymphaticDrainage,
            detox,
            mesotherapy,
            passiveGym
        });
        res.status(201).json({ msg: 'Tratamiento estético creado correctamente', tratamiento });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Actualizar tratamientos estéticos por ID (admin/secretary/cliente)
export const updateTratamientosEsteticos = async (req, res) => {
    try {
        const tratamiento = await TratamientosEsteticos.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!tratamiento) return res.status(404).json({ msg: 'Tratamiento estético no encontrado' });
        const { pacienteId, cavitation, radioFrequency, lipoLaser, vacuum, gluteCups, woodTherapy, lymphaticDrainage, detox, mesotherapy, passiveGym } = req.body;
        if (req.role === 'admin' || req.role === 'secretary') {
            await TratamientosEsteticos.update({
                pacienteId,
                cavitation,
                radioFrequency,
                lipoLaser,
                vacuum,
                gluteCups,
                woodTherapy,
                lymphaticDrainage,
                detox,
                mesotherapy,
                passiveGym
            }, {
                where: {
                    id: req.params.id
                }
            });
        } else {
            // Verificar si el usuario tiene permiso para actualizar
            const paciente = await Pacientes.findOne({
                where: {
                    id: pacienteId,
                    userId: req.userId
                }
            });
            if (!paciente) {
                return res.status(403).json({ msg: 'No tienes permiso para actualizar este tratamiento estético' });
            }
            await TratamientosEsteticos.update({
                pacienteId,
                cavitation,
                radioFrequency,
                lipoLaser,
                vacuum,
                gluteCups,
                woodTherapy,
                lymphaticDrainage,
                detox,
                mesotherapy,
                passiveGym
            }, {
                where: {
                    id: req.params.id
                }
            });
        }
        res.status(200).json({ msg: 'Tratamiento estético actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Eliminar tratamientos estéticos por ID (admin/secretary)
export const deleteTratamientosEsteticos = async (req, res) => {
    try {
        const tratamiento = await TratamientosEsteticos.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!tratamiento) return res.status(404).json({ msg: 'Tratamiento estético no encontrado' });
        if (req.role === 'admin' || req.role === 'secretary') {
            await TratamientosEsteticos.destroy({
                where: {
                    id: req.params.id
                }
            });
        } else {
            // Verificar si el usuario tiene permiso para eliminar
            const paciente = await Pacientes.findOne({
                where: {
                    id: tratamiento.pacienteId,
                    userId: req.userId
                }
            });
            if (!paciente) {
                return res.status(403).json({ msg: 'No tienes permiso para eliminar este tratamiento estético' });
            }
            await TratamientosEsteticos.destroy({
                where: {
                    id: req.params.id
                }
            });
        }
        res.status(200).json({ msg: 'Tratamiento estético eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};