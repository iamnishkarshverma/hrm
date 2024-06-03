import { CheckInCheckOutService } from "../services/CheckInCheckOutService.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

const checkInCheckOutService = new CheckInCheckOutService();

export const checkIn = async (req, res, next) => {

  //Debug employee id
  // console.log(req.params.id)
  try {
    const record = await checkInCheckOutService.checkIn(req.params.id);
    res.status(200).json(CreateSuccess(200, "Check In Successful", record));
    // console.log(record)
  } catch (err) {
    res.status(400).json(CreateError(400, "Check In Failed", err.message));
    // console.log("error",err)
  }
};

export const checkOut = async (req, res, next) => {
  try {
    const record = await checkInCheckOutService.checkOut(req.params.id);
    res.status(200).json(CreateSuccess(200, "Check Out Successful", record));
  } catch (err) {
    res.status(400).json(CreateError(400, "Check Out Failed", err.message));
    console.log("ERROR", err)
  }
};

export const getStatus = async (req, res, next) => {
  try {
    const record = await checkInCheckOutService.getStatus(req.params.id);
    res.status(200).json(CreateSuccess(200, "Status Retrieved", record));
  } catch (err) {
    res.status(400).json(CreateError(400, "Failed to Retrieve Status", err.message));
  }
};