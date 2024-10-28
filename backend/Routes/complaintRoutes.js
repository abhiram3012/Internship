const express = require('express');
const Complaint = require('../models/complaint'); // Adjust the path as needed

const router = express.Router();

// POST route to create a new complaint
router.post('/raisecomplaint', async (req, res) => {
  try {
    const complaintData = req.body; // Expecting the complaint data in the request body
    const newComplaint = new Complaint(complaintData);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ message: 'Error creating complaint', error: error.message });
  }
});

// GET route to retrieve all complaints
router.get('/getcomplaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }); // Sort by 'createdAt' in descending order
    res.status(200).json(complaints); // Return the complaints as a JSON response
  } catch (error) {
    console.error('Error retrieving complaints:', error);
    res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
  }
});


router.get('/getcomplaint/:id', async (req, res) => {
    const { id } = req.params; // Extract the id from the request parameters
    try {
      const complaint = await Complaint.findById(id); // Fetch the complaint by ID from the database
      
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' }); // Handle case where complaint is not found
      }
  
      res.status(200).json(complaint); // Return the complaint as a JSON response
    } catch (error) {
      console.error('Error retrieving complaint:', error);
      res.status(500).json({ message: 'Error retrieving complaint', error: error.message });
    }
});

// Route to assign a technician to a complaint
router.put('/assign/:id', async (req, res) => {
    try {
      const { technicianId } = req.body; // Expecting technician's ObjectId from request body
      
      // Update the complaint with the technician's ObjectId and set the status to 'assigned'
      const updatedComplaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        {
          assignedTo: technicianId, // Assigning the technician
          status: 'assigned',       // Updating status
        },
        { new: true }
      ).populate('assignedTo'); // Optionally, populate to return technician details
      
      if (!updatedComplaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      res.status(200).json(updatedComplaint);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
});
  
// Route to fetch complaints assigned to a specific technician
router.get('/getcomplaints/technician/:technicianId', async (req, res) => {
  const { technicianId } = req.params; // Extract the technician's ID from the request parameters
  try {
    // Fetch complaints where 'assignedTo' matches the technician's ID
    const complaints = await Complaint.find({ assignedTo: technicianId }).sort({ createdAt: -1 });

    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints assigned to this technician' });
    }

    res.status(200).json(complaints); // Return the filtered complaints as a JSON response
  } catch (error) {
    console.error('Error retrieving complaints for technician:', error);
    res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
  }
});

// Export the router
module.exports = router;
