const express = require('express');
const Complaint = require('../models/complaint'); // Adjust the path as needed
const nodemailer = require('nodemailer');
const Technician = require('../models/technicianModel'); // Adjust the path as necessary

const router = express.Router();

// Configure Nodemailer transporter (update with actual SMTP credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use another service (like SMTP, Mailgun, etc.)
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password or app-specific password
  },
});

// POST route to create a new complaint
router.post('/raisecomplaint', async (req, res) => {
  try {
    // Ensure the complaint status is set to "raised" by default
    const complaintData = { ...req.body, status: 'raised' };
    
    const newComplaint = new Complaint(complaintData);
    await newComplaint.save();
    
    res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ message: 'Error creating complaint', error: error.message });
  }
});

// PUT route to update the status of a specific complaint
router.put('/updatestatus/:id', async (req, res) => {
  const { id } = req.params; // Extract complaint ID from request parameters
  const { status } = req.body; // Extract the new status from request body

  try {
    // Update the complaint's status in the database
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', complaint: updatedComplaint });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

// GET route to retrieve all complaints
router.get('/getcomplaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).populate('raisedBy', 'fullname'); // Sort by 'createdAt' in descending order
    res.status(200).json(complaints); // Return the complaints as a JSON response
  } catch (error) {
    console.error('Error retrieving complaints:', error);
    res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
  }
});

// GET route to retrieve a specific complaint by ID
router.get('/getcomplaint/:id', async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  try {
    const complaint = await Complaint.findById(id).populate('raisedBy', 'fullname'); // Fetch the complaint by ID from the database
    
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

    // Fetch the technician's email from the User model
    const technician = await Technician.findById(technicianId);
    if (!technician || !technician.emailId) {
      return res.status(404).json({ message: 'Technician not found or missing email' });
    }

    // Send email notification to the technician
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: technician.emailId,
      subject: 'New Task Assigned',
      text: `Dear ${technician.fullname},\n\nYou have been assigned a new task:\n\nTask: ${updatedComplaint.problemDetails}\n\nPlease log in to your dashboard to view more details.\n\nThank you.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email notification', error });
      }
      console.log('Email sent:', info.response);
    });

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

// New route to fetch complaints with status "raised"
router.get('/getcomplaints/raised', async (req, res) => {
  try {
    const raisedComplaints = await Complaint.find({ status: 'raised' }).sort({ createdAt: -1 });
    
    if (raisedComplaints.length === 0) {
      return res.status(200).json({ message: 'No raised complaints found' });
    }

    res.status(200).json(raisedComplaints);
  } catch (error) {
    console.error('Error retrieving raised complaints:', error);
    res.status(500).json({ message: 'Error retrieving raised complaints', error: error.message });
  }
});

// GET route to retrieve complaints raised by a specific end user
// Route to fetch complaints raised by or assigned to a specific user
router.get('/getcomplaints/user/:userId', async (req, res) => {
  const { userId } = req.params; // Extract the userId from the request parameters
  
  try {
    // Fetch complaints where 'raisedBy' or 'assignedTo' matches the user's ID
    const userComplaints = await Complaint.find({
      $or: [
        { raisedBy: userId },
        { assignedTo: userId }
      ]
    }).sort({ createdAt: -1 });
    
    if (userComplaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this user' });
    }

    res.status(200).json(userComplaints); // Return the filtered complaints as a JSON response
  } catch (error) {
    console.error('Error retrieving complaints for user:', error);
    res.status(500).json({ message: 'Error retrieving complaints for user', error: error.message });
  }
});

// New route to assign a technician to a specific complaint by complaint ID and technician ID
router.put('/assignTechnician/:complaintId/:technicianId', async (req, res) => {
  const { complaintId, technicianId } = req.params; // Extract complaint ID and technician ID from the request parameters

  try {
    // Update the complaint with the technician's ID and set status to "assigned"
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedTo: technicianId, // Assigning the technician
        status: 'assigned',       // Updating status to 'assigned'
      },
      { new: true } // Return the updated document
    ).populate('assignedTo'); // Optionally, populate to return technician details

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Technician assigned successfully', complaint: updatedComplaint });
  } catch (error) {
    console.error('Error assigning technician to complaint:', error);
    res.status(500).json({ message: 'Error assigning technician', error: error.message });
  }
});

// Route to fetch all complaints assigned to a specific technician
// router.get('/getassignedcomplaints/:technicianId', async (req, res) => {
//   const { technicianId } = req.params; // Extract the technician ID from request parameters

//   try {
//     // Fetch complaints where 'assignedTo' matches the technician's ID
//     const assignedComplaints = await Complaint.find({ assignedTo: technicianId }).sort({ createdAt: -1 });
    
//     if (assignedComplaints.length === 0) {
//       return res.status(404).json({ message: 'No complaints assigned to this technician' });
//     }

//     res.status(200).json(assignedComplaints); // Return the list of assigned complaints
//   } catch (error) {
//     console.error('Error retrieving assigned complaints:', error);
//     res.status(500).json({ message: 'Error retrieving assigned complaints', error: error.message });
//   }
// });

// Route to fetch complaints with populated user names for raisedBy and assignedTo
router.get('/getassignedcomplaints/:technicianId', async (req, res) => {
  const { technicianId } = req.params;

  try {
    // Fetch complaints and populate the raisedBy and assignedTo fields with user details
    const assignedComplaints = await Complaint.find({ assignedTo: technicianId })
      .populate('raisedBy', 'fullname') // Populate 'name' field from User model for raisedBy
      .populate('assignedTo', 'fullname') // Populate 'name' field from User model for assignedTo
      .sort({ createdAt: -1 });

    if (assignedComplaints.length === 0) {
      return res.status(404).json({ message: 'No complaints assigned to this technician' });
    }

    res.status(200).json(assignedComplaints);
  } catch (error) {
    console.error('Error retrieving assigned complaints:', error);
    res.status(500).json({ message: 'Error retrieving assigned complaints', error: error.message });
  }
});

// GET route to retrieve complaint status counts
router.get('/status', async (req, res) => {
  try {
    // Aggregate to count complaints by their status
    const statusCounts = await Complaint.aggregate([
      {
        $group: {
          _id: '$status', // Group by 'status' field
          count: { $sum: 1 } // Count occurrences of each status
        }
      }
    ]);

    // Initialize counts
    const counts = {
      solved: 0,
      rejected: 0,
      inProgress: 0,
    };

    // Map the counts from the aggregation results to our response format
    statusCounts.forEach((status) => {
      if (status._id === 'solved') {
        counts.solved = status.count;
      } else if (status._id === 'rejected') {
        counts.rejected = status.count;
      } else if (
        status._id === 'in progress' ||
        status._id === 'assigned' ||
        status._id === 'raised' ||
        status._id === 'checked'
      ) {
        counts.inProgress += status.count; // Sum counts for all in-progress statuses
      }
    });


    res.status(200).json(counts); // Return the counts in the required format
  } catch (error) {
    console.error('Error retrieving complaint status counts:', error);
    res.status(500).json({ message: 'Error retrieving complaint status counts', error: error.message });
  }
});


// Export the router
module.exports = router;
