import MetricasSalud from '../models/MetricasSaludModel.js';
import Pacientes from "../models/PacientesModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

// Obtener todas las métricas de salud (admin/secretary)
export const getMetricasSalud = async (req, res) => {
    try {
        let response;
        if (req.role === 'admin' || req.role === 'secretary') {
            response = await MetricasSalud.findAll({
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
            response = await MetricasSalud.findAll({
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

// Obtener métricas de salud por ID (admin/secretary/cliente)
export const getMetricasSaludById = async (req, res) => {
    try {
        const metrica = await MetricasSalud.findOne({
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
        if (!metrica) return res.status(404).json({ msg: 'Métrica de salud no encontrada' });
        let response;
        if (req.role === 'admin' || req.role === 'secretary') {
            response = metrica;
        } else {
            response = await MetricasSalud.findOne({
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

// Crear nuevas métricas de salud (admin/secretary/cliente)
export const createMetricasSalud = async (req, res) => {
    try {
        const { pacienteId, weight, fatPercentage, muscleKg, bodyWater, phy, muscle, metabolicAge, heartRate, boneKg, visceralFat, bmi, hip, arms, thighs, calves, chest, waist, abdomen, kcla } = req.body;
        const metricas = await MetricasSalud.create({
            pacienteUuid: pacienteId,
            weight,
            fatPercentage,
            muscleKg,
            bodyWater,
            phy,
            muscle,
            metabolicAge,
            heartRate,
            boneKg,
            visceralFat,
            bmi,
            hip,
            arms,
            thighs,
            calves,
            chest,
            waist,
            abdomen,
            kcla,
        });
        res.status(201).json({ msg: 'Métricas de salud creadas correctamente', metricas });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Actualizar métricas de salud por ID (admin/secretary/cliente)
export const updateMetricasSalud = async (req, res) => {
    try {
        const metrica = await MetricasSalud.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!metrica) return res.status(404).json({ msg: 'Métrica de salud no encontrada' });
        const { pacienteId, weight, fatPercentage, muscleKg, bodyWater, phy, muscle, metabolicAge, heartRate, boneKg, visceralFat, bmi, hip, arms, thighs, calves, chest, waist, abdomen, kcla } = req.body;
        if (req.role === 'admin' || req.role === 'secretary') {
            await MetricasSalud.update({
                pacienteUuid: pacienteId,
                weight,
                fatPercentage,
                muscleKg,
                bodyWater,
                phy,
                muscle,
                metabolicAge,
                heartRate,
                boneKg,
                visceralFat,
                bmi,
                hip,
                arms,
                thighs,
                calves,
                chest,
                waist,
                abdomen,
                kcla,
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
                return res.status(403).json({ msg: 'No tienes permiso para actualizar estas métricas de salud' });
            }
            await MetricasSalud.update({
                pacienteUuid: pacienteId,
                weight,
                fatPercentage,
                muscleKg,
                bodyWater,
                phy,
                muscle,
                metabolicAge,
                heartRate,
                boneKg,
                visceralFat,
                bmi,
                hip,
                arms,
                thighs,
                calves,
                chest,
                waist,
                abdomen,
                kcla,
            }, {
                where: {
                    id: req.params.id
                }
            });
        }
        res.status(200).json({ msg: 'Métricas de salud actualizadas correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Eliminar métricas de salud por ID (admin/secretary)
export const deleteMetricasSalud = async (req, res) => {
    try {
        const metrica = await MetricasSalud.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!metrica) return res.status(404).json({ msg: 'Métrica de salud no encontrada' });
        if (req.role === 'admin' || req.role === 'secretary') {
            await MetricasSalud.destroy({
                where: {
                    id: req.params.id
                }
            });
        } else {
            // Verificar si el usuario tiene permiso para eliminar
            const paciente = await Pacientes.findOne({
                where: {
                    id: metrica.pacienteUuid,
                    userId: req.userId
                }
            });
            if (!paciente) {
                return res.status(403).json({ msg: 'No tienes permiso para eliminar estas métricas de salud' });
            }
            await MetricasSalud.destroy({
                where: {
                    id: req.params.id
                }
            });
        }
        res.status(200).json({ msg: 'Métricas de salud eliminadas correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};