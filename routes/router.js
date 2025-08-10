import { express } from "express"
import appointmentController from "./AppointmentController.js"
import doctorController from "./DoctorController.js"
import pacientController from "./PatientController.js"
import prescriptionController from "./PrescriptionController.js"

let router = express.Router()

router.get(
    "/", function (req, res){
        console.log("Hi!")
        res.status(200).json({message: "hi!"})
    }
)

router.use("/", appointmentController)
router.use("/", doctorController)
router.use("/", pacientController)
router.use("/", prescriptionController)

export default router