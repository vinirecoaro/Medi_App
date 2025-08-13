import express from "express"
import AppointmentService from "../services/AppointmentService.js"

let router = express.Router()

router.get('/appointments', async(req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments()
        res.send(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/appointment/:id', async(req, res) => {
    const {id} = req.params
    try {
        const appointment = await AppointmentService.getAppointment(id)
        res.send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/postAppointment', async(req, res) => {
    const {date, doctorId, patientId} = req.body
    try {
        const appointment = await AppointmentService.saveAppointment({date, doctorId, patientId})
        res.send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.put('/appointments/:id', async(req, res) => {
    const {id} = req.params
    const {date, doctorId, patientId} = req.body
    try {
        const appointment = await AppointmentService.updateAppointment(id, {date, doctorId, patientId})
        res.send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/appointments/:id', async(req, res) => {
    const {id} = req.params
    try {
        const appointment = await AppointmentService.deleteAppointment(id)
        res.send(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export default router