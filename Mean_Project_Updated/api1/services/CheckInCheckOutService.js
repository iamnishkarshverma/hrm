import CheckInCheckOut from '../models/CheckInCheckOut.js';

 export class CheckInCheckOutService {
  async checkIn(employeeId) {
    const existingRecord = await CheckInCheckOut.findOne({ employeeId, checkOutTime: null });
    if (existingRecord) {
      throw new Error('Already checked in. Please check out first.');
    }

    const checkInRecord = new CheckInCheckOut({
      employeeId,
      checkInTime: new Date(),
      checkOutTime: null
    });

    return await checkInRecord.save();
  }

  async checkOut(employeeId) {
    const checkInRecord = await CheckInCheckOut.findOne({ employeeId });
  
    if (!checkInRecord) {
      throw new Error('You need to check in first.');
    }

    const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const checkInTime = new Date(checkInRecord.checkInTime).getTime();
    if (currentTime - checkInTime < fourHoursInMilliseconds) {
      throw new Error('You can only check out after 4 hours of check-in.');
    }

    checkInRecord.checkOutTime = new Date();
    return await checkInRecord.save();
  }
  async getStatus(employeeId) {
    try {
      // console.log('Retrieving status for employee with ID:', employeeId);
      const record = await CheckInCheckOut.findOne({ employeeId }).sort({ _id: -1 });
      // console.log('Retrieved record:', record);
      return record;
    } catch (err) {
      console.error('Error retrieving status:', err);
      throw new Error('Failed to Retrieve Status');
    }
  }
}

// export default CheckInCheckOutService;
